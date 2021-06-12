// import { classnames } from "@material-ui/data-grid";
import React, { FunctionComponent, useState } from "react";
import { CellValue } from "../Classes/CellValue";

interface Props {
    value?: any;
    className?: string;
    x?: number;
    y?: number;
    cellValueProp?: CellValue;
}

export const LeftCell: FunctionComponent<Props> = ({
    value,
    className,
}) => {
    // const [cellValue] = useState<any | undefined>(cellValueProp?.value);
    const [CellValue, setCellValue] = useState(value)

    return (
        <div
            className={
                "border border-black p-2 w-24 h-10 cell overflow-hidden " +
                className
            }>
            {/* {console.log(value, value.length)} */}
            {CellValue}
        </div>
    );
};
