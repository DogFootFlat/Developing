import React from "react";
import Chart from "../basic/Chart";

const LoanChart = (props) => {
  const chartDataPoints = [];
  for (const book of props.books) {
    chartDataPoints.push(
      { key: book.id, label: book.name, value: book.count }
    );
  }

  return <Chart dataPoints={chartDataPoints} />;
}

export default LoanChart;