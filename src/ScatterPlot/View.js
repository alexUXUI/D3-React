import React, { useMemo, useState, createContext, useEffect } from "react";
import * as d3 from "d3";
import Scatterplot from "./Scatterplot";
import { Legend } from "./Legend";
import "./ScatterPlot.css";

const SVG_HEIGHT = 830;
const SVG_WIDTH = 900;
const CHART_HEIGHT = 700;
const CHART_WIDTH = 700;
const CHART_X_POS = 140;
const CHART_Y_POS = 50;
const NUM_DATA_POITS = 5;

const standardDeviationFromData = (data, meanFromData) => {
    return Math.sqrt(data.reduce((acc, [x, y]) => {
        let meanDeltaSquared = Math.pow(y - meanFromData, 2);
        return acc += meanDeltaSquared;
    }, 0) / data.length);
}

const meanFromData = (data) => {
    return data.reduce((acc, [x, y]) => {
        return acc += y
    }, 0) / data.length;
}

function ScatterPlotView() {

    const randomData = useMemo(() =>
        d3.range(NUM_DATA_POITS).map(_ =>
            [Math.random(), Math.random()]
        ), []);

    const [state] = useState({
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
        data: randomData
    });

    const { width, height, data } = state;

    const [mean, setMean] = useState(0);
    const [standardDeviation, setStandardDeviation] = useState(0);
    const [threshold, setThreshold] = useState();

    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, 1])
            .range([height, 0]);
    }, [height])

    useEffect(() => {
        if (data && data.length) {
            let newMean = meanFromData(data);
            setMean(newMean);

            let newThreshold = yScale(newMean);
            setThreshold(newThreshold)

            let newStandardDeviation = standardDeviationFromData(data, newMean)
            setStandardDeviation(newStandardDeviation)
        }
    }, [data]);

    const [selected, setSeleted] = useState({ x: 0, y: 0 });

    return (
        <div className="scatter-plot">
            <div>
                <svg
                    width={SVG_WIDTH}
                    height={SVG_HEIGHT}
                >
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1.5" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <pattern
                            id="pattern"
                            width="16px"
                            height="5px"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                        >
                            <line stroke="#171717" stroke-width="13px" y2="13" />
                        </pattern>
                    </defs>
                    <rect
                        width={width}
                        height={height}
                        y={CHART_Y_POS}
                        x={CHART_X_POS}
                        fill="url(#grad1)"
                    />
                    <Scatterplot
                        x={CHART_X_POS}
                        y={CHART_Y_POS}
                        width={width}
                        height={height}
                        data={data}
                        setSeleted={setSeleted}
                        threshold={threshold}
                        mean={mean}
                        standardDeviation={standardDeviation}
                    />
                </svg>
            </div>
            <Legend
                setThreshold={setThreshold}
                selected={selected}
                mean={mean}
                standardDeviation={standardDeviation}
                threshold={threshold}
            />
        </div>
    );
}

export default ScatterPlotView;

