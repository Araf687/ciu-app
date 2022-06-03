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
export {getCurrentSemester,getNextSemester,getBatchFromStudentsId,advisingArray_to_RoutineArray,getDayMonthYear,getClashCheckingObject};






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