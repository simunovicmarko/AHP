import { NodeObject } from "../Classes/NodeObject";

export const GetRowsFromTree = (
    root: NodeObject,
    Row?: Array<String>,
    Depth?: number
) => {
    // let depth:number|undefined;
    if (!Row) {
        Depth = 1;
        Row = [root.Value + " \u21D2"];
        GetValuesFromChildren(root, Row, Depth);
    } else {
        let emptySpaces: string = "";
        if (Depth) {
            for (let i = 0; i < Depth; i++) {
                if (Depth > 1) emptySpaces += "\u00A0\u00A0\u00A0";
            }
        }
        if(root.Children)Row.push(emptySpaces + root.Value + " \u21D2");
        else Row.push(emptySpaces + root.Value);
        if (Depth !== undefined) GetValuesFromChildren(root, Row, Depth);
    }

    return Row;
};
function GetValuesFromChildren(
    root: NodeObject,
    Row: String[] | undefined,
    depth: number
) {
    if (root.Children) {
        root.Children.map((element: NodeObject) =>
            GetRowsFromTree(element, Row, depth + 1)
        );
    }
}
