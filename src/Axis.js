import React, { useMemo } from "react";
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

      default: {
        return {
          x: scale.range()[1] / 2,
          y: 55,
        }
      }
    }
  }

  const labelProps = useMemo(() => labelPos(type, scale), [type, scale])

  return (
    <g 
      color='white' 
      ref={gRef} 
      transform={`translate(${x}, ${y})`}
    >
      <Text {...labelProps}>{label}</Text>
    </g>
  );
}

export default Axis;
