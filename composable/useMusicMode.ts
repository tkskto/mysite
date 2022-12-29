import {Ref} from 'vue';

const update = (modeRef: Ref<boolean>) => (mode: boolean) => modeRef.value = mode;

export const useMusicMode = () => {
    const modeRef: Ref<boolean> = useState('musicMode', () => false);

    return {
        musicMode: readonly(modeRef),
        updateMusicMode: update(modeRef),
    };
};
