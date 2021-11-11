import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles=makeStyles(theme=>({
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

const AllStudent = () => {
    const classes=useStyles();
    return (
        <section>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.breadcumbs}>
                        <h2>All Students</h2>
                        <span><Link to="/dashboard">Home</Link> / All Students</span> 
                    </div>
                </Grid>
            </Grid>
        </section>
    );
};

export default AllStudent;