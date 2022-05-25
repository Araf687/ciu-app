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

  slot:{
      border:'2px solid lightgrey',
      width:'100%',
      height:'30px'
  }
  }));

function RoutineSlide(props) {
  const [roomData,setRoomData]=useState([]);
  const dataFor=props.day[0]==='S'?'slotsForST':props.day[0]==='M'?'slotsForMW':'slotsForTH';
  const classes=useStyles();
  useEffect(()=>{
    fetch("http://localhost:5000/getAllClassRooms")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setRoomData(data);
        })
  },[])
    
  return (
    <div>
      <p style={{textAlign:'center',fontWeight:600}}>{props.day}</p>
      <SlideRow heading={true} data={null}></SlideRow>
      {roomData && roomData.map(data=><SlideRow 
                      dataFor={dataFor}
                      heading={false} 
                      data={data}></SlideRow>)}
    </div>
  )
}

export default RoutineSlide;