import React, { FunctionComponent } from "react";
import { Alternative } from "../Classes/Alternative";
import { Cell } from "./Cell";

interface Props {
    alternative: Alternative;
    setAlternatives: React.Dispatch<React.SetStateAction<Alternative[]>>;
    alternatives: Array<Alternative>;
}

export const AlternativeRow: FunctionComponent<Props> = ({
    alternative,
    alternatives,
    setAlternatives,
}) => {
    
    
    const removeAlternative = () => {
        let removed = alternatives.filter((element: Alternative) => {
            return element.id !== alternative.id;
        });
        setAlternatives(removed);
    };


    return (
        <div className="bg-transparent flex justify-between mt-2">
            <Cell value={alternative.name} className="items-center" />
            <button
                className="bg-red-500 rounded text-white pl-5 pr-5 text-lg"
                onClick={removeAlternative}>
                -
            </button>
        </div>
    );
};
