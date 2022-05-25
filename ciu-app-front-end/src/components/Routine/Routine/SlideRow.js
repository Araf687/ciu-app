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
        borderRadius:'5px'
    },
    headingSlot:{
        width:'100%',
        height:'30px'
    },
    slot:{
        border:"2px solid lightgrey",
        width:'100%',
        height:'auto'

    },
    disable:{
        border:"2px solid lightgrey",
        backgroundColor:'#f3f4f5',
    }
    }));

function SlideRow(props) {
    const classes=useStyles();
    const [rowData,setRowData]=useState(props.data);
    const dataForWhichDay=props.dataFor;    
    !props.heading&&console.log(rowData[dataForWhichDay]['3:30 pm']);
    
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
            <Grid item className={clsx(classes.slot, rowData[dataForWhichDay]['8:00 am']===false&&[classes.disable])} xs={12} lg={1.8}>

            </Grid>
            <Grid item xs={12} lg={1.8} className={clsx(classes.slot, rowData[dataForWhichDay]['9:30 am']===false&&[classes.disable] )}>

            </Grid>
            <Grid item xs={12} lg={1.8} className={clsx(classes.slot, rowData[dataForWhichDay]['11:00 am']===false&&[classes.disable] )}>

            </Grid>
            <Grid item xs={12} lg={1.8} className={clsx(classes.slot, rowData[dataForWhichDay]['12:30 pm']===false&&[classes.disable] )}>

            </Grid>
            <Grid item xs={12} lg={1.8} className={clsx(classes.slot, rowData[dataForWhichDay]['2:00 pm']===false&&[classes.disable] )}>

            </Grid>
            <Grid item xs={12} lg={1.8} className={clsx(classes.slot, rowData[dataForWhichDay]['3:30 pm']===false&&[classes.disable])}>

            </Grid>
        </>}
    </Grid>
  )
}

export default SlideRow