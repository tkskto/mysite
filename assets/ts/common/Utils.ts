import {Vector} from './gl/Vector';

export class MatrixUtils {
}

export class VectorUtils {
    public static getFaceNormalArr(_vertexArr: number[], _indexArr: number[]): number[] {
        let i;
        const len = _vertexArr.length / 3;
        const distArr: number[] = [];

        for (i = 0; i < len; i++) {
            const _index1: number = _indexArr[i] * 3;
            const _index2: number = _indexArr[i] * 3;
            const _index3: number = _indexArr[i] * 3;

            const _vec1: Vector = new Vector(_vertexArr[_index1], _vertexArr[_index1 + 1], _vertexArr[_index1 + 2]);
            const _vec2: Vector = new Vector(_vertexArr[_index2], _vertexArr[_index2 + 1], _vertexArr[_index2 + 2]);
            const _vec3: Vector = new Vector(_vertexArr[_index3], _vertexArr[_index3 + 1], _vertexArr[_index3 + 2]);

            const v1: Vector = _vec2.subtract(_vec1).normalize();
            const v2: Vector = _vec3.subtract(_vec1).normalize();

            distArr[i * 3] = v1.y * v2.z - v1.z * v2.y;
            distArr[i * 3 + 1] = v1.z * v2.x - v1.x * v2.z;
            distArr[i * 3 + 2] = v1.x * v2.y - v1.y * v2.x;
        }

        return distArr;
    }

    public static getFaceNormalVector(_vec1: Vector, _vec2: Vector, _vec3: Vector): Vector {
        const dist: Vector = new Vector();
        const v1: Vector = _vec2.subtract(_vec1).normalize();
        const v2: Vector = _vec3.subtract(_vec1).normalize();

        dist.x = v1.y * v2.z - v1.z * v2.y;
        dist.y = v1.z * v2.x - v1.x * v2.z;
        dist.z = v1.x * v2.y - v1.y * v2.x;

        return dist;
    }
}
