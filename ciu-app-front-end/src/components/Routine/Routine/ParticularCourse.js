import React from 'react'
import { useDrag } from 'react-dnd'

function ParticularCourse(props) {
  const [{isDragging},drag]=useDrag(()=>({
    type:"image",
    collect:(monitor)=>({
      isDragging:!!monitor.isDragging(),
    }),
  }))
  return (
    <div ref={drag} style={{backgroundColor:isDragging?'salmon':'#0769a3eb',color:'white',borderRadius:'4px',padding:'0px 4px',cursor:'pointer',margin:'2px',}}>
        <span style={{fontWeight:600,fontSize:'14px'}}>{props.id}</span>
    </div>
  )
}

export default ParticularCourse