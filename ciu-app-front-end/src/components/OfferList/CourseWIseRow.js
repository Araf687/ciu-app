import { Button, Grid } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Paper } from '@material-ui/core';

const CourseWIseRow=(props)=> {
    const data=props.data;
    const {_id,name}=data._id;
    const stData=props.stData;
    const eligibleStudents=data.eligibleStudents||data.eligible;
    const slNo=props.inc;
    let batch={};
    eligibleStudents.map(id=>{
        const newId=id.slice(0,2);
        if(!batch[newId]){
            batch[newId]=[id];
        }
        else{
            batch[newId]=[...batch[newId],id]
        }
    })
    const keys=Object.keys(batch);
    // console.log(stData);
    
    return (
        <div >
          
          <Grid container style={{backgroundColor:"white",fontSize:'15px',borderRadius:"6px",padding:"20px 40px",margin:"10px 0px",border:"1px solid #e9e6e6"}}>
              <Grid item lg={12} style={{marginBottom:'10px',textAlign:"center"}}>
                <strong style={{color:"#0d4770"}}>{slNo}. {_id||props.data._id} ({name})</strong>
              </Grid>
              <Grid item lg={12}>

                  <div>
                      {keys.map(key=>
                      <Paper style={{background:"#4bc9b2fa",padding:"0px 10px"}}>
                          <p style={{marginTop:'15px',marginBottom:'px',textAlign:"center"}}><strong>Batch {key} :</strong> {batch[key].length}</p>
                          <Grid container>{batch[key].map(id=><Grid item lg={4}><Grid container style={{marginBottom:'10px'}}><Grid item lg={2.5}>{id}</Grid><Grid item lg={9.5}>{stData[`${id}`]}</Grid></Grid></Grid>)}</Grid>
                      </Paper>
                        )}
                  </div>
              </Grid>
          </Grid>
        </div>
    )
  }
export default CourseWIseRow;