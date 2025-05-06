import {reactive} from 'vue';

let isTracking = false;
const screenSize = reactive({ width: 0, height: 0 });

const updateScreenSize = () => {
    screenSize.width = window.innerWidth;
    screenSize.height = window.innerHeight;
};

const startListeningResize = () => {
    if (!isTracking) {
        window.addEventListener('resize', updateScreenSize);
        isTracking = true;
    }
};

const stopListeningResize = () => {
    if (isTracking) {
        window.removeEventListener('resize', updateScreenSize);
        isTracking = false;
    }
};


export const useScreenSize = () => {
    updateScreenSize();

    return {
        screenSize,
        startListeningResize,
        stopListeningResize,
    };
}
