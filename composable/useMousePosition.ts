// mouse.js
import { ref } from 'vue'
import { useEventListener } from './useEvent.js'

export function useMousePosition() {
    const x = ref(0);
    const y = ref(0);

    useEventListener(window, 'mousemove', (event: Event) => {
        x.value = (<MouseEvent>event).pageX;
        y.value = (<MouseEvent>event).pageY;
    });

    return { x, y };
}
