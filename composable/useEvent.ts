// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target: Window | HTMLElement, type: string, listener: EventListenerOrEventListenerObject) {
    onMounted(() => target.addEventListener(type, listener))
    onUnmounted(() => target.removeEventListener(type, listener))
}
