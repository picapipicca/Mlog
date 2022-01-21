import React, {Fragment} from "react";
import { Button } from "../element";
import Bus from "./Bus";
import classes from './Log.module.css';

const Log = (props)=> {

    const {history} = props;
    return(
        <Fragment>
            <section className={classes.wrap}>
                <Bus width='70vw' height='24vh'/>
            </section>
            <button className={classes.btn} onClick={()=>{history.push('/postwrite')}}>입력</button>
        </Fragment>
    ); 
};

export default Log;