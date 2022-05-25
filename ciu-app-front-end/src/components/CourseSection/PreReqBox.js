import { Grid, makeStyles } from '@material-ui/core';
import React, { PureComponent, useState } from 'react';
import { BiXCircle } from "react-icons/bi";
import clsx from 'clsx';

const useStyles=makeStyles(theme=>({
    box:{backgroundColor:"#e9e8e9",padding:"4px",margin:"8px 0px 0px 8px",borderRadius:"6px"},
    icon:{
        height:"17px",
        width:"17px",
        color:"Red",
        marginLeft:"5px"
    },
    displayBox:{
        display:"none",
    }

}))

const PreReqBox=(props)=>{
    const classes=useStyles();
    const data=props.data;
    const [show,setShow]=useState(false)
    const handleCancelClick=()=>{
        const index=data[1].indexOf(data[0]);
        data[1].splice(index,1);
        data[2](data[1]);
        setShow(true);
    }
    return (
      <Grid item className={clsx(classes.box,{[classes.displayBox]:show})}><strong>{data[0]}<span onClick={handleCancelClick} ><BiXCircle className={classes.icon}/></span></strong></Grid>
    )
}
export default PreReqBox;