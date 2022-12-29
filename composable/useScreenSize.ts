import type {Ref} from 'vue';
import {ScreenSize} from '~/types';
import {useEventListener} from '~/composable/useEvent.js';
import {ref} from 'vue';

const updateCanvasSize = (canvasSizeRef: Ref<ScreenSize>) => (value: ScreenSize) => canvasSizeRef.value = value;

export const useScreenSize = () => {
    const ratio = window.devicePixelRatio;
    const screenSize: Ref<ScreenSize> = ref({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const canvasSize: Ref<ScreenSize> = ref({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio,
    });

    useEventListener(window, 'resize', () => {
        const {innerWidth, innerHeight} = window;

        if (screenSize.value.width === innerWidth && screenSize.value.height === innerHeight) {
            return;
        }

        screenSize.value = {
            width: innerWidth,
            height: innerHeight,
        };
        canvasSize.value = {
            width: innerWidth * ratio,
            height: innerHeight * ratio,
        };
    });

    return {
        screenSize,
        canvasSize,
        updateCanvasSize: updateCanvasSize(canvasSize),
    };
};
