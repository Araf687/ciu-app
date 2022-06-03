import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Routine from './Routine';
import {getClashCheckingObject} from '../../functions';
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
    const [completeStep,setCompleteStep]=useState(true);
    const [createRoutine,setCreateRoutine]=useState(true);
    const [option,setOption]=useState('');
    const [clashChekingObj,setClashChekingObj]=useState(getClashCheckingObject());
    console.log(clashChekingObj);


    const clickCompleted=()=>{
      setCompleteStep(false);
    }

    const check=(draggedData,day)=>{
      const {_id,timeSlot,eligible}=draggedData;
      let arr=[],clashCourses='';
      const day_routine=day.substring(day.length-2,day.length);
      console.log(_id,timeSlot,eligible,day_routine);

      let tempObject=clashChekingObj[day_routine][timeSlot];
      if(Object.keys(tempObject).length>0){
        eligible.map(stId=>{
          if(stId in tempObject){
            //clash
            clashCourses=_id+' '+tempObject[stId];
            arr=[...arr,stId]
            tempObject[stId]=[...tempObject[stId],_id]
          }
          else{
            tempObject[stId]=[_id];
          }
        })
      }
      else{
        eligible.map(stId=>{
          tempObject[stId]=[_id];
        })
      }
      let newClashData=clashChekingObj;
      newClashData[day_routine][timeSlot]=tempObject;
      setClashChekingObj(newClashData);
      console.log(newClashData,clashCourses)

    }

    const clearClashObj=(dragedData1,dataFor,type,dragedData2)=>{
      const {_id,timeSlot,eligible}=dragedData1;
      const day=dataFor.substring(dataFor.length-2,dataFor.length);
      //select the particular object from clash objeect to change or clear its data
      const tempObj=clashChekingObj[day][timeSlot];
      let newClashObj;
      if(type==='singleData'){
        eligible.map(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj[stId].length==1){
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
      else{
        //when swiping in two different Slots
        const {_id2,timeSlot2,eligible2}=dragedData2;
        const tempObj2=clashChekingObj[day][timeSlot2];
        eligible.map(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj[stId].length==1){
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
        eligible2.map(stId=>{
          //check if a particular id seted two data in the same slot
          if(tempObj2[stId].length==1){
            //delete the the key from the object
            console.log('dlete done');
            delete tempObj2[stId];
          }
          else{
            //delete the course id from the key array of clashChecking object
            const indexOfCourse2=tempObj2[stId].indexOf(_id);
            tempObj2[stId].splice(indexOfCourse2, 1);
          }
        })
        newClashObj=clashChekingObj;
        newClashObj[day][timeSlot]=tempObj;
        newClashObj[day][timeSlot2]=tempObj2;
      }

    
      setClashChekingObj(newClashObj);

    }
    return (
      <routineContext.Provider value={[option,clashChekingObj,setClashChekingObj,check,clearClashObj]}>
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
        :<Routine option={option}></Routine>}
        
      </routineContext.Provider>
    )
  
}
export default RoutineBoard;
