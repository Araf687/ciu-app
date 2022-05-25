import { Grid } from '@mui/material';
import React, { PureComponent, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Collapse from "@mui/material/Collapse";
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles=makeStyles(theme=>({
    root:{backgroundColor:"#abc0c5",borderRadius:"8px",},
    courseRow:{
        padding:"5px 10px 5px 10px",
        borderRadius:"8px",
        textAlign:"center"
    },
    addBTN:{
        backgroundColor:"white",
        borderRadius:"4px",
        '&:hover':{
            cursor:"pointer",
        }
    },
    hideComponent:{
        display:"none",
    },
    courseDescription:{
        textAlign:"left",
        backgroundColor:"white",
        borderRadius:"5px",
        padding:"5px"
    }
}))

const Result=()=> {
    const classes=useStyles();
    const [collapse,setCollapse]=useState(false);
    const [show,setShow]=useState(false);
    const handleCLick=()=>{
        console.log("click delete");
        fetch(`http://localhost:5000/deleteAll`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    return (
      <div className={classes.root}>
          {/* <button onClick={()=>{handleCLick()}}>delete teacher</button> */}
          <Grid container className={classes.courseRow}>
              <Grid item lg={1}><strong>Sl No</strong></Grid>
              <Grid item lg={1}><strong>Course Id</strong></Grid>
              <Grid item lg={4}><strong>Course Name</strong></Grid>
              <Grid item lg={2}><strong>Completed Student</strong></Grid>
              <Grid item lg={2}><strong>Incompleted Student</strong></Grid>
              <Grid item lg={1}><strong>Actions</strong></Grid>
              <Grid item lg={1}>
                    {!show?<AddIcon onClick={()=>{setShow(!show)}} className={classes.addBTN}></AddIcon>:<RemoveIcon onClick={()=>{setShow(!show)}} className={classes.addBTN}/> }
             </Grid>
             <Grid item lg={12} style={{padding:"0px 5px"}}>
             <Collapse in={show}>
                
                    <div className={classes.courseDescription}>
                        <div>
                            <strong >Course Description:</strong >
                            <p>
                                <span>sdsd</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong >Pre-requisite courses:</strong >
                            </p>
                        
                        </div>
                        <div>
                            <p>
                                <strong >Completed students list:</strong >
                            </p>
                        
                        </div>
                        <div>
                            <p>
                                <strong>incompleted students list:</strong>  
                            </p>
                        
                        </div>
                    </div>
                    </Collapse> 
                </Grid>

             
            

          </Grid>
          <div>
              
          </div>
      </div>
    );
}
export default Result;