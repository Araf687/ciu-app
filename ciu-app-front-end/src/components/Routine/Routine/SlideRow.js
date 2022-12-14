import { makeStyles } from '@material-ui/core';
import { Grid } from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react'
import Slot from './Slot';

const useStyles=makeStyles(theme=>({
    root:{
        textAlign:'center',
        backgroundColor:'white',
        margin:'10px 0px',
        borderRadius:'5px',
    },
    headingSlot:{
        width:'100%',
        height:'auto',
        padding:'5px 0px'
    },
    slot:{
        border:"2px solid lightgrey",
        width:'100%',
        height:'40px',
        

    },
    disable:{
        border:"2px solid lightgrey",
        backgroundColor:'#f3f4f5',
    }
    }));

function SlideRow(props) {
    // console.log('slideRow');
    const classes=useStyles();
    const allSlots=['8:00 am','9:30 am','11:00 am','12:30 pm','2:00 pm','3:30 pm']
    const [rowData,setRowData]=useState(props.data);
    const dataForWhichDay=props.dataFor;    

    const dataDropped=(data,slot)=>{
        props.changeRoutineData(data,props.data._id,slot)
    }
    
  return ( 
    <Grid container className={classes.root}>
        {props.heading?
        <>
            <Grid item xs={12} lg={1.2} >
                <small><strong> Room No</strong></small>
            </Grid>
            <Grid item className={classes.headingSlot} xs={12} lg={1.8}>
            <small><strong>8:00am - 9.30am</strong></small>
            </Grid>
            <Grid item xs={12} lg={1.8} className={classes.headingSlot}>
            <small><strong>9:30am - 11:00am</strong></small>

            </Grid>
            <Grid item xs={12} lg={1.8} className={classes.headingSlot}>
            <small><strong>11:00am - 12:30pm</strong></small>
            </Grid>
            <Grid item xs={12} lg={1.8} className={classes.headingSlot}>
            <small><strong>12:30am - 2:00pm</strong></small>
            </Grid>
            <Grid item xs={12} lg={1.8} className={classes.headingSlot}>
            <small><strong>2:00pm - 3:30pm</strong></small>
            </Grid>
            <Grid item xs={12} lg={1.8} className={classes.headingSlot}>
            <small><strong>3:30pm - 5:00pm</strong></small>
            </Grid>
        </>
        :
        <>
            <Grid item xs={12} lg={1.2} >
                <p style={{fontWeight:600}}>{props.data._id}</p>
            </Grid>
            {rowData&&allSlots.map(slot=><Grid 
                    className={clsx(classes.slot, rowData[dataForWhichDay][slot]===false&&[classes.disable])} 
                    xs={12} lg={1.8}
                >
                <Slot dataDropped={dataDropped} 
                slot={slot}
                slotData={rowData[dataForWhichDay][slot]}></Slot>
            </Grid>)}
        </>}
    </Grid>
  )
}

export default SlideRow