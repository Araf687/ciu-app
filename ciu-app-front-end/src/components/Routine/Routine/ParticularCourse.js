import React from 'react';
import { useDrag } from 'react-dnd';
import {makeStyles } from '@material-ui/core';

const useStyles= makeStyles((theme)=>({
  root:{
    borderRadius:'4px',
    padding:'0px 4px',
    cursor:'pointer',
    margin:'2px',
    color:'white'

  }
}))

function ParticularCourse(props) {
  const classes=useStyles();
  const courseId=props.id._id;

  const [{isDragging},drag]=useDrag(()=>({
    type:"courseData",
    item:{data:props.id},
    collect:(monitor)=>({
      isDragging:!!monitor.isDragging(),
    }),
  }))
  return (
    <>
      {courseId[courseId.length-1]!==' '?<div ref={drag} className={classes.root} style={{backgroundColor:isDragging?'salmon':'#0769a3eb'}}>
          <span style={{fontWeight:600,fontSize:'14px'}}>{courseId}</span>
      </div>:
      <div className={classes.root} style={{backgroundColor:'#05a505'}}>
          <span style={{fontWeight:600,fontSize:'14px'}}>{courseId}</span>
      </div>
      }
    </>
  )
}

export default ParticularCourse