import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import CheckBox from '../CustomizedStyleComponent.js/CheckBox';

 
const useStyles=makeStyles(theme=>({
    root:{
        padding:'4px',
        marginRight:'5px',
        fontWeight:'600'

    }
    }));

function TimeSlot(props) {
  const classes=useStyles();
  const time=props.time;
  const handleCheckBox_Checked=(e)=>{
    console.log(e.target.value);
    props.setSLot(e.target.value);
  }
  return (
    <div>
      {<><CheckBox size="small" onChange={(e)=>{handleCheckBox_Checked(e)}} value={time}></CheckBox><span className={classes.root}>{time}</span></>
       }
    </div>
    
    
  )
}

export default TimeSlot