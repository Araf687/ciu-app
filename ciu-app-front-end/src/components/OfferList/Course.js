import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { BiXCircle } from "react-icons/bi";
import swal from 'sweetalert2';

const useStyle=makeStyles(theme=>({
    eligibleCourses:{
        backgroundColor:"#afe3d6",
        padding:"2px 1px",
        margin:"2px 3px",
        borderRadius:"4px"
      },
      hideComponent:{display:"none"},
      dltIcon:{
        '&:hover':{
          color:"red",
          cursor:'pointer',
          
        }
      },
}))

const Course=(props)=> {
    const classes=useStyle();
    const [hide,setHide]=useState(false);
    const course=props.course;
    const func=props.func;
    const handleClickDelete=(course)=>{
        swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete the course!'
      
      
          }).then((result) => {
            if (result.isConfirmed) {
                func(parseInt(props.id),course);
                swal.fire(
                    'Deleted!',
                    'course has been deleted from the eligible list.',
                    'success'
                )
            }
          })
    }
    return (
      <Grid item className={clsx(classes.eligibleCourses,{[classes.hideComponent]:hide})}>
        <small><strong>
          {course} 
         {props.showDltBtn && <span className={classes.dltIcon}><BiXCircle onClick={()=>{handleClickDelete(course)}}>
            </BiXCircle>
          </span>}
        </strong></small>
      </Grid>
      
    )
  }
export default Course;
