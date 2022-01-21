import React from 'react';
import styled from 'styled-components';
import ChartBar from './ChartBar';

const SelectDate = (props) => {
    const valueArray = props.dataPlots.map(d => d.value);
    console.log(valueArray);
    const totalMaximum = Math.max(...valueArray);
    console.log(totalMaximum);
  return (
    <Chart>
      {props.dataPlots.map((d) => (
        <ChartBar
          key={d.label}
          value={d.value}
          maxValue={totalMaximum}
          label={d.label}
        />
      ))}
    </Chart>
  );
};

const Chart=styled.div`
  padding: 1rem;
    border-radius: 12px;
    background-color: #f8dfff;
    text-align: center;
    display: flex;
    justify-content: space-around;
    height: 10rem;
`;

export default SelectDate;

