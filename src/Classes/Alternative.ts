import uuid from "uuid";
export class Alternative {
    constructor(name: String = "") {
        if (name) this.name = name;
        else this.name = name;
        this.id = uuid.v4();
        this.weight = 0;
    }
    public name: String | undefined;
    public weight: number;
    public id: any;
}
