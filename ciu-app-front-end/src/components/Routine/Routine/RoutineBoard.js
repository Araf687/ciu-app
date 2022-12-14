import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Routine from './Routine';
import {getClashCheckingObject,showClash,filteredRoutineData,findTeachersClash,updateTeachersClash_slotWise} from '../../functions';
import {setToSessionDb,getFromSessionDb,isDataExistInSession,removeItemFromSession} from '../../SessionDB/SessionDB';
import swal from 'sweetalert2';
import { set } from 'date-fns';
const useStyles=makeStyles(theme=>({
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        ['& span']:{
          margin:'6px 0 0 2px',
          fontSize:'15px'
        },
        marginBottom:'30px',

  },
  rulesBoard:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  rules:{
    backgroundColor:"white",
    padding:"20px",
    borderRadius:"10px",

},
}))
let x={}
export const routineContext=React.createContext();

const RoutineBoard=()=>{
    const classes=useStyles();
    let [udatedRoutineData,setUpdatedRoutineData]=useState({});
    const [completeStep,setCompleteStep]=useState(true);
    const [createRoutine,setCreateRoutine]=useState(true);
    const [option,setOption]=useState('');
    // const m=option==='custom'?x:getClashCheckingObject();
    // console.log(m);
    // const [clashCheckingObj,setclashCheckingObj]=useState(m);
    let [isCustomize,setIsCustomize]=useState(true);
    
    const clickCompleted=()=>{
      setCompleteStep(false);
    }

    const checkTeacherClash=(courseName,faculty,roomNo,tempTeacherClash,timeSlot,tempTeacherClashSlotWise)=>{
      const key=timeSlot.slice(0,2);
      const index=key==='8:'?0:key==='9:'?1:key==='11'?2:key==='12'?3:key==='2:'?4:5;

      // inserting data in teachers clash object as room wise
      if(roomNo in tempTeacherClash){
        let teacherClashes={tempTeacherClash};
        let teachers=tempTeacherClash[roomNo]['teachers'];
        let courses=tempTeacherClash[roomNo]['courses'];
        teachers[index]=faculty;
        courses[index]=courseName;
        //sending an array to the function and it gives the information of clashes of teachers
        teacherClashes=findTeachersClash(teachers,courses)
        tempTeacherClash[roomNo]={teachers:teachers,teacherClashes:teacherClashes,courses:courses}
      }
      else{
        let teachers=new Array(6),courses=new Array(6);
        teachers[index]=faculty;
        courses[index]=courseName
        tempTeacherClash[roomNo]={teachers:teachers,teacherClashes:{},courses:courses};
      }

      // inserting data in teachers clash object as slot wise
      if(faculty in tempTeacherClashSlotWise[timeSlot]){
        tempTeacherClashSlotWise[timeSlot][faculty].push(courseName)
      }
      else{
        tempTeacherClashSlotWise[timeSlot][faculty]=[courseName];
      }

      tempTeacherClashSlotWise=updateTeachersClash_slotWise(tempTeacherClashSlotWise);

      return {roomWise:tempTeacherClash,slotWise:tempTeacherClashSlotWise};
    } 

    const check=(dragedData1,day,dragedData2)=>{

      const clashCheckingObj=isDataExistInSession('clashInfo')?getFromSessionDb('clashInfo'):getClashCheckingObject();
      const {_id,faculty,timeSlot,roomNo,eligible}=dragedData1;

      const day_routine=day.substring(day.length-2,day.length);
      let tempObject=clashCheckingObj[day_routine]['studentClash'][timeSlot];

      //check teachers clash on a particular room
      let tempTeacherClash=clashCheckingObj[day_routine]['teacherClash']['roomWise'];
      //check teachers clash in particular slot
      let tempTeacherClashSlotWise=clashCheckingObj[day_routine]['teacherClash']['slotWise'];
      //update tempTeacherClash object by assigning new faculties
      tempTeacherClash=checkTeacherClash(_id,faculty,roomNo,tempTeacherClash,timeSlot,tempTeacherClashSlotWise);


      let newClashData=clashCheckingObj;
      if(Object.keys(tempObject).length>0){
        eligible.forEach(stId=>{
          if(stId in tempObject){
            //clash 
            tempObject[stId]=[...tempObject[stId],_id]
          }
          else{
            tempObject[stId]=[_id];
          }
        })
      }
      else{
        eligible.forEach(stId=>{
          tempObject[stId]=[_id];
        })
      }
      newClashData[day_routine]['studentClash'][timeSlot]=tempObject;
//the function get two drag data only when we swipe two courses
      if(dragedData2){
        const _id2=dragedData2._id,timeSlot2=dragedData2.timeSlot;
        const roomNo2=dragedData2.roomNo,faculty2=dragedData2.faculty;
        const eligible2=dragedData2.eligible;
        let tempObject2=clashCheckingObj[day_routine]['studentClash'][timeSlot2];
        
        //check teachers clash on a particular room
        let tempTeacherClash=clashCheckingObj[day_routine]['teacherClash']['roomWise'];
        //check teachers clash in particular slot
        let tempTeacherClashSlotWise=clashCheckingObj[day_routine]['teacherClash']['slotWise'];
        //update tempTeacherClash object by assigning new faculties
        tempTeacherClash=checkTeacherClash(_id2,faculty2,roomNo2,tempTeacherClash,timeSlot2,tempTeacherClashSlotWise);

        if(Object.keys(tempObject2).length>0){
          eligible2.forEach(stId=>{
            if(stId in tempObject2){
              //clash
              tempObject2[stId]=[...tempObject2[stId],_id2]
            }
            else{
              tempObject2[stId]=[_id2];
            }
          })
        }
        else{
          eligible2.forEach(stId=>{
            tempObject2[stId]=[_id2];
          })
        }
        newClashData[day_routine]['studentClash'][timeSlot2]=tempObject2;

      }
      newClashData[day_routine]['teacherClash']=tempTeacherClash;
      showClash(tempObject,day_routine,timeSlot,tempTeacherClash,roomNo)
      // console.log(dragedData1,dragedData2)
      // setclashCheckingObj(newClashData);
      setToSessionDb('clashInfo',newClashData)
      console.log(newClashData);
    }

    const clearClashObj=(dragedData1,dataFor,type,dragedData2)=>{

      const {_id,timeSlot,roomNo,faculty,eligible}=dragedData1;
      const clashCheckingObj=getFromSessionDb('clashInfo');
      const day=dataFor.substring(dataFor.length-2,dataFor.length);

      //select the particular object from clash objeect to change or clear its data
      const tempObj=clashCheckingObj[day]['studentClash'][timeSlot];
      let newClashObj;
      if(type==='singleData'){
        //when we drag single courses from one slot to another slot
        //we have to delte the data from its previous location

        //clearing the teacher from teacherClash section of clashchecking object
        const substring=timeSlot.slice(0,2);
        const index=substring==='8:'?0:substring==='9:'?1:substring==='11'?2:substring==='12'?3:substring==='2:'?4:5;
        let tempTeacherClash=clashCheckingObj[day]['teacherClash']['roomWise'][roomNo];
        tempTeacherClash['teachers'][index]=null;
        tempTeacherClash['courses'][index]=null;
        //after updating the teachers array we again check the clash and then update the teachers-clash-info
        tempTeacherClash.teacherClashes=findTeachersClash(tempTeacherClash['teachers']);

        // clearing teachers data slot wise
        let tempTeacherClash_slotWise=clashCheckingObj[day]['teacherClash']['slotWise'][timeSlot];
        // console.log(faculty,clashCheckingObj[day]['teacherClash'],dragedData1)
        const dlt_arr_item=tempTeacherClash_slotWise[faculty]
        dlt_arr_item.length>1?dlt_arr_item.splice(dlt_arr_item.indexOf(_id), 1):delete tempTeacherClash_slotWise[faculty];


        //clearing the course which assigned to the particular id's 
        eligible.forEach(stId=>{
          //check if a particular id assigned for one courses(data) in the same slot then delete the whole object
          if(tempObj[stId].length===1){
            //delete the the key from the object
            // console.log('dlete done');
            delete tempObj[stId];
          }
          else{
            //delete the course id from the object array of clashChecking object
            const indexOfCourse=tempObj[stId].indexOf(_id);
            tempObj[stId].splice(indexOfCourse, 1);
          }
        })
        newClashObj=clashCheckingObj;
        newClashObj[day]['studentClash'][timeSlot]=tempObj;
        
      }
      else if(type==='swipe'){
        //when swiping in two different Slots
        const _id2=dragedData2._id,timeSlot2=dragedData2.timeSlot,eligible2=dragedData2.eligible;
        const faculty2=dragedData2.faculty,course2=dragedData2._id;

        //clearing slotWise teacher clash object data
        let temp_teacherClashObject=clashCheckingObj[day]['teacherClash']['slotWise'];
        let array1=temp_teacherClashObject[timeSlot][faculty],array2=temp_teacherClashObject[timeSlot2][faculty2];
        array1.length>1?temp_teacherClashObject[timeSlot][faculty].splice(array1.indexOf(_id),1):delete temp_teacherClashObject[timeSlot][faculty];
        array2.length>1?temp_teacherClashObject[timeSlot2][faculty2].splice(array2.indexOf(course2),1):delete temp_teacherClashObject[timeSlot2][faculty2];

        const tempObj2=clashCheckingObj[day]['studentClash'][timeSlot2];
        eligible.forEach(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj[stId].length===1){
            //delete the the key from the object
            // console.log('dlete done');
            delete tempObj[stId];
          }
          else{
            //delete the course id from the key array of clashChecking object
            const indexOfCourse=tempObj[stId].indexOf(_id);
            tempObj[stId].splice(indexOfCourse, 1);
          }
        })
        eligible2.forEach(stId=>{
          // console.log(stId,tempObj2)
          //check if a particular id seted two data in the same slot
          if(tempObj2[stId].length===1){
            //delete the the key from the object
            // console.log('dlete done');
            delete tempObj2[stId];
          }
          else{
            //delete the course id from the key array of clashChecking object
            const indexOfCourse2=tempObj2[stId].indexOf(_id2);
            tempObj2[stId].splice(indexOfCourse2, 1);
          }
        })
        newClashObj=clashCheckingObj;
        newClashObj[day]['studentClash'][timeSlot]=tempObj;
        newClashObj[day]['studentClash'][timeSlot2]=tempObj2;
        console.log(newClashObj);
      }
      // setclashCheckingObj(newClashObj);
      // console.log(newClashObj)
      setToSessionDb('clashInfo',newClashObj)
    }

    //gathering the data of st,mw,th slides and assign it to udatedRoutineData
    const updateRoutine=(day,dataOfParticularDay)=>{
      udatedRoutineData[day]=dataOfParticularDay;
    }

    //get the updated routine 
    const getUpdateRoutine=()=>{
      //assign the clashinfo object in clashCheckingObj by retrieve it from session database
      const clashCheckingObj=getFromSessionDb('clashInfo');
      //filtering all the data of st,mw,th and make them one unit data by performing merge
      const data=filteredRoutineData(udatedRoutineData,clashCheckingObj);
      return data;
    }

    const backToRoutineBoard=()=>{
      setCreateRoutine(true);
      setOption('');
    }
    const clickCreateBtn=()=>{
      setCreateRoutine(false);
      setIsCustomize(true);
      setOption('create');
      removeItemFromSession('clashInfo');
    }
    return (
      <routineContext.Provider value={[option,check,clearClashObj,updateRoutine,isCustomize,setIsCustomize]}>
        <div className={classes.breadcumbs}>
            <h2>Routine</h2>
            <span><Link to="/dashboard">Dashboard</Link> / Routine</span> 
        </div>
        {createRoutine?
        <><div className={classes.rulesBoard}>
          <div className={classes.rules}>
            <h5>Please finish the steps before creating the Routine</h5>
            <ul>
              <li>Add all the rooms</li>
              <li>Alter the batches from the course if needed</li>
            </ul>
          </div>
        </div>
        <div style={{textAlign:"center",margin:"10px 0px"}}>
            {completeStep?
            <Button onClick={()=>{clickCompleted()}} variant="contained">
              Yes, I have complete the steps</Button>
            :
            <><Button 
            onClick={()=>{clickCreateBtn();}} 
            style={{marginLeft:'15px'}} 
            variant="contained"
            >Create Routine</Button>
            <Button 
            onClick={()=>{setCreateRoutine(false);setOption('custom');}} 
            style={{marginLeft:'15px'}} 
            variant="contained"
            >Customize Routine</Button>
            </>}
        </div></> 
        :<Routine backToRoutineBoard={backToRoutineBoard}
         getUpdateRoutine={getUpdateRoutine} option={option}></Routine>}
        
      </routineContext.Provider>
    )
  
}
export default RoutineBoard;
