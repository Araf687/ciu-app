import {makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';
import Data from './Data';
import swal from 'sweetalert2';
import { routineContext } from './RoutineBoard';
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
  let [,,,,isCustomize,]=useContext(routineContext);

  const [isDataDropped,setIsDataDropped]=useState(typeof(props.slotData)==='object')
  const [{isOver},drop]=useDrop(()=>({
    accept:"courseData",
    drop: (item)=>dropData(item.data),
  }));
  const dropData=(data)=>{
      props.dataDropped(data,props.slot);
      setIsDataDropped(true);
  }
  return (
    <>{isCustomize===true?<div ref={drop} style={{height:'36px'}} 
      className={clsx( {[classes.course]:isDataDropped&&typeof(props.slotData)!=="boolean"})}
    >
      {typeof(props.slotData) !== "boolean"&&
        <Data data={props.slotData} ></Data>
      }
    </div>:<div style={{height:'36px'}} 
      className={clsx( {[classes.course]:isDataDropped&&typeof(props.slotData)!=="boolean"})}
    >
      {typeof(props.slotData) !== "boolean"&&
        <Data data={props.slotData} ></Data>
      }
    </div>}</>
  )
}

export default Slot