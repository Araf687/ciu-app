import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { FaHome } from "react-icons/fa";
import './Dashboard.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading:{
    ['& h2']:{
      margin:'0',
      fontSize:'30px',
      fontWeight:'400',
    },
    ['& p']:{
      margin:'6px 0 0 2px',
      fontSize:'15px'
    }
    
  },
  paper: {
    padding:'20px',
    borderRadius:'8px',
    ['& h6,small']:{
      margin:'0',
    },
    ['& h2']:{
      fontSize:'35px',
      fontWeight:'400',
      margin:'6px 0px',
      color:'#bdbdbd',
    },
    ['& small']:{
      fontSize:'12px',
      fontWeight:'400',

    },
    ['& h6']:{
      fontSize:'20px',
      fontWeight:'500',
      color:'#070764',
      
    },
  },
  progress:{
    borderRadius: "8px",
    background: "#f7f7f7",
  },
  progressBar:{
    backgroundColor:'blue',
    height:'8px',
    backgroundColor:'#070764',
    borderRadius:'8px',
    margin:'5px 0px',
    boxShadow:'0 10px 15px 0 rgb(0 0 0 / 10%)',
  }
}));
const Dashboard = () => {
  const classes=useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>

          <div className={classes.heading}>
            <h2>Dashboard</h2>
            <p><FaHome/> CIU App / Dashboard</p>
            </div>
          
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <h6>New Students</h6>
            <h2>100<small> of 2000</small></h2>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar} style={{width:'10%',}}></div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <h6>Courses countinueing</h6>
            <h2>15<small> of 40</small></h2>
            <small>completed of 25% of the courses in this semester</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar} style={{width:'25%',}}></div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <h6>Course Offered</h6>
            <h2>15<small> of 40</small></h2>
            <small>completed of 25% of the courses in this semester</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar}></div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <h6>New Students</h6>
            <h2>100<small> of 2000</small></h2>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar}></div>
            </div>
          </Paper>
        </Grid>
      </Grid>
  </div>
  );
};

export default Dashboard;