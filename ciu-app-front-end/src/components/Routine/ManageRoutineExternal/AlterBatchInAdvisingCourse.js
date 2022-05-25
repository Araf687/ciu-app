import React,{useState,useEffect, useContext} from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import OfferedCourseRow from './OfferedCourseRow';
import {getNextSemester,advisingArray_to_RoutineArray} from '../../functions';
import { Button } from '@mui/material';
import swal from 'sweetalert2';

const useStyles=makeStyles(theme=>({
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        ['& span']:{
          margin:'6px 0 0 2px',
          fontSize:'15px'
        },
        marginBottom:'30px',

  },
  header:{
    backgroundColor:"white",
    padding:"10px 5px",
    marginBottom:"10px",
    borderRadius:"8px",
    textAlign:"center",
    "& h6":{
        margin:"0",
        fontWeight:600,
    },
    border:"1px solid #e3e1e1",
  },}))


function AlterBatchInAdvisingCourse() {
  const [showDeleteBtn,setShowDeleteBtn]=useState(false);
  const [typeOfFetchedData,setTypeOfFetchedData]=useState('');
  const [allFaculties,setAllFaculties]=useState([]);
  const [changeFaculty,setChangeFaculty]=useState(true);
  const classes=useStyles();
  const [routineData,setRoutineData]=useState([]);
  const nextSemester=getNextSemester();

  let slno=0;
  const clickCustomizeManually=()=>{
    fetch("http://localhost:5000/allTeacher")
    .then(res=>res.json())
    .then(data=>{
      setAllFaculties(data);;
    })
    setShowDeleteBtn(true);
    setChangeFaculty(false)
  }
  const clickConfirm=()=>{
    console.log(routineData);
    fetch(`http://localhost:5000/confirmAdvisedCourseExternal/${nextSemester}`,{
      method:'POST',
      body:JSON.stringify({_id:nextSemester,routine:routineData}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>{
      setChangeFaculty(true);
      setShowDeleteBtn(false);
        swal.fire(
        'Great!',
        'Externals Added Successfully',
        'success'
        )})
        .catch(err=>{
           swal.fire({
           icon: 'error',
           title: 'Oops...',
           text:err,
          })
        })
  }
  const clickCancel=()=>{
    setShowDeleteBtn(false);
    setChangeFaculty(true);
  }
  const alterBatch=(batch,courseId)=>{
    console.log(batch,courseId);
    let newData=routineData.map(data=>{
      if(data._id._id===courseId){
        data.ignoredStudent.push(data.eligibleStudents.filter(data=>Math.floor(data/10)===batch));
      }
      return data;
    })
    setRoutineData(newData);

  }
  const setFaculty=(courseId,facultyName)=>{
    console.log(courseId,facultyName);
    const updateRoutineData=routineData.map(data=>{
      if(data._id._id===courseId){
        data.faculty=facultyName;
      }
      return data;
    });
    setRoutineData(updateRoutineData);
    console.log(routineData);
  }
  useEffect(()=>{
    console.log(nextSemester);
    fetch(`http://localhost:5000/getDataForAlterBatch/${nextSemester}`)
      .then(response => response.json())
      .then(data => {
        console.log(advisingArray_to_RoutineArray(data.data[0].customiseList));
        setRoutineData(advisingArray_to_RoutineArray(data.data[0].customiseList));
    })
  },[])
  return (
    <div>
      <div style={{textAlign:'right',marginBottom:'10px'}}>
        <Button style={{marginLeft:'15px'}} variant="contained">Alter Automatically</Button>
        {showDeleteBtn===false?
        <Button style={{marginLeft:'15px'}} 
        onClick={()=>{clickCustomizeManually()}} 
        variant="contained"
        >Customised Manually
        </Button>
        :
        <>
        <Button style={{marginLeft:'15px'}} 
        onClick={()=>{clickConfirm()}} 
        variant="contained"
        >Confirm</Button>
        <Button style={{marginLeft:'15px'}} 
        onClick={()=>{clickCancel()}} 
        variant="contained"
        >Cancel</Button>
        </>}
      </div>
      <Grid container className={classes.header}>
        <Grid xs={12} lg={1}>
         <p><strong>Sl No</strong></p>
        </Grid>
        <Grid xs={12} lg={1}>
          <p><strong>Course Id</strong></p>
        </Grid>
        <Grid xs={12} lg={4}>
          <p><strong>ELigible Batch</strong></p>
        </Grid>
        <Grid xs={12} lg={3}>
        <p><strong>Ignored Batch</strong></p>
        </Grid>
        <Grid xs={12} lg={3}>
        <p><strong>Faculty</strong></p>
        </Grid>

    </Grid>
      { routineData&&routineData.map(data=><OfferedCourseRow 
      slNo={++slno} 
      showDeleteBtn={showDeleteBtn} 
      data={data}
      changeFaculty={changeFaculty}
      func={[alterBatch,setFaculty]}
      allFaculties={allFaculties}
      >
      
      </OfferedCourseRow>)}
    </div>
  )
}

export default AlterBatchInAdvisingCourse;