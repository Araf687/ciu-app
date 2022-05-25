import { Grid, makeStyles } from '@material-ui/core';
import React, { PureComponent } from 'react';
import { BiXCircle } from "react-icons/bi";

const fakeData={id:"17202155",eligibleSubjects:['cse101','cse115','cse235'],credits:20};
const useStyle=makeStyles(theme=>({
  root:{},
  eligibleCourses:{
    padding:'5px',
    backgroundColor:"white",
    borderRadius:"7px",
    margin:"5px"
  },
  dltIcon:{
    '&:hover':{
      color:"red",
      cursor:'pointer',
      
    }
  }
}))

const Extra=()=> {
  const classes=useStyle();

    return (
      <div>
        <div>
          <Grid container>
            <Grid item lg={3}>
              <h5>Students Id</h5>
            </Grid>
            <Grid item lg={5}>
              <h5>Eligible courses for particular student</h5>
            </Grid>
            <Grid item lg={2}>
              <h5>total credits</h5>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item lg={3}>
              <h5>{fakeData.id}</h5>
            </Grid>
            <Grid item lg={5}>
              <div>
                {fakeData.eligibleSubjects.map(crs=><span className={classes.eligibleCourses}>{crs}<span className={classes.dltIcon}><BiXCircle/></span></span>)}
              </div>
            </Grid>
            <Grid item lg={2}>
              <h5>{fakeData.credits}</h5>
            </Grid>
          </Grid>
        </div>
      </div>
    )
}
export default Extra;