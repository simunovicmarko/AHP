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
import { JsxElement } from "typescript";
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
    // const [firstNode, setFirstNode] = useState(new NodeObject(""));
    const [firstNode, setFirstNode] = useState(() => {
        let lsItem = localStorage.getItem("firstNode");
        if (lsItem !== null) {
            let node = JSON.parse(lsItem);
            return node;
        } else return new NodeObject("");
    });
    const [alternatives, setAlernatves] = useState<Array<Alternative>>(() => {
        let lsItem = localStorage.getItem("alternatives");
        if (lsItem !== null) {
            let alt = JSON.parse(lsItem);
            return alt;
        } else return []
    });
    const [parameters, setParameters] = useState<Array<Parameter>>([]);
    const [RecursiveParameters, setRecursiveParameters] = useState<Parameter>(
        new Parameter()
    );
    const [DisplayFinalValues, setDisplayFinalValues] = useState(false);

    // let DisplayFinalValues = false;
    // const setDisplayFinalValues = (val: boolean) => {
    //     DisplayFinalValues = val;
    // };
    const [drawAlts, setDrawAlts] = useState<any[]>([]);
    const [drawParams, setDrawParams] = useState<any[]>([]);

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

    const returnParams = () => {
        return [
            <ParamTables
                node={firstNode}
                parameters={parameters}
                setParameters={setParameters}
                setRecursiveParamters={setRecursiveParameters}
                recursiveParamters={RecursiveParameters}
                alternatives={alternatives}
            />,
        ];
    };

    useEffect(() => {
        if (parameters.length > 0) {
            setDrawAlts(
                generateAltTablesRecursevly(alternatives, RecursiveParameters)
            );
        }
        setDrawParams(returnParams());
    }, [alternatives, parameters]);

    const drawFinal = (DisplayFinalValues: boolean) => {
        if (DisplayFinalValues) {
            setDrawFinalState([
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
                </div>,
            ]);
        }
        return [];
    };

    const [drawFinalState, setDrawFinalState] =
        useState<any[] | undefined>(undefined);

    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        localStorage.setItem("firstNode", JSON.stringify(firstNode));
        localStorage.setItem("alternatives", JSON.stringify(alternatives))
    });

    const [dis, setdis] = useState(false);

    // useEffect(() => {
    //     let lsItem = localStorage.getItem("firstNode");
    //     if (lsItem !== null) {
    //         let node = JSON.parse(lsItem);
    //         return node;
    //     } else return new NodeObject("");
    // }, []);

    // useEffect(() => {
    //     setdis(!dis);
    // }, [firstNode]);

    // const [drawTree, setDrawTree] = useState<any>(<Tree node={firstNode}/>);
    // const drawTreeFunction = (node:NodeObject) => {
    //     return <Tree node={node}/>
    // }

    return (
        <div className="Main flex flex-col items-center w-full">
            {/* <div className="flex justify-end w-full pr-10 mt-5">
                <Button text="Počisti drevo" onClick={()=>{setFirstNode(new NodeObject(""))}} />
            </div> */}
            {dis ? <Tree node={firstNode} /> : <Tree node={firstNode} />}
            <div className="flex justify-end w-full pr-10">
                <Button text="Osveži tabele" onClick={generateTable} />
            </div>
            <AlternativesComponent
                alternatives={alternatives}
                setAlernatves={setAlernatves}
                parameter={RecursiveParameters}
            />
            {table ? (
                <div>
                    <div className="text-xl font-bold p-5 mb-4 w-full bg-gray-700 text-white">
                        Parametri
                    </div>
                    {drawParams}
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
                            <div className="flex justify-center">
                                <FinalValues
                                    parameters={RecursiveParameters}
                                    firstNode={firstNode}
                                    alternatives={alternatives}
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
