import React from "react";
import useTerminal from "../states/useTerminal";

function RenderSettings() {
  const { toggleControls, state } = useTerminal();
  const handleChange = (e) => {
    toggleControls(e.target.name);
  };

  return (
    <div>
      Sound
      <input
        onChange={handleChange}
        type="checkbox"
        id="sound"
        name="sound"
        value="Sound"
      />
      Repeat
      <input
        onChange={handleChange}
        type="checkbox"
        id="repeat"
        name="repeat"
        value="Repeat"
      />
    </div>
  );
}

export default RenderSettings;
