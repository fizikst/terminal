import { useObservable } from "rxjs-hooks";
import { timer } from "rxjs";
import {
  filter,
  tap,
  switchMap,
  withLatestFrom,
  takeUntil,
  takeWhile
} from "rxjs/operators";

const useTimer = (state, props, setInc) => {
  return useObservable(
    (state$, inputs$) =>
      inputs$.pipe(
        switchMap((e) => {
          return timer(0, 1000).pipe(
            withLatestFrom(inputs$),
            tap((e) => console.log("_________1", e)),
            takeWhile(([index, [count]]) => index < count),
            tap((e) => console.log("_________2", e)),
            takeUntil(inputs$.pipe(filter(([e, running]) => running))),
            tap((e) => console.log("_________3", e)),
            tap(([inc, _]) => setInc(inc))
          );
        })
      ),
    state,
    [props]
  );
};

export default useTimer;
