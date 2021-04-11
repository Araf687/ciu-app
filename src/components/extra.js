import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyle=makeStyles(theme=>({
    root:{
      backgroundColor:'white',
      width:'260px',
      padding:'20px',
      borderRadius:'5px',
      color:'#222',
      
  
    },
    items:{
      borderRadius:'20px',
      // margin:'20px',
      ['& h6']:{
        fontSize:'25px',
        margin:'0',
        fontWeight:'600',
        color:'#070764',
        
      },
      ['& h2']:{
        fontSize:'35px',
        fontWeight:'600',
        margin:'6px 0px',
        color:'#bdbdbd',
        
      },
      ['& small']:{
        fontSize:'14px',
        fontWeight:'400',
  
      }
    },
    title:{
      fontSize:'35px',
      lineHeight:'0',
    },
    progress:{
      borderRadius: "8px",
      background: "#f7f7f7",
    },
    progressbar:{
      backgroundColor:'blue',
      width:'50%',
      height:'8px',
      backgroundColor:'#070764',
      borderRadius:'8px',
      margin:'5px 0px',
      boxShadow:'0 10px 15px 0 rgb(0 0 0 / 10%),'
    }
  
  }))

export default function CenteredGrid() {
  const classes = useStyle();

  return (
    <div>
        <Grid container spacing={1}>
        {/* <div className='section-name'>
            <p className={classes.title}>Dashboard</p>
            <p className="breadcrumb"><FaHome/> CIU App / Dashboard</p>
        </div> */}
        
        <Grid item xs={3} className={classes.items}>
        <div className={classes.root}>
            <h6>New Students</h6>
            <h2>100<small> of 2000</small></h2>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
            <div className={classes.progressbar}>

            </div>
            </div>
        </div>
        </Grid>
        <Grid item xs={3} className={classes.items}>
        <div className={classes.root}>
            <h6>New Students</h6>
            <h2>100<small> of 2000</small></h2>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
            <div className={classes.progressbar}>

            </div>
            </div>
        </div>
        </Grid>
        <Grid item xs={3} className={classes.items}>
        <div className={classes.root}>
            <h6>New Students</h6>
            <h2>100<small> of 2000</small></h2>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
            <div className={classes.progressbar}>

            </div>
            </div>
        </div>
        </Grid>
        <Grid item xs={3} className={classes.items}>
        <div className={classes.root}>
            <h6>New Students</h6>
            <h2>100<small> of 2000</small></h2>
            <small>3% higher than last semester.</small>
            <div className={ classes.progress}>
            <div className={classes.progressbar}>

            </div>
            </div>
        </div>
        </Grid>
    </Grid>       
  </div>
   
  );
}
