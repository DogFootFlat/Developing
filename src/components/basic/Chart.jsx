import React from "react";
import ChartBar from "./ChartBar";
import classes from "./css/Chart.module.css";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map(c => c.value);
  const totalMaximun = Math.max(...dataPointValues);

  console.log(props.dataPoints);
  console.log(dataPointValues);
  console.log(totalMaximun);
  return (
    <div className={classes.chart}>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar 
          key={dataPoint.key}
          value={dataPoint.value} 
          maxValue={totalMaximun}
          lable={dataPoint.label}
        />
      ))}
    </div>
  );
};
export default Chart;
