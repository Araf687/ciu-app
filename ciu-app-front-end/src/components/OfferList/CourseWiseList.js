import React, { useEffect, useState } from 'react';
import CourseWIseRow from './CourseWIseRow';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Button} from '@mui/material';
import {formatForShowingReport_on_coursewise_Section} from '../functions';
import BackDrop from '../CustomizedStyleComponent.js/BackDrop';

const CourseWiseList=(props)=> {
    const data=props.data;
    console.log(data);
    let i=0;
    const [studentInfo,setStudentInfo]=useState();
    const [showLoading,setShowLoading]=useState(true);
    useEffect(()=>{
      fetch("http://localhost:5000/allStudents")
      .then(res=>res.json())
      .then(data=>{
        setStudentInfo(formatForShowingReport_on_coursewise_Section(data));
        setShowLoading(false);
      })
    },[])
    return (
      <div>
        <div>
          <Button size='small' onClick={()=>{props.state(false)}} variant="contained"><KeyboardBackspaceIcon></KeyboardBackspaceIcon></Button>   
        </div>
        <h3 style={{textAlign:"center"}}>Course Wise Student Information</h3>
        {showLoading===true&& <BackDrop></BackDrop>}
        {
          showLoading===false&&data.map(dt=><CourseWIseRow inc={++i} stData={studentInfo} data={dt}></CourseWIseRow>)
        }
      </div>
    )
  }
export default CourseWiseList;