import React, { FunctionComponent } from "react";
import { NodeObject } from "../Classes/NodeObject";
import { Cell } from "./Cell";
interface Props {
    mainNode: NodeObject;
}

export const Tables: FunctionComponent<Props> = ({ mainNode }) => {

    let columns:Array<NodeObject> = [];

    const getValuesFromTree = (node: NodeObject, arr: Array<any>) => {
        arr.push(<Cell value={node.Value} key={node.Id}></Cell>);
        columns.push(node);
        if (node.Children) {
            node.Children.map((child: NodeObject) => {
                return getValuesFromTree(child, arr);
            });
        }
        return arr;
    };

    let arr: Array<any> = [];

    return (
        <div>
            {getValuesFromTree(mainNode, arr)}
        </div>
    );
};
