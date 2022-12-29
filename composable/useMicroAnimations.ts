import type {Ref} from 'vue';
import {MicroAnimationList} from '~/types/index.js';

const update = (microAnimationRef: Ref<MicroAnimationList>) => (animations: MicroAnimationList) => microAnimationRef.value = animations;

export const useMicroAnimations = () => {
    const microAnimationRef: Ref<MicroAnimationList> = useState('microAnimation', () => ({
        click: [],
        hover: [],
        toggle: [],
        loading: [],
        hold: [],
    }));

    return {
        microAnimation: readonly(microAnimationRef),
        updateMicroAnimation: update(microAnimationRef),
    };
};
