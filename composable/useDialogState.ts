import type {Ref} from 'vue';

const update = (dialogStateRef: Ref<boolean>) => (value: boolean) => {
    dialogStateRef.value = value;
};

export const useDialogState = () => {
    const dialogStateRef: Ref<boolean> = useState<boolean>('dialogState', () => {
        return false;
    });

    return {
        dialogState: dialogStateRef,
        updateDialogState: update(dialogStateRef),
    };
};
