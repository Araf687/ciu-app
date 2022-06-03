import React from "react";
import {useDrag } from "react-dnd";
function Data(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "courseData",
    item:()=>{return {data:props.data}},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  // console.log(props.data._id)
  return (
    <div ref={drag}>{typeof(props.data) === "boolean" ? '': props.data._id}</div>
  );
}

export default Data;
