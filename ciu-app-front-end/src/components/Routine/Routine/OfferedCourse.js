import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import ParticularCourse from './ParticularCourse';

const useStyles=makeStyles((theme)=>({
    root:{
        padding:'10px',
        backgroundColor:'white',
        display:'flex',
        marginBottom:'10px'

    }
}))
function OfferedCourse(props) {
    const classes=useStyles();
    const courses=props.courses;
    useEffect(()=>{
    },[])
  return (
    <Grid container className={classes.root}>
        {courses && courses.map(data=><ParticularCourse id={data._id}></ParticularCourse>)}
    </Grid>
  )
}

export default OfferedCourse