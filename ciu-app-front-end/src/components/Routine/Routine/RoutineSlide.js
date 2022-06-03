import SlideRow from './SlideRow';
import { useContext, useEffect, useState } from 'react';
import { routineContext } from './RoutineBoard';

 
function RoutineSlide(props) {
  const [,clashChekingObj,setClashChekingObj,check,clearClashObj]=useContext(routineContext);
  const func_changeOfferedCourses=props.changeOfferdCourse;
  const [routineData,setRoutineData]=useState([]);
  const dataFor=props.day[0]==='S'?'slotsForST':props.day[0]==='M'?'slotsForMW':'slotsForTH';
  useEffect(()=>{
    fetch("http://localhost:5000/getAllClassRooms")
        .then(res=>res.json())
        .then(data=>{
            setRoutineData(data);
        })
  },[])

  const changeRoutineData=(data,roomId,slot)=>{
    const eligible_st=data.eligible;
    let SlotsPrevData,dataForSet=data,tmpRoutineData=routineData;

    const indexOfPrevData=routineData.findIndex(data=>data._id===roomId)
    SlotsPrevData=typeof(routineData[indexOfPrevData][dataFor][slot])==='boolean'?null:routineData[indexOfPrevData][dataFor][slot];
    
    //if the slot in which we want to set a data by dragging is null or empty
    if(SlotsPrevData===null){
      if(dataForSet.roomNo===''){//when the subject add in slot from subject section
       const newData= tmpRoutineData.map(data=>{
         if(data._id===roomId){
          dataForSet.roomNo=roomId;
          dataForSet.timeSlot=slot;
          data[dataFor][slot]=dataForSet;
         }
         return data;
        })
        setRoutineData(newData);
        func_changeOfferedCourses('remove',data._id);
        check(dataForSet,dataFor);
      }
      else{
        //when a course draged from a slot to another empty slot
        clearSlot(dataForSet.roomNo,dataForSet.timeSlot);
        dataForSet.timeSlot!==SlotsPrevData.timeSlot&&clearClashObj(dataForSet,dataFor,'singleData');
        const newData=tmpRoutineData.map(data=>{
          if(data._id===roomId){
            dataForSet.roomNo=roomId;//setting the new room id 
            dataForSet.timeSlot=slot;//setting the new Slot
            data[dataFor][slot]=dataForSet;
          }
          return data;
        })
        setRoutineData(newData);
      }

    }
    else{
      if(dataForSet.roomNo===''){
        // when a course draged from course section to a slot which already filled by the data. 
        clearSlot(SlotsPrevData.roomNo,SlotsPrevData.timeSlot);
        dataForSet.timeSlot!==SlotsPrevData.timeSlot&&clearClashObj(dataForSet,dataFor,'swipe',SlotsPrevData);
        const newData=tmpRoutineData.map(data=>{
          if(data._id===roomId){
            dataForSet.roomNo=roomId;
            dataForSet.timeSlot=slot;
            data[dataFor][slot]=dataForSet;
          }
          return data;
        })
        setRoutineData(newData);
      }
      else{
        // when swiping two slots data
        clearSlot(SlotsPrevData.roomNo,SlotsPrevData.timeSlot,dataForSet.roomNo,dataForSet.timeSlot)
        let prevSlotsRoom=dataForSet.roomNo,prevSlotsTimeSlot=dataForSet.timeSlot;
        let newRoutineData;
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

        }
        
        setRoutineData(newRoutineData);
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


    
  return (
    <div>
      <p style={{textAlign:'center',fontWeight:600}}>{props.day}</p>
      <SlideRow heading={true} data={null}></SlideRow>
      {routineData && routineData.map(data=><SlideRow 
                      changeRoutineData={changeRoutineData}
                      dataFor={dataFor}
                      heading={false} 
                      data={data}></SlideRow>)}
    </div>
  )
}

export default RoutineSlide;