import {Vector} from '~/assets/ts/common/gl/Vector.ts';

const cameraPosition = reactive<Vector>(new Vector(0.0, 0.0, 1));

const updateCameraPosition = (cameraPosition: boolean) => {
    cameraPosition.value = cameraPosition;
};

export const useCameraPosition = () => {
    return {
        cameraPosition,
        updateCameraPosition,
    };
}
