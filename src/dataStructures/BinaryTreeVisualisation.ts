import { BinaryTreeNodeModel } from '@/models/BinaryTreeNode.model';
import { binaryTreeConfig } from '@/configs/binaryTree.config';
import { BinaryTree } from '@/dataStructures/BinaryTree';

export class BinaryTreeVisualisation extends BinaryTree {
    private canvas: any;

    constructor() {
        super();
        const canvasElement = document.getElementById('binary-tree') as HTMLCanvasElement;
        this.canvas = canvasElement.getContext('2d');

        this.setTextStyles();
    }

    insertNode(newNodeData: number) {
        super.insertNode(newNodeData);
        this.drawTree();
    }

    drawTree() {
        if (!this.newNode) {
            this.animateNewNode(this.root);
            return;
        }

        if (this.newNode.parent.data !== this.root.data && this.areCoordinatesUpdated(this.newNode)) {
            this.reDrawTree();
        }

        this.animateNewNode(this.newNode);
    }

    private drawNode(node: any, fillColor: string, strokeColor: string): void {
        const { circleRadius } = binaryTreeConfig;
        this.canvas.beginPath();
        this.canvas.fillStyle = fillColor;
        this.canvas.strokeStyle = strokeColor;
        this.canvas.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI, true);
        this.canvas.closePath();
        this.canvas.fill();
        this.canvas.stroke();
        this.canvas.strokeText(`${node.data}`, node.x, node.y);
    }

    private drawLink(node: BinaryTreeNodeModel | any) {
        this.canvas.beginPath();
        this.canvas.moveTo(node.parent.x, node.parent.y + binaryTreeConfig.circleRadius);
        this.canvas.lineTo(node.x, node.y);
        this.canvas.stroke();
    }

    private animateNewNode(node: BinaryTreeNodeModel): void {
        const {
            activeFillColor,
            activeStrokeColor,
            circleFillColor,
            circleStrokeColor,
            circleRadius
        } = binaryTreeConfig;

        if (node.parent) {
            this.drawLink(node);
        }
        this.drawNode(node, activeFillColor, activeStrokeColor);

        setTimeout(() => {
            this.canvas.clearRect(node.x, node.y, circleRadius, circleRadius);
            this.drawNode(node, circleFillColor, circleStrokeColor);
        }, 500);
    }

    private setTextStyles(): void {
        this.canvas.textAlign = 'center';
        this.canvas.font = '15px sans-serif';
        this.canvas.textBaseline = 'middle';
    }

    private reDrawTree(): void {
        const { width, height } = binaryTreeConfig;
        this.canvas.clearRect(0, 0, width, height);
        this.drawAllNodes(this.root);
    }

    private drawAllNodes(node: BinaryTreeNodeModel) {
        const { circleFillColor, circleStrokeColor } = binaryTreeConfig;
        if (node.parent) {
            this.drawLink(node);
        }

        this.drawNode(node, circleFillColor, circleStrokeColor);
        if (node.left != null) {
            this.drawAllNodes(node.left);
        }

        if (node.right != null) {
            this.drawAllNodes(node.right);
        }
    }

    private reSetChildCoordinateX(node: BinaryTreeNodeModel, indent: number): void {
        node.x += indent;
        node.leftViewPort += indent;
        node.rightViewPort += indent;

        if (node.left != null) {
            this.reSetChildCoordinateX(node.left, indent);
        }

        if (node.right != null) {
            this.reSetChildCoordinateX(node.right, indent);
        }
    }

    private areCoordinatesUpdated(node: BinaryTreeNodeModel): boolean {
        const { parallelNodeDirection, nodeViewPort } = binaryTreeConfig;
        let childBranchDirection = parallelNodeDirection[node.direction];
        let currentNode: BinaryTreeNodeModel | any = node;
        let parentNode: BinaryTreeNodeModel | any = node.parent;
        let wasUpdated = false;
        while (parentNode) {
            const parallelNode = parentNode[childBranchDirection];

            if (parallelNode) {
                if (this.areNodesIntersect(currentNode, parallelNode)) {
                    let viewPort;
                    const indent = this.getIndent(currentNode, parallelNode);

                    if (!this.isRight && currentNode.direction === 'left'
                        || this.isRight && currentNode.direction === 'right') {
                        this.moveChildNode(currentNode, indent);
                        viewPort = nodeViewPort[currentNode.direction];
                        this.updateViewPortOfAllParents(parentNode, viewPort, currentNode[viewPort]);
                    }

                    if (!this.isRight && currentNode.direction === 'right'
                        || this.isRight && currentNode.direction === 'left') {
                        this.moveChildNode(parentNode[childBranchDirection], indent);
                        viewPort = nodeViewPort[parallelNode.direction];

                        this.updateViewPortOfAllParents(parentNode, viewPort, parallelNode[viewPort]);
                    }

                    wasUpdated = true;
                }
            }

            childBranchDirection = parallelNodeDirection[parentNode.direction];
            currentNode = parentNode;
            parentNode = parentNode.parent;
        }

        return wasUpdated;
    }

    private getIndent(currentNode: BinaryTreeNodeModel, parallelNode: BinaryTreeNodeModel): number {
        let difference;
        if (currentNode.direction === 'right') {
            difference = this.isRight
                ? parallelNode.rightViewPort - currentNode.leftViewPort
                : currentNode.leftViewPort - parallelNode.rightViewPort;

        } else {
            difference = this.isRight
                ? currentNode.rightViewPort - parallelNode.leftViewPort
                : parallelNode.leftViewPort - currentNode.rightViewPort;
        }

        if (this.isRight) {
            return difference > this.indent ? difference : this.indent;
        }

        return difference < this.indent ? difference : this.indent;
    }

    private moveChildNode(node: BinaryTreeNodeModel, indent: number): void {
        this.reSetChildCoordinateX(node, indent);
    }

    private areNodesIntersect(currentNode: BinaryTreeNodeModel, parallelNode: BinaryTreeNodeModel): boolean {
        if (currentNode.direction === 'right') {
            return currentNode.leftViewPort <= parallelNode.rightViewPort;
        } else {
            return currentNode.rightViewPort >= parallelNode.leftViewPort;
        }
    }
}
