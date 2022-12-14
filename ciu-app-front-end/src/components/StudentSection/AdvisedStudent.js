import React from 'react'
import { Button, Grid, makeStyles, Paper} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {useState,useEffect,useContext} from 'react';
import { contextUser } from '../../App';
import swal from 'sweetalert2';
import {IoIosArrowBack} from "react-icons/io";
import BackDrop from '../CustomizedStyleComponent.js/BackDrop';
import StudentProfile from './StudentProfile';
import {getCurrentSemester} from '../functions';

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
    },
    Row_student:{
        textAlign:'center',
        background:'#f8f0e3',
        borderRadius:'5px',
        padding:'10px',
        marginBottom:'10px',
        color:'black'
    },
    showBTN:{
        borderRadius:'5px',
        background:'#022f4e',
        color:'white',
        '&:hover':{
            cursor:'pointer',
            background:'#0a50b9'
        }
    }
}))
const AdvisedStudent=()=>{
  const classes=useStyles();
  let [user,,,]=useContext(contextUser);
  const [studentsData,setStudentsData]=useState([]);
  const [studentDetails,setStudentDetails]=useState({});
  const [clickShowDetails,setClickShowDetails]=useState(false);
  const [showBackDrop,setShowBackDrop]=useState(false);
  let slNo=0;
  useEffect(() => {
    fetch(`http://localhost:5000/getAdvisedStudents/${user.name}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setStudentsData(data.result)
    })
  },[])
 
  const dataForTrack=(type,maindata)=>{
    // console.log(getCurrentSemester(),type,maindata,user);
    fetch(`http://localhost:5000/setAdvisedData_to_tracker`,{
        method:'POST',
        body:JSON.stringify({nextSem:getCurrentSemester(),type:type,data:maindata,user:user}),
        headers:{
          "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{console.log(data)})
  }

  const showStudentDetails=(stId)=>{
    console.log(stId);
    setShowBackDrop(true);
    fetch(`http://localhost:5000/searchStudentById/${stId}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if('id' in data){
            setShowBackDrop(false);
            setStudentDetails(data); 
            setClickShowDetails(true);
            console.log(data);
        }
        else{
            swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! check your search id or the internet connection',
            })
        }
        })
  }
  return (
    <div>
        <div className={classes.breadcumbs}> 
            <div>
                <h2>Advised Student</h2>
                <span><Link to="/dashboard">Dashboard</Link> / Advised Student</span>
            </div>
        </div>
        {clickShowDetails==true&& <div><Button variant="contained" onClick={()=>{setClickShowDetails(false)}} size="medium" style={{background:'white',textTransform: 'lowercase',fontWeight:'600',marginBottom:'15px'}}><IoIosArrowBack/>back</Button></div>}
        {clickShowDetails==false&&<><Paper elevation={3} className={classes.Row_student}>
            <Grid container >
                <Grid item lg={2}><b>Serial No</b></Grid>
                <Grid item lg={2}><b>student id</b></Grid>
                <Grid item lg={4}><b>Name</b></Grid>
                <Grid item lg={2}><b>Enrolled Semester</b></Grid>
                <Grid item lg={2}><b>Action</b></Grid>
            </Grid>
        </Paper>
        <div>
            {studentsData&&studentsData.map(student=><div>
                <Paper elevation={3} className={classes.Row_student}>
                    <Grid container >
                        <Grid item lg={2}><span>{++slNo}</span></Grid>
                        <Grid item lg={2}><span>{student._id}</span></Grid>
                        <Grid item lg={4}>{student.name}</Grid>
                        <Grid item lg={2}>{student.semester}</Grid>
                        <Grid item lg={2}><Button size='small' onClick={()=>{showStudentDetails(student._id)}} className={classes.showBTN}>Show Details</Button></Grid>
                    </Grid>
                </Paper>
            </div>)}

        </div></>}
        {/* backdrop for showing loading process */}
        {showBackDrop&&<BackDrop></BackDrop>}

        {/* showing students details */}
        {clickShowDetails==true&&<div>
            <StudentProfile data={studentDetails} systemUser={"faculty"} trackFunction={dataForTrack} setData={setStudentDetails}></StudentProfile>
        </div>}
    </div>
  )
}
export default AdvisedStudent;