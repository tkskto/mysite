export default interface Sketch {
    _id: string;
    _timer: number;
    play(): void;
    pause(): void;
    setup(): void;
    update(): void;
    dispose(): void;
}
