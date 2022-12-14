import { Grid, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';
const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor: 'aliceblue',
        padding:'15px',
        marginBottom:'5px',
        borderRadius:'5px',
        minHeight:'80px',
        maxHeight:'250px',
    },
    roomId:{
        fontWeight:600,
        textAlign:'center'
    },
    teacher_name:{
        color:'#0d0dad'
    },
  }))

function ClashInParticularRoom(props) {
    const classes=useStyles();
    const data=props.teacherClashData['teacherClashes'];
    const dataKeys=Object.keys(data);
  return (
    <div  className={classes.root}>
        <p className={classes.roomId}>Room No: {props.roomId}</p>
        {dataKeys.length!==0?dataKeys.map(key=><Grid container style={{marginBottom:'10px'}}>
            <Grid item xs={12} lg={3} className={classes.teacher_name}>
            {data[key]}
            </Grid>
            <Grid item xs={12} lg={9} className={classes.teacher_clash_data}>
                {key}
            </Grid>
        </Grid>
        ):<p style={{textAlign:'center'}}>No teachers clash held in this room</p>}
    </div>
 
  )
}

export default ClashInParticularRoom;