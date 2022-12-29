export type ScreenSize = {
    width: number
    height: number
}

export interface iAnimation {
    author: string
    category: string
    id: number
}

export type MicroAnimationCategory = 'hover' | 'click' | 'toggle' | 'hold' | 'loading';

export type MicroAnimationItem = {author: string, time: string};

export type MicroAnimationData = {[key in MicroAnimationCategory]: MicroAnimationItem[]};

export type MicroAnimationList = {[key in MicroAnimationCategory]: iAnimation[]};
