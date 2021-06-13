import React, { FunctionComponent, useEffect, useState } from "react";
import { Cell } from "./Cell";
import { EditableCell } from "./EditableCell";
import { CellValue } from "../Classes/CellValue";
import uuid from "uuid";
import { Parameter } from "../Classes/Parameter";
import { Alternative } from "../Classes/Alternative";

interface Props {
    items: Array<string>;
    parameter?: Parameter;
    firstParam?: Parameter;
    firstParamForAlts?: Parameter;
    // parameters?: Array<Parameter>;
    // setParameters?: React.Dispatch<React.SetStateAction<Parameter[]>>;
}

export const SymmetricTable: FunctionComponent<Props> = ({
    items,
    parameter,
    firstParam,
    firstParamForAlts,
    // parameters,
    // setParameters,
}) => {
    const [cells, setCells] = useState<Array<CellValue>>([]);
    const [sums, setSums] = useState<Array<CellValue>>([]);

    let cellDevidedBySum: Array<CellValue> = [];
    const setCellDevidedBySum = (arr: Array<CellValue>) => {
        cellDevidedBySum = arr;
    };

    const drawRows = (items: Array<string>) => {
        let arr: any[] = [];
        let first = true;
        items.map((el: string) => {
            return first
                ? (arr.push(<Cell value={el} className="text-lg font-bold" />),
                  (first = false))
                : arr.push(
                      <div className="flex">
                          <Cell
                              value={el}
                              className="bg-gray-300"
                              key={uuid.v4()}
                          />
                      </div>
                  );
        });
        arr.push(<Cell value="VSOTA" className="font-bold" />);
        return arr;
    };

    const drawColumns = (items: Array<string>) => {
        let arr: any[] = [];
        for (let i = 1; i < items.length; i++) {
            arr.push(
                <Cell
                    value={items[i]}
                    className="bg-gray-300"
                    key={uuid.v4()}
                />
            );
        }
        for (let i = 1; i < items.length; i++) {
            arr.push(
                <Cell
                    value={items[i]}
                    className="bg-gray-500 text-white"
                    key={uuid.v4()}
                />
            );
        }
        arr.push(
            <Cell
                value={parameter ? "Utež" : "Koristnost"}
                className="bg-gray-400 text-gray-100 font-bold"
                key={uuid.v4()}
            />
        );
        return arr;
    };

    // let staticSums: Array<CellValue> = [];
    const drawSums = (cells: Array<CellValue>) => {
        let sum = 0;

        let arr: Array<any> = [];
        let sumArr: Array<CellValue> = [];
        for (let x = 1; x <= Math.sqrt(cells.length); x++) {
            sum = 0;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].x === x) {
                    sum += cells[i].value;
                }
            }

            sumArr.push(new CellValue(sum, x));
            arr.push(
                <Cell
                    value={sum}
                    x={x}
                    key={uuid.v4()}
                    className="bg-gray-200"
                />
            );
        }
        // setSums(sumArr);
        return <div className="flex">{arr}</div>;
    };

    const drawMatrix = (items: string[], cells: Array<CellValue>) => {
        const mapCells = (x: number, y: number) => {
            return cells.map((cell: CellValue) => {
                return cell.y === y ? (
                    (x++,
                    cell.x > y ? (
                        <EditableCell
                            cellValueProp={cell}
                            setCells={setCells}
                            cells={cells}
                            x={x}
                            y={y}
                            key={uuid.v4()}
                        />
                    ) : (
                        <Cell
                            cellValueProp={cell}
                            x={x}
                            y={y}
                            key={uuid.v4()}
                        />
                    ))
                ) : (
                    <></>
                );
            });
        };

        // const mapItems = (
        //     x: number,
        //     y: number,
        //     first: boolean,
        //     tableCells: Array<CellValue>
        // ) => {
        //     let f = true;
        //     return items.map((el: string) => {
        //         let newCell = new CellValue(0, x, y);
        //         return first
        //             ? ((<></>), (first = false))
        //             : (f ? (f = false) : x++,
        //               (newCell = new CellValue(0, x, y)),
        //               tableCells.push(newCell),
        //               newCell.x > y ? (
        //                   <EditableCell
        //                       cells={cells}
        //                       setCells={setCells}
        //                       x={x}
        //                       y={y}
        //                       cellValueProp={newCell}
        //                       key={uuid.v4()}
        //                   />
        //               ) : x === y ? (
        //                   ((newCell.value = 1),
        //                   (
        //                       <Cell
        //                           x={x}
        //                           y={y}
        //                           key={uuid.v4()}
        //                           cellValueProp={newCell}
        //                       />
        //                   ))
        //               ) : (
        //                   <Cell
        //                       key={uuid.v4()}
        //                       x={x}
        //                       y={y}
        //                       cellValueProp={newCell}
        //                   />
        //               ));
        //     });
        // };

        //Main
        let arr: any[] = [];
        let x: number;
        for (let y = 1; y <= Math.sqrt(cells.length); y++) {
            x = 0;
            arr.push(
                <div className="flex" key={uuid.v4()}>
                    {mapCells(x, y)}
                </div>
            );
        }
        return arr;

        // if (cells.find((ce) => ce.value > 0 && ce.x !== ce.y)) {
        //     let arr: any[] = [];
        //     let x: number;
        //     for (let y = 1; y <= Math.sqrt(cells.length); y++) {
        //         x = 0;
        //         arr.push(
        //             <div className="flex" key={uuid.v4()}>
        //                 {mapCells(x, y)}
        //             </div>
        //         );
        //     }
        //     return arr;
        // } else {
        //     let arr: any[] = [];
        //     let x: number, y: number;
        //     for (let i = 1; i < items.length; i++) {
        //         let first = true;
        //         y = i;
        //         x = 1;
        //         let tableCells: Array<CellValue> = cells;
        //         arr.push(
        //             <div className="flex">
        //                 {mapItems(x, y, first, tableCells)}
        //             </div>
        //         );
        //     }
        //     return arr;
        // }
    };

    const drawRightMatrix = (
        cells: Array<CellValue>,
        sums: Array<CellValue>
    ) => {
        let arr: Array<any> = [];
        let tempArr: CellValue[] = [];

        const drawForGivenY = (cellsForGivenY: CellValue[], y: number) => {
            return cellsForGivenY.map((cell) => {
                let sum = sums.find((sumI: CellValue) => sumI.x === cell.x);
                if (sum) {
                    // console.log(cell, sum,cell.value/sum.value);
                    tempArr.push(
                        new CellValue(cell.value / sum.value, sum.x, y)
                    );
                    return (
                        <Cell
                            value={sum.value > 0 ? cell.value / sum.value : 0}
                            y={y}
                            className="bg-gray-300"
                        />
                    );
                }
                return <></>;
            });
        };

        for (let y = 1; y <= cells.length; y++) {
            let cellsForGivenY = cells.filter((cell) => cell.y === y);
            arr.push(
                <div className="flex">{drawForGivenY(cellsForGivenY, y)}</div>
            );
        }
        setCellDevidedBySum(tempArr);
        return <div>{arr}</div>;
    };

    const drawWeights = (cells: Array<CellValue>) => {
        let arr: any[] = [];
        let paramLocal = parameter;

        const getYcells = (cells: CellValue[], y: number) => {
            return cells.filter((cell) => cell.y === y);
        };

        let sum = 0;
        for (let y = 1; y <= Math.sqrt(cells.length); y++) {
            sum = 0;
            let yCells = getYcells(cells, y);
            for (let x = 0; x < yCells.length; x++) {
                sum += yCells[x].value;
            }
            if (paramLocal)
                paramLocal.children[y - 1].weight = sum / yCells.length;

            if (firstParamForAlts) {
                searchForParamAndSetAlternatives(
                    firstParamForAlts,
                    items[0],
                    items[y],
                    sum / yCells.length
                );
            }

            let neki;
            if (firstParam) {
                if (paramLocal) {
                    neki = searchForRecursiveParam(
                        firstParam,
                        paramLocal.children[y - 1].name,
                        sum / yCells.length
                    );
                }
            }

            arr.push(
                <Cell
                    value={sum / yCells.length}
                    className="bg-gray-500 text-white"
                />
            );
        }
        return <div>{arr}</div>;
    };

    const searchForRecursiveParam = (
        param: Parameter,
        name: string,
        weight: number
    ) => {
        if (param.name === name) param.weight = weight;
        else {
            param.children.forEach((child) => {
                searchForRecursiveParam(child, name, weight);
            });
        }
    };

    const searchForParamAndSetAlternatives = (
        parameter: Parameter,
        name: string,
        altName: string,
        weight: number
    ) => {
        if (parameter.name === name) {
            parameter.alternatives = copyAlternativesArray(parameter.alternatives);
            // let loaclAlts = copyArray(parameter.alternatives);
            // console.log(loaclAlts);
            searchForAltAndSetWeight(parameter.alternatives, altName, weight);
        } else {
            parameter.children.forEach((param) => {
                searchForParamAndSetAlternatives(param, name, altName, weight);
            });
        }
    };

    const copyArray = <T extends unknown>(arr: Array<T>) => {
        let newArr: Array<T> = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i]);
        }
        return newArr;
    };

    const copyAlternativesArray = (arr: Array<Alternative>) => {
        let newArr: Array<Alternative> = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push(copyAlternative(arr[i]));
        }
        return newArr;
    }

    const copyAlternative = (alt: Alternative) => {
        let newAlt = new Alternative;
        newAlt.id = alt.id;
        newAlt.name = alt.name;
        newAlt.weight = alt.weight;
        return newAlt;
    }

    const searchForAltAndSetWeight = (
        alts: Alternative[],
        name: string,
        weight: number
    ) => {
        for (let i = 0; i < alts.length; i++) {
            if (alts[i].name === name) {
                alts[i].weight = weight;
            }
        }
    };

    const drawTable = (
        items: Array<string>,
        cells: Array<CellValue>,
        sums: Array<CellValue>
    ) => {
        let arr: any[] = [];

        if (cells.length > 0) {
            arr.push(<div>{drawRows(items)}</div>);
            arr.push(
                <div>
                    <div className="flex">{drawColumns(items)}</div>
                    <div className="flex">
                        <div>
                            {drawMatrix(items, cells)}
                            {drawSums(cells)}
                        </div>
                        {drawRightMatrix(cells, sums)}
                        {cellDevidedBySum.length >= Math.sqrt(cells.length) ? (
                            drawWeights(cellDevidedBySum)
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            );
        }
        return <div className="flex">{arr}</div>;
    };

    useEffect(() => {
        const mapFirstItems = (
            x: number,
            y: number,
            first: boolean,
            tableCells: Array<CellValue>
        ) => {
            let f = true;
            return items.map((el: string) => {
                let newCell = new CellValue(0, x, y);
                return first
                    ? (first = false)
                    : (f ? (f = false) : x++,
                      (newCell = new CellValue(x === y ? 1 : 0, x, y)),
                      tableCells.push(newCell),
                      localCells.push(newCell));
            });
        };

        const setSumsOnStart = (cells: Array<CellValue>) => {
            let sumArr: Array<CellValue> = sums;
            for (let x = 1; x <= Math.sqrt(cells.length); x++) {
                let sum = 0;
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].x === x) {
                        sum += cells[i].value;
                    }
                }

                sumArr.push(new CellValue(sum, x));
            }
            setSums(sumArr);
        };

        let localCells: Array<CellValue> = [];

        const setCellsInStart = () => {
            let x, y;
            // let tableCells = cells;
            for (let i = 1; i < items.length; i++) {
                let first = true;
                y = i;
                x = 1;
                let tableCells: Array<CellValue> = cells;
                mapFirstItems(x, y, first, tableCells);
            }
        };
        setCellsInStart();
        setSumsOnStart(localCells);
    }, []);

    const [draw, setDraw] = useState<any>(undefined);

    useEffect(() => {
        const setSumsOnCellChange = (cells: Array<CellValue>) => {
            let sumArr: Array<CellValue> = [];
            for (let x = 1; x <= Math.sqrt(cells.length); x++) {
                let sum = 0;
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].x === x) {
                        sum += cells[i].value;
                    }
                }

                sumArr.push(new CellValue(sum, x));
            }
            setSums(sumArr);
        };
        setSumsOnCellChange(cells);
    }, [cells]);

    useEffect(() => {
        setDraw(drawTable(items, cells, sums));
    }, [cells, items, sums]);

    return <div className="w-4/5 flex flex-col items-center">{draw}</div>;
};
