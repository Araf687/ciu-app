import React from 'react'
import SlideRow from './SlideRow';
import { useEffect, useState } from 'react';
import { Grid,makeStyles } from '@material-ui/core';

const useStyles=makeStyles(theme=>({
  root:{
      textAlign:'center',
      backgroundColor:'white',
      margin:'10px'
  },
  }));

function RoutineSlide(props) {
  const [routineData,setRoutineData]=useState([]);
  const dataFor=props.day[0]==='S'?'slotsForST':props.day[0]==='M'?'slotsForMW':'slotsForTH';
  const classes=useStyles();
  useEffect(()=>{
    fetch("http://localhost:5000/getAllClassRooms")
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            setRoutineData(data);
        })
  },[])
  const changeRoutineData=(data,roomId,slot)=>{
    // console.log(data,roomId,slot,dataFor);
    const newData=routineData.map(rData=>{
      if(rData._id===roomId)
      {
        rData[dataFor][slot]=data;
      }
      return rData;
    })
    setRoutineData(newData);
  }
    
  return (
    <div>
      <p style={{textAlign:'center',fontWeight:600}}>{props.day}</p>
      <SlideRow heading={true} data={null}></SlideRow>
      {routineData && routineData.map(data=><SlideRow 
                      changeRoutineData={changeRoutineData}
                      dataFor={dataFor}
                      heading={false} 
                      data={data}></SlideRow>)}
    </div>
  )
}

export default RoutineSlide;