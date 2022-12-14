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
        return currentSemester+year.toString().substring(2, 4);
        // return 'Spring22';
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
    console.log(total, typeof(total[0]));
    total.map(id=>{
        const newId=id.slice(0,3);
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
            studentClash:{"8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
            },
            teacherClash:{
                roomWise:{},
                slotWise:{
                "8:00 am":{
                    clashData:{}
                },
                "9:30 am":{
                    clashData:{}
                },
                "11:00 am":{
                    clashData:{}
                },
                "12:30 pm":{
                    clashData:{}
                },
                "2:00 pm":{
                    clashData:{}
                },
                "3:30 pm":{
                    clashData:{}
                },
            }
            }

        },
        MW:{
            studentClash:{"8:00 am":{},
            "9:30 am":{},
            "11:00 am":{},
            "12:30 pm":{},
            "2:00 pm":{},
            "3:30 pm":{},
            },
            teacherClash:{
                roomWise:{},
                slotWise:{
                    "8:00 am":{clashData:{}},
                    "9:30 am":{clashData:{}},
                    "11:00 am":{clashData:{}},
                    "12:30 pm":{clashData:{}},
                    "2:00 pm":{clashData:{}},
                    "3:30 pm":{clashData:{}},
                }
            }
        },
        TH:{
            studentClash:{
                "8:00 am":{},
                "9:30 am":{},
                "11:00 am":{},
                "12:30 pm":{},
                "2:00 pm":{},
                "3:30 pm":{},
            },
            teacherClash:{
                roomWise:{},
                slotWise:{
                    "8:00 am":{clashData:{}},
                    "9:30 am":{clashData:{}},
                    "11:00 am":{clashData:{}},
                    "12:30 pm":{clashData:{}},
                    "2:00 pm":{clashData:{}},
                    "3:30 pm":{clashData:{}},
                }
            }
        }
        
    }
    return object;
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
const filterClashes=(clashObjOfSlot)=>{
    let clashInfo={}
    const st_id=Object.keys(clashObjOfSlot);
    st_id.map(id=>{
        if(clashObjOfSlot[id].length>1){
            const dataString=clashObjOfSlot[id].toString();
            if(dataString in clashInfo){
             clashInfo[dataString]=[...clashInfo[dataString],id]
            }
            else{
                clashInfo[dataString]=[id]
            }
        }
    })
    return clashInfo

}
const findTeachersClash=(teacherArray,courseArray)=>{
    console.log(teacherArray);
    let i=0,teacherClashInfo={};
    for (i=0;i<teacherArray.length;i++){
        if(teacherArray[i]!==null&&teacherArray[i]!==''&&teacherArray[i]!=='TBA')
        {
            if(teacherArray[i]===teacherArray[i+1]&&teacherArray[i]===teacherArray[i+2])
            {
                const key=courseArray[i]+' '+courseArray[i+1]+' '+courseArray[i+2];
                teacherClashInfo[key]=teacherArray[i];
                i=i+2;
            }
        }
    }
    return teacherClashInfo;
}
const showStudentClash=(clashObjOfSlot,day,timeSlot)=>{
    const clashInfo=filterClashes(clashObjOfSlot)
    const mainDiv=document.getElementById('student-clash-section');
    let clashes=Object.keys(clashInfo);
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
      }):mainDiv.append('No clashes held in this slot');
}
const show_teachers_clash=(tempTeacherClash,roomNo)=>{
    const div_t_clash=document.getElementById('teacher-clash-section')
    const teacherClashes=tempTeacherClash['roomWise'][roomNo]['teacherClashes'];
    const teacherClashes_SlotWise=tempTeacherClash['slotWise'];
    const keys=Object.keys(teacherClashes);
    keys.length!==0?keys.map(data=>{
        const teacher_clash_Row=document.createElement('div');
        const clashCoursesDiv=document.createElement('div');
        const div_teacher=document.createElement('div');
        clashCoursesDiv.classList.add('clashCoursesDiv');
        div_teacher.classList.add('div_teacher');
        teacher_clash_Row.classList.add('teacher_clash_Row');

        const clashCourses=data.split(' ')
        clashCoursesDiv.innerHTML=`${clashCourses}`
        div_teacher.innerHTML=`${teacherClashes[data]}`;

        const room=document.createElement('p')
        room.innerHTML=`Room No: ${roomNo}`
        room.style.fontWeight=600;

        teacher_clash_Row.append(div_teacher,clashCoursesDiv)

        div_t_clash.append(room,teacher_clash_Row);

    }):div_t_clash.append(`No clashes held in room ${roomNo}`);
}
const showClash=(clashObjOfSlot,day,timeSlot,tempTeacherClash,roomNo)=>{
    // console.log(clashObjOfSlot,day,timeSlot,tempTeacherClash[roomNo],roomNo)
    day=day==="ST"?"Saturday / Tuesday ":day==="MW"?"Monday / Wednesday":'Thursday';

    const clash=`
    <div>
        <p style="font-weight:700;margin-top:10px;">Clash Schedule of ${day}</p>
        <div class="tab">
            <button class="tablinks" id="stClash_Btn">Student Clash</button>
            <button class="tablinks" id="teacherClash_Btn">Teachers Clash</button>
        </div>
        <div id='student-clash-section'>
            <p><small id='time'>time-slot: ${timeSlot}</small></p>
        </div>
        <div id='teacher-clash-section'>
        </div>
    </div>
    `
    Swal.fire({
        html:clash,
        customClass: 'swal-wide',
        didOpen:()=>{
            const stClash_Btn=document.getElementById('stClash_Btn')
            const teacherClash_Btn=document.getElementById('teacherClash_Btn')

            const st_clash_section=document.getElementById('student-clash-section')
            const T_clash_section=document.getElementById('teacher-clash-section')

            showStudentClash(clashObjOfSlot,day,timeSlot);
            show_teachers_clash(tempTeacherClash,roomNo);

            const studentClash=()=>{
                stClash_Btn.style.background='#05114a';
                stClash_Btn.style.color='white';
                teacherClash_Btn.style.background='inherit';
                teacherClash_Btn.style.color='black';

                st_clash_section.style.display='block'
                T_clash_section.style.display='none'


            }
            const teachers_Clash=()=>{
                teacherClash_Btn.style.background='#05114a';
                teacherClash_Btn.style.color='white';
                stClash_Btn.style.background='inherit';
                stClash_Btn.style.color='black';

                st_clash_section.style.display='none';
                T_clash_section.style.display='block';

            }
            stClash_Btn.onclick=studentClash
            teacherClash_Btn.onclick=teachers_Clash
            studentClash();
        }
    })



}
// const showClashInfo=(clashObjOfSlot,day,timeSlot)=>{
//    console.log(clashObjOfSlot)
//    day=day==="ST"?"Saturday / Tuesday ":day==="MW"?"Monday / Wednesday":'Thursday';
//    const clashInfo=filterClashes(clashObjOfSlot)
//     Swal.fire({
//         // html:`<div id='student-clash-section'>
//         //     <div>
//         //         <p>${day}<small id='time'>time-slot: ${timeSlot}</small></p>
//         //     </div>
//         //     </div>`,
//         html:showClash(),
//         customClass: 'swal-wide',
//         didOpen: () => {
//             let clashes=Object.keys(clashInfo);
//             const mainDiv=document.getElementById('student-clash-section');
            
