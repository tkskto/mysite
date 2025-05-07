export const showError = (err: string | null = ''): void => {
    console.error(err || 'error');
};

/**
 * hsvをRGBAに変換する
 * @param {number} hue 0 - 360
 * @param {number} saturation 0 - 100
 * @param {number} value 0 - 100
 * @param {number} alpha 0 - 100
 * @returns {Array} 0 = R, 1 = G, 2 = B, 3 = alpha
 */
export const hsv2RGB = (hue: number, saturation: number, value: number, alpha: number): number[] => {
    if (saturation > 100 || value > 100 || alpha > 100) {
        return [];
    }

    const color: number[] = [];

    saturation = saturation / 100;
    value = value / 100;

    if (saturation === 0) {
        color.push(value, value, value, alpha / 100);
    } else {
        const th = hue % 360;
        const i = Math.floor(th / 60);
        const f = th / 60 - i;
        const m = value * (1 - saturation);
        const n = value * (1 - saturation * f);
        const k = value * (1 - saturation * (1 - f));
        const r = [value, n, m, m, k, value];
        const g = [k, value, value, n, m, m];
        const b = [m, m, k, value, value, n];
        color.push(r[i], g[i], b[i], alpha / 100);
    }

    return color;
}

export const getItemByKey = (_arr: any[], _key: string, _value: any): any => {
    let i;
    const len = _arr.length;

    for (i = 0; i < len; i++) {
        if (_arr[i][_key] === _value) {
            return _arr[i];
        }
    }

    return null;
}
