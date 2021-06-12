import React, { FunctionComponent, useEffect, useState } from "react";
import { Alternative } from "../Classes/Alternative";
import { NodeObject } from "../Classes/NodeObject";
import { Parameter } from "../Classes/Parameter";
import { GetRowsFromTree } from "../Functions/GetRowFromTree";
import { Cell } from "./Cell";
import { LeftCell } from "./LeftCell";

interface Props {
    parameters: Parameter;
    alternatives: Alternative[];
    firstNode: NodeObject;
}

export const FinalValues: FunctionComponent<Props> = ({
    parameters,
    alternatives,
    firstNode,
}) => {
    const getValuesForAltsFromParameter = (
        parameter: Parameter,
        alternative: Alternative
    ) => {
        if (parameter.children.length <= 0) {
            //Najdem pravo alternativo
            let alt: Alternative | undefined;
            for (let i = 0; i < parameter.alternatives.length; i++) {
                if (parameter.alternatives[i].name === alternative.name)
                    alt = parameter.alternatives[i];
            }
            //nastavim vrednost * utež parametra
            let weight: number = 0;

            if (alt !== undefined) weight = alt.weight * parameter.weight;
            return weight;
            //Vrnem staršu
        } else {
            //za vsakega otroka
            //klčiem naj najde pravo alternativo in jo vrne staršu
            let sum = 0;
            parameter.children.forEach((child) => {
                sum += getValuesForAltsFromParameter(child, alternative);
            });

            let final = sum * parameter.weight;

            for (let i = 0; i < parameter.alternatives.length; i++) {
                if (parameter.alternatives[i].name === alternative.name)
                    parameter.alternatives[i].weight = final;
            }
            //Vrnem staršu
            return final;
        }
    };

    const goThroughAltsAndGetWeights = (
        alternatives: Alternative[],
        firstParameter: Parameter
    ) => {
        alternatives.forEach((alternative) => {
            getValuesForAltsFromParameter(firstParameter, alternative);
        });
    };

    const [draw, setDraw] = useState<any[]>([]);

    useEffect(() => {
        goThroughAltsAndGetWeights(alternatives, parameters);
        setDraw(drawTable(parameters));
    }, []);

    const drawTable = (parameters: Parameter) => {
        let arr: Array<any> = [];
        arr.push(drawRows(firstNode));
        arr.push(drawAltsWithFinalValues(alternatives))
        arr.push(drawParamWeights(parameters))
        return [<div className="m-5 flex">{arr}</div>];
    };

    const drawAltsWithFinalValues = (alternatives: Alternative[]) => {
        let temp = parameters.alternatives.map((alternative) => {
            return (
                <div className="flex flex-col">
                    <Cell value={alternative.name} className="bg-gray-300" />
                    <Cell value={alternative.weight}/>
                    {weightsForSpecificAlt(alternative, parameters)}
                </div>
            );
        });
        
        return <div className="flex">{temp}</div>
    }

    const weightsForSpecificAlt = (alternative:Alternative, param: Parameter, arr:any[] = []) => {
        const findAltAndGetItsValue = (alternative:Alternative, alternatives:Alternative[]) => {
            for (let i = 0; i < alternatives.length; i++) {
                if(alternative.name === alternatives[i].name) return alternatives[i].weight;                
                // if(alternative.name === alternatives[i].name) return alternatives[i].weight;                
            }
            return 0;
        }
        
        for (let i = 0; i < param.children.length; i++) {
            let child = param.children[i];
            arr.push(<Cell value={findAltAndGetItsValue(alternative, child.alternatives)}/>)
            weightsForSpecificAlt(alternative, child, arr);
        }
        return arr;
    }

    const drawParamWeights = (param:Parameter,arr: any[] = [<Cell value="Uteži" className="bg-gray-700 text-gray-100 font-bold"/>]) => {
        arr.push(<Cell value={param.weight} className="bg-gray-300"/>)
        for (let i = 0; i < param.children.length; i++) {
            let child = param.children[i];
            drawParamWeights(child, arr)        ;    
        }
        return [<div className="flex flex-col">{arr}</div>];
    }

    const drawRows = (firstNode: NodeObject) => {
        let arr:any[] = [];
        arr.push(<Cell className="w-auto"/>);
        let indetedRows = GetRowsFromTree(firstNode);
        let rows = indetedRows.map((cell) => {
            return <LeftCell value={cell.valueOf()} className="w-auto"/>;
        });

        rows.forEach(element => {
            arr.push(element);
        });
        return <div className="flex flex-col">{arr}</div>;
    };

    return <div className="flex m-5">{draw}</div>;
};