//             clashes.length!==0?clashes.map(data=>{
//                 let row,courseSec,studentIdSec;
//                 row=document.createElement('div');
//                 courseSec=document.createElement('div');
//                 studentIdSec=document.createElement('div');;
//                 row.classList.add('row');
//                 courseSec.classList.add('courseSec');
//                 studentIdSec.classList.add('studentIdSec');
        
                
//                 const particularCourse=document.createElement('small');
//                 particularCourse.innerHTML=`${data}`;
//                 courseSec.appendChild(particularCourse)
//                 clashInfo[data].map(stId=>{
//                     const id=document.createElement('small');
//                     id.innerHTML=` ${stId},`;
//                     studentIdSec.append(id);

//                 })
//                 row.append(courseSec,studentIdSec);
//                 mainDiv.appendChild(row);
//               }):mainDiv.append("No clashes held in this slot");
//           },

//       })


// }

const filteredRoutineData=(udatedRoutineData,clashCheckingObj)=>{
        const allSlots=['8:00 am','9:30 am','11:00 am','12:30 pm','2:00 pm','3:30 pm']
        let tempData=udatedRoutineData['slotsForST'];
        const mwData=udatedRoutineData['slotsForMW'],thData=udatedRoutineData['slotsForTH'];
        for (let i = 0; i < tempData.length; i++) {
          allSlots.forEach(element=>{
            tempData[i]['slotsForMW'][element]=mwData[i]['slotsForMW'][element];
            tempData[i]['slotsForTH'][element]=thData[i]['slotsForTH'][element];
          })
        }
        const newRoutineData={
          routine:tempData,
          clashInfo:clashCheckingObj,
          offeredCourse:udatedRoutineData.offered_course
        }
        return newRoutineData;

}
const changeObjFormatForDownload=(mainObj)=>{
    console.log(mainObj);
    let i=0;
    const newObject=mainObj.map(data=>{
        let tempObject={
            Sl_No:++i,
            Course_Id:data._id._id,
            Course_Name:data._id.name,
            Credit_Hours:data._id.creditHours,
            Faculty:data.faculty,
            total:data.eligibleStudents.length,
            Eligible_Students:data.eligibleStudents.toString(),
            // Ignored_Student:data.ignoredStudent.toString()
        }
        let batch={}
        data.eligibleStudents.map(id=>{
            
            const newId=id.slice(0,3);
            console.log(newId,typeof(newId));
            if(!batch[newId]){
                batch[newId]=1;
            }
            else{
                batch[newId]=batch[newId]+1;
            } 
        })
        console.log({...tempObject,...batch})
        return {...tempObject,...batch};
    })
    return newObject;

}
const formatStData=(data)=>{
    let tempData={}
    data.map(item=>{
        tempData[item._id]=item.name;
    })
    return tempData;
}
const formatedForReport=(data,allStData)=>{
    let reportData={};
    allStData=formatStData(allStData);
    // console.log(data,allStData);
    data.map(courseData=>{
        let tempArry=[],i=0;
        courseData.eligibleStudents.map(_id=>{
            tempArry.push({slNo:++i,student_id:_id,student_name:allStData[`${_id}`]})
        })
        reportData[`${courseData._id._id}`]=tempArry;
    })
    return reportData;
}

