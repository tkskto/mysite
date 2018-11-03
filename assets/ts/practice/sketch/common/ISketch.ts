export interface ISketch {
    _id: string;
    _type: string;
    _timer: number;
    play(): void;
    pause(): void;
    setup(): void;
    update(): void;
    dispose(): void;
}
