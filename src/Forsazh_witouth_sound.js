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
  delay,
  takeUntil,
  takeWhile,
  combineLatest
} from "rxjs/operators";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

function Forsazh(props) {
  const { count, setCount } = props;

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
        filter(([_, running]) => running),
        switchMap(([[e, count], running]) => {
          console.log("switchMap=", { e, count, running });
          return timer(0, 1000).pipe(
            // startWith(0),
            takeWhile((index) => index < count),
            takeUntil(
              events$.pipe(
                withLatestFrom(running$),
                filter(([e, running]) => running)
              )
            )
          );
        }),
        tap(console.log)
      );

      // return events$.pipe(
      //   combineLatest(inputs$),
      //   withLatestFrom(running$),
      //   filter(([_, running]) => {
      //     return running
      //   }),
      //   switchMap(([[e, args], running]) => {
      //     return interval(1000).pipe(
      //       takeWhile(index => index < args.length),
      //     )
      //   }),
      // );

      // return events$.pipe(
      //   combineLatest(inputs$),
      //   switchMap((props) => {
      //     return interval(1000).pipe(
      //       tap((i) =>console.log({'11111':i})),
      //       takeWhile(index => index < 5),
      //     )
      //   }),
      // );

      // return events$.pipe(withLatestFrom(on$));
    },
    0,
    [count]
  );

  const handleFree = () => {
    setCount(3);
  };

  const handleFour = () => {
    setCount(4);
  };

  // console.log({ index, running, count });

  return (
    <div>
      <button onClick={onEvent}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleFree}>change 3</button>
      <button onClick={handleFour}>change 4</button>
      <p>{count}</p>
    </div>
  );
}

export default Forsazh;
