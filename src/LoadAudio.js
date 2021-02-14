import React from "react";
// import { BehaviorSubject, from } from "rxjs";
import { timer, from, of, interval } from "rxjs";
import { useEventCallback } from "rxjs-hooks";
import {
  scan,
  filter,
  tap,
  switchMap,
  startWith,
  withLatestFrom,
  timeout,
  takeUntil,
  takeWhile,
  combineLatest
} from "rxjs/operators";

const audioFiles = [
  "http://www.teanglann.ie/CanC/nua.mp3",
  "http://www.teanglann.ie/CanC/ag.mp3",
  "http://www.teanglann.ie/CanC/dul.mp3",
  "https://dl3ca1.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDQvMjEzLzIwNy80MjEzMjA3Lm1wMw==",
  "http://www.teanglann.ie/CanC/freisin.mp3"
];

function LoadAudio(props) {
  const { count, change } = props;

  const [running, setRunning] = React.useState(false);

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) => {
      const running$ = events$.pipe(
        filter((e) => e.type === "click"),
        scan((running) => !running, running)
        // tap(setRunning),
      );

      return events$.pipe(
        combineLatest(inputs$),
        withLatestFrom(running$),
        tap(([_, running]) => setRunning(running)),
        filter(([_, running]) => running)
        //   switchMap(([[e, count], running]) => {
        //     console.log("switchMap=", { e, count, running });
        //     return timer(0, 1000).pipe(
        //      // startWith(0),
        //       takeWhile((index) => index < count),
        //       takeUntil(
        //         events$.pipe(
        //           withLatestFrom(running$),
        //           filter(([e, running]) => running)
        //         )
        //       )
        //     );
        //   }),
        //   tap(console.log)
      );
    },
    0,
    [count]
  );

  const handleFree = () => {
    change(3);
  };

  const handleFour = () => {
    change(4);
  };

  console.log({ running, count });

  return (
    <div>
      <button onClick={onEvent}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleFree}>change 3</button>
      <button onClick={handleFour}>change 4</button>
      <p>{count}</p>
    </div>
  );
}

export default LoadAudio;
