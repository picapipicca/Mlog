import React,{ Fragment }  from 'react';
import classes from "./Map.module.css"
import Bus from '../components/Bus';

const Map = (props) => {
    return (
        <Fragment>
            <Bus height='8vh'/>
            <Bus height='8vh' bg='black' carNumber='camel'/>
            <Bus height='8vh' bg='yellow' carNumber='cat'/>
        </Fragment>
    );
};

export default Map;