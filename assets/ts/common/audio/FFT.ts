export class FFT {
    private _audioContext: AudioContext;
    private _analyser: AnalyserNode;
    private _buffer: AudioBuffer;
    private _loop: boolean;

    constructor() {
        this._audioContext = new AudioContext();
        this._analyser = this._audioContext.createAnalyser();
        this._analyser.fftSize = 2048;
    }

    private onLoadAudio = (value: Response): ArrayBuffer | PromiseLike<ArrayBuffer> => {
        return value.arrayBuffer();
    };

    private getAudioData = (buffer: ArrayBuffer) => {
        return this._audioContext.decodeAudioData(buffer);
    };

    private onComplete = (buffer: AudioBuffer) => {
        this._buffer = buffer;
    };

    private onError = (err) => {
        console.log(err);
    };

    public ready = (_url: string) => {
        return fetch(_url).then(this.onLoadAudio).then(this.getAudioData).then(this.onComplete).catch(this.onError);
    };

    public play = (isLoop: boolean) => {
        const source = this._audioContext.createBufferSource();
        source.buffer = this._buffer;
        source.connect(this._audioContext.destination);
        source.connect(this._analyser);
        source.loop = isLoop;
        source.start(0);
    };

    public pause = () => {
        if (this._audioContext.state === 'running') {
            this._audioContext.suspend().then(() => {
            });
        }
    };

    get analyser(): AnalyserNode {
        return this._analyser;
    }

    get audioContext(): AudioContext {
        return this._audioContext;
    }
}
