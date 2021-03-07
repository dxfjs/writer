import Tag from "../Tag";

export default interface DXFInterface {
    stringify(): string;
    tags(): Tag[];
}
