import React, { ChangeEvent, FunctionComponent, useState } from "react";
import LineTo from "react-lineto";
import { INodeObject, NodeObject } from "../../Classes/NodeObject";
import { AddTreeNode } from "./AddTreeNode";
import { RemoveTreeNode } from "./RemoveTreeNode";
import uuid from 'uuid'
// import uuid from 'uuid';

interface Props {
    node: NodeObject;
    parentNode?: NodeObject;
    parentSubnodes?: Array<NodeObject>;
    SetParentSubnodes?: React.Dispatch<
        React.SetStateAction<NodeObject[] | undefined>
    >;
    classNameForLine?: string;
    redraw:boolean;
    setRedraw:React.Dispatch<React.SetStateAction<boolean>>;
}

export const TreeNode: FunctionComponent<Props> = ({
    node,
    parentSubnodes,
    SetParentSubnodes,
    parentNode,
    classNameForLine,
    redraw,
    setRedraw
}) => {
    const [value, setValue] = useState<String>(node.Value);
    const [subNodes, setSubNodes] = useState<Array<NodeObject> | undefined>(
        node.Children
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        node.Value = e.target.value;
    };

    const drawSubNodes = (node: NodeObject) => {
        if (subNodes && value.length > 0) {
            return (
                <div className={`flex justify-between`}>
                    {subNodes.map((element: INodeObject) => (
                        <div>
                            <TreeNode
                                node={element}
                                parentNode={node}
                                parentSubnodes={subNodes}
                                SetParentSubnodes={setSubNodes}
                                classNameForLine={element.Id}
                                key={element.Id}
                                redraw={redraw} setRedraw={setRedraw}
                            />
                            {classNameForLine?<LineTo from={classNameForLine} to={element.Id} fromAnchor="bottom center" toAnchor="top" borderColor="#4f4f4f" borderWidth={2} delay={50} className="overflow-hidden" key={uuid.v4()}/>:undefined}
                        </div>
                    ))}
                </div>
            );
        }
    };

    const addSubNode = () => {
        //This mfer cost me an hour of my life 🤢
        let newNode = new NodeObject("");
        if (subNodes && value.length > 0) setSubNodes([...subNodes, newNode]);
        else if (value.length > 0) setSubNodes([newNode]);

        if (node.Children && value.length) node.Children.push(newNode);
        else if(value.length > 0) node.Children = [newNode];
        setRedraw(!redraw)
    };

    const removeSubNode = () => {
        if (SetParentSubnodes) {
            let temp: Array<NodeObject> = [];
            if (parentSubnodes) {
                temp = parentSubnodes.filter((element: NodeObject) => {
                    return element.Id !== node.Id;
                });
            }
            SetParentSubnodes(temp);

            if (parentNode) parentNode.Children = temp;
            setRedraw(!redraw)
        }
    };

    return (
        <div className="flex flex-col items-center w-full ">
            <div className={"flex m-5 mb-20 "}>
                <input
                    value={String(value)}
                    onChange={handleChange}
                    className={"rounded-full focus:bg-gray-700 focus:outline-none hover:bg-gray-600 bg-gray-500 p-3 w-24 flex justify-center text-white text-center font-bold text-lg " + classNameForLine}
                />
                <div>
                    <AddTreeNode onClick={addSubNode} />
                    {parentSubnodes ? (
                        <RemoveTreeNode onClick={removeSubNode} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {drawSubNodes(node)}
        </div>
    );
};
