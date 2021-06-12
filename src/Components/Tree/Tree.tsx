import React, { FunctionComponent } from "react";
import { INodeObject } from "../../Classes/NodeObject";
import { TreeNode } from "../Tree/TreeNode";

interface Props {
    node: INodeObject;
}

export const Tree: FunctionComponent<Props> = ({ node }) => {
    
    return (
        // <div className="flex flex-col items-center w-4/5 flex-shrink">
        <div>
            <div className="container mx-auto ">
                <TreeNode node={node} classNameForLine={node.Id}/>
            </div>
        </div>
    );
};
