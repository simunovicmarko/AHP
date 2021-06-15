import React, { FunctionComponent } from "react";
// import BarChart from 'recharts.recharts.bar-chart';
// import Bar from 'recharts.recharts.bar';
// import XAxis from 'recharts.recharts.x-axis';
// import YAxis from 'recharts.recharts.y-axis';
// import CartesianGrid from 'recharts.recharts.cartesian-grid';
// import Tooltip from 'recharts.recharts.tooltip';
// import Legend from 'recharts.recharts.legend';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Alternative } from "../Classes/Alternative";
interface Props {
    alternatives: Alternative[];
}

class Series {
    constructor(name: string, data: number[] = []) {
        this.name = name;
        this.data = data;
    }
    public name: string;
    public data: number[];
}

export const FinalChart: FunctionComponent<Props> = ({ alternatives }) => {
    const generateSeries = (alternatives: Alternative[]) => {
        let series: any[] = [];

        alternatives.forEach((el) => {
            series.push({ name: el.name, Koristnost: el.weight });
        });
        return series;
    };

    const series = [
        {
            name: "John",
            data: [1, 2],
        },
        {
            name: "Jane",
            data: [5],
        },
        {
            name: "James",
            data: [13],
        },
    ];
    return (
        <div className="">
            {/* <div className="text-xl font-bold p-5 mb-4 w-full bg-gray-700 text-white">
                Graf
            </div> */}
            <div className="m-5 w-4/5 flex justify-center">
                <div style={{ fontFamily: "sans-serif", fontSize: "0.8em" }}>
                    <BarChart
                        width={800}
                        height={300}
                        data={generateSeries(alternatives)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Koristnost" fill="#374151" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};
