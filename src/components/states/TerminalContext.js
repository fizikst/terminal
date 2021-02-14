import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

export const types = {
  ON_START: "ON_START",
  ON_STOP: "ON_STOP",
  ON_CHECK: "ON_CHECK",
  ON_INCREMENT: "ON_INCREMENT",
  ON_CHANGE: "ON_CHANGE",
  ON_PARAMS: "ON_PARAMS",
  ON_PURSE: "ON_PURSE",
  ON_BEGIN: "ON_BEGIN",
  ON_END: "ON_END",
  ON_PROGRESS: "ON_PROGRESS",

  ON_DICTATION_START: "ON_DICTATION_START",
  ON_DICTATION_PROGRESS: "ON_DICTATION_PROGRESS",

  SET_PARAMS: "SET_PARAMS",
  SET_CONTROLS: "SET_CONTROLS",
  SET_DICTATION_STATUSES: "SET_DICTATION_STATUSES"
};

function reducer(state, action) {
  const { params, controls, onStart, args: nextAgrs } = state;
  const { success, failure, value } = controls;
  switch (action.type) {
    case types.ON_START: {
      onStart(params);
      console.log("%%%%%%%%%%%%% TERMINAL CONTEXT --- START");
      return {
        ...state,
        args: [],
        workout: {
          begin: false,
          progress: false,
          end: false
        },
        controls: {
          ...controls,
          start: true,
          stop: false,
          check: false,
          value: ""
        }
      };
    }
    case types.ON_CHECK: {
      console.log("%%%%%%%%%%%%% TERMINAL CONTEXT --- CHECK");

      const sum = nextAgrs.reduce((acc, next) => acc + next, 0);
      let counter_type = "failure";

      if (sum === Number(value)) {
        counter_type = "success";
      }

      return {
        ...state,
        // workout: {
        //   begin: false,
        //   progress: false,
        //   end: false
        // },
        controls: {
          ...controls,
          [counter_type]: controls[counter_type] + 1,
          start: controls.repeat,
          stop: false,
          check: true
        }
      };
    }
    case types.ON_STOP:
      console.log("%%%%%%%%%%%%% TERMINAL CONTEXT --- STOP");
      return {
        ...state,
        args: [],
        workout: {
          begin: false,
          progress: false,
          end: false
        },
        controls: {
          ...controls,
          start: false,
          stop: true,
          check: false
        }
      };
    case types.ON_INCREMENT: {
      const inc = action.meta === "success" ? success : failure;

      return {
        ...state,
        controls: { ...controls, [action.meta]: inc + 1 }
      };
    }
    case types.ON_CHANGE: {
      // TODO сделать событие pre_start
      if (
        action.meta === "args" &&
        action.payload &&
        action.payload.length > 0
      ) {
        return {
          ...state,
          clicked: false,
          play: true,
          check: false,
          stop: false,
          [action.meta]: action.payload
        };
      }
      return {
        ...state,
        [action.meta]: action.payload
      };
    }
    case types.SET_CONTROLS:
    case types.SET_PARAMS:
    case types.SET_DICTATION_STATUSES: {
      return {
        ...state,
        [action.meta]: action.payload
      };
    }
    case types.ON_BEGIN:
      state.onBegin();
      return {
        ...state,
        workout: {
          begin: true,
          progress: false,
          end: false
        }
      };
    case types.ON_PROGRESS:
      return {
        ...state,
        workout: {
          begin: false,
          progress: true,
          end: false
        }
      };
    case types.ON_END: {
      state.onEnd(params);
      return {
        ...state,
        workout: {
          begin: false,
          progress: false,
          end: true
        }
      };
    }
    case types.ON_PURSE:
      return {
        ...state,
        success: 0,
        failure: 0
      };
    case types.ON_DICTATION_START:
      return {
        ...state,
        dictationStatuses: {
          start: true,
          progress: false,
          stop: false
        }
      };
    case types.ON_DICTATION_PROGRESS:
      return {
        ...state,
        dictationStatuses: {
          start: false,
          progress: true,
          stop: false
        }
      };

    default:
      return state;
  }
}

const initialState = {
  params: {
    section: 5,
    steps: 3,
    interval: 1,
    mode: 1,
    sign: 0,
    bound: 0,
    under: 1,
    over: 1,
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  },
  controls: {
    count: 5,
    dictation: true,
    start: false,
    stop: false,
    check: false,
    clear: false,
    abacus: false,
    settings: true,
    repeat: false,
    correct: false,
    value: "",
    open: true,
    sound: false,
    sample: false,
    showAnswers: false,
    success: 0,
    failure: 0
  },
  visible: {
    answerCounter: {
      sound: false,
      settings: true,
      sample: true,
      play: true,
      abacus: true,
      params: true,
      showAnswers: true
    }
  },
  workout: {
    begin: false,
    progress: false,
    end: false
  }
};

const TerminalContext = React.createContext([initialState, () => {}]);

const TerminalProvider = (props) => {
  const {
    args,
    params: globalParams,
    request,
    controls: globalControls,
    children
  } = props;

  const [state, dispatch] = useReducer(reducer, { ...props, ...initialState });
  const { args: nextAgrs, controls, params, onStart } = state;
  const { check, value, start, stop, success, failure } = controls;

  // useEffect(() => {
  //   dispatch({
  //     type: types.SET_CONTROLS,
  //     meta: "controls",
  //     payload: { ...controls, ...globalControls }
  //   });
  // }, [globalControls]);

  useEffect(() => {
    if (check) {
      dispatch({
        type: types.ON_CHECK
      });
    }
  }, [check]);

  // useEffect(() => {
  //   if (check) {
  //     const sum = nextAgrs.reduce((acc, next) => acc + next, 0);
  //     let meta = "failure";

  //     if (sum === Number(value)) {
  //       meta = "success";
  //     }
  //     dispatch({
  //       type: types.ON_CHECK
  //     });
  //     dispatch({
  //       type: types.ON_INCREMENT,
  //       meta
  //     });
  //   }
  // }, [check, value]);

  // useEffect(() => {
  //   if (success > 0 || failure > 0) {
  //     state.onIncrement({ success, failure, args, value });
  //   }
  // }, [success, failure]);

  // useEffect(() => {
  //   if (start) {
  //     onStart(params);
  //   }
  // }, [start, onStart, params]);

  // useEffect(() => {
  //   if (stop) {
  //     dispatch({
  //       type: types.ON_STOP
  //     });
  //   }
  // }, [stop]);

  // useEffect(() => {
  //   dispatch({
  //     type: types.ON_CHANGE,
  //     meta: "args",
  //     payload: args
  //   });
  // }, [args]);

  // useEffect(() => {
  //   dispatch({
  //     type: types.ON_CHANGE,
  //     meta: "request",
  //     payload: request
  //   });
  // }, [request]);

  // useEffect(() => {
  //   dispatch({
  //     type: types.SET_PARAMS,
  //     meta: "params",
  //     payload: { ...params, ...globalParams }
  //   });
  // }, [globalParams]);

  return (
    <TerminalContext.Provider value={[state, dispatch]}>
      {children}
    </TerminalContext.Provider>
  );
};

TerminalProvider.propTypes = {
  args: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired
};

export { TerminalContext, TerminalProvider };
