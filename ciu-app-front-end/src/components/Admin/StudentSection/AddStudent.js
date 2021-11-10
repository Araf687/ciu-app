import React from 'react';
import {Grid, makeStyles} from '@material-ui/core'
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme=>({
    
    breadcumbs:{
        ['& h2']:{
            margin:'0',
            fontSize:'28px',
            fontWeight:'400',
          },
          ['& p']:{
            margin:'6px 0 0 2px',
            fontSize:'15px'
          }

    },
}))

const AddStudent = () => {
    const classes=useStyles();
    return (
        <section>
            <Grid container>
                <Grid></Grid>
            </Grid>
            <div className={classes.breadcumbs}>
                <h2>Add Student</h2>
               <span><Link>Home</Link> / <b>Add Student</b></span> 
            </div>
       
        </section>
    );
};

export default AddStudent;