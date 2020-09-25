import React, { useState } from "react";
import styled from "styled-components";

const Circle = styled.circle`
  fill-opacity: .7;
  stroke-width: 1.5px;
  cursor: pointer;
  &:hover {
    filter: "url(#glow)"
  }
`;

function Datapoint({ x, y, setSeleted, threshold }) {

  const defaultState = { r: 10 };

  const [state, setState] = useState(defaultState);

  const highlight = () => {
    setState({ r: 30 });
    setSeleted({ x , y });
  };

  const unhighlight = () => {
    setState(defaultState);
    setSeleted(undefined);
  };

  return (
      <Circle
        cx={x}
        cy={y}
        r={state.r}
        fill={state.fill}
        onMouseOver={() => {
          highlight()
          setSeleted({
            x, 
            y
          })
        }}
        onMouseOut={unhighlight}
        fill={y > threshold ? '#FC2B43' : 'cornflowerblue'}
        stroke={'black'}
        filter={"url(#glow)"}
      />
  );
}

export default Datapoint;


// fill={`rgb(100, ${x - 200}, ${y - 125})`}
// fill={
//   x > threshold 
//     ? y > threshold 
//       ? 'blue' 
//       : 'green'
//     : y > threshold
//     ? 'red'
//     : 'orange'
// }