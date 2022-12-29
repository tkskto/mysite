import type {Ref} from 'vue';
import Vector from 'assets/ts/common/gl/Vector.js';

const update = (cameraPositionRef: Ref<Vector>) => (size: Vector) => cameraPositionRef.value = size;

export const useCameraPosition = () => {
    const cameraPositionRef: Ref<Vector> = useState('cameraPosition', () => new Vector());

    return {
        cameraPosition: readonly(cameraPositionRef),
        updateCameraPosition: update(cameraPositionRef),
    };
};
