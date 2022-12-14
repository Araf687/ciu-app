import React from 'react'



function Extra() {
  const XLSX=require('xlsx');
 
  const obj=[
    {_id:'cse101',eligible:[0,1,2,3]},
    {_id:'cse103',eligible:[10,11,12,13]},
  ]
  // const filtered=obj.map(ob=>{
  //   const {_id,eligible}=ob;
  //   eligible.map(el=>{

  //   })
  // })
  const myFile="myFile.xlsx";
  const myWorksheet=XLSX.utils.json_to_sheet(obj);
  const myWorkbook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkbook,myWorksheet,"myWorkSHeet")
  XLSX.writeFile(myWorkbook,myFile);

  return (
    <div>Extra</div>
  )
}

export default Extra