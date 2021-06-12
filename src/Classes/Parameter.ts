import uuid from "uuid";
import { Alternative } from "./Alternative";

export class Parameter {
    constructor(name = "", children: Array<Parameter> = [], weight = 0) {
        this.id = uuid.v4();
        this.weight = weight;
        this.name = name;
        this.children = children;
        this.alternatives = [];
    }

    public children: Array<Parameter>;
    public id: any;
    public name: string;
    public weight: number;
    public alternatives: Alternative[];
}
