import React, { FunctionComponent } from "react";
import { INodeObject } from "../../Classes/NodeObject";
import { TreeNode } from "../Tree/TreeNode";

interface Props {
    node: INodeObject;
    redraw:boolean;
    setRedraw:React.Dispatch<React.SetStateAction<boolean>>;
}

export const Tree: FunctionComponent<Props> = ({ node, redraw, setRedraw }) => {
    
    return (
        <div>
            <div className="container mx-auto ">
                <TreeNode node={node} classNameForLine={node.Id} redraw={redraw} setRedraw={setRedraw}/>
            </div>
        </div>
    );
};
