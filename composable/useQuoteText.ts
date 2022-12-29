import type {Ref} from 'vue';

const update = (quoteTextRef: Ref<string>) => (size: string) => quoteTextRef.value = size;

export const useQuoteText = () => {
    const quoteTextRef: Ref<string> = useState('quoteText', () => '');

    return {
        quoteText: readonly(quoteTextRef),
        updateQuoteText: update(quoteTextRef),
    };
};
