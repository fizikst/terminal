import React from "react";
// import { BehaviorSubject, from } from "rxjs";
import { timer, from, of, interval, fromEvent } from "rxjs";
import { useEventCallback } from "rxjs-hooks";
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
  combineLatest
} from "rxjs/operators";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

function Forsazh(props) {
  const { count, setCount, audios, setAudios } = props;

  const [running, setRunning] = React.useState(false);

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) => {
      const running$ = events$.pipe(
        filter((e) => e.type === "click"),
        scan((running) => !running, running)
      );

      return events$.pipe(
        withLatestFrom(running$),
        tap(([_, running]) => setRunning(running)),
        tap(console.log),
        filter(([_, running]) => running),
        combineLatest(inputs$),
        switchMap(([[e, running], [count, audios]]) => {
          let audiosList = [];
          audios.forEach((url) => {
            const audioTarget = new Audio();
            audioTarget.src = url;
            audiosList.push(audioTarget);
          });
          const audios$ = of(audiosList).pipe(
            tap(() => console.log("audios loading")),
            mergeMap((target) => fromEvent(target, "canplaythrough")),
            //startWith(0),
            scan((inc) => inc + 1, 0),
            tap((e) => console.log("загрузка файлов", e)),
            filter((inc) => inc >= count),
            tap(() => console.log("audios load"))
          );
          return audios$;
        }),
        switchMap(() => {
          return timer(0, 1000).pipe(
            //startWith(0),
            combineLatest(inputs$),
            takeWhile(([index, [count, audios]]) => index < count),
            takeUntil(
              events$.pipe(
                withLatestFrom(running$),
                filter(([e, running]) => running)
              )
            )
          );
        }),

        tap((e) => console.log("result inc index", e))
      );
    },
    0,
    [count, audios]
  );

  const handleFree = () => {
    setCount(3);
    setAudios([
      "http://www.teanglann.ie/CanC/nua.mp3",
      "http://www.teanglann.ie/CanC/ag.mp3",
      "http://www.teanglann.ie/CanC/dul.mp3"
    ]);
  };

  const handleFour = () => {
    setCount(4);
    setAudios([
      "http://www.teanglann.ie/CanC/nua.mp3",
      "http://www.teanglann.ie/CanC/ag.mp3",
      "http://www.teanglann.ie/CanC/dul.mp3",
      "http://www.teanglann.ie/CanC/freisin.mp3"
    ]);
  };

  //  console.log("render", { index, running, count });

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
