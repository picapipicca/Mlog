import React from "react";
import styled from "styled-components";

const ChartBar = (props) => {
  let barFillHeight = "0%";
  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <ChartBars>
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </ChartBars>
  );
};

const ChartBars = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .chart-bar__inner {
    height: 100%;
    width: 80%;
    border: 1px solid #313131;
    border-radius: 12px;
    background-color: aliceblue;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .chart-bar__fill {
    background-color: linear-gradient(#e66465, #9198e5);;
    width: 100%;
    transition: all 0.3s ease-out;
  }

  .chart-bar__label {
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
  }
`;

export default ChartBar;
