import React,{useState,useEffect,useContext} from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

import {getCurrentSemester,getNextSemester} from '../functions';
import AuthorsRow from './AuthorsRow';
import BackDrop from '../CustomizedStyleComponent.js/BackDrop';
import AuthorSurveys from './AuthorSurveys';
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
    heading:{
        textAlign:'center',
        fontWeight:600,
        fontSize:'18px'
    },
    Row_student:{
        textAlign:'center',
        background:'#f8f0e3',
        borderRadius:'5px',
        padding:'10px',
        marginBottom:'10px',
        color:'black'
    },
}))
const SurveyTracker = () => {
    const classes=useStyles();
    const [attendeesData,setAttendeesData]=useState();
    const [showSurveyDetails,setShowSurveyDetails]=useState(false);
    const [displayData,setDisplayData]=useState();
    let serialNo=0;
    useEffect(() => {
        // console.log(showSurveyDetails);
        fetch(`http://localhost:5000/getSurveyAttendeesBySemester/${getCurrentSemester()}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(Object.keys(data).length);
            if(Object.keys(data).length===0){
                // console.log(Object.keys(data).length);
                // setShowSurveyDetails(true);
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! no survey has been attended.',
                  })
            }
            else{console.log("no data")}
            // setAttendeesData(data.result.authors);
        });
        
        

    },[])
    const ShowAuthorsSurveyDetails=(authorData)=>{
        console.log("ciu app",authorData);
        setDisplayData(authorData);
        setShowSurveyDetails(true);
    }
  return (
    <div>
        {showSurveyDetails?<AuthorSurveys displayData={displayData}></AuthorSurveys>
        : <div>
            <div className={classes.breadcumbs}>
                <h2>Survey tracker</h2>
                <span><Link to="/dashboard">Dashboard</Link> / Survey tracker</span> 
            </div>
            <div className={classes.heading}>
                <p>List of Survey Attendees in {getCurrentSemester()}</p>
            </div>
            <div className={classes.body}>
                <Paper elevation={3} className={classes.Row_student}>
                    <Grid container >
                        <Grid item lg={2}><b>Serial No</b></Grid>
                        <Grid item lg={4}><b>Advisor Name</b></Grid>
                        <Grid item lg={3}><b>Number of attended Survey</b></Grid>
                        <Grid item lg={3}><b>Action</b></Grid>
                    </Grid>
                </Paper>
                {attendeesData?attendeesData.map(author=><AuthorsRow ShowAuthorsSurveyDetails={ShowAuthorsSurveyDetails} authorData={author} serialNo={++serialNo}></AuthorsRow>):<BackDrop></BackDrop>}
            </div>
        </div>
        }
    </div>
  );
}

export default SurveyTracker