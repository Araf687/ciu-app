import React from 'react'
import { useDrop,useDrag } from 'react-dnd';
function Data(props) {
    console.log(props.data);
    const [{isDragging},drag]=useDrag(()=>({
        type:"courseData",
        item:{data:props.data},
        collect:(monitor)=>({
          isDragging:!!monitor.isDragging(),
        }),
      }))
  return (
    <div ref={drag}>
        {typeof(props.data)==='boolean'?`${props.data}`:props.data._id}
        
    </div>
  )
}

export default Data