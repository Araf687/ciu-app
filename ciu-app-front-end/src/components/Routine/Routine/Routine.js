import React, { useContext, useEffect,useState } from 'react'
import OfferedCourse from './OfferedCourse';
import RoutineSlider from './RoutineSlider';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { contextAdmin } from '../../Admin/Admin/Admin';


function Routine(props) {
  let tempOfferedCourses=[];
  const option=props.option;
  console.log(option)
  const [offeredCourses,setOfferedCourses]=useState([]);
  useEffect(()=>{
    if(option==='create')
    {fetch(`http://localhost:5000/getSubjectforRoutine/${option}`)
    .then(res=>res.json())
    .then(data=>{
      if(data.data){
       setOfferedCourses(data.data.routineSubjects);
       tempOfferedCourses=data.data.routineSubjects;
      }
      else{
        console.log('error');
      }
    })}
    else{
      fetch(`http://localhost:5000/getRoutine`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
    })}
  
  },[])
  const changeOfferdCourse=(option,courseName)=>{
    if(offeredCourses.length>0){
      tempOfferedCourses=offeredCourses;
    }
    // console.log(option,courseName,offeredCourses, tempOfferedCourses);
    const newData=tempOfferedCourses.map(element => {
      if(element._id===courseName)
      {
        element._id+=' ';
      }

      return element;
    });
    // console.log(newData)
    // setOfferedCourses(newData);
  }
 
  return (
      <DndProvider backend={HTML5Backend}>
        <OfferedCourse courses={offeredCourses}></OfferedCourse>
        <RoutineSlider changeOfferdCourse={changeOfferdCourse}></RoutineSlider>
      </DndProvider> 

  )
}

export default Routine