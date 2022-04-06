import React from "react";
import ChartBar from "./ChartBar";
import styled from "styled-components";

const Chart = (props) => {
  const valueArray = props.dataPlots.map((d) => d.value);
  
  const totalMaximum = Math.max(...valueArray);
  
  return (
    <ChartEl>
      {props.dataPlots.map((d) => (
        <ChartBar
          key={d.label}
          value={d.value}
          maxValue={totalMaximum}
          label={d.label}
        />
      ))}
    </ChartEl>
  );
};

const ChartEl = styled.div`
  margin: auto;
  margin-bottom: 20px;
  width: 100%;
  padding: 1rem;
  border:  1px solid #000;
  text-align: center;
  display: flex;
  justify-content: space-around;
  height: 10rem;
  
`;
export default Chart;
