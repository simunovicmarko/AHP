// import { classnames } from "@material-ui/data-grid";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { CellValue } from "../Classes/CellValue";

interface Props {
    value?: any;
    className?: string;
    x?: number;
    y?: number;
    cellValueProp?: CellValue;
    cells: Array<CellValue>;
    setCells: React.Dispatch<React.SetStateAction<CellValue[]>>;
}

export const EditableCell: FunctionComponent<Props> = ({
    value,
    className,
    cellValueProp,
    cells,
    setCells,
    x,
    y,
}) => {
    const [cellValue, setcellValue] = useState(
        cellValueProp ? cellValueProp.value : 0
    );
    const [localCells, setlocalCells] = useState<Array<CellValue>>(cells);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setcellValue(Number(e.target.value));
        increseXIfNeccessary(cells);
        if (cellValueProp) cellValueProp.value = Number(e.target.value);
        let temp = cells.filter((el: CellValue) => {
            return el.x === y && el.y === x;
        });
        let first = temp[0];
        first.value = Math.pow(Number(e.target.value), -1);

        temp = cells.map((el: CellValue) => {
            if (el.id === first.id) return first;
            if (el.id === cellValueProp?.id) el.value = Number(e.target.value);
            return el;
        });

        setlocalCells(temp);
    };

    const commitChange = () => {
        setCells(localCells);
    };

    return (
        <input
            value={String(cellValue)}
            className={
                "border border-black p-2 w-24 h-10 flex justify-center items-center cell text-center" +
                className
            }
            onBlur={commitChange}
            type="number"
            step="0.1"
            // defaultValue="0"
            min="0"
            onChange={handleChange}
        />
    );
};
function increseXIfNeccessary(cells: CellValue[]) {
    let t = cells;
    if (t[0].x === 0) {
        for (let i = 0; i < t.length; i++) {
            t[i].x = t[i].x + 1;
        }
    }
}
