import React from 'react';
import { Grid, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles=makeStyles(theme=>({
    Row_student:{
        textAlign:'center',
        background:'#f8f0e3',
        borderRadius:'5px',
        padding:'10px',
        marginBottom:'10px',
        color:'black'
    },
    showBTN:{
        borderRadius:'5px',
        background:'#022f4e',
        color:'white',
        '&:hover':{
            cursor:'pointer',
            background:'#0a50b9'
        }
    }
}))

const AuthorsRow = (props) => {
  const classes=useStyles();
  const authorData=props.authorData;
  return (
    <div>
        <Paper elevation={3} className={classes.Row_student}>
                <Grid container >
                    <Grid item lg={2}><b>{props.serialNo}</b></Grid>
                    <Grid item lg={4}><b>{authorData.authorName}</b></Grid>
                    <Grid item lg={3}><b>{authorData.AdvisedStudents.length}</b></Grid>
                    <Grid item lg={3}>
                        <Button size='small' 
                        onClick={()=>{props.ShowAuthorsSurveyDetails(authorData)}}
                         className={classes.showBTN}>Show Details</Button>
                    </Grid>
                </Grid>
            </Paper>
    </div>
  )
}
export default AuthorsRow;