import React from "react";
import Abacus from "../Abacus";

function RenderCard(props) {
  const { args, inc, abacusState } = props;
  // console.log("RenderForsage", props);

  return (
    <div>
      <p>{inc}</p>
      <p>{args[inc]}</p>
      <Abacus abacus={abacusState} handleChange={() => console.log("click")} />
    </div>
  );
}

export default RenderCard;
