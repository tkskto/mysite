const musicMode = ref<boolean>(false);

const updateMusicMode = (mode: boolean) => {
    musicMode.value = mode;
};

export const useMusicMode = () => {
    return {
        musicMode,
        updateMusicMode,
    };
}
