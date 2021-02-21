import React, { useEffect } from 'react';
import { timer, from, fromEvent } from 'rxjs';
import { useEventCallback } from 'rxjs-hooks';
import {
  scan,
  filter,
  tap,
  map,
  endWith,
  finalize,
  switchMap,
  mergeMap,
  takeUntil,
  combineLatest,
  defaultIfEmpty,
} from 'rxjs/operators';
import epicTimer from '../epics/epicTimer';
import epicLaodAudios from '../epics/epicLaodAudios';
import useTerminal from '../states/useTerminal';

function Forsage(props) {
  const { render } = props;

  const {
    state,
    begin,
    progress,
    end: onEnd,
    start: onStart,
    stop: onStop,
  } = useTerminal();
  const {
    args,
    workout: { end },
    controls: {
      start, stop, check, sound, repeat,
    },
  } = state;

  const [inc, setInc] = React.useState(0);

  const handleError = (data) => {
    console.log('error handle', data);
    onEvent({
      type: 'error',
    });
  };

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) =>
    // const running$ = events$.pipe(
    //   // filter((e) => e.type === "click"),
    //   scan((running) => !running, running)
    // );

      events$.pipe(

        // withLatestFrom(running$),

        // scan((running) => !running, running),
        // tap((running) => setRunning(running)),
        combineLatest(inputs$),
        filter(([event, [args, sound, end]]) => {
          console.log('ON EVENT OBSERVEBLE', {
            type: event.type,
            args,
            sound,
            end,
          });
          return event.type === 'start' && !end && args.length > 0;
        }),
        tap(() => console.log('ON EVENT OBSERVEBLE EENNDD')),

        map(([event, [args, sound]]) => [args, sound]),
        tap((e) => console.log('<<<<<<<<<<<<<<<< Start load audios >>>>>>>>>>>>>>>>', e)),
        epicLaodAudios(events$, handleError),

        tap(() => begin()),
        tap(() => setInc(0)),
        tap(() => progress()),
        tap((e) => console.log('<<<<<<<<<<<<<<<< Start timer >>>>>>>>>>>>>>>>', e)),
        epicTimer(events$, setInc),
        filter(([index, count]) => index >= count - 1),
        tap(() => onEnd()),
        // takeUntil(events$.pipe(filter(e => e.type === 'error')))
      ),
    0,
    [args, sound, end],
  );

  useEffect(() => {
    console.log('&&&&&&&& FORSAGE  START', { start });
    if (start) {
      onEvent({ type: 'start' });
    }
  }, [onEvent, start]);

  useEffect(() => {
    console.log('&&&&&&&& FORSAGE  STOP', { stop });
    if (stop) {
      onEvent({ type: 'stop' });
    }
  }, [onEvent, stop]);

  useEffect(() => {
    console.log('&&&&&&&& FORSAGE CHECK', { repeat, check });
    if (repeat && check) {
      // onStop();
      onStart();
    }
  }, [onStart, repeat, check, onStop]);

  console.log('RESULT', {
    inc, end, repeat, start, check,
  });

  return (
    <div>
      {render({
        args,
        inc,
      })}
    </div>
  );
}

export default Forsage;
