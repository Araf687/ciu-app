import { Grid, makeStyles, Paper,Button} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import ProgressBar from '../../ProgressBar/ProgressBar';
import './Dashboard.css';

import { ImMail3} from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import { BsListTask } from "react-icons/bs";
import { DiGhostSmall } from "react-icons/di";
import CiuCalendar from '../../CiuCalendar/Calendar';
import AddIcon from '@material-ui/icons/Add';
import CreateEvent from '../../Events/CreateEvent';
import Events from '../../Events/Events';
import { contextUser } from '../../../App';
import swal from 'sweetalert2';

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
    border:'none',
    borderRadius:'8px',
    ['& h6,small']:{
      margin:'0',
    },
    ['& h2']:{
      fontSize:'30px',
      fontWeight:'400',
      margin:'6px 0px',
      color:'#bdbdbd',
    },
    ['& small']:{
      fontSize:'12px',
      fontWeight:'400',

    },
    ['& h6']:{
      height:"40px",
      fontSize:'19px',
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
  },
  todaySchedule:{
    // minHeight:'444px'
  },
  events:{
    paddingTop:"20px",
    "& h5":{
      fontWeight:700,
      textAlign:"center",
      color:"#070764",

    },
  },
  eventBTN:{
    display:"flex",
    justifyContent:"center",
    fontWeight:700,
    color:"#007eff",
    border:"2px solid #e9e3e3de",
    padding:"5px",
    borderRadius:"5px",
    "&:hover":{
      cursor:"pointer"
    }
  }

}));
const Dashboard = () => {
  const classes=useStyles();
  const [eventsClick,setEventsClick]=useState(false);
  const [events,setEvents]=useState([]);
  const [user,,,,]=useContext(contextUser);
  // console.log(user)

  useEffect(()=>{
    fetch(`http://localhost:5000/getDashboardData`)
    .then(res=>res.json())
    .then(data=>{
        if(data){
          console.log(data);
          setEvents(data.event);
        }
    })
    .catch(err=>{console.log(err)})
  },[])
  const confirmEvent=(eventData)=>{
    // console.log([eventData])
    const newEvent=[...events,eventData]
    console.log(newEvent);
    setEvents();
    console.log(events);
    swal.fire(
      'Good job!',
      `Added event Successfully`,
      'success'
    )
  }
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
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <h6>New Students</h6>
                <h2>100<small> of 2000</small></h2>
              </div>
              <div>
                <IoIosPeople style={{fontSize:'4.5rem',color:'rgb(5 120 158 / 14%)',marginRight:'1rem',}}/>
              </div>
            </div>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar} style={{width:'15%',}}></div>
            </div>
          </Paper>
        </Grid> 
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <h6>Courses Offered</h6>
                <h2>15<small> of 40</small></h2>
              </div>
              <div>
                <DiGhostSmall style={{fontSize:'4.5rem',color:'rgb(5 120 158 / 14%)',marginRight:'1rem',}}/>
              </div>
            </div>
            <small>completed 25% of the semester</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar} style={{width:'25%',}}></div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <h6>Tasks</h6>
                <h2>2<small> of 4</small></h2>  
              </div>
              <div><BsListTask style={{fontSize:'4.5rem',color:'rgb(5 120 158 / 14%)',marginRight:'1.5rem',}}/></div>
            </div>
            <small>2 tasks +completed.</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar} style={{width:'25%',}}></div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <h6>Emails</h6>
                <h2>70<small> of 200</small></h2>
                
              </div>
              <div><ImMail3 style={{fontSize:'4.5rem',color:'rgb(5 120 158 / 14%)',marginRight:'2rem',}}/></div>
            </div>
            <small>Pending Emails.</small>
            <div className={ classes.progress}>
              <div className={classes.progressBar} style={{width:'38%',}}></div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12}>
          {
          user.role==="Teacher"&&
          <><Paper className={classes.paper}>
            <h3 style={{marginTop:'0'}}>
              Courses Progress
            </h3>
            <Grid container spacing={2}>
              <ProgressBar name={"CSE101"} value={63}></ProgressBar>
              <ProgressBar name={"CSE115"} value={45}></ProgressBar>
              <ProgressBar name={"MAT101"} value={33}></ProgressBar>
            </Grid>
          </Paper><br/></>}
          <Paper className={classes.paper}>
            <CiuCalendar calData={events}></CiuCalendar>
          </Paper>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Paper>
            <div className={classes.events}>
              <h5>Events</h5>
            </div>
            <hr></hr>
            <div style={{minHeight:"100px",overflowX:"auto"}}>
              {eventsClick && <CreateEvent confirmEvent={confirmEvent} eventClick={setEventsClick}/>}
              {events && events.map(data=> <Events data={data}></Events>)}
            </div>
            <div className={classes.eventBTN} onClick={()=>{setEventsClick(true)}}>
              <AddIcon></AddIcon>
              <h6>Create Event</h6>
            </div>
          </Paper>
          
        </Grid>
      </Grid>
  </div>
  );
};

export default Dashboard;