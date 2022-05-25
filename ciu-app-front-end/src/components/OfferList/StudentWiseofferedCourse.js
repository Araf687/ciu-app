import { Grid} from '@material-ui/core';
import React, { PureComponent, useEffect, useState } from 'react'
import StudentWiseROw from './StudentWiseROw';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Button } from '@mui/material';
import swal from 'sweetalert2';

const StudentWiseofferedCourse=(props)=> {
    const [completedCredits,setCompletedCredits]=useState([]);
    let i=0;
    const data=props.data;
    console.log(data)
    const newObject={};
    console.log("STUDENT WISE OFFERLIST");
    const studentIds=[];
    data.map(dt=>{
        dt.eligibleStudents.map(id=>{
            studentIds.push(id);
            if(newObject[id]){
                const newArr=[...newObject[id],dt._id._id];
                newObject[id]=newArr;
            }
            else{
                newObject[id]=[dt._id._id];
            }
        })
    })
    // console.log(newObject,totalCredit);
    const [objectkeys,setObjectKeys]=useState(Object.keys(newObject));
    useEffect(()=>{
        if(objectkeys.length){
            fetch(`http://localhost:5000/getStudentsCompletedCredit`,{
                method:'POST',
                body:JSON.stringify(objectkeys),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setCompletedCredits(data);

            })
            .catch(err=>
            {
                
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:err,
                  })
            })
        }

    },[])
    return (
      <div>
          <Button size='small' variant="contained" onClick={()=>{props.state(false)}}><KeyboardBackspaceIcon></KeyboardBackspaceIcon></Button>
             
          <h3 style={{textAlign:"center"}}>Student Wise Eligible Course</h3><br></br>
        <div>
            <Grid container style={{textAlign:"center"}}>
                <Grid item lg={1}>
                <h6>Students Id</h6>
                </Grid>
                <Grid item lg={4}>
                <h6>Eligible courses</h6>
                </Grid>
                <Grid item lg={4}>
                <h6>Rest courses</h6>
                </Grid>

                <Grid item lg={1}>
                <h6>total credits</h6>
                </Grid>
                <Grid item lg={2}>
                <h6>Incompleted Credits</h6>
                </Grid>
            </Grid>
        </div>
        <div>
            {completedCredits.length>0 && objectkeys.map(id=><StudentWiseROw id={id} completedCredits={completedCredits[i++]} deleteBtn={props.showDlt} handleDelete={props.dltCourseStWIse} eligibleCourses={newObject[id]}></StudentWiseROw>)}
        </div>
      </div>
    )
  
}
export default StudentWiseofferedCourse;