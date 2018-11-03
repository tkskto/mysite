export class Utils {
    public static getItemByKey(_arr: any[], _key: string, _value: any) {
        let i;
        const len = _arr.length;

        for (i = 0; i < len; i++) {
            if (_arr[i][_key] === _value) {
                return _arr[i];
            }
        }

        return null;
    }
}
