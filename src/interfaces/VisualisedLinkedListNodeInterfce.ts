import { LinkedListNodeInterface } from '@/interfaces/LinkedListNodeInterface';

export interface VisualisedLinkedListNodeInterface extends LinkedListNodeInterface {
    x: number;
    y: number;
    linkPrevX: number;
    linkPrevY: number;
    linkToX: number;
    linkToY: number;
    linkFromX: number;
    linkFromY: number;
}
