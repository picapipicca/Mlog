import React from "react";
import Chart from "./Chart";


const LogChart = (props) => {
    
  const chartDataPlots = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const filtered of props.filtered) {
    const logMonth = filtered.insert_dt.split('-')[1]; // starting at 0 => January => 0
    chartDataPlots[logMonth-1].value += 1;
  }
  return <Chart dataPlots={chartDataPlots} />;
};

export default LogChart;
