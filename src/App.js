import React, { useMemo, useState } from "react";
import * as d3 from "d3";
import Scatterplot from "./Scatterplot";
import "./App.css";

function App() {
  const randomData = useMemo(() => d3.range(100).map(_ => [Math.random(), Math.random()]), []);

  const [state] = useState({
    width: 700,
    height: 700,
    data: randomData
  });

  const { width, height, data } = state;
  const [selected, setSeleted] = useState(undefined);

  return (
    <div className="App">
      <div>
        <h1>D3 + React Scatterplot</h1>
        <svg
          width={900}
          height={830}
        >
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="grad1" x1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#262626', stopOpacity: '0' }} />
            <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: '1' }} />
          </linearGradient>

          <rect height={700} width={700} y={50} x={140} fill="url(#grad1)" />

          <Scatterplot
            x={140}
            y={50}
            width={width}
            height={height}
            data={data}
            setSeleted={setSeleted}
          />
        </svg>
      </div>
      <div class="legend">
        <h1>Legend</h1>
        <hr />
        <h3>Currently selected:</h3>
        <p>
          {selected || "none"}
        </p>
      </div>
    </div>
  );
}

export default App;

