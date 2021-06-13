import React, { FunctionComponent, useEffect, useState } from "react";
import { NodeObject } from "../Classes/NodeObject";
import { Parameter } from "../Classes/Parameter";
import { SymmetricTable } from "./SymmetricTable";
import uuid from "uuid";
import { Alternative } from "../Classes/Alternative";
// import { Cell } from "./Cell";

interface Props {
    node: NodeObject;
    parameters: Parameter[];
    setParameters: React.Dispatch<React.SetStateAction<Parameter[]>>;
    recursiveParamters: Parameter;
    setRecursiveParamters: React.Dispatch<React.SetStateAction<Parameter>>;
    alternatives: Alternative[];
}

export const EmptyDivSpacer: FunctionComponent = () => {
    return <div className="m-10"></div>;
};

export const ParamTables: FunctionComponent<Props> = ({
    node,
    parameters,
    setParameters,
    setRecursiveParamters,
    recursiveParamters: firstParam,
    alternatives,
}) => {
    const [items, setItems] = useState<Array<Array<string>>>([]);

    const getChlidren = (node: NodeObject): String[] => {
        let arr = [node.Value];
        if (node.Children) {
            node.Children.map((child: NodeObject) => {
                return arr.push(child.Value);
            });
        }
        return arr;
    };

    // const generateParameters = (arr: Array<String>) => {
    //     let params: Array<Parameter> = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         let newParam = new Parameter(arr[i][0].valueOf());
    //         for (let j = 1; j < arr[i].length; j++) {
    //             let innerNewParameter = new Parameter(arr[i][j]);
    //             newParam.children.push(innerNewParameter);
    //         }
    //         newParam.alternatives = alternatives;
    //         params.push(newParam);
    //     }

    //     setParameters(params);
    //     return params;
    // };

    // let first = true;
    // const generateParametersRecursevly = (
    //     node: NodeObject,
    //     param: Parameter = new Parameter()
    // ) => {
    //     if (first) {
    //         param.weight = 1;
    //         first = false;
    //     }
    //     param.name = node.Value.valueOf();
    //     param.alternatives = alternatives;

    //     let newParams: Parameter[] = [];
    //     if (node.Children) {
    //         node.Children.forEach((child) => {
    //             let newParam = new Parameter();
    //             generateParametersRecursevly(child, newParam);
    //             newParams.push(newParam);
    //         });
    //     }
    //     newParams.forEach((par) => {
    //         param.children.push(par);
    //     });
    //     return param;
    // };

    useEffect(() => {
        const getChildrenForEachChild = (
            node: NodeObject,
            arr: Array<any> = [],
            flag: Boolean = true
        ) => {
            if (node.Children && node.Children.length > 0) {
                if (flag) {
                    arr.push(getChlidren(node));
                    flag = false;
                }
                node.Children.forEach((child: NodeObject) => {
                    getChildrenForEachChild(child, arr, flag);
                    if (child.Children) arr.push(getChlidren(child));
                });
                flag = true;
            }
            return arr;
        };

        const generateParameters = (arr: Array<String>) => {
            let params: Array<Parameter> = [];
            for (let i = 0; i < arr.length; i++) {
                let newParam = new Parameter(arr[i][0].valueOf());
                for (let j = 1; j < arr[i].length; j++) {
                    let innerNewParameter = new Parameter(arr[i][j]);
                    newParam.children.push(innerNewParameter);
                }
                newParam.alternatives = alternatives;
                params.push(newParam);
            }
    
            setParameters(params);
            return params;
        };

        let first = true;
        const generateParametersRecursevly = (
            node: NodeObject,
            param: Parameter = new Parameter()
        ) => {
            if (first) {
                param.weight = 1;
                first = false;
            }
            param.name = node.Value.valueOf();
            param.alternatives = alternatives;

            let newParams: Parameter[] = [];
            if (node.Children) {
                node.Children.forEach((child) => {
                    let newParam = new Parameter();
                    generateParametersRecursevly(child, newParam);
                    newParams.push(newParam);
                });
            }
            newParams.forEach((par) => {
                param.children.push(par);
            });
            return param;
        };

        let temp = getChildrenForEachChild(node);
        generateParameters(temp);
        setRecursiveParamters(generateParametersRecursevly(node));
        setItems(temp);
    }, [node, setItems, setRecursiveParamters]);

    const drawSymmetricTables = (items: Array<Array<string>>) => {
        return items.map((el: Array<string>) => {
            let tempParam = parameters.find((param) => param.name === el[0]);
            return [
                <SymmetricTable
                    items={el}
                    parameter={tempParam}
                    key={uuid.v4()}
                    firstParam={firstParam}
                />,
                <EmptyDivSpacer />,
            ];
        });
    };

    return (
        <div className="w-full flex flex-col items-center">
            {drawSymmetricTables(items)}
        </div>
    );
};
