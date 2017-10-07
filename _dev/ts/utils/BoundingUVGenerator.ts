import * as THREE from "three";

export class BoundingUVGenerator {

    private extrudedShape;
    private bb;
    private extrudedOptions;

    constructor(extrudedShape, extrudedOptions) {
        this.extrudedShape = extrudedShape;
        this.bb = new THREE.Box2();

        this.bb.setFromPoints(this.extrudedShape.extractAllPoints().shape);
        this.extrudedOptions = extrudedOptions;
    }

    private generateTopUV = (geometry, vertices, indexA, indexB, indexC) => {
        var ax = vertices[indexA].x,
            ay = vertices[indexA].y,

            bx = vertices[indexB].x,
            by = vertices[indexB].y,

            cx = vertices[indexC].x,
            cy = vertices[indexC].y,

            bb = this.bb,//extrudedShape.getBoundingBox(),
            bbx = bb.max.x - bb.min.x,
            bby = bb.max.y - bb.min.y;

        return [
            new THREE.Vector2((ax - bb.min.x) / bbx, 1 - (ay - bb.min.y) / bby),
            new THREE.Vector2((bx - bb.min.x) / bbx, 1 - (by - bb.min.y) / bby),
            new THREE.Vector2((cx - bb.min.x) / bbx, 1 - (cy - bb.min.y) / bby)
        ];
    };

    private generateBottomUV = (geometry, vertices, indexA, indexB, indexC) => {
        return this.generateTopUV(geometry, vertices, indexA, indexB, indexC);
    };

    private generateSideWallUV = (geometry, vertices, indexA, indexB, indexC, indexD) => {
        var ax = vertices[indexA].x,
            ay = vertices[indexA].y,
            az = vertices[indexA].z,

            bx = vertices[indexB].x,
            by = vertices[indexB].y,
            bz = vertices[indexB].z,

            cx = vertices[indexC].x,
            cy = vertices[indexC].y,
            cz = vertices[indexC].z,

            dx = vertices[indexD].x,
            dy = vertices[indexD].y,
            dz = vertices[indexD].z;

        var amt = this.extrudedOptions.amount,
            bb = this.bb,//extrudedShape.getBoundingBox(),
            bbx = bb.max.x - bb.min.x,
            bby = bb.max.y - bb.min.y;

        if (Math.abs(ay - by) < 0.01) {
            return [
                new THREE.Vector2(ax / bbx, az / amt),
                new THREE.Vector2(bx / bbx, bz / amt),
                new THREE.Vector2(cx / bbx, cz / amt),
                new THREE.Vector2(dx / bbx, dz / amt)
            ];
        } else {
            return [
                new THREE.Vector2(ay / bby, az / amt),
                new THREE.Vector2(by / bby, bz / amt),
                new THREE.Vector2(cy / bby, cz / amt),
                new THREE.Vector2(dy / bby, dz / amt)
            ];
        }
    }
};
