import type {Ref} from 'vue';
import {ScreenSize} from '~/types';

const update = (screenSizeRef: Ref<ScreenSize>) => (size: ScreenSize) => screenSizeRef.value = size;

export const useScreenSize = () => {
    const screenSizeRef: Ref<ScreenSize> = useState('screenSize', () => ({
        width: window.innerWidth,
        height: window.innerHeight,
    }));

    return {
        screenSize: readonly(screenSizeRef),
        updateScreenSize: update(screenSizeRef),
    };
};
