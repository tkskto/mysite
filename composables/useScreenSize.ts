import {reactive} from 'vue';

let isTracking = false;
const screenSize = reactive({ width: 0, height: 0 });
const canvasSize = reactive({ width: 0, height: 0 });

const updateScreenSize = () => {
    screenSize.width = window.innerWidth;
    screenSize.height = window.innerHeight;
    canvasSize.width = screenSize.width * window.devicePixelRatio;
    canvasSize.height = screenSize.height * window.devicePixelRatio;
};

const setCanvasSize = (width: number, height: number) => {
    canvasSize.width = width;
    canvasSize.height = height;
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
        canvasSize,
        setCanvasSize,
        startListeningResize,
        stopListeningResize,
    };
}
