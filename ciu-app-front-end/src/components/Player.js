import React from 'react'
import { useDrag } from "react-dnd";

function Player(props) {
  // console.log(props.name)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "courseData",
        item:()=>{
          // console.log(props.rm,props.sl,props.data);
          return {data:props.name}
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
  return (
    <div ref={drag} style={{backgroundColor:isDragging?'blue':'grey',width:'100%',border:'2px solid blue',borderRadius:'5px',margin:'5px 0'}}>
        <span>{props.name}</span>
    </div>
  )
}

export default Player