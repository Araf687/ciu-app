import { Grid } from '@material-ui/core';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import ClashesInParticularRoom from './ClashInParticularRoom';
import ShowSlotWiseCLash from './ShowSlotWiseCLash';

function TeachersClash(props) {
  console.log(props.data);
  const roomWiseData=props.data['roomWise'];
  const slotWiseData=props.data['slotWise'];
  const keys=Object.keys(roomWiseData);
  const [clickSlotWiseBTN,setClickSlotWiseBTN]=useState(false);

  const keys_slotWiseData=Object.keys(slotWiseData)
  console.log(keys_slotWiseData);

  return (
    <>
    <div style={{margin:'15px 5px',textAlign:'center'}}>
      <Button 
        onClick={()=>{setClickSlotWiseBTN(false);}} 
        variant="contained"
        size="small"
      >show room wise clashes</Button>
      <Button 
        onClick={()=>{setClickSlotWiseBTN(true);}} 
        variant="contained"
        size="small"
        style={{marginLeft:'15px'}}
      >show slot wise clashes</Button>
            
    </div>
    {!clickSlotWiseBTN?
    <div style={{maxHeight:'500px',overflowY:'scroll'}}>
      {keys.map(roomNo=><ClashesInParticularRoom key={roomNo} type='roomWise' roomId={roomNo} teacherClashData={roomWiseData[roomNo]}></ClashesInParticularRoom>)}
    </div>:
      <div>
        <h4>slot wise teacher clash</h4>
        {keys_slotWiseData.map(slot=><ShowSlotWiseCLash timeSlot={slot} teacherClashData={slotWiseData[slot]['clashData']}></ShowSlotWiseCLash>)}
      </div>
    }
    </>
    
  )
}

export default TeachersClash