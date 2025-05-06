type Scene = 'top' | 'sketch' | 'pause';

const practiceScene = ref<Scene>('top');

const updatePracticeScene = (newScene: Scene) => {
    practiceScene.value = newScene;
};

export const usePracticeScene = () => {
    return {
        practiceScene,
        updatePracticeScene,
    };
}
