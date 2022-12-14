import { Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Course from './Course';
import { Link } from 'react-router-dom';

const useStyles=makeStyles(theme=>({
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        marginBottom:'20px',
        ['& a']:{
            color:'blue',
        }
  },}));

const AllCourses=()=> {
  const classes=useStyles();
  const [courses,setCourses]=useState([]);
  const fakeData=["a","b","c","a","b","c","a","b","c","a","b","c","a","b","c","a","b","c","a","b","c"]
  useEffect(() => {
    fetch("http://localhost:5000/allCourses")
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setCourses(data);
    })
}, []);

    return (
      <div>
        <div className={classes.breadcumbs}>
            <h2>All Courses</h2>
            <span><Link to="/dashboard">Dashboard</Link> / All Courses</span> 
        </div>
        {courses.length!=0?courses.map(data=><Course key={data.courseId} info={data}></Course>):fakeData.map(data=><Skeleton variant="rectangular" style={{borderRadius:"10px",margin:"10px 0px"}} width="100%" height={32} />)}
      </div>
      
    )
}
export default AllCourses;