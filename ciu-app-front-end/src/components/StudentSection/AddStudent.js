// import * as React from 'react';
import React, { useContext,} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {makeStyles, Paper} from '@material-ui/core'
import { contextUser } from '../../App';
import { Link } from 'react-router-dom';
import AddInfoForm from './AddInfoForm';
import AddInfoByFile from '../AddInfoByFile/AddInfoByFile';

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
          },
          marginBottom:'30px',
          ['& a']:{
              color:'blue',
          }
    },
    paper:{
        borderRadius:"8px",
        padding:'20px',
        ['& h6']:{
            fontSize:'20px',
            color:'#3ca2fb',
        },

    },
}))

const AddStudent = () => {  
    const classes=useStyles();
    const [,,addOptions,]=useContext(contextUser);

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <section className={classes.root}>
            <div className={classes.breadcumbs}>
                <h2>{addOptions.title}</h2>
                <span><Link to="/dashboard">Dashboard</Link> / {addOptions.title}</span> 
            </div>
            <Paper className={classes.paper}>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Add One"/>
                        <Tab value="two" label="Add Many" />
                    </Tabs>
                </Box>
                <hr></hr>
                {value=="one"?<AddInfoForm/>:<AddInfoByFile/> }
            </Paper>
            
        </section>
    );
};

export default AddStudent;