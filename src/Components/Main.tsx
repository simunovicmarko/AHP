import React, { FunctionComponent, useEffect, useState } from "react";
import { NodeObject } from "../Classes/NodeObject";
import { Tree } from "./Tree/Tree";
// import { Tables } from "./Tables";
import { Button } from "./Button";
// import { GetRowsFromTree } from "../Functions/GetRowFromTree";
import { AlternativesComponent } from "./AlternativesComponent";
import { ParamTables } from "./ParamTables";
import { Alternative } from "../Classes/Alternative";
import { Parameter } from "../Classes/Parameter";
import { AltTables } from "./AltTables";
import { FinalValues } from "./FinalValues";
// import { AlternativeTable } from "./AlternativeTable";

interface Props {}

export const Main: FunctionComponent<Props> = () => {
    let testNode = new NodeObject("1");
    testNode.Children = [
        new NodeObject("2", [new NodeObject("21"), new NodeObject("22")]),
        new NodeObject("3", [
            new NodeObject("31"),
            new NodeObject("32"),
            new NodeObject("33"),
            new NodeObject("34", [
                new NodeObject("341"),
                new NodeObject("342"),
            ]),
        ]),
        // new NodeObject("neki3"),
    ];

    let testNodeCars = new NodeObject("Ocena avtomobila");
    testNodeCars.Children = [
        new NodeObject("Cena"),
        new NodeObject("Zmogljivost", [
            new NodeObject("0 - 100 km/h"),
            new NodeObject("Končna hitrost"),
            new NodeObject("Navor"),
        ]),
        new NodeObject("Motor", [
            new NodeObject("Velikost"),
            new NodeObject("Poraba"),
            new NodeObject("Moč"),
        ]),
        new NodeObject("Prostornost", [
            new NodeObject("Prostornina"),
            new NodeObject("Velikost prtljažnika"),
        ]),
        new NodeObject("Oprema", [
            new NodeObject("Varnostni sistemi"),
            new NodeObject("Luksuzna oprema"),
        ]),
    ];

    let testAlts: Array<Alternative> = [
        new Alternative("Prva"),
        new Alternative("druga"),
        new Alternative("tretja"),
        new Alternative("četrta"),
    ];
    let testAltsCars: Array<Alternative> = [
        new Alternative("Mercedes"),
        new Alternative("Tushek"),
        new Alternative("Ferrari"),
        new Alternative("Pagani"),
        new Alternative("Rimac"),
    ];

    const [table, setTable] = useState<boolean>(false);
    const [DisplayFinalValues, setDisplayFinalValues] = useState(false);
    const [firstNode] = useState(new NodeObject(""));
    const [alternatives, setAlernatves] = useState<Array<Alternative>>([]);
    const [parameters, setParameters] = useState<Array<Parameter>>([]);
    const [RecursiveParameters, setRecursiveParameters] = useState<Parameter>(
        new Parameter()
    );
    const [drawAlts, setDrawAlts] = useState<any[]>([]);

    // const [firstNode] = useState(testNodeCars);
    // const [alternatives, setAlernatves] =
    //     useState<Array<Alternative>>(testAltsCars);

    const generateTable = () => {
        if (
            firstNode.Value.length > 0 &&
            firstNode.Children &&
            firstNode.Children.length > 0
        ) {
            setTable(!table);
        } else setTable(false);
    };

    let usedAltParameters: Parameter[] = [];

    const generateAltTables = (
        alts: Alternative[],
        parameters: Parameter[],
        arr: any[] = []
    ) => {
        parameters.forEach((parameter) => {
            let tempParam = usedAltParameters.find(
                (par) => par.name === parameter.name
            );
            usedAltParameters.push(parameter);
            if (tempParam === undefined)
                arr.push(
                    <AltTables
                        alts={alts}
                        parameter={parameter}
                        firstParam={RecursiveParameters}
                    />
                );
            parameter.children.forEach(() => {
                generateAltTables(alts, parameter.children, arr);
            });
        });

        return arr;
    };
    const generateAltTablesRecursevly = (
        alts: Alternative[],
        parameter: Parameter,
        arr: any[] = []
    ) => {
        if (parameter.children.length <= 0)
            arr.push(
                <AltTables
                    alts={alts}
                    parameter={parameter}
                    firstParam={RecursiveParameters}
                />
            );

        parameter.children.forEach((par) =>
            generateAltTablesRecursevly(alts, par, arr)
        );

        return arr;
    };

    useEffect(() => {
        if (parameters.length > 0) {
            setDrawAlts(
                generateAltTablesRecursevly(alternatives, RecursiveParameters)
            );
        }
    }, [alternatives, parameters]);

    return (
        <div className="Main flex flex-col items-center w-full">
            <Tree node={firstNode} />
            <div className="flex justify-end w-full pr-10">
                <Button text="Osveži tabele" onClick={generateTable} />
            </div>
            <AlternativesComponent
                alternatives={alternatives}
                setAlernatves={setAlernatves}
            />
            {table ? (
                <div>
                    <div className="text-xl font-bold p-5 mb-4 w-full bg-gray-700 text-white">
                        Parametri
                    </div>
                    <ParamTables
                        node={firstNode}
                        parameters={parameters}
                        setParameters={setParameters}
                        setRecursiveParamters={setRecursiveParameters}
                        recursiveParamters={RecursiveParameters}
                        alternatives={alternatives}
                    />
                    {drawAlts.length > 0 && alternatives.length > 0 ? (
                        <div className="text-xl font-bold p-5 mb-4 w-full bg-gray-700 text-white">
                            Alternative
                        </div>
                    ) : undefined}
                    {drawAlts}
                    <div className="flex justify-end w-full pr-10 mb-5">
                        <Button
                            text="Prikaži končno tabelo"
                            onClick={() =>
                                setDisplayFinalValues(!DisplayFinalValues)
                            }
                        />
                    </div>
                    {DisplayFinalValues ? (
                        <div>
                            <div className="text-xl font-bold p-5 mb-4 w-full bg-gray-700 text-white">
                                Tabela koristnosti
                            </div>
                            <div className="w-full flex justify-center">
                                <FinalValues
                                    parameters={RecursiveParameters}
                                    alternatives={alternatives}
                                    firstNode={firstNode}
                                />
                            </div>
                        </div>
                    ) : undefined}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
