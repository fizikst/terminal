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
  combineLatest,
  merge
} from "rxjs/operators";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};
// let audiosList = [];
function Forsazh(props) {
  const { count, setCount, audios, setAudios } = props;

  const [running, setRunning] = React.useState(false);

  const [begin, setBegin] = React.useState(false);

  const [inc, setInc] = React.useState(0);

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) => {
      const running$ = events$.pipe(
        filter((e) => e.type === "click"),
        scan((running) => !running, running)
      );

      return events$.pipe(
        withLatestFrom(running$),
        combineLatest(inputs$),
        tap(([[event, running], inputs]) => setRunning(running)),
        filter(([[event, running], inputs]) => running),
        tap(() => setInc(0)),

        switchMap(([[event, running], [count, audios]]) => {
          let audiosList = [];
          audios.forEach((url) => {
            const audioTarget = new Audio();
            audioTarget.src = url;
            audiosList.push(audioTarget);
          });
          const audios$ = from(audiosList).pipe(
            tap((e) => console.log("audios loading", e)),
            mergeMap((target) => {
              return fromEvent(target, "canplay");
            }),
            scan((inc) => inc + 1, 0),
            tap((e) => console.log("загрузка файлов", e)),
            filter((inc) => inc >= audios.length),
            tap(() => console.log("audios load"))
          );
          return audios$;
        }),

        tap(() => setBegin(true)),
        switchMap((e) => {
          return timer(0, 1000).pipe(
            combineLatest(inputs$),

            takeWhile(([index, [count, audios]]) => index < count),
            takeUntil(
              events$.pipe(
                withLatestFrom(running$),
                filter(([e, running]) => running)
              )
            ),
            tap(([inc, _]) => setInc(inc))
          );
        }),
        filter(([index, [count, audios]]) => index >= count - 1),
        tap(() => setBegin(false))
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

  const handleOne = () => {
    setCount(1);
    setAudios(["http://www.teanglann.ie/CanC/nua.mp3"]);
  };

  const handlePlay = () => {
    // audiosList[0].play();
  };

  // console.log("RRRRRRRRRRRRRRRRRRRRRRRRR", { index, inc });
  console.log("RENDEL", { index: index[0], running, begin, inc });

  return (
    <div>
      <button onClick={onEvent}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleFree}>change 3</button>
      <button onClick={handleFour}>change 4</button>
      <button onClick={handleOne}>change 1</button>
      <button onClick={handlePlay}>play</button>
      <p>{inc}</p>
    </div>
  );
}

export default Forsazh;
