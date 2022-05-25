import { Button, Grid } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const CourseWIseRow=(props)=> {
    const data=props.data;
    const {_id,name}=data._id;
    const eligibleStudents=data.eligibleStudents;
    const slNo=props.inc;
    let batch={};
    eligibleStudents.map(id=>{
        const newId=id.toString().slice(0,2);
        if(!batch[newId]){
            batch[newId]=[id];
        }
        else{
            batch[newId]=[...batch[newId],id]
        }
    })
    const keys=Object.keys(batch);
    console.log(batch);
    
    return (
        <div >
          
          <Grid container style={{backgroundColor:"white",borderRadius:"6px",padding:"10px",margin:"10px 0px",border:"1px solid #e9e6e6"}}>
              <Grid lg={1}>
                  <strong>{slNo}</strong>
              </Grid>
              <Grid item lg={1}>
                <strong>{_id}</strong>
              </Grid>
              <Grid item lg={3}>
                <strong>{name}</strong>
              </Grid>
              <Grid item lg={7}>
                  <div>
                      {keys.map(key=>
                      <div>
                          <p style={{margin:"0"}}><strong>Batch {key}:</strong> {batch[key].length} students</p>
                          <p>{batch[key].map(id=><>{id} ,</>)}</p>
                      </div>
                        )}
                  </div>
              </Grid>
          </Grid>
        </div>
    )
  }
export default CourseWIseRow;