import React, { useEffect } from 'react';
import { useEventCallback } from 'rxjs-hooks';
import {
  filter, map, tap, combineLatest,
} from 'rxjs/operators';
import useTerminal from '../states/useTerminal';
import epicTimer from '../epics/epicTimer';
import { fillingValues } from '../utils/virtualAbacus';

function Card(props) {
  const { render } = props;

  const {
    state, begin, end, progress,
  } = useTerminal();
  const {
    args,
    controls: { start, stop },
  } = state;

  const [inc, setInc] = React.useState(0);

  const [onEvent] = useEventCallback(
    (events$, state$, inputs$) => events$.pipe(
      combineLatest(inputs$),
      filter(([event, [args]]) => event.type === 'start'),

      tap(() => begin()),
      tap(() => setInc(0)),
      tap(() => progress()),
      tap((e) => console.log('<<<<<<<<<<<<<<<< Start timer >>>>>>>>>>>>>>>>', e)),
      map(([event, [args]]) => [args]),
      epicTimer(events$, setInc),
      filter(([index, count]) => index >= count - 1),
      tap(() => end()),
    ),
    0,
    [args],
  );

  const [abacus, setAbacus] = React.useState({});

  useEffect(() => {
    const newAbacus = fillingValues(
      Math.abs(args[inc]),
      String(Math.abs(args[inc])).length,
    );
    setAbacus(newAbacus);
  }, [args, inc]);

  useEffect(() => {
    if (start) {
      onEvent({ type: 'start' });
    }
  }, [onEvent, start]);

  useEffect(() => {
    if (stop) {
      onEvent({ type: 'stop' });
    }
  }, [onEvent, stop]);
  return (
    <div>
      {render({
        args,
        inc,
        abacusState: abacus,
      })}
    </div>
  );
}

export default Card;
