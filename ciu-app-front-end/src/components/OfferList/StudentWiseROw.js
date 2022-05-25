import { Grid, makeStyles } from '@material-ui/core';
import React, { PureComponent, useState } from 'react';
import swal from 'sweetalert2';
import Course from './Course';


const fakeData={id:"17202155",eligibleSubjects:['cse101','cse115','cse235'],credits:20};
const useStyle=makeStyles(theme=>({
  root:{
      margin:"10px 0px",
      backgroundColor:"white",
      padding:"10px",
      borderRadius:"5px",
      textAlign:"center",
  },
  


}))


const StudentWiseROw=(props)=> {
  // console.log(props);
  const classes=useStyle();
  const [eligibleCourses,setEligibleCourses]= useState(props.eligibleCourses);
  let total=0;
  const completedCredits=props.completedCredits;
  eligibleCourses.map(item=>{
    const lastChar=item.charAt(item.length-1);
    if(lastChar==='L'){
      total+=1;
    }
    else if(item==='CSE498'){
      total+=6;
    }
    else{
      total+=3;
    }
  })
  const handleDeleteCourse=(studentId,courseId)=>{
    setEligibleCourses(eligibleCourses.filter(data=>data!==courseId));
    props.handleDelete(studentId,courseId);
  }

    return (

          <Grid container className={classes.root}>
            <Grid item lg={1}>
              <p><strong>{props.id}</strong></p>
            </Grid>
            <Grid item lg={8} style={{padding:'0px 5px'}}>
              <Grid container 
              >
                {eligibleCourses.map(course=> <Course showDltBtn={props.deleteBtn} id={props.id} course={course} func={handleDeleteCourse} ></Course> )}
              </Grid>
              
               
            </Grid>
            <Grid item lg={1} >
              <p><strong>{total}</strong></p>
            </Grid>
            <Grid item lg={2} >
              <p><strong>{140-completedCredits}</strong></p>
            </Grid>
          </Grid>
    )
}
export default StudentWiseROw;