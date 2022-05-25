import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
const useStyles=makeStyles(theme=>({
    slot:{
        border:"2px solid lightgrey",
        width:'100%',
        height:'auto'
    },
    disable:{
        backgroundColor:'#f1e9ebcc',
    }
    }));
function Slot(props) {
  const classes=useStyles();
  return (
    <Grid item className={classes.slot} xs={12} lg={1.8}>

    </Grid>
  )
}

export default Slot