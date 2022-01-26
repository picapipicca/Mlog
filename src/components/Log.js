import React, {Fragment} from "react";
import { Button } from "../element";
import Bus from "./Bus/Bus";
import classes from './Log.module.css';
import Permit from "../shared/Permit";

const Log = (props)=> {

    const {history} = props;
    return(
        <Fragment>
            <section className={classes.wrap}>
                <Bus width='70vw' height='24vh'/>
            </section>
            <Permit>
              <Button text='입력' className={classes.btn} _onClick={()=>{history.push('/postwrite')}}/>
            </Permit>
            <Button text='입력' className={classes.btn} _onClick={()=>{history.push('/login')}}/>
        </Fragment>
    ); 
};

export default Log;