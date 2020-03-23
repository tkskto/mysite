import * as THREE from 'three';
import VJ from './VJ';
import Visualize from './Visualize';
import Disk from './Disk';
import Needle from './Needle';

export default class Controller {
    private _selectedMusicNum = 0;
    private _mediaElement: HTMLAudioElement;
    private _analyser: THREE.AudioAnalyser;
    private _audio: THREE.Audio;
    private _ready = false;
    private _disks: THREE.Group;
    private _disk: Disk[] = [];
    private _vj: VJ;
    private _visualize: Visualize;
    private _needle: Needle;
    private _changeMode = false;

    private _currentViewMusicNum = 0;
    private _isPlaying = false;
    private _data: [] = [];

    constructor(private _stage: THREE.Scene, private _renderer: THREE.WebGLRenderer, private _width: number, private _height: number) {
        this.setup();
    }

    private setup = async () => {
        this._vj = new VJ(this._renderer, this._width, this._height);
        this._vj.generate();

        this._visualize = new Visualize(this._stage, this._width, this._height);
        this._visualize.generate(this._vj.renderTarget);

        const pointLight = new THREE.PointLight(0xffffff, 0.1, 10, 0.1);
        this._stage.add(pointLight);

        this._needle = new Needle(this._stage);
        await this._needle.load();
        this._needle.generate();
    };

    public changeMusic = async (index) => {
        const prev = this._currentViewMusicNum;
        this._currentViewMusicNum += index;

        if (this._selectedMusicNum === this._currentViewMusicNum) {
            this._currentViewMusicNum += index;
        }

        if (this._currentViewMusicNum < 0) {
            this._currentViewMusicNum = this._selectedMusicNum === 19 ? 18 : 19;
        } else if (this._currentViewMusicNum === 20) {
            this._currentViewMusicNum = this._selectedMusicNum === 0 ? 1 : 0;
        }

        if (this._changeMode) {
            if (!this._disk[prev].isPlaying) {
                await this._disk[prev].unView();
            }

            // @ts-ignore
            window.viewedData = this._data[this._currentViewMusicNum];
            this._disk[this._currentViewMusicNum].view();
        } else {
            this._changeMode = true;
            // @ts-ignore
            window.viewedData = this._data[this._currentViewMusicNum];
            this._disk[this._currentViewMusicNum].view();
        }
    };

    public changeMaterial = (direction) => {
        if (this._isPlaying) {
            this._vj.changeMaterial(direction);
        }
    };

    private createAudioElement = (src: string): HTMLAudioElement => {
        const mediaElement = new Audio();

        mediaElement.src = src;
        mediaElement.preload = 'auto';
        mediaElement.loop = true;

        return mediaElement;
    };

    public play = async (changeFlg: boolean) => {
        // changeFlgがtrueなら停止中でも楽曲を変える
        if (!changeFlg && this._mediaElement && this._selectedMusicNum === this._currentViewMusicNum) {
            this.resume();
            return;
        }
        // @ts-ignore
        window.viewedData = null;
        window.dispatchEvent(new CustomEvent('showSongInfo'));
        const current = this._selectedMusicNum;
        this._selectedMusicNum = this._currentViewMusicNum;
        const data = this._data[this._currentViewMusicNum];

        // @ts-ignore
        window.selectedData = data;

        if (this._mediaElement) {
            this._isPlaying = false;
            this._mediaElement.pause();
            this._mediaElement.remove();
            this._audio.disconnect();
            await this._needle.cancel();
            await this._disk[current].cancel();
        }

        // @ts-ignore
        this._mediaElement = this.createAudioElement(data.audio);
        await this._disk.forEach((disk) => {
            if (disk.isPlaying) {
                disk.cancel();
            }
        });

        await this._disk[this._currentViewMusicNum].select();
        await this._needle.play();

        setTimeout(async() => {
            await this._mediaElement.play();
            this._isPlaying = true;
            const listener = new THREE.AudioListener();

            this._audio = new THREE.Audio(listener);
            this._analyser = new THREE.AudioAnalyser(this._audio, 1024);
            this._audio.setMediaElementSource(this._mediaElement);

            this._vj.setAnalyzer(this._analyser);
            this._vj.show();

            this._ready = true;
        }, 600);
    };

    public pause = () => {
        this._mediaElement.pause();
        this._ready = false;
        this._isPlaying = false;
    };

    private resume = () => {
        this._mediaElement.play();
        this._ready = true;
        this._isPlaying = true;
    };

    public setMusicData = (data) => {
        this._data = data;
        this._disks = new THREE.Group();
        data.forEach((item, index) => {
            this._disk.push(new Disk(this._disks, item, index));
        });
        this._disks.rotation.x = Math.PI * -0.5;
        this._disks.position.set(-4.2, 0.8, 7.6);
        this._stage.add(this._disks);
    };

    public update = (time: number) => {
        this._analyser.getFrequencyData();

        if (this._vj.ready) {
            this._vj.update(time);
        }

        if (this._disk.length && this._isPlaying) {
            this._disk[this._selectedMusicNum].update();
        }
    };

    get ready(): boolean {
        return this._ready;
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }
}
