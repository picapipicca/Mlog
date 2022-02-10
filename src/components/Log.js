import React, {Fragment} from "react";
import { Button } from "../element";
import Bus from "./Bus/Bus";
import classes from './Log.module.css';
import Permit from "../shared/Permit";

const Log = (props)=> {

    const {history} = props;
    return(
        <Fragment>
            {/* <section className={classes.wrap}>
                <Bus carNumber='로그인해주세요!' bg='#bab8e6' width='70vw' height='24vh' _onClick={()=>{history.push('/login')}}/>
            </section>
            <Button text='입력' className={classes.btn} _onClick={()=>{history.push('/login')}}/> */}

            <Permit>
            <section className={classes.wrap}>
                <Bus carNumber='sexyking_kong' width='70vw' height='24vh' _onClick={()=>{history.push('/list')}}/>
            </section>
              <Button text='입력' className={classes.btn} _onClick={()=>{history.push('/write')}}/>
            </Permit>
            
        </Fragment>
    ); 
};

export default Log;