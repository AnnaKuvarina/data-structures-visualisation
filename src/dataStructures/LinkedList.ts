import { LinkedListNodeInterface } from '@/interfaces/LinkedListNodeInterface';

export class LinkedList  {
    head: LinkedListNodeInterface | any;
    tailNode: LinkedListNodeInterface | any;

    insertNode(value: number): void {
        const node: LinkedListNodeInterface = {
            data: value,
            next: null
        };

        if (!this.head) {
            this.head = node;
        }

        if (this.tailNode) {
            this.tailNode.next = node;
        }

        this.tailNode = node;
    }
}
