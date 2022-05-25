import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Routine from './Routine';
const useStyles=makeStyles(theme=>({
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        ['& span']:{
          margin:'6px 0 0 2px',
          fontSize:'15px'
        },
        marginBottom:'30px',

  },
  rulesBoard:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  rules:{
    backgroundColor:"white",
    padding:"20px",
    borderRadius:"10px",

},
}))

const RoutineBoard=()=>{
    const classes=useStyles();
    const [completeStep,setCompleteStep]=useState(true);
    const [createRoutine,setCreateRoutine]=useState(true);


    const clickCompleted=()=>{
      setCompleteStep(false);
    }
    return (
      <div>
        <div className={classes.breadcumbs}>
            <h2>Routine</h2>
            <span><Link to="/dashboard">Dashboard</Link> / Routine</span> 
        </div>
        {createRoutine?<><div className={classes.rulesBoard}>
          <div className={classes.rules}>
            <h5>Please finish the steps before creating the Routine</h5>
            <ul>
              <li>Add all the rooms</li>
              <li>Alter the batches from the course if needed</li>
            </ul>
          </div>
        </div>
        <div style={{textAlign:"center",margin:"10px 0px"}}>
            {completeStep?<Button onClick={()=>{clickCompleted()}} variant="contained">Yes, I have complete the steps</Button>
            :<Button onClick={()=>{setCreateRoutine(false)}} style={{marginLeft:'15px'}} variant="contained">Create Routine</Button>}
        </div></>:<Routine></Routine>}
        
      </div>
    )
  
}
export default RoutineBoard;
