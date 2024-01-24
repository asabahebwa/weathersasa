import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import "./App.css";

let chartConfig = {
  type: "area",
  plot: {
    aspect: "spline",
    stacked: "true",
    "value-box": {},
  },
  animation: {
    effect: "ANIMATION_FADE_OUT",
  },
  scaleX: {
    label: {
      text: "Date",
    },
  },
  scaleY: {
    label: {
      text: "Temperature (°C)",
    },
  },
  labels: [
    {
      "background-image": "https://www.zingchart.com/images/blueberry.jpg",
      "background-fit": "xy",
      "font-size": "30px",
      "border-radius": "50%",
      "offset-y": -80,
      hook: "node:plot=0;index=0",
    },
    {
      "background-image": "https://www.zingchart.com/images/blueberry.jpg",
      "background-fit": "xy",
      "font-size": "30px",
      "border-radius": "50%",
      "offset-y": -80,
      hook: "node:plot=0;index=1",
    },
    {
      "background-image": "https://www.zingchart.com/images/blueberry.jpg",
      "background-fit": "xy",
      "font-size": "30px",
      "border-radius": "50%",
      "offset-y": -80,
      hook: "node:plot=0;index=2",
    },
    {
      "background-image": "https://www.zingchart.com/images/blueberry.jpg",
      "background-fit": "xy",
      "font-size": "30px",
      "border-radius": "50%",
      "offset-y": -80,
      hook: "node:plot=0;index=3",
    },
  ],
  series: [
    {
      values: [25, 27, 25, 23],
    },
  ],
};

function App() {
  const [config, setConfig] = useState({});

  const user = useSelector((state) => state.user);

  let chart = useRef(null);

  useEffect(() => {
    setConfig(chartConfig);
    console.log(user);
  }, []);

  return (
    <div className="App">
      <ZingChart data={config} ref={chart} />
    </div>
  );
}

export default App;
