import React from 'react';
import {makeStyles, Paper } from '@material-ui/core';
import { IoIosPeople } from "react-icons/io"; 

const useStyles = makeStyles((theme) => ({

}));

const Card=()=> {
  const classes=useStyles();
  return(
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
);
}
export default Card;
