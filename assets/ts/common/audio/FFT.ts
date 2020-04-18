export default class FFT {
    private _audioContext: AudioContext;
    private _analyser: AnalyserNode;
    private _buffer: AudioBuffer;
    private _source: AudioBufferSourceNode;
    private _gain: GainNode;
    private _loop: boolean;

    constructor() {
        this._audioContext = new AudioContext();
        this._analyser = this._audioContext.createAnalyser();
        this._analyser.fftSize = 32;
        this._analyser.minDecibels = -90; //最小値
        this._analyser.maxDecibels = 0; //最大値
        this._analyser.smoothingTimeConstant = 0.65; //落ち着くまでの時間
    }

    private onLoadAudio = (value: Response): ArrayBuffer | PromiseLike<ArrayBuffer> => {
        return value.arrayBuffer();
    };

    private getAudioData = (buffer: ArrayBuffer): Promise<AudioBuffer> => {
        return this._audioContext.decodeAudioData(buffer);
    };

    private onComplete = (buffer: AudioBuffer): Promise<void> => {
        return new Promise((resolve) => {
            this._buffer = buffer;
            this._source = this._audioContext.createBufferSource();
            this._gain = this._audioContext.createGain();
            this._source.buffer = this._buffer;
            this._source.connect(this._audioContext.destination);
            this._source.connect(this._gain);
            this._source.connect(this._analyser);
            this._gain.connect(this._audioContext.destination);
            resolve();
        });
    };

    private onError = (err): void => {
        console.log(err);
    };

    public ready = (_url: string): Promise<void> => {
        return fetch(_url).then(this.onLoadAudio).then(this.getAudioData).then(this.onComplete).catch(this.onError);
    };

    public play = (isLoop: boolean): void => {
        this._source.loop = isLoop;
        this._source.start(0);
    };

    public pause = (): void => {
        if (this._audioContext.state === 'running') {
            this._audioContext.suspend().then((res) => {
                console.log(res);
            });
        }
    };

    public changeVolume = (value: number): void => {
        this._gain.gain.value = value;
    };

    set isLoop(flg: boolean) {
        this._source.loop = flg;
    }

    get analyser(): AnalyserNode {
        return this._analyser;
    }

    get audioContext(): AudioContext {
        return this._audioContext;
    }
}
