import React, { useContext, useEffect,useState } from 'react'
import OfferedCourse from './OfferedCourse';
import RoutineSlider from './RoutineSlider';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import swal from 'sweetalert2';
import { Button } from '@mui/material';
import { routineContext } from './RoutineBoard';


function Routine(props) {
  let tempOfferedCourses=[];
  let [option,,,,isCustomize,setIsCustomize]=useContext(routineContext);
  const [customize,setCustomize]=useState(false);
  const [confirm,setConfirm]=useState(false);
  const [offeredCourses,setOfferedCourses]=useState([]);

  useEffect(()=>{
    if(option==='create')
    {
      fetch(`http://localhost:5000/getSubjectforRoutine/${option}`)
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
      setIsCustomize(false)
    fetch(`http://localhost:5000/getSubjectforRoutine/${option}`)
    .then(res=>res.json())
    .then(data=>{
      if('error' in data){
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:data.error,
        })
      }
      else{
        setOfferedCourses(data.offeredCourse);
        tempOfferedCourses=data.offeredCourse;
        props.setClashObj(data.clashInfo)
      }
    })
    }
  
  },[])
  const changeOfferdCourse=(option,courseName1,courseName2)=>{
    if(offeredCourses.length>0){
      tempOfferedCourses=offeredCourses;
    }
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
      setOfferedCourses(newData);
    }
    
    console.log(newData)
    
  }
  const confirmButtonClick=()=>{
    setConfirm(true);
    props.confirmRoutine('offered_course',offeredCourses);
    setCustomize(false);
    setIsCustomize(false)
  }
  const clickedCustomizeBtn=()=>{
    setCustomize(true);
    setIsCustomize(true)
    
  }
 
  return (
      <DndProvider backend={HTML5Backend}>
        <OfferedCourse courses={offeredCourses}></OfferedCourse>
        <RoutineSlider c={true} confirm={confirm} changeOfferdCourse={changeOfferdCourse}></RoutineSlider>
        {option==='custom'&&customize===false?
        <div style={{textAlign:'center'}}>
          <Button variant="contained"onClick={()=>{clickedCustomizeBtn()}} size="small">
            Customize
          </Button>
        </div>:
        <div style={{textAlign:'center'}}>
          <Button variant="contained"onClick={()=>{confirmButtonClick()}} size="small">
            confirm Routine
          </Button>
        </div>}
      </DndProvider> 

  )
}

export default Routine