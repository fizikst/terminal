import React from "react";
import useTimer from "./hooks/use-timer";

export default function Timer({ state, count, setInc }) {
  useTimer(state, count, setInc);

  return <div />;
}
