import React from 'react'
import Player from './Player';
import { useDrop } from 'react-dnd';

function Parent(props) {
    console.log(props.x);
    const datas=props.data;
    const [{isOver},drop]=useDrop(()=>({
        accept:"courseData",
        drop: (item)=>dropData(item.data),
      }));
    //   const [{isOverd},drop1]=useDrop(()=>({
    //     accept:"courseData",
    //     drop: (item)=>dropDatA(item.data),
    //   }));
    const dropData=(data)=>{
        console.log('dropData',data);
        if(props.x===true){
            console.log(datas);
            console.log('x=true');
            props.f(data);
            
        }
        else{
            console.log('x=false');
        }
    }
        // const dropDatA=(data)=>{
        //     console.log(props)
        //     console.log('dropDatA',data);
        // }
  return (
      <>
      <div style={{height:'100%'}} ref={drop}>
          {datas.length&&datas.map(dt=><Player name={dt.name}></Player>)}
      </div></>
    
  )
}

export default Parent