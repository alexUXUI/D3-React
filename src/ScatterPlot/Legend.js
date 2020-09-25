import React from 'react';
import * as d3 from 'd3'

export function Legend({
    setThreshold,
    mean,
    standardDeviation,
    threshold,
    selected
}) {
    const rangeToDomain = d3
        .scaleLinear()
        .domain([0, 700])
        .range([0, 1]);

    const domainToRange = d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, 700]);

    return (
        <div className="legend">
            <h1>Legend</h1>
            <hr />
            <div className="legend-item">
                <div className="item-key">
                    <h4><div className="mean symbol" /> Mean</h4>
                </div>
                <div className="item-value">
                    <p>{mean.toFixed(3)}</p>
                </div>
            </div>

            <div className="legend-item">
                <div className="item-key">
                    <h4><StandardDeviationLegend />Standard Deviation</h4>
                </div>
                <div className="item-value">
                    <p>{standardDeviation.toFixed(3)}</p>
                </div>
            </div>

            <div className="legend-item">
                <div className="item-key">
                    <h4><div className="above symbol" />Above Threshold</h4>
                </div>
            </div>

            <div className="legend-item">
                <div className="item-key">
                    <h4><div className="below symbol" />Below Threshold</h4>
                </div>
            </div>

            <br />

            <h2>Controls</h2>
            <hr />

            <div className="legend-interactive">
                <h3>Currently selected</h3>
                <p>
                    X: {
                        selected
                            ? rangeToDomain(selected.x).toFixed(3)
                            : 'none'
                    }
                    <br />
                                        Y: {
                        selected
                            ? rangeToDomain(selected.y).toFixed(3)
                            : 'none'
                    }
                </p>
            </div>

            <div className="legend-interactive">
                <h3>Set Y Threshold</h3>
                <input
                    type="number"
                    placeholder={rangeToDomain(threshold) && rangeToDomain(threshold).toFixed(3) || 'loading...'}
                    onChange={(e) => setThreshold(domainToRange(e.target.value))}
                />
            </div>
            <div className="legend-interactive">
                <h3>Randomize Data</h3>
                <button>Random Data</button>
            </div>
        </div>
    )
}

const StandardDeviationLegend = () => {
    return (
        <div className="symbol">
            <svg height={40} width={40}>
                <pattern
                    id="pattern"
                    width="6px"
                    height="5px"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                >
                    <line stroke="#171717" stroke-width="13px" y2="13" />
                </pattern>
                <rect
                    height={40}
                    width={40}
                    fill="url(#pattern)"
                />
            </svg>
        </div>
    )
}