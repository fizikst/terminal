import React from 'react';
import useTerminal from '../states/useTerminal';

function RenderControls() {
  // console.log({ state });
  const {
    state,
    start: onStart,
    stop: onStop,
    check: onCheck,
    onChangeInputValue,
    patchControls,
  } = useTerminal();

  const {
    controls: { start, success, failure },
  } = state;

  const handleChange = (event) => {
    const { value: nextValue } = event.target;

    if (onChangeInputValue) {
      onChangeInputValue(nextValue);
    } else {
      patchControls('value', nextValue);
    }
  };

  // console.log({ state });

  return (
    <div>
      <p>
        <input type="text" name="value" onChange={handleChange} />
        <button onClick={onCheck}>check</button>
      </p>
      <p>
        {start ? (
          <button onClick={onStop}>stop</button>
        ) : (
          <button onClick={onStart}>play</button>
        )}
        <span>{success}</span>
        <span>{failure}</span>
      </p>
    </div>
  );
}

export default RenderControls;
