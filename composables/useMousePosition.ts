import {reactive, onMounted, onUnmounted} from 'vue';

let isTracking = false;
const position = reactive({x: 0, y: 0});

const updatePosition = (e: MouseEvent) => {
    position.x = e.clientX * window.devicePixelRatio;
    position.y = e.clientY * window.devicePixelRatio;
}

export const useMousePosition = () => {
    if (!isTracking) {
        onMounted(() => {
            window.addEventListener('mousemove', updatePosition);
            isTracking = true;
        });

        onUnmounted(() => {
            window.removeEventListener('mousemove', updatePosition);
            isTracking = false;
        });
    }
    
    return position;
}
