import React from "react";
import { useD3 } from "d3blackbox";
import * as d3 from "d3";
import styled from "styled-components";

const Text = styled.text`
    fill: white;
    font-family: sans-serif;
    font-size: 20px;
    color: white;
`;

function Axis({ 
  type, 
  x, 
  y, 
  scale, 
  label, 
  height, 
}) {

  const gRef = useD3(anchor => {
    const scale = d3
      .scaleLinear()
      .domain([0, 1])
      .range(type === "Bottom" 
        ? [0, height] 
        : [height, 0]
      );

    d3.select(anchor).call(d3[`axis${type}`](scale));
  });
  
  function labelPos(type, scale) {

    switch (type) {
      case "Bottom":
        return { 
          x: scale.range()[1] / 2,
          y: 55,
        };
      case "Left":
        return { 
          x: -55, 
          y: scale.range()[0] / 2 + 5
      };
    }
  }

  return (
    <g 
      color='white' 
      ref={gRef} 
      transform={`translate(${x}, ${y})`}
    >
      <Text {...labelPos(type, scale)}>{label}</Text>
    </g>
  );
}

export default Axis;
