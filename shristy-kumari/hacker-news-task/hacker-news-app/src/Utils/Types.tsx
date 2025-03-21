export interface Story{
    id: number;
    title: string;
    url: string;
    score: number;
    by: string;
    time: number;
    descendants: number;
    type: string;
    text?: string;
}
export interface Comment {
    id: number;
    by: string;
    text: string;
    time: number;
    kids?: number[];
    parent: number;
}