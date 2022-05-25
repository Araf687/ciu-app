import React, { useEffect,useState } from 'react'
import OfferedCourse from './OfferedCourse';
import RoutineSlider from './RoutineSlider';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


function Routine(props) {
  const [offeredCourses,setOfferedCourses]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/getSubjectforRoutine")
    .then(res=>res.json())
    .then(data=>{
      if(data.data){
       setOfferedCourses(data.data.routine);
      }
      else{
        console.log('error');
      }
    })
  },[])
  return (
    <DndProvider backend={HTML5Backend}>
      <OfferedCourse courses={offeredCourses}></OfferedCourse>
      <RoutineSlider></RoutineSlider>
    </DndProvider>
  )
}

export default Routine