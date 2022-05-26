import {makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { NoEncryption } from '@material-ui/icons';
import { useDrop } from 'react-dnd';
import Data from './Data';
const useStyles=makeStyles(theme=>({
    slot:{
        border:"2px solid lightgrey",
        width:'100%',
        height:'auto'
    },
    disable:{
        backgroundColor:'#f1e9ebcc',
    },
    course:{
      padding:'4% 4px',
      cursor:'pointer',
      color:'white',
      backgroundColor:'#0769a3eb',
      height:'36px',
      fontSize:'14px',
      fontWeight:600,
    }

    }));
function Slot(props) {
  const classes=useStyles();
  const [slotData,setSlotData]=useState(props.slotData);
  const [dragData,setDragData]=useState();
  const [isDataDropped,setIsDataDropped]=useState(typeof(slotData)==='object')

  const [{isOver},drop]=useDrop(()=>({
    accept:"courseData",
    drop: (item)=>dropData(item.data),
  }));

  const dropData=(data)=>{
    props.dataDropped(data,props.slot)
    setSlotData(data._id);
    setIsDataDropped(true);
  }
  return (
    <div ref={drop} className={clsx( {[classes.course]:isDataDropped})}>
      <Data data={props.slotData}></Data>
    </div>
  )
}

export default Slot