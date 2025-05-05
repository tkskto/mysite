import {reactive, onMounted, onUnmounted} from 'vue';

let isTracking = false;
const screenSize = reactive({ width: 0, height: 0 });
const update = () => {
    screenSize.width = window.innerWidth;
    screenSize.height = window.innerHeight;
};

export const useScreenSize = () => {
    if (!isTracking) {
        screenSize.width = window.innerWidth;
        screenSize.height = window.innerHeight;
        
        onMounted(() => {
            window.addEventListener('resize', update);
            isTracking = true;
        });

        onUnmounted(() => {
            window.removeEventListener('resize', update);
            isTracking = false;
        });
    }

    return screenSize;
}
