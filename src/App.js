import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "zingchart/es6";
import ZingChart from "zingchart-react";

import { getWeatherForecast } from "./services/forecast";
import { addForecast } from "./store/forecast/index";
import "./App.css";

function App() {
  const [config, setConfig] = useState({});

  let mounted = useRef(true);
  let chart = useRef(null);

  const dispatch = useDispatch();

  const forecast = useSelector((state) => state.forecast);

  let seriesTemp = [];

  let scaleXValues = [];

  let weatherIcons = [];

  let todayWeatherSummaryIcon;

  let todayWeatherSummaryText;

  let todayWeatherSummaryMinimumTemperature;
  let todayWeatherSummaryMaximumTemperature;

  let chartConfig = {
    type: "area",
    plot: {
      aspect: "spline",
      stacked: "true",
    },
    plotarea: {
      // border: "1px solid red",
      marginTop: 100,
    },
    animation: {
      effect: "ANIMATION_FADE_OUT",
    },
    scaleX: {
      step: "1hour",
      label: {
        text: "date",
      },
      item: {
        // border: "1px solid red",
      },
      transform: {
        type: "date",
        all: "%h:%i:%A",
      },
      // "max-items": 12,
    },
    // utc: true,
    timezone: 3,
    scaleY: {
      label: {
        text: "Temperature (°C)",
      },
    },
    labels: weatherIcons,
    series: [
      {
        values: seriesTemp,
      },
    ],
    crosshairX: {},
  };

  if (forecast.forecast) {
    // console.log(forecast.forecast);
    seriesTemp = forecast.forecast.forecastday[0].hour.map(
      (item) => item.temp_c
    );

    scaleXValues = forecast.forecast.forecastday[0].hour.map(
      (item) => item.time_epoch
    );

    weatherIcons = forecast.forecast.forecastday[0].hour.map((item, index) => {
      return {
        "background-image": `https:${item.condition.icon}`,
        "background-fit": "xy",
        "font-size": "30px",
        "border-radius": "50%",
        "offset-y": -30,
        hook: `node:plot=0;index=${index}`,
        // text: item.condition.text,
      };
    });

    todayWeatherSummaryIcon = `https:${forecast.forecast.forecastday[0].day.condition.icon}`;

    todayWeatherSummaryText =
      forecast.forecast.forecastday[0].day.condition.text;

    todayWeatherSummaryMinimumTemperature =
      forecast.forecast.forecastday[0].day.mintemp_c;
    todayWeatherSummaryMaximumTemperature =
      forecast.forecast.forecastday[0].day.maxtemp_c;

    let minDateValue = Math.min(...scaleXValues);

    let maxDateValue = Math.max(...scaleXValues);

    chartConfig.scaleX.minValue = minDateValue * 1000;
    chartConfig.scaleX.maxValue = maxDateValue * 1000;

    chartConfig.series[0].values = seriesTemp;
    chartConfig.labels = weatherIcons;
  }

  useEffect(() => {
    mounted.current = true;

    getWeatherForecast().then((items) => {
      if (mounted.current) {
        dispatch(addForecast(items));
        setConfig(chartConfig);
      }
    });
    return () => (mounted.current = false);
  }, []);

  useEffect(() => {
    setConfig(chartConfig);
  }, [forecast]);

  return (
    <div className="App">
      <div className="weatherSummary">
        <div className="today">
          <div className="heading">Today</div>
          <div className="summary">
            <div className="summaryIcon">
              <img
                src={todayWeatherSummaryIcon}
                alt="wather icon"
                width="120px"
                height="120px"
              />
            </div>
            <div className="summaryTemperature">
              <span className="summaryTemperatureMax">
                {todayWeatherSummaryMaximumTemperature}
                {String.fromCharCode(176)}
              </span>
              <br />
              <span className="summaryTemperatureMin">
                {todayWeatherSummaryMinimumTemperature}
                {String.fromCharCode(176)}
              </span>
            </div>
            <div className="summaryText">
              <span>{todayWeatherSummaryText}</span>
              <br />
              <span className="summaryTextHidden">
                {todayWeatherSummaryText}
              </span>
            </div>
          </div>
        </div>
        <div className="otherDays"></div>
      </div>
      <div>
        <ZingChart data={config} ref={chart} />
      </div>
    </div>
  );
}

export default App;
