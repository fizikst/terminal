import { useContext, useCallback } from "react";
import { TerminalContext, types } from "./TerminalContext";

const useTerminal = () => {
  const [state, dispatch] = useContext(TerminalContext);
  const { controls } = state;

  const start = useCallback(() => {
    console.log("^^^^^^^^^^^^useTerminal START");
    dispatch({
      type: types.ON_START
    });
  }, [dispatch]);

  const stop = useCallback(() => {
    console.log("^^^^^^^^^^^^useTerminal STOP");
    dispatch({
      type: types.ON_STOP
    });
    // state.onStop();
  }, [dispatch]);

  const increment = useCallback(
    (key) => {
      dispatch({
        type: types.ON_INCREMENT,
        meta: key
      });
    },
    [dispatch]
  );

  function change(key, value) {
    dispatch({
      type: types.ON_CHANGE,
      meta: key,
      payload: value
    });
  }

  function purse() {
    dispatch({
      type: types.ON_PURSE
    });
  }

  const check = useCallback(() => {
    dispatch({
      type: types.ON_CHECK
    });
  }, [dispatch]);

  const begin = useCallback(() => {
    dispatch({
      type: types.ON_BEGIN
    });
  }, [dispatch]);

  const progress = useCallback(() => {
    dispatch({
      type: types.ON_PROGRESS
    });
  }, [dispatch]);

  const end = useCallback(() => {
    dispatch({
      type: types.ON_END
    });
  }, [dispatch]);

  function toggleControls(name) {
    dispatch({
      type: types.SET_CONTROLS,
      meta: "controls",
      payload: { ...controls, [name]: !controls[name] }
    });
  }

  function patchControls(name, payload) {
    dispatch({
      type: types.SET_CONTROLS,
      meta: "controls",
      payload: { ...controls, [name]: payload }
    });
  }

  function putControls(payload) {
    dispatch({
      type: types.SET_CONTROLS,
      meta: "controls",
      payload
    });
  }

  function onDictationStart() {
    dispatch({
      type: types.ON_DICTATION_START
      // meta: 'controls',
      // payload,
    });
  }

  return {
    toggleControls,
    putControls,
    patchControls,
    onDictationStart,
    start,
    stop,
    increment,
    change,
    purse,
    state,
    check,
    begin,
    end,
    progress
  };
};

export default useTerminal;
