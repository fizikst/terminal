import React, { useEffect } from "react";
// import { BehaviorSubject, from } from "rxjs";
import { timer, from, of, interval, fromEvent } from "rxjs";
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
  merge
} from "rxjs/operators";
import useTimer from "./hooks/use-timer";
import TimerComponent from "./Timer";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

// const useTimer = (state, props, setInc) => {
//   return useObservable(
//     (state$, inputs$) =>
//       inputs$.pipe(
//         //tap(() => setBegin(true)),
//         switchMap((e) => {
//           console.log("111", e);
//           return timer(0, 1000).pipe(
//             withLatestFrom(inputs$),
//             tap((e) => console.log("-----", e)),
//             takeWhile(([index, [count]]) => index < count),
//             takeUntil(
//               inputs$.pipe(
//                 // withLatestFrom(running$),
//                 filter(([e, running]) => running)
//               )
//             ),
//             tap((e) => console.log("-----2222222", e)),
//             tap(([inc, _]) => setInc(inc))
//           );
//         })
//         // tap((e) => console.log('_________', e)),
//         // map(([val]) => val + 1),
//         //tap(() => setBegin(false)),
//       ),
//     state,
//     [props]
//   );
// };

function Forsazh(props) {
  const { count, setCount, audios, setAudios } = props;

  const [running, setRunning] = React.useState(false);

  const [begin, setBegin] = React.useState(false);

  const [inc, setInc] = React.useState(0);

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

  useTimer(0, count, setInc);

  console.log("RRRRRRRRRRRRRRRRRRRRRRRRR", { begin, inc });

  return (
    <div>
      {/* <button name="play" onClick={onEvent}>
        {running ? "Stop" : "Start"}
      </button> */}
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
