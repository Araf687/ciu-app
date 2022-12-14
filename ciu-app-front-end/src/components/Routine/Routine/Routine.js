import React, { useContext, useEffect,useState } from 'react'
import OfferedCourse from './OfferedCourse';
import RoutineSlider from './RoutineSlider';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import swal from 'sweetalert2';
import { Button } from '@mui/material';
import { routineContext } from './RoutineBoard';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FcOrgUnit } from "react-icons/fc";
import {setToSessionDb} from '../../SessionDB/SessionDB';
import {getNextSemester} from '../../functions';
let tempOfferedCourses=[];

function Routine(props) {
  const [offeredCourses,setOfferedCourses]=useState([]);
  let [option,,,updateRoutine,isCustomize,setIsCustomize]=useContext(routineContext);
  const [customize,setCustomize]=useState(false);
  const [confirm,setConfirm]=useState(false);
  const [showClash,setShowClash]=useState(false);

  useEffect(()=>{
    if(option==='create')
    {
      fetch(`http://localhost:5000/getSubjectforRoutine/${option}`)
      .then(res=>res.json())
      .then(data=>{
        if(data.data){
          console.log("create routine",data);
          const x=data.data.routineSubjects.map(item=>{
            item._id=item._id._id.trim();
            return item
          })
          console.log("update create",x)
        setOfferedCourses(data.data.routineSubjects);
        tempOfferedCourses=data.data.routineSubjects;
        }
        else{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! please at first customize your offer list.',
          })
          console.log('error');
        }
    })}
    else{
      setIsCustomize(false)
      fetch(`http://localhost:5000/getSubjectforRoutine/${option}`)
      .then(res=>res.json())
      .then(data=>{
        console.log("create routine",data);
        if('error' in data){
          console.log('jnj')
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:data.error,
          })
        }
      else{
        if(Object.keys(data).length===0){
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:`routine of ${getNextSemester()} is not exist. Create routine first`,
          })
        }
        else{
          data=data[0];
          setOfferedCourses(data.offeredCourse);
          tempOfferedCourses=data.offeredCourse;
          setToSessionDb('clashInfo',data.clashInfo);
        }
        
      }
    })
    }
  
  },[])
  const changeOfferdCourse=(option,courseName1,courseName2)=>{
    if(offeredCourses.length>0){
      tempOfferedCourses=offeredCourses;
    }
    console.log(tempOfferedCourses,offeredCourses);
    let newData;
    if(option==='remove'){
      console.log('removing',courseName1,tempOfferedCourses,offeredCourses);
      newData=tempOfferedCourses.map(element => {
        // console.log(element._id,courseName1)
        if(element._id===courseName1)
        {
          console.log('element found');
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
      tempOfferedCourses=newData;
      setOfferedCourses(newData);
      console.log(newData)
    }
    
    
    
  }
  const confirmButtonClick=()=>{
    setConfirm(true);
    updateRoutine('offered_course',offeredCourses);
    swal.fire({
      title: 'Are you sure?',
      text: "Want to upload routine",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upolad!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newRoutineData=props.getUpdateRoutine()
        console.log(newRoutineData)
        if('routine' in newRoutineData){
            submitRoutine(newRoutineData);
            setCustomize(false);
            setIsCustomize(false);
        }
        
      }
    })
  }
  const clickedCustomizeBtn=()=>{
    setCustomize(true);
    setIsCustomize(true)
    
  }
  const clickShowClashBtn=()=>{
    setShowClash(true)
  }
  const submitRoutine=(newRoutineData)=>{
    console.log(newRoutineData);
      fetch(`http://localhost:5000/submitRoutine/${option}`,{
        method:'POST',
        body:JSON.stringify(newRoutineData),
        headers:{
            "Content-Type":"application/json"
        }
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data===true){
          swal.fire(
            'Good job!',
            `Added Routine Successfully`,
            'success'
          )
        }
        else{
          let errorMsg=`something went wrong`,errorData=data.error;
          if(errorData.code===11000){
            errorMsg=`Routine of ${errorData.keyValue._id} is already exist`
          }
          // swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text:errorMsg,
          // })
          swal.fire({
            title: 'Are you sure?',
            text: errorMsg+'Want to upload routine again',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, upolad!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:5000/submitRoutine/custom`,{
                method:'POST',
                body:JSON.stringify(newRoutineData),
                headers:{
                    "Content-Type":"application/json"
                }
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data)
                if(data===true){
                  swal.fire(
                    'Good job!',
                    `Added Routine Successfully`,
                    'success'
                  )
                }})  
            }
          })
        }
      })
  }
  const backButtonStyle={fontSize:'40px',color:'#040136f7',cursor:'pointer'};
  const clashIcon={backgroundColor:'white',borderRadius:'2px',marginRight:'5px',fontSize:'16px'}
 
  return (
      <DndProvider backend={HTML5Backend}>
          <IoIosArrowRoundBack onClick={()=>{props.backToRoutineBoard()}} style={backButtonStyle}/>
          <OfferedCourse courses={offeredCourses}></OfferedCourse>
          <RoutineSlider confirm={confirm} changeOfferdCourse={changeOfferdCourse}></RoutineSlider>
          {option==='custom'&&customize===false?
          <div style={{textAlign:'center'}}>
            <Button variant="contained" onClick={()=>{clickedCustomizeBtn()}} size="small">
              Customize
            </Button>
          </div>:
          <div style={{textAlign:'center'}}>
            <Button variant="contained"onClick={()=>{confirmButtonClick()}} size="small">
              confirm Routine
            </Button>
            {option==='custom'&&<Button variant="contained" style={{marginLeft:'5px'}} onClick={()=>{setCustomize(false);setIsCustomize(false);}} size="small">
              cancel
            </Button>}
          </div>}
      </DndProvider> 

  )
}

export default Routine