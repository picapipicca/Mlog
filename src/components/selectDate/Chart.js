import React from "react";
import ChartBar from "./ChartBar";
import styled from "styled-components";

const Chart = (props) => {
  const valueArray = props.dataPlots.map((d) => d.value);
  console.log(valueArray);
  const totalMaximum = Math.max(...valueArray);
  console.log(totalMaximum);
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
  margin: 0px 100px 20px 20px;
  width : 87vw;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f8dfff;
  text-align: center;
  display: flex;
  justify-content: space-around;
  height: 10rem;
`;
export default Chart;
