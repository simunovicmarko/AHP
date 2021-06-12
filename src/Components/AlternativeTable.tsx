import React, { FunctionComponent, useState } from "react";
import { EditableCell } from "./EditableCell";
import { AddTreeNode } from "./Tree/AddTreeNode";
import { Alternative } from "../Classes/Alternative";

interface Props {}

export const AlternativeTable: FunctionComponent<Props> = () => {
    const [alternatives, setAlternatives] = useState<Array<Alternative>>([]);

    // useEffect(() => {

    // }, [alternatives])

    const onClick = () => {
        setAlternatives([...alternatives, new Alternative("")]);
        console.log(alternatives);
    };

    const drawCells = (Alternatives: Array<Alternative>) => {
        return (
            <div className="flex flex-col">
                {Alternatives.map((element: Alternative) => {
                    return 
                })}
            </div>
        );
    };

    return (
        <div className="flex">
            {drawCells(alternatives)}
            <AddTreeNode onClick={onClick} />
        </div>
    );
};
