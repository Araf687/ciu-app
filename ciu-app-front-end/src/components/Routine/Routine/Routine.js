import React, { useContext, useEffect,useState } from 'react'
import OfferedCourse from './OfferedCourse';
import RoutineSlider from './RoutineSlider';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { contextAdmin } from '../../Admin/Admin/Admin';
import { Button } from '@mui/material';


function Routine(props) {
  let tempOfferedCourses=[];
  const option=props.option;
  const [customize,setCustomize]=useState(true);
  const [confirm,setConfirm]=useState(false);
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
      setCustomize(false);
      fetch(`http://localhost:5000/getRoutine`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
    })}
  
  },[])
  const changeOfferdCourse=(option,courseName1,courseName2)=>{
    if(offeredCourses.length>0){
      tempOfferedCourses=offeredCourses;
    }
    // console.log(option,courseName,offeredCourses, tempOfferedCourses);
    let newData;
    if(option==='remove'){
      newData=tempOfferedCourses.map(element => {
        if(element._id===courseName1)
        {
           element._id+=' ';
          
        }
        return element;
      });
    }
    else{
      newData=tempOfferedCourses.map(element => {
        if(element._id===courseName1)
        {
           element._id+=' ';
          
        }
        else if(element._id===courseName2){
          console.log(element)
          element.timeSlot='';
          element.roomNo='';
          element._id=element._id.trim()
        }
        return element;
      });
      // tempOfferedCourses=newData;
      setOfferedCourses(newData);
    }
    
    console.log(newData)
    
  }
  const confirmButtonClick=()=>{
    setConfirm(true);
    props.confirmRoutine('offered_course',offeredCourses);
  }
 
  return (
      <DndProvider backend={HTML5Backend}>
        <OfferedCourse courses={offeredCourses}></OfferedCourse>
        <RoutineSlider confirm={confirm} customize={customize} changeOfferdCourse={changeOfferdCourse}></RoutineSlider>
        {option==='custom'&&<div style={{textAlign:'center'}}>
          <Button variant="contained"onClick={()=>{setCustomize(true);}} size="small">
            Customize
          </Button>
        </div>}
        {
        customize&&<div style={{textAlign:'center'}}>
          <Button variant="contained"onClick={()=>{confirmButtonClick()}} size="small">
            confirm Routine
          </Button>
        </div>

        }
      </DndProvider> 

  )
}

export default Routine