import SlideRow from './SlideRow';
import { useContext, useEffect, useState } from 'react';
import { routineContext } from './RoutineBoard';
import {getNextSemester} from '../../functions';
import { Button } from '@mui/material';
import { FcOrgUnit } from "react-icons/fc";
import Clashes from '../Clashes.js/Clashes';
import {getFromSessionDb} from '../../SessionDB/SessionDB';
import swal from 'sweetalert2';

 
function RoutineSlide(props) {
  let [option,check,clearClashObj,updateRoutine,,]=useContext(routineContext);
  console.log(option)
  const func_changeOfferedCourses=props.changeOfferdCourse;
  const [routineData,setRoutineData]=useState();
  const dataFor=props.day[0]==='S'?'slotsForST':props.day[0]==='M'?'slotsForMW':'slotsForTH';
  const [showClash,setShowClash]=useState(false);
  const clashIcon={backgroundColor:'white',borderRadius:'2px',marginRight:'5px',fontSize:'16px'}
 
  
  useEffect(()=>{
    if(option==='custom'){
      fetch(`http://localhost:5000/getRoutine/${getNextSemester()}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if('data' in data){
          if(data.data.length!==0){
            console.log(data.data);
            setRoutineData(data.data[0].routine);
          }
          
        }
        else{
          console.log(data.error); 
        }
    })}
    else{
      fetch("http://localhost:5000/getAllClassRooms")
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
            setRoutineData(data);
      })
    }
  },[])
  const changeRoutineData=(data,roomId,slot)=>{
    let SlotsPrevData,dataForSet=data,tmpRoutineData=routineData;
    console.log(dataForSet);

    const indexOfPrevData=routineData.findIndex(data=>data._id===roomId)
    SlotsPrevData=typeof(routineData[indexOfPrevData][dataFor][slot])==='boolean'?null:routineData[indexOfPrevData][dataFor][slot];
    
    //if the slot in which we want to set a data by dragging is null or empty
    if(SlotsPrevData===null){
      if(dataForSet.roomNo===''){//when the subject add in slot from subject section
        console.log("drag in empty slot")
       const newData= tmpRoutineData.map(data=>{
         if(data._id===roomId){
          dataForSet.roomNo=roomId;
          dataForSet.timeSlot=slot;
          data[dataFor][slot]=dataForSet;
         }
         return data;
        })
        setRoutineData(newData);
        func_changeOfferedCourses('remove',data._id);//remove data from course section after draging it
        check(dataForSet,dataFor);//checking if there is ay clash
        // updateRoutine(dataFor,newData);
      }
      else{

        //when a course draged from a slot to another empty slot
        clearSlot(dataForSet.roomNo,dataForSet.timeSlot);//clear the slot in which we have to set new data
        //clear the clash checking object because a subject has drag out from a slot  
        clearClashObj(dataForSet,dataFor,'singleData');
        
        const newData=tmpRoutineData.map(data=>{
          if(data._id===roomId){
            dataForSet.roomNo=roomId;//setting the new room id 
            dataForSet.timeSlot=slot;//setting the new Slot
            data[dataFor][slot]=dataForSet;
          }
          return data;
        })
        setRoutineData(newData);
        check(dataForSet,dataFor);//checking if there is ay clash
      }
    }
    else{
      if(dataForSet.roomNo===''){
        // when a course draged from course section to a slot which already filled by the data. 
        clearSlot(SlotsPrevData.roomNo,SlotsPrevData.timeSlot);
        clearClashObj(SlotsPrevData,dataFor,'singleData');
        func_changeOfferedCourses('add',data._id,SlotsPrevData._id);
        const newData=tmpRoutineData.map(data=>{
          if(data._id===roomId){
            dataForSet.roomNo=roomId;
            dataForSet.timeSlot=slot;
            data[dataFor][slot]=dataForSet;
          }
          return data;
        })
        setRoutineData(newData);
        check(dataForSet,dataFor);
      }
      else{
        // when swiping two slots data
        clearSlot(SlotsPrevData.roomNo,SlotsPrevData.timeSlot,dataForSet.roomNo,dataForSet.timeSlot)
        let prevSlotsRoom=dataForSet.roomNo,prevSlotsTimeSlot=dataForSet.timeSlot;
        let newRoutineData;
        //if slots are not same then the function clearClashObj will called
        // dataForSet.timeSlot!==slot&&
        clearClashObj(dataForSet,dataFor,'swipe',SlotsPrevData);
        
        //swiping in the same row or same room
        if(roomId===prevSlotsRoom){
          newRoutineData=tmpRoutineData.map(data=>{
            if(data._id===roomId){
              dataForSet.roomNo=roomId;
              dataForSet.timeSlot=slot;
              data[dataFor][slot]=dataForSet;

              SlotsPrevData.roomNo=prevSlotsRoom;
              SlotsPrevData.timeSlot=prevSlotsTimeSlot;
              data[dataFor][prevSlotsTimeSlot]=SlotsPrevData;
            }
            return data;
          })
          setRoutineData(newRoutineData);
          check(dataForSet,dataFor,SlotsPrevData);
        }
        else{
          newRoutineData=tmpRoutineData.map(data=>{
            if(data._id===roomId){
              dataForSet.roomNo=roomId;
              dataForSet.timeSlot=slot;
              data[dataFor][slot]=dataForSet;
            }
            if(data._id===prevSlotsRoom){
              SlotsPrevData.roomNo=prevSlotsRoom;
              SlotsPrevData.timeSlot=prevSlotsTimeSlot;
              data[dataFor][prevSlotsTimeSlot]=SlotsPrevData;
            }
            return data;
          })
          setRoutineData(newRoutineData);
          check(dataForSet,dataFor,SlotsPrevData);
        }

        
        

      }}
    }
 

  const clearSlot=(room1,slot1,room2,slot2)=>{
    let newData;
    //when swiping data in the same row. we have to clear the two slots in that row
    if(room1===room2){
      newData=routineData.map(data=>{
        if(data._id===room1){
          data[dataFor][slot1]=true;
          data[dataFor][slot2]=true;
        }
        return data;
      })

    }
    //when swiping performing in the different row
    else if(room2){
      newData=routineData.map(data=>{
        if(data._id===room1){
          data[dataFor][slot1]=true;
        }
        if(data._id===room2){
          data[dataFor][slot2]=true;
        }
        return data;
      })
    }
    //when we dont swipe, just drag a course from a slot into another empty slot
    else{
      newData=routineData.map(data=>{
        if(data._id===room1){
          data[dataFor][slot1]=true;
        }
        return data;
      })
    }
    setRoutineData(newData);

  }
  if(props.confirm===true){
    if(props.day[0]==='S'){updateRoutine(dataFor,routineData)}
    else if(props.day[0]==='M'){updateRoutine(dataFor,routineData)}
    else{updateRoutine(dataFor,routineData);}
  }

  const clickShowClashBtn=()=>{
    setShowClash(true)
    console.log(props.day);
  }
  return (
    <div >
      <br></br>
      {showClash===false?
      <>
        <div style={{marginBottom:'15px'}}>
          <span style={{textAlign:'center',fontWeight:600,fontSize:'18px',marginLeft:'3px',padding:'2px'}}>{props.day}</span>
          <Button variant="contained" onClick={()=>{clickShowClashBtn()}} style={{float:'right',marginRight:'5px'}} size="medium">
            <FcOrgUnit style={clashIcon}></FcOrgUnit> <span style={{paddingTop:'3px'}}>show clashes</span>
          </Button>
        </div>
        <SlideRow heading={true} data={null}></SlideRow>
        {routineData && routineData.map(data=><SlideRow 
                        changeRoutineData={changeRoutineData}
                        dataFor={dataFor}
                        heading={false} 
                        data={data}></SlideRow>)}
      </>:
    <Clashes setShowClash={setShowClash} 
    day={props.day} clashCheckingObj={getFromSessionDb('clashInfo')}></Clashes>
    }

    </div>
  )
}

export default RoutineSlide;