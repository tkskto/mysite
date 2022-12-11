import type {Ref} from 'vue';
export type SceneName = 'load' | 'intro' | 'first' | 'ready';

const updateScene = (sceneNameRef: Ref<SceneName>) => (sceneName: SceneName) => sceneNameRef.value = sceneName;

export const useSceneName = () => {
    const sceneNameRef: Ref<SceneName> = useState('sceneName', () => 'load');

    return {
        sceneName: readonly(sceneNameRef),
        updateScene: updateScene(sceneNameRef),
    };
};
