export default interface IData {
    _vertex: number[];
    _color: number[];
    _index: number[];
    _normal: number[];
    _uv: number[];
    vertex(): number[];
    color(): number[];
    index(): number[];
    normal(): number[];
    uv(): number[];
}
