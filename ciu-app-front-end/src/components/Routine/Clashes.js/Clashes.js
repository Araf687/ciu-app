import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import {getClashCheckingObject} from '../../functions';

import { Box, Tab, Tabs } from '@material-ui/core';
import ClashesInParticularSlots from './ClashesInParticularSlots';
import TeachersClash from './TeachersClash';

const useStyles=makeStyles(theme=>({
  root:{
    background:'white',
    borderRadius:'5px',
    padding:'10px'
  },
  heading:{
    fontWeight:'600',
    textAlign:'center',
    fontSize:'20px',
    marginTop:'20px'
  },
  backButtonStyle:{
    fontSize:'25px',
    color:'white',
    cursor:'pointer',
    fontWeight:'bolder',

  },
}))

function Clashes(props) {
  console.log(props)
  const classes=useStyles();
  const day=props.day.split('/');
  const key=day[0][0]==="T"?"TH":day[0][0]+day[1][0];
  const clashData=props.clashCheckingObj?props.clashCheckingObj[key]:getClashCheckingObject()[key];
  const dataKeys=Object.keys(clashData[['studentClash']]);
  console.log(key,clashData['studentClash']);

  const [value, setValue] = React.useState('stClash');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={()=>{props.setShowClash(false)}}  variant="contained" size="small">
          <IoIosArrowRoundBack className={classes.backButtonStyle}/>
          Back to Routine
        </Button>
      </div>
      <p className={classes.heading}>
        CLash Information
        <br></br>( {day[0]}-{day[1]} Schedule )
      </p>
      <div>
        <Box sx={{ width: '100%' }}> 
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
            >
              <Tab value="stClash" label="Student Clash"/>
              <Tab value="teacherClash" label="Teachers Clash" />
                            
            </Tabs>
        </Box> 
        <div>
          {value==="stClash"&&dataKeys.map(slot=><ClashesInParticularSlots slot={slot} data={clashData['studentClash'][slot]}/>)}
          {value==="teacherClash" && <TeachersClash data={clashData['teacherClash']}/>}
        </div>
 
      </div>
        
  </div>
  )
}

export default Clashes