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
    const dateStamp=new Date(data.date);
    const time=dateStamp.toLocaleString([], {hour: '2-digit', minute:'2-digit'});
    console.log(data);
    return (
      <div className={classes.root}>
          <div className={classes.body}>
            <h5>
              {data.title}
            </h5>
            <p style={{margin:0}}>{new Date(data.star).toDateString()}</p>
            <small>{"Time: "+time}</small>
            <small style={{float:"right"}}>{"Duration: "+data.duration+" hr"}</small>
          </div>
          <hr></hr>
      </div>
    );
}
export default Events;
