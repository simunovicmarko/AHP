// import { classnames } from "@material-ui/data-grid";
import React, { FunctionComponent } from "react";
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
    cellValueProp,
}) => {
    // const [cellValue] = useState<any | undefined>(cellValueProp?.value);

    return (
        <div
            className={
                "border border-black p-2 w-24 h-10 cell overflow-hidden " +
                className
            }>
            {cellValueProp ? Math.round(cellValueProp.value * 100) / 100 : Number(value)?Math.round(value * 100) / 100:value}
        </div>
    );
};
