import { reactive } from 'vue';

const mousePosition = reactive({ x: 0, y: 0 });
let isTracking = false;

const updatePosition = (e: MouseEvent) => {
    mousePosition.x = e.clientX * window.devicePixelRatio;
    mousePosition.y = e.clientY * window.devicePixelRatio;
};

const setMousePosition = (x: number, y: number) => {
    mousePosition.x = x;
    mousePosition.y = y;
};

const startMouseTracking = () => {
    if (!isTracking) {
        window.addEventListener('mousemove', updatePosition);
        isTracking = true;
    }
};

const stopMouseTracking = () => {
    if (isTracking) {
        window.removeEventListener('mousemove', updatePosition);
        isTracking = false;
    }
};

export const useMousePosition = () => {
    return {
        mousePosition,
        setMousePosition,
        startMouseTracking,
        stopMouseTracking,
    };
};
