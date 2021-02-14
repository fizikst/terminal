import React from "react";

const stepsList = [1, 2, 3, 4, 5];

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

function ParamsBlock(props) {
  const { onChange, params } = props;
  // console.log("RenderForsage", props);
  console.log({ params });

  const handleChange = (e) => {
    onChange({ ...params, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <select value={params.steps} onChange={handleChange} name="steps">
        {stepsList.map((step) => (
          <option key={generateKey(step)} value={step}>
            {step}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ParamsBlock;
