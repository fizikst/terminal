import "./wdyr";
import React, { useEffect } from "react";
import "./styles.css";

import Forsage from "./components/containers/Forsage";
import Column from "./components/containers/Column";
import Card from "./components/containers/Card";
import RenderForsage from "./components/renders/RenderForsage";
import RenderColumn from "./components/renders/RenderColumn";
import RenderCard from "./components/renders/RenderCard";
import Dashboard from "./Dashboard";
import ParamsBlock from "./ParamsBlock";
import { TerminalProvider } from "./components/states/TerminalContext";
// console.log({ TerminalProvider });

// import Flash from "./Flash";
// import Forsazh from './Forsazh_witouth_sound'
// import LoadAudio from "./LoadAudio";

// const audioFiles = [
//   // "https://dl3ca1.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDQvMjEzLzIwNy80MjEzMjA3Lm1wMw==",
//   "http://www.teanglann.ie/CanC/nua.mp3",
//   // "https://dl3ca1.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDQvMjEzLzIwNy80MjEzMjA3Lm1wMw==",
//   "http://www.teanglann.ie/CanC/ag.mp3"
//   // "http://www.teanglann.ie/CanC/dul.mp3",

//   // "http://www.teanglann.ie/CanC/freisin.mp3",
//   // "https://lk.gorazd.online/assets/sounds/numbers/1.ogg"
// ];

const fn = () => [];
const initParams = {
  section: 5,
  steps: 3,
  interval: 1,
  mode: 1,
  sign: 0,
  bound: 0,
  under: 1,
  over: 1,
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
};
const initControls = {
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
};

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export default function App() {
  // const [count, setCount] = React.useState(0);
  // const [audios, setAudios] = React.useState([]);
  // const [numbers, setNumbers] = React.useState([]);

  // React.useEffect(() => {
  //   setCount(5);
  //   setAudios(audioFiles);
  //   setNumbers([101, 202, 303, 404, 505]);
  // }, []);

  const [request, setRequest] = React.useState({
    data: [],
    error: false,
    errorMessage: "",
    loading: false,
    success: false
  });

  const handleRequest = () => {
    console.log("--------- APP handle request");
    setRequest({
      data: [getRandom(1, 10)],
      error: false,
      errorMessage: "",
      loading: false,
      success: true
    });
  };

  const [args, setArgs] = React.useState([]);

  useEffect(() => {
    setArgs(request.data);
  }, [request.data]);

  const [params, setParams] = React.useState(initParams);

  return (
    <div className="App">
      <ParamsBlock params={params} onChange={setParams} />
      <TerminalProvider
        onStart={handleRequest}
        onStop={fn}
        onBegin={fn}
        onEnd={fn}
        params={params}
        request={request}
        args={args}
        onIncrement={fn}
      >
        <Dashboard
          renderForsage={() => (
            <Forsage render={(props1) => <RenderForsage {...props1} />} />
          )}
          renderColumn={() => (
            <Column render={(props2) => <RenderColumn {...props2} />} />
          )}
          renderCard={() => (
            <Card render={(props3) => <RenderCard {...props3} />} />
          )}
        />
      </TerminalProvider>
    </div>
  );
}
// onStart={() => console.log('Start')}

/* <Provider
render={(props) => (
  <Dashboard
    {...props}
    // renderAnzan={() => <Forsage render={props1 => <Anzan {...props1} />} />}
  />
)}
/> */

// {
/* <Forsage
count={count}
setCount={setCount}
audios={audios}
setAudios={setAudios}
numbers={numbers}
setNumbers={setNumbers}
render={(props) => <RenderForsage {...props} />}
/> */
// }

// <Flash numbers={numbers} setNumbers={setNumbers} />
