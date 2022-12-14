import { Grid } from '@material-ui/core';
import React from 'react'

const ShowSlotWiseCLash=(props)=> {
    const data=props.teacherClashData;
    const keys=Object.keys(data);
    const slot=props.timeSlot;
    console.log(slot);
    
  return (
    <div style={{margin:'10px 0px',background:'aliceblue',padding:'10px 20px'}}>
        <p style={{textAlign:'center',fontWeight:'bold'}}>{slot}</p>
        {keys.length>0?
            <div>
               { keys.map(item=><Grid container><Grid item lg={3} style={{fontWeight:'600',color:'#0d0dad',marginBottom:'10px'}}>{item}</Grid><Grid item lg={3}></Grid>{data[item].toString()}</Grid>)}
            </div>
        :
            <div><p style={{textAlign:'center'}}>No clashes held in this slot</p></div>
        }
        
    </div>
  )
}
export default ShowSlotWiseCLash;