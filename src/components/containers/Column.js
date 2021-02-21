import React, { useEffect } from 'react';
import { useEventCallback } from 'rxjs-hooks';
import { filter, tap, delay } from 'rxjs/operators';
import useTerminal from '../states/useTerminal';

function Column(props) {
  const { render } = props;

  const { state, begin, end } = useTerminal();
  const {
    args,
    controls: { start },
  } = state;

  const [onEvent] = useEventCallback(
    (events$, state$, inputs$) => events$.pipe(
      filter((event) => event.type === 'start'),
      tap(() => begin()),
      delay(100),
      tap(() => end()),
    ),
    0,
    [args],
  );

  useEffect(() => {
    if (start) {
      onEvent({ type: 'start' });
    }
  }, [onEvent, start]);

  return (
    <div>
      {render({
        args,
      })}
    </div>
  );
}

export default Column;

/* <button name="play" onClick={onEvent}>
{running ? "Stop" : "Start"}
</button>
<button onClick={handleFree}>change 3</button>
<button onClick={handleFour}>change 4</button>
<button onClick={handleOne}>change 1</button>
<button onClick={handlePlay}>play</button>
<p>{inc}</p> */
