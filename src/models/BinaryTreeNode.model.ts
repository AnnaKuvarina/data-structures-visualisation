export class BinaryTreeNodeModel {
    left?: BinaryTreeNodeModel;
    right?: BinaryTreeNodeModel;
    parent?: BinaryTreeNodeModel;
    x: number = 0;
    y: number = 0;
    direction: string = '';
    leftViewPort: number = 0;
    rightViewPort: number = 0;
    data: number;

    constructor(props: any) {
        const { data } = props;

        this.data = data;
    }
}
