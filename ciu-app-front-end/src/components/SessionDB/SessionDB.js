const setToSessionDb=(key,value)=>{
    const item=JSON.stringify(value);
    sessionStorage.setItem(`${key}`, item);
}
const getFromSessionDb=(key)=>{
    
   return JSON.parse(sessionStorage.getItem(`${key}`));
}
const isDataExistInSession=(key)=>{
    const exist=sessionStorage.getItem(`${key}`)?true:false;
    return exist;
}
const removeItemFromSession=(key)=>{
    sessionStorage.removeItem(`${key}`);
}
export {setToSessionDb,getFromSessionDb,isDataExistInSession,removeItemFromSession}