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

function Datapoint({ x, y, setSeleted }) {

  const defaultState = { r: 20 };

  const [state, setState] = useState(defaultState);

  const highlight = () => {
    setState({ r: 30 });
    setSeleted(`X: ${Math.round(x)}, Y: ${Math.round(y)}`);
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
      onMouseOver={highlight}
      onMouseOut={unhighlight}
      fill={`rgb(100, ${x - 200}, ${y - 125})`}
      stroke={'black'}
      filter={"url(#glow)"}
    />
  );
}

export default Datapoint;
