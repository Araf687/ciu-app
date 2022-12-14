import React from 'react';
import { Box, Grid, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AlterBatchInAdvisingCourse from './AlterBatchInAdvisingCourse';
import AddRooms from '../../ClassRoom/AddRooms';
import AllRooms from '../../ClassRoom/AllRooms';
import RoomSlider from '../../ClassRoom/RoomSlider';

const useStyles=makeStyles(theme=>({
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        ['& span']:{
          margin:'6px 0 0 2px',
          fontSize:'15px'
        },
        marginBottom:'30px',

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


function ManageRoutineExternal() {
    const classes=useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
        <div className={classes.breadcumbs}>
          <h2>Manage Routine External</h2>
          <span><Link to="/dashboard">Dashboard</Link> / Manage Routine External</span> 
        </div>
        {/* <h3 style={{textAlign:'center'}}>Manage Routine External</h3> */}
        <Paper className={classes.paper}>
                <Box sx={{ width: '100%' }}> 
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Alter Batch"/>
                        <Tab value="two" label="Add Rooms" />
                        <Tab value="three" label="All Rooms" />
                    </Tabs>
                </Box> 
                <hr></hr>
                {value==="one"&&<AlterBatchInAdvisingCourse/>}
                {value==="two"&&<AddRooms></AddRooms>}
                {value==='three'&&<RoomSlider></RoomSlider>}
            </Paper>
    </div>
  )
}

export default ManageRoutineExternal