import React, { useEffect } from "react";
import {
  timer,
  from,
  of,
  interval,
  fromEvent,
  throwError,
  iif,
  defer
} from "rxjs";
import { useObservable, useEventCallback } from "rxjs-hooks";
import {
  scan,
  filter,
  tap,
  map,
  switchMap,
  startWith,
  withLatestFrom,
  timeout,
  mergeMap,
  takeUntil,
  takeWhile,
  combineLatest,
  merge,
  empty,
  catchError,
  defaultIfEmpty
} from "rxjs/operators";
import epicTimer from "./epics/epicTimer";
import TimerComponent from "./Timer";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

// const epicTimer = (events$, inputs$, running$, setInc) => {
//   return switchMap((e) => {
//     return timer(0, 1000).pipe(
//       combineLatest(inputs$),

//       takeWhile(([index, [count, audios]]) => index < count),
//       takeUntil(
//         events$.pipe(
//           withLatestFrom(running$),
//           filter(([e, running]) => running)
//         )
//       ),
//       tap(([inc, _]) => setInc(inc))
//     );
//   });
// };

function Flash(props) {
  const { numbers, setNumbers } = props;

  const [running, setRunning] = React.useState(false);

  const [begin, setBegin] = React.useState(false);

  const [inc, setInc] = React.useState(0);

  const handleError = (data) => {
    console.log("error handle", data);
    onEvent({
      type: "error"
    });
  };

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) => {
      const running$ = events$.pipe(
        // filter((e) => e.type === "click"),
        scan((running) => !running, running)
      );

      return events$.pipe(
        // withLatestFrom(running$),
        filter((e) => e.type === "click"),
        scan((running) => !running, running),
        tap((running) => setRunning(running)),

        combineLatest(inputs$),
        tap((e) => console.log("========", e)),

        filter(([running, [numbers]]) => running),

        tap(() => setInc(0)),

        // map(([running, [count, audios]]) => audios),
        // tap((e) =>
        //   console.log("<<<<<<<<<<<<<<<< Start load audios >>>>>>>>>>>>>>>>", e)
        // ),

        tap(() => setBegin(true)),
        tap((e) =>
          console.log("<<<<<<<<<<<<<<<< Start timer >>>>>>>>>>>>>>>>", e)
        ),
        // map(([running, [numbers]]) => numbers.length),
        // mergeMap(([running, [numbers]]) => {
        //   return epicTimer(events$, numbers.length, running$, setInc);
        // }),
        map(([running, [numbers]]) => numbers.length),
        epicTimer(events$, running$, setInc),
        combineLatest(inputs$),
        filter(([index, [numbers]]) => index >= numbers.length - 1),
        tap(() => setBegin(false))
        // takeUntil(events$.pipe(filter(e => e.type === 'error')))
      );
    },
    0,
    [numbers]
  );

  const handleFree = () => {
    setNumbers([111, 222, 333]);
  };

  const handleFour = () => {
    setNumbers([1111, 2222, 3333, 4444]);
  };

  console.log("RESULT", { begin, inc, running });

  return (
    <div>
      <button name="play" onClick={onEvent}>
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={handleFree}>change 3</button>
      <button onClick={handleFour}>change 4</button>
      <p>{inc}</p>
      {running && numbers[inc]}
    </div>
  );
}

export default Flash;
