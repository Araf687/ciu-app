import { Button } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ReAddCourseRow from './ReAddCourseRow';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles=makeStyles(theme=>({
    row:{
        textAlign:"center",
        backgroundColor:"white",
        padding:"10px",
        borderRadius:"8px",
        marginBottom:"5px",
        "& h6":{
            margin:"0",
            fontWeight:700,
        },
      },

}))

const ReAddCourse=(props)=> {
    const classes=useStyles();
    
    const data=props.data;
    console.log(data);
    let i=0;
    const handleClickBack=()=>{
        props.backFunc();
    }
    const handleCustomiseClick=()=>{
         
    }
    return (
      <div>
          <div>
            <Button variant="contained" onClick={()=>{handleClickBack()}} style={{textAlign:"center",margin:"10px 0px"}}>
              <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
            </Button>
          </div>
          <div>
            <Grid className={classes.row} container>
                <Grid item lg={1}>
                    <h6>Sl No</h6>
                </Grid>
                <Grid item lg={1}>
                    <h6>course Id</h6>
                </Grid>
                <Grid item lg={3}>
                    <h6>Course Name</h6>
                </Grid>
                <Grid item lg={4}>
                    <h6>Batch</h6>
                </Grid>
                <Grid item lg={2}>
                    <h6>Total Student</h6>
                </Grid>
                <Grid item lg={1}>
                    <h6>Actions</h6>
                </Grid>

            </Grid>
              {data.map(dt=><ReAddCourseRow i={++i} semester={props.semester} data={dt}></ReAddCourseRow>)}
          </div>

          <div>
            <Button variant="contained" onClick={()=>{handleCustomiseClick()}} style={{textAlign:"center"}}>
              customise
            </Button>
          </div>
      </div>
    )
}
export default ReAddCourse;