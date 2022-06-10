import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Routine from './Routine';
import {getClashCheckingObject,showClashInfo} from '../../functions';
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

export const routineContext=React.createContext();

const RoutineBoard=()=>{
    const classes=useStyles();
    let [udatedRoutineData,setUpdatedRoutineData]=useState([]);
    const [completeStep,setCompleteStep]=useState(true);
    const [createRoutine,setCreateRoutine]=useState(true);
    const [option,setOption]=useState('');
    const [clashChekingObj,setClashChekingObj]=useState(getClashCheckingObject());
    let updateRoutine=(day,x)=>{
      udatedRoutineData[day]=x;
      console.log(udatedRoutineData)
    }
    const clickCompleted=()=>{
      setCompleteStep(false);
    }

    const check=(dragedData1,day,dragedData2)=>{
      const {_id,timeSlot,eligible}=dragedData1;

      const day_routine=day.substring(day.length-2,day.length);
      let tempObject=clashChekingObj[day_routine][timeSlot];
      let newClashData=clashChekingObj;
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
      newClashData[day_routine][timeSlot]=tempObject;
//the function get two drag data only when we swipe two courses
      if(dragedData2){
        const _id2=dragedData2._id,timeSlot2=dragedData2.timeSlot;
        const eligible2=dragedData2.eligible;
        let tempObject2=clashChekingObj[day_routine][timeSlot2];
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
        newClashData[day_routine][timeSlot2]=tempObject2;

      }
      showClashInfo(tempObject,day_routine,timeSlot)
      console.log(dragedData1,dragedData2)
      setClashChekingObj(newClashData,timeSlot);
      console.log(newClashData);
    }

    const clearClashObj=(dragedData1,dataFor,type,dragedData2)=>{
      const {_id,timeSlot,eligible}=dragedData1;
      const day=dataFor.substring(dataFor.length-2,dataFor.length);
      //select the particular object from clash objeect to change or clear its data
      const tempObj=clashChekingObj[day][timeSlot];
      let newClashObj;
      if(type==='singleData'){
        
        eligible.forEach(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj[stId].length===1){
            //delete the the key from the object
            console.log('dlete done');
            delete tempObj[stId];
          }
          else{
            //delete the course id from the key array of clashChecking object
            const indexOfCourse=tempObj[stId].indexOf(_id);
            tempObj[stId].splice(indexOfCourse, 1);
          }
        })
        newClashObj=clashChekingObj;
        newClashObj[day][timeSlot]=tempObj;
      }
      else if(type==='swipe'){
        //when swiping in two different Slots
        console.log('swipe')
        const _id2=dragedData2._id,timeSlot2=dragedData2.timeSlot,eligible2=dragedData2.eligible;
        const tempObj2=clashChekingObj[day][timeSlot2];
        eligible.forEach(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj[stId].length===1){
            //delete the the key from the object
            console.log('dlete done');
            delete tempObj[stId];
          }
          else{
            //delete the course id from the key array of clashChecking object
            const indexOfCourse=tempObj[stId].indexOf(_id);
            tempObj[stId].splice(indexOfCourse, 1);
          }
        })
        eligible2.forEach(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj2[stId].length===1){
            //delete the the key from the object
            console.log('dlete done');
            delete tempObj2[stId];
          }
          else{
            //delete the course id from the key array of clashChecking object
            const indexOfCourse2=tempObj2[stId].indexOf(_id2);
            tempObj2[stId].splice(indexOfCourse2, 1);
          }
        })
        newClashObj=clashChekingObj;
        newClashObj[day][timeSlot]=tempObj;
        newClashObj[day][timeSlot2]=tempObj2;
        console.log(newClashObj);
      }
      else{
        console.log('-----------.............--------');
        console.log(dragedData1,dataFor);
        console.log(clashChekingObj);
      }

    
      setClashChekingObj(newClashObj);

    }

    const confirmRoutine=(offeredCourses)=>{
      console.log(clashChekingObj,offeredCourses);
      console.log(udatedRoutineData);

    }
  
    return (
      <routineContext.Provider value={[option,check,clearClashObj,updateRoutine]}>
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
            <Button onClick={()=>{clickCompleted()}} variant="contained">Yes, I have complete the steps</Button>
            :
            <><Button 
            onClick={()=>{setCreateRoutine(false);setOption('create');}} 
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
        :<Routine confirmRoutine={updateRoutine} option={option}></Routine>}
        
      </routineContext.Provider>
    )
  
}
export default RoutineBoard;
