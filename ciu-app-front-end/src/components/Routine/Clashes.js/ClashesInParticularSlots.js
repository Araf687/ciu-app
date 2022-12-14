import { Grid } from '@material-ui/core';
import React from 'react'
import {filterClashes} from '../../functions';
import { makeStyles } from '@material-ui/core';
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles=makeStyles(theme=>({
  root:{
    backgroundColor: 'aliceblue',
    padding:'15px',
    marginBottom:'5px',
    borderRadius:'5px',
    minHeight:'80px',
    maxHeight:'250px',
    overflowY:'scroll',
  },
  noClashMsg:{
    textAlign:'center',
    padding:'10px',

  },
  slotTIme:{
    textAlign:'center',
    fontWeight:'bolder',
    position:'sticky'
  },
  clashSubject:{
    fontWeight:600,
    color:'#0d0dad',
  },
  studentId:{
    fontWeight:600
  },
  clashRow:{
    padding:'10px 0px'
  }

}));

function ClashesInParticularSlots(props) {
  // console.log(props);
  const classes=useStyles();
  const data=props.data;
  const filteredData=Object.keys(data).length===0?false:Object.keys(filterClashes(data)).length===0?false:filterClashes(data);
  console.log(filteredData)
  return (
    <div className={classes.root}>
    <div className={classes.slotTIme}>{props.slot}</div>
    {filteredData?<div>
      {Object.keys(filteredData).map(clashSub=><Grid container className={classes.clashRow}>
        <Grid item xs={12} className={classes.clashSubject} lg={3}>{clashSub}</Grid>
        <Grid item xs={12} className={classes.studentId} lg={9}>
          <div>{filteredData[clashSub].map(stId=><span>{stId}, </span>)}</div>
        </Grid>
      </Grid>)}
    </div>:<div className={classes.noClashMsg}>no clashes exist in this slot</div>}
    </div>
  )
}

export default ClashesInParticularSlots;