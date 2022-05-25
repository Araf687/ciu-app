import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core';
import { Grid } from '@mui/material';
import RoomRow from './RoomRow';
import swal from 'sweetalert2';
import RoomSlider from './RoomSlider';
const useStyles=makeStyles(theme=>({
    root:{
        textAlign:'center',
        width:'98%'
    },
    heading:{
        fontWeight:'600',
        borderBottom:'3px solid #ddd',
        paddingBottom:'4px',
        borderRadius:'5px',
        fontSize:'20px',
    }
    }));

function AllRooms(props) {
    const day=props.day;
    const classes=useStyles();
    const [allRooms,setAllRooms]=useState([]);
    let serialNo=0;
    useEffect(() => {
        fetch("http://localhost:5000/getAllClassRooms")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setAllRooms(data);
        })
    },[])
    const handleDltRoom=(roomId)=>{
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setAllRooms(allRooms.filter(time=>time._id!==roomId));
                fetch(`http://localhost:5000/deleteClassRoom/${roomId}`, {
                    method: 'DELETE',
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data){
                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })

                
            }
          })
    }
    const handleEditRoom=(roomNo,slots)=>{
        fetch(`http://localhost:5000/editClassRoom`,{
                method:'PATCH',
                body:JSON.stringify({room:roomNo,timeSlots:slots,dayFor:day}),
                headers:{
                    "Content-Type":"application/json"
                }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data===true){
                swal.fire(
                    'Great!',
                    'Data Changes Successfully',
                    'success'
                  )
            }
            else{
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:'Something went wrong',
                  })
            }
            
        })
    }
  return (
    <div className={classes.root}>
        <p style={{marginBottom:'30px'}}>
            <span className={classes.heading}>{day}</span>
        </p>
        <Grid container >
            <Grid item xs={12} lg={1}>
                <p><strong>serial no</strong></p>
            </Grid>
            <Grid item xs={12} lg={1}>
                <p><strong>Room No</strong></p>
            </Grid>
            <Grid item xs={12} lg={1}>
                <p><strong>Type</strong></p>
            </Grid>
            <Grid item xs={12} lg={8}>
                <p><strong>Time Slot</strong></p>
            </Grid>
            <Grid item xs={12} lg={1}>
                <p><strong>Actions</strong></p>
            </Grid>
        </Grid>
        <div>
            {allRooms && allRooms.map(data=> <RoomRow day={day} handleDltRoom={handleDltRoom} 
            roomData={data} 
            slNo={++serialNo}
            handleEditRoom={handleEditRoom}
            ></RoomRow> )}
        </div>
        
    </div>
  )
}

export default AllRooms;