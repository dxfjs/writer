import Tag from "../Tag.js";

export default interface DXFInterface {
    stringify(): string;
    tags(): Tag[];
}
