const quoteText = ref<string>('');

const updateQuoteText = (text: string) => {
    quoteText.value = text;
};

export const useQuoteText = () => {
    return {
        quoteText,
        updateQuoteText,
    };
}
