import type {Ref} from 'vue';

const updateVertexShader = (vertexShaderRef: Ref<string>) => (shader: string) => vertexShaderRef.value = shader;
const updateFragmentShader = (fragmentShaderRef: Ref<string>) => (shader: string) => fragmentShaderRef.value = shader;

export const useShader = () => {
    const vertexShaderRef: Ref<string> = useState('vertexShader', () => '');
    const fragmentShaderRef: Ref<string> = useState('fragmentShader', () => '');

    return {
        vertexShader: readonly(vertexShaderRef),
        fragmentShader: readonly(fragmentShaderRef),
        updateVertexShader: updateVertexShader(vertexShaderRef),
        updateFragmentShader: updateFragmentShader(fragmentShaderRef),
    };
};
