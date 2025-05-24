type Scene = 'load' | 'intro' | 'first' | 'ready' | 'exit';

const appScene = ref<Scene>('load');

const updateScene = (newScene: Scene) => {
    appScene.value = newScene;
};

export const useAppScene = () => {
    return {
        appScene,
        updateScene,
    };
}
