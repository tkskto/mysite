export class Animation {
    private _author: string;
    private _category: string;
    private _id: number;

    constructor(_author: string, _category: string, _id: number) {
        this._author = _author;
        this._category = _category;
        this._id = _id;
    }

    get author(): string {
        return this._author;
    }

    get category(): string {
        return this._category;
    }

    get id(): number {
        return this._id;
    }
}