const updateTeachersClash_slotWise=(teacherClashData_slotWise)=>{
    console.log(teacherClashData_slotWise);
    Object.keys(teacherClashData_slotWise).forEach(time_slot=>{
        teacherClashData_slotWise[time_slot]['clashData']={};
        if(Object.keys(teacherClashData_slotWise[time_slot]).length>1){
            Object.keys(teacherClashData_slotWise[time_slot]).forEach(slotsItem=>{
                if(slotsItem!='clashData'){
                    if(teacherClashData_slotWise[time_slot][slotsItem].length>1){
                        teacherClashData_slotWise[time_slot]['clashData'][slotsItem]=teacherClashData_slotWise[time_slot][slotsItem]
                    }
                }
            })
        }
    })
    return teacherClashData_slotWise;
}
const getCurrentDtate_Time=()=>{
    const event = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date=event.toLocaleDateString(undefined, options);
    const time=event.toLocaleTimeString('en-US');
    return {date:date,time:time}

}
const formatForShowingReport_on_coursewise_Section=(data)=>{
    let tempObject={}
    data.map(studentData=>{
        tempObject[studentData._id]=studentData.name;
    })
    return tempObject;
}
export {filteredRoutineData,getCurrentSemester,getNextSemester,
    getBatchFromStudentsId,advisingArray_to_RoutineArray,
    getDayMonthYear,getClashCheckingObject,showCheckingClash,formatedForReport,getCurrentDtate_Time,
    formatForShowingReport_on_coursewise_Section,
    // showClashInfo,
    filterClashes,findTeachersClash,showClash,changeObjFormatForDownload,updateTeachersClash_slotWise};






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
//     newClashObj=clashCheckingObj;
//     newClashObj[day][timeSlot]=tempObj;

//   }