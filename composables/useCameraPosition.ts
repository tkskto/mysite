import {Vector} from '~/assets/ts/common/gl/Vector';

const cameraPosition = ref<Vector>(new Vector(0.0, 0.0, 1));

const updateCameraPosition = (position: Vector) => {
    cameraPosition.value = position;
};

export const useCameraPosition = () => {
    return {
        cameraPosition,
        updateCameraPosition,
    };
}
