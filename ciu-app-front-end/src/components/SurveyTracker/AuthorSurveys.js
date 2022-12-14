import React,{useState,useEffect,useContext} from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    headerRow:{
        textAlign:'center',
        background:'#e3f6f8',
        borderRadius:'5px',
        padding:'10px',
        marginBottom:'10px',
        color:'black',
        fontWeight:600,
        fontSize:'16px'
    },
    body:{
        textAlign:'center',
        borderRadius:'5px',
        padding:'5px',
        background:'white',
    }
}))

const AuthorSurveys = (props) => {
    const classes=useStyles();
    const data=props.displayData;
    console.log(data)
    let serialNo=0;
  return (
    <div>
        <div className={classes.breadcumbs}>
            <h2>Surveys Attended by Author</h2>
            <span><Link to="/dashboard">Dashboard</Link> / Survey tracker / Surveys Attended by Author</span> 
        </div>
        <div>
            <h5 style={{textAlign:'center',margin:'10px 0px'}}>Surveys Attended by {data.authorName}</h5>
            <Paper className={classes.headerRow}>
                <Grid container>
                    <Grid item lg={2}>Serial No</Grid>
                    <Grid item lg={2}>Student Id</Grid>
                    <Grid item lg={3}>studentData</Grid>
                    <Grid item lg={5}>Last Modified</Grid>
                </Grid>
            </Paper>
            <div className={classes.body}>
                {data.AdvisedStudents.map(stData=><><Grid container style={{borderBottom:'1px solid #cdcbcb',padding:'10px 4px'}}>
                    <Grid item lg={2}>{++serialNo}</Grid>
                    <Grid item lg={2}>{stData.studentsId}</Grid>
                    <Grid item lg={3}>{stData.studentsName}</Grid>
                    <Grid item lg={5}>{stData.lastModified.date}<small style={{marginLeft:'20px'}}>{"time: "+stData.lastModified.time}</small></Grid>
                </Grid></>
                )}

    
            </div>
        </div>
    </div>
  )
}

export default AuthorSurveys