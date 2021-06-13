import React, { FunctionComponent } from "react";
import { Alternative } from "../Classes/Alternative";
import { Parameter } from "../Classes/Parameter";
import { EmptyDivSpacer } from "./ParamTables";
import { SymmetricTable } from "./SymmetricTable";

interface Props {
    alts: Array<Alternative>;
    parameter: Parameter;
    firstParam: Parameter;
}

export const AltTables: FunctionComponent<Props> = ({ alts, parameter, firstParam }) => {
    const makeTables = (alts: Array<Alternative>, parameter: Parameter) => {
        // let arr: any[] = [];

        const getItems = () => {
            let arr = [parameter.name];
            alts.forEach((element) => {
                if (element.name) arr.push(element.name.valueOf());
            });
            return arr;
        };
        let temps = getItems();

        // console.log(parameter)
        return (
            <div className="flex flex-col items-center">
                {/* {temps.map((element) => {
                    return [
                        <SymmetricTable items={temps} />,
                        <EmptyDivSpacer />,
                    ];
                })} */}
                <SymmetricTable items={temps} firstParamForAlts={firstParam}/> 
                <EmptyDivSpacer />
            </div>
        );
    };
    
    return <div>{makeTables(alts, parameter)}</div>;
};
