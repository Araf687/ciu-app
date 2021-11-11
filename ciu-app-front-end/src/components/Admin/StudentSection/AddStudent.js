import React from 'react';
import {Grid, makeStyles, Paper} from '@material-ui/core'
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
          },
          marginBottom:'30px',


    },
    paper:{
        height:"350px",
        width:"100%",
        borderRadius:"8px",
        padding:'20px',
        ['& h6']:{
            fontSize:'20px',
        },

    },
    formRoot:{
        
    },
}))

const AddStudent = () => {
    const classes=useStyles();
    return (
        <section>
            <div className={classes.breadcumbs}>
                    <h2>Add Student</h2>
                    <span><Link to="/dashboard">Dashboard</Link> / Add Student</span> 
            </div>
            <Paper className={classes.paper}>
                <h6>Basic Information</h6>
                <Grid container className={classes.formRoot}>
                    <Grid item xs={12} lg={6}>
                        sdjcsd
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        sdsd
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        dssd

                    </Grid>
                </Grid>
            </Paper> 
       
        </section>
    );
};

export default AddStudent;