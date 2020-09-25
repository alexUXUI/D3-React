import React, { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";

import Axis from "../Axis";
import Datapoint from "./DataPoint";

function Scatterplot({
    x,
    y,
    data,
    height,
    width,
    setSeleted,
    threshold,
    selected,
    mean,
    standardDeviation
}) {

    const xScaleMemo = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, width])
    }, [width])

    const yScaleMemo = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, 1])
            .range([height, 0])
    }, [height])

    const [state] = useState({
        xScale: xScaleMemo,
        yScale: yScaleMemo
    });

    const { yScale, xScale } = state;

    const verticalScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, height]);

    const dataPoints = useMemo(() => {
        return (
            <>
                {data.map(([x, y], index) => {
                    return (
                        <Datapoint
                            key={index}
                            x={xScale(x)}
                            y={yScale(y)}
                            setSeleted={setSeleted}
                            threshold={threshold}
                            selected={selected}
                        />
                    )
                })}
            </>
        )
    }, [threshold, data, setSeleted, xScale, yScale]);

    let standardDeviationOffsetTop =  yScale(mean) - verticalScale(standardDeviation)
    let standardDeviationHeight = xScale(standardDeviation * 2);
    let meanOffsetTop = yScale(mean);

    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect
                height={standardDeviationHeight}
                width={700}
                y={standardDeviationOffsetTop}
                x={0}
                fill="url(#pattern)"
            />
            <rect
                height={2}
                width={700}
                y={meanOffsetTop}
                x={0}
                fill="#1BE09A"
            />
            {dataPoints}
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
