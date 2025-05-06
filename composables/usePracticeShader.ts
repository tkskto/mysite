const vertexShader = ref<string>('');
const fragmentShader = ref<string>('');

const updateVertexShader = (shader: string) => {
    vertexShader.value = shader;
};

const updateFragmentShader = (shader: string) => {
    fragmentShader.value = shader;
};

export const usePracticeShader = () => {
    return {
        vertexShader,
        fragmentShader,
        updateVertexShader,
        updateFragmentShader,
    };
}
