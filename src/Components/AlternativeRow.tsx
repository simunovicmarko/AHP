import React, { FunctionComponent } from "react";
import { Alternative } from "../Classes/Alternative";
import { Parameter } from "../Classes/Parameter";
import { Cell } from "./Cell";

interface Props {
    alternative: Alternative;
    setAlternatives: React.Dispatch<React.SetStateAction<Alternative[]>>;
    alternatives: Array<Alternative>;
    parameter: Parameter;
}

export const AlternativeRow: FunctionComponent<Props> = ({
    alternative,
    alternatives,
    setAlternatives,
    parameter,
}) => {
    const removeAlternative = () => {
        let removed = alternatives.filter((element: Alternative) => {
            return element.id !== alternative.id;
        });
        setAlternatives(removed);
        removeAlternativeFromParameter(parameter, alternative);
    };

    const removeAlternativeFromParameter = (parameter: Parameter, alternative:Alternative) => {
        parameter.alternatives = parameter.alternatives.filter(
            (alt) => alt.id !== alternative.id
        );
        parameter.children.forEach((child) => {
            removeAlternativeFromParameter(child, alternative);
        });
    };

    return (
        <div className="bg-transparent flex justify-between mt-2">
            <Cell
                value={alternative.name}
                className="items-center w-full mr-2"
            />
            <button
                className="bg-red-500 rounded text-white pl-5 pr-5 text-lg"
                onClick={removeAlternative}>
                -
            </button>
        </div>
    );
};
