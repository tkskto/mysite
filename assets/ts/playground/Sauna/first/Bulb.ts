import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare';
import {Group, PointLight, Scene, Texture, TextureLoader} from 'three'

export default class Bulb {
    private _flare: Texture;
    private _group: Group;

    constructor(private _stage: Scene) {}

    public generate = async (): Promise<void> => {
        this._flare = new TextureLoader().load(await require('~/assets/img/playground/sauna/lensflare0.png'));
        const lensflare = new Lensflare();
        const pointLight = new PointLight(0xfe8400, 1, 150, 2);
        pointLight.castShadow = true;

        lensflare.addElement( new LensflareElement( this._flare, 200, 0 ) );
        pointLight.add(lensflare);

        this._group = new Group();
        this._group.add(pointLight);
        this._group.position.set(20, 50, 0);

        this._stage.add(this._group);
    }
}
