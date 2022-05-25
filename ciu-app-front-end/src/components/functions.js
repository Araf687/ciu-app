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
        console.log(data);
        return data;
    })
    return newArray;

}
const getDayMonthYear=(date)=>{
    
    const array=date.toString().split(" ");
    return [array[2],array[1],array[3]];


}
const getRoutineObject=(roomArray,routineExternalObject)=>{

}
export {getCurrentSemester,getNextSemester,getBatchFromStudentsId,advisingArray_to_RoutineArray,getDayMonthYear};