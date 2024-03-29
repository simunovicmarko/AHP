import React, { FunctionComponent, useState } from "react";
import { Alternative } from "../Classes/Alternative";
import { Parameter } from "../Classes/Parameter";
import { AddInput } from "./AddInput";
import { AlternativeRow } from "./AlternativeRow";

interface Props {
    alternatives: Alternative[];
    setAlernatves: React.Dispatch<React.SetStateAction<Alternative[]>>;
    parameter:Parameter;
}

export const AlternativesComponent: FunctionComponent<Props> = ({alternatives, setAlernatves, parameter}) => {
    // const [alternatives, setAlernatves] = useState<Array<Alternative>>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const addAlternative = () => {
        if (inputValue !== "") {
            setAlernatves([...alternatives, new Alternative(inputValue)]);
            setInputValue("");
        }
    };

    const drawAlternatives = (alts: Array<Alternative>) => {
        return (
            <div className="text-black bg-gray-500 ">
                {alts.map((element: Alternative) => {
                    return (
                        <AlternativeRow
                            key={element.id}
                            alternative={element}
                            setAlternatives={setAlernatves}
                            alternatives={alternatives}
                            parameter={parameter}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-1/2 bg-gray-500 p-2  m-5 ">
            <strong className="text-white bg-transparent mb-2">
                Alternative
            </strong>
            <AddInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                onClick={addAlternative}
                ClearAlternativesClick={()=>{setAlernatves([])}}
            />

            {drawAlternatives(alternatives)}
        </div>
    );
};
