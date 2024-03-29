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
import uuid from 'uuid'
// import { AlternativeTable } from "./AlternativeTable";

interface Props {}

export const Main: FunctionComponent<Props> = () => {
    //For testing
    // let testNode = new NodeObject("1");
    // testNode.Children = [
    //     new NodeObject("2", [new NodeObject("21"), new NodeObject("22")]),
    //     new NodeObject("3", [
    //         new NodeObject("31"),
    //         new NodeObject("32"),
    //         new NodeObject("33"),
    //         new NodeObject("34", [
    //             new NodeObject("341"),
    //             new NodeObject("342"),
    //         ]),
    //     ]),
    //     // new NodeObject("neki3"),
    // ];

    // let testNodeCars = new NodeObject("Ocena avtomobila");
    // testNodeCars.Children = [
    //     new NodeObject("Cena"),
    //     new NodeObject("Zmogljivost", [
    //         new NodeObject("0 - 100 km/h"),
    //         new NodeObject("Končna hitrost"),
    //         new NodeObject("Navor"),
    //     ]),
    //     new NodeObject("Motor", [
    //         new NodeObject("Velikost"),
    //         new NodeObject("Poraba"),
    //         new NodeObject("Moč"),
    //     ]),
    //     new NodeObject("Prostornost", [
    //         new NodeObject("Prostornina"),
    //         new NodeObject("Velikost prtljažnika"),
    //     ]),
    //     new NodeObject("Oprema", [
    //         new NodeObject("Varnostni sistemi"),
    //         new NodeObject("Luksuzna oprema"),
    //     ]),
    // ];

    // let testAlts: Array<Alternative> = [
    //     new Alternative("Prva"),
    //     new Alternative("druga"),
    //     new Alternative("tretja"),
    //     new Alternative("četrta"),
    // ];
    // let testAltsCars: Array<Alternative> = [
    //     new Alternative("Mercedes"),
    //     new Alternative("Tushek"),
    //     new Alternative("Ferrari"),
    //     new Alternative("Pagani"),
    //     new Alternative("Rimac"),
    // ];

    const chekForNodeOrSetItToNewOne = () => {
        let lsItem = localStorage.getItem("firstNode");
        if (lsItem !== null) {
            let node = JSON.parse(lsItem);
            return node;
        } else return new NodeObject("");
    };
    const chekForAltOrSetItToNewOne = () => {
        let lsItem = localStorage.getItem("alternatives");
        if (lsItem !== null) {
            let alt = JSON.parse(lsItem);
            return alt;
        } else return [];
    };

    const [table, setTable] = useState<boolean>(false);
    const [firstNode, setFirstNode] = useState(chekForNodeOrSetItToNewOne());
    const [alternatives, setAlernatves] = useState<Array<Alternative>>(
        chekForAltOrSetItToNewOne()
    );
    const [parameters, setParameters] = useState<Array<Parameter>>([]);
    const [RecursiveParameters, setRecursiveParameters] = useState<Parameter>(
        new Parameter()
    );
    const [DisplayFinalValues, setDisplayFinalValues] = useState(false);

    const [redrawTree, setRedrawTree] = useState(false)
    const [showTree, setshowTree] = useState(<Tree node={firstNode} redraw={redrawTree} setRedraw={setRedrawTree}/>)


    const [drawAlts, setDrawAlts] = useState<any[]>([]);
    const [drawParams, setDrawParams] = useState<any[]>([]);


    useEffect(() => {
        setshowTree(<Tree node={firstNode} key={uuid.v4()} redraw={redrawTree} setRedraw={setRedrawTree}/>)
    }, [redrawTree])

    // const [firstNode] = useState(testNodeCars);
    // const [alternatives, setAlernatves] =
    //     useState<Array<Alternative>>(testAltsCars);

    const generateTable = () => {
        if (table) setDisplayFinalValues(false);
        if (
            firstNode.Value.length > 0 &&
            firstNode.Children &&
            firstNode.Children.length > 0
        ) {
            setTable(!table);
        } else setTable(false);
    };

    // const generateAltTables = (
    //     alts: Alternative[],
    //     parameters: Parameter[],
    //     arr: any[] = []
    // ) => {
    //     parameters.forEach((parameter) => {
    //         let tempParam = usedAltParameters.find(
    //             (par) => par.name === parameter.name
    //         );
    //         usedAltParameters.push(parameter);
    //         if (tempParam === undefined)
    //             arr.push(
    //                 <AltTables
    //                     alts={alts}
    //                     parameter={parameter}
    //                     firstParam={RecursiveParameters}
    //                 />
    //             );
    //         parameter.children.forEach(() => {
    //             generateAltTables(alts, parameter.children, arr);
    //         });
    //     });

    //     return arr;
    // };
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

        if (parameters.length > 0) {
            setDrawAlts(
                generateAltTablesRecursevly(alternatives, RecursiveParameters)
            );
        }
        setDrawParams(returnParams());
    }, [alternatives, parameters]);

    // const drawFinal = (DisplayFinalValues: boolean) => {
    //     if (DisplayFinalValues) {
    //         setDrawFinalState([
    //             <div>
    //                 <div className="text-xl font-bold p-5 mb-4 w-full bg-gray-700 text-white">
    //                     Tabela koristnosti
    //                 </div>
    //                 <div className="w-full flex justify-center">
    //                     <FinalValues
    //                         parameters={RecursiveParameters}
    //                         alternatives={alternatives}
    //                         firstNode={firstNode}
    //                     />
    //                 </div>
    //             </div>,
    //         ]);
    //     }
    //     return [];
    // };

    let reset = false;
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        if (!reset)
            localStorage.setItem("firstNode", JSON.stringify(firstNode));
        else
            localStorage.setItem(
                "firstNode",
                JSON.stringify(new NodeObject(""))
            );
        localStorage.setItem("alternatives", JSON.stringify(alternatives));
    });

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

    const removeAndReload = () => {
        setFirstNode(new NodeObject(""));
        reset = true;
        window.location.reload();
    };

    return (
        <div className="Main flex flex-col items-center w-full">
            {showTree}
            <div className="flex justify-end w-full pr-10">
                <Button
                    text="Počisti drevo"
                    onClick={() => {
                        removeAndReload();
                    }}
                />
                <div className="ml-4">
                    <Button text="Osveži tabele" onClick={generateTable} />
                </div>
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
                            <div className="flex justify-center w-full">
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
