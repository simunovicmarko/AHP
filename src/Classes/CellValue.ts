import uuid from "uuid";
export class CellValue {
    constructor(value: number = 0, x: number, y: number = -1) {
        this.value = value;
        this.id = uuid.v4();
        this.x = x;
        this.y = y;
    }
    public id;
    public value;
    public x: number;
    public y: number;
}
