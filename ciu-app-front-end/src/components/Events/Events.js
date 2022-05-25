import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{
    
  },
  body:{
    padding:"0px 15px",
    "& h5":{
      margin:0,
      color:"#070764",
    },
    "& small":{
      color:"blue"
    }
  }
  
}));

const Events=(props)=> {
    const classes=useStyles();
    const {data}=props;
    console.log(typeof(data.date));
    return (
      <div className={classes.root}>
          <div className={classes.body}>
            <h5>
              {data.eventTitle}
            </h5>
            <p style={{margin:0}}>{new Date(data.date).toDateString()}</p>
            <small>{"Time: "+data.time}</small>
            <small style={{float:"right"}}>{"Duration: "+data.duration+" hr"}</small>
          </div>
          <hr></hr>
      </div>
    );
}
export default Events;
