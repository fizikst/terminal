import React, { useEffect } from "react";
// import { BehaviorSubject, from } from "rxjs";
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
import useTimer from "./hooks/use-timer";
import TimerComponent from "./Timer";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

const callbackError = (index) => {
  console.log("____________", index);
};

const epicLaodAudios = (audios) => {
  return switchMap((audios) => {
    let audiosList = [];
    audios.forEach((url) => {
      const audioTarget = new Audio();
      audioTarget.src = url;
      audiosList.push(audioTarget);
    });
    const audios$ = from(audiosList).pipe(
      tap((e) => console.log("audios loading", e)),
      mergeMap((target, index) => {
        console.log({ target });
        return [
          fromEvent(target, "canplaythrough").pipe(
            takeUntil(timer(5000)),
            defaultIfEmpty(index)
          )
        ];
      }),
      mergeMap((value) => {
        value.subscribe((v) => {
          if (typeof v === "number") {
            callbackError(v);
          }
        });
        return value;
      }),
      scan((inc) => inc + 1, 0),
      tap((e) => console.log("загрузка файлов", e)),
      filter((inc) => inc >= audios.length)
    );
    return audios$;
  });
};

const epicTimer = (events$, inputs$, running$, setInc) => {
  return switchMap((e) => {
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
  });
};

function Forsazh(props) {
  const { count, setCount, audios, setAudios } = props;

  const [running, setRunning] = React.useState(false);

  const [begin, setBegin] = React.useState(false);

  const [inc, setInc] = React.useState(0);

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) => {
      const running$ = events$.pipe(
        tap((e) => console.log(e, e.target.name)),
        filter((e) => e.type === "click"),
        scan((running) => !running, running)
      );

      return events$.pipe(
        withLatestFrom(running$),
        combineLatest(inputs$),
        tap(([[event, running], inputs]) => setRunning(running)),
        filter(([[event, running], inputs]) => running),
        tap(() => setInc(0)),
        map(([[event, running], [count, audios]]) => audios),
        tap((e) =>
          console.log("<<<<<<<<<<<<<<<< Start load audios >>>>>>>>>>>>>>>>", e)
        ),
        epicLaodAudios(audios),
        tap(() => setBegin(true)),
        tap((e) =>
          console.log("<<<<<<<<<<<<<<<< Start timer >>>>>>>>>>>>>>>>", e)
        ),
        epicTimer(events$, inputs$, running$, setInc),
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

  console.log("RESULT", { begin, inc, running });

  return (
    <div>
      <button name="play" onClick={onEvent}>
        {running ? "Stop" : "Start"}
      </button>
      {/* {count === 3 && (
        <TimerComponent state={0} count={count} setInc={setInc} />
      )} */}
      <button onClick={handleFree}>change 3</button>
      <button onClick={handleFour}>change 4</button>
      <button onClick={handleOne}>change 1</button>
      <button onClick={handlePlay}>play</button>
      <p>{inc}</p>
    </div>
  );
}

export default Forsazh;
