import {Ref} from 'vue';

const update = (musicPlayStateRef: Ref<boolean>) => (mode: boolean) => musicPlayStateRef.value = mode;

export const useMusicPlayState = () => {
    const musicPlayStateRef: Ref<boolean> = useState('musicPlayState', () => false);

    return {
        musicPlayState: readonly(musicPlayStateRef),
        updateMusicPlayState: update(musicPlayStateRef),
    };
};
