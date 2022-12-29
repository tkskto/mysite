// fetch.js
import {Ref, ref} from 'vue';

export function useFetch<T>(url: string): {data: Ref<T | null>, error: Ref<Error | null>} {
    const data = ref(null);
    const error = ref(null);

    fetch('~/assets/microAnimations/data/list.json').then(res => res.text()).then(res => console.log(res));

    fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

    return {data, error};
}
