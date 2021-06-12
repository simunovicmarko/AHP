import uuid from "uuid";
// import nextId from "react-id-generator";

export interface INodeObject {
    Value: String;
    Children?: Array<NodeObject>;
    Id: any;
}

export class NodeObject implements INodeObject {
    constructor(value: string, children?: Array<NodeObject>) {
        this.Value = value;
        this.Id = uuid.v4();
        if (children) this.Children = children;
    }

    public Value: String;
    public Children?: Array<NodeObject>;
    public Id: any;
}
