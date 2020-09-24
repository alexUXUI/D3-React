import React, { useEffect, useState } from "react";
import * as d3 from "d3";

import Axis from "./Axis";
import Datapoint from "./DataPoint";

function Scatterplot({
    x,
    y,
    data,
    height,
    width,
    setSeleted
}) {

    const [state, setState] = useState({
        xScale: d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, width]),
        yScale: d3
            .scaleLinear()
            .domain([0, 1])
            .range([height, 0])
    });

    useEffect(() => {
        const { yScale, xScale } = state;

        yScale.range([height, 0]);
        xScale.range([0, width]);

        setState({
            ...state,
            yScale,
            xScale
        });

    }, [height, width]);

    const { yScale, xScale } = state;

    return (
        <g transform={`translate(${x}, ${y})`}>
            {data.map(([x, y]) => {
                return (
                    <Datapoint
                        x={xScale(x)}
                        y={yScale(y)}
                        setSeleted={setSeleted}
                    />
                )
            })}
            <Axis
                x={0}
                y={0}
                scale={yScale}
                type="Left"
                height={height}
                label="Y Axis"
            />
            <Axis
                x={0}
                y={height}
                scale={xScale}
                type="Bottom"
                height={height}
                label="X Axis"
            />
        </g>
    );
}

export default Scatterplot;
