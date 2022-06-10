import { Grid } from '@material-ui/core';
import "../App.css"
import Swal from 'sweetalert2';
import './function.css';
const getCurrentSemester=()=>{
    var dateObj = new Date();
        var month = dateObj.getUTCMonth(); 
        var year = dateObj.getUTCFullYear();
        let currentSemester="";
        let nextSemester="";
        
        if(month>=1&&month<=4){
            currentSemester="Spring"; 
        }
        else if(month>=5&&month<=8){
            currentSemester="Summer";
        }
        else{
            currentSemester="Autumn";
            
        }
        // return currentSemester+year.toString().substring(2, 4);
        return 'Spring22';
}
const getNextSemester=()=>{
    var dateObj = new Date();
    var year = dateObj.getUTCFullYear().toString().substring(2, 4);
    const currentSemester=getCurrentSemester();
    if(currentSemester==("Spring"+year)){
        return "Summer"+year;
    }
    else if(currentSemester==("Summer"+year)){
        return "Autumn"+year
    }
    else{
        return "Spring"+year;
    }
}
const getBatchFromStudentsId=(total)=>{
    let batch={};
    total.map(id=>{
        const newId=id.toString().slice(0,3);
        if(!batch[newId]){
            batch[newId]=1;
        }
        else{
             batch[newId]=batch[newId]+1;
        } 
    })
    return batch;
}
const advisingArray_to_RoutineArray=(array)=>{
    console.log("here");
    const newArray=array.map(data=>{
        data.ignoredStudent=[];
        data.faculty='';
        data.roomNo='';
        data.timeSlot='';
        data.dayFor='';
        // console.log(data);
        return data;
    })
    console.log(newArray)
    return newArray;

}
const getDayMonthYear=(date)=>{
    
    const array=date.toString().split(" ");
    return [array[2],array[1],array[3]];


}
const getRoutineObject=(roomArray,routineExternalObject)=>{

}
const getClashCheckingObject=()=>{
    const object={
        ST:{
            "8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
        },
        MW:{
            "8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
        },
        TH:{
            "8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
        }
        
    }
    return object;
}
const getClashedDataObj=()=>{
    const object={
        ST:{
            "8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
        },
        MW:{
            "8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
        },
        TH:{
            "8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
        }
        
    }
}



const showCheckingClash=(x)=>{
    Swal.fire({
        title: 'Checking the student clashh!',
        timer: 200,
        allowOutsideClick:false,
        timerProgressBar: true,
        timerProgressBar:'red',
        didOpen: () => {
          Swal.showLoading()
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            return true;
        }
      })
}
const showClashInfo=(y,day,timeSlot)=>{
   console.log(y)
   day=day==="ST"?"Saturday / Tuesday ":day=="MW"?"Monday / Wednesday":'Thursday';
   const st_id=Object.keys(y);
   let clashInfo={}
   st_id.map(id=>{
       if(y[id].length>1){
           const dataString=y[id].toString();
           if(dataString in clashInfo){
            clashInfo[dataString]=[...clashInfo[dataString],id]
           }
           else{
               clashInfo[dataString]=[id]
           }
       }
   })
    Swal.fire({
        html:`<div id='clash-section'>
            <div>
                <p>${day}<small id='time'>time-slot: ${timeSlot}</small></p>
            </div>
            </div>`,
        customClass: 'swal-wide',
        didOpen: () => {
            let clashes=Object.keys(clashInfo);
            const mainDiv=document.getElementById('clash-section');
            
            clashes.length!==0?clashes.map(data=>{
                let row,courseSec,studentIdSec;
                row=document.createElement('div');
                courseSec=document.createElement('div');
                studentIdSec=document.createElement('div');;
                row.classList.add('row');
                courseSec.classList.add('courseSec');
                studentIdSec.classList.add('studentIdSec');
        
                
                const particularCourse=document.createElement('small');
                particularCourse.innerHTML=`${data}`;
                courseSec.appendChild(particularCourse)
                clashInfo[data].map(stId=>{
                    const id=document.createElement('small');
                    id.innerHTML=` ${stId},`;
                    studentIdSec.append(id);

                })
                row.append(courseSec,studentIdSec);
                mainDiv.appendChild(row);
              }):mainDiv.append("No clashes held in this slot");
          },

      })


}
export {getCurrentSemester,getNextSemester,
    getBatchFromStudentsId,advisingArray_to_RoutineArray,
    getDayMonthYear,getClashCheckingObject,showCheckingClash,showClashInfo};






// if(type==='sameSlot'){
//     //it gives unique values after merging the array
//     let mergeArray=[...new Set([...eligible,...eligible2])];
//     mergeArray.map(stId=>{
//       //check if a particular id seted two data in the same slot
//       if(tempObj[stId].length==1){
//         //delete the the key from the object
//         console.log('dlete done');
//         delete tempObj[stId];
//       }
//       else{
//         //delete the course id from the key array of clashChecking object
//         const indexOfCourse=tempObj[stId].indexOf(_id);
//         tempObj[stId].splice(indexOfCourse, 1);
//       }
//     })
//     newClashObj=clashChekingObj;
//     newClashObj[day][timeSlot]=tempObj;

//   }