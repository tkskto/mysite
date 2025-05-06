import {usePracticeScene} from '~/composables/usePracticeScene';

const practiceId = ref<string>('');

const {updatePracticeScene} = usePracticeScene();

const updatePracticeId = (id: string) => {
    if (id) {
        practiceId.value = id;
        updatePracticeScene('sketch');
    } else {
        practiceId.value = '';
        updatePracticeScene('top');
    }
};

export const usePracticeId = () => {
    return {
        practiceId,
        updatePracticeId,
    };
}
