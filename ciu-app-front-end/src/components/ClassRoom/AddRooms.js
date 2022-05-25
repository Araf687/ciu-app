import { Button} from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import CheckBox from '../CustomizedStyleComponent.js/CheckBox';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';

const useStyles=makeStyles(theme=>({
  root:{
    display:"flex",
    justifyContent:"center",
    padding:'10px'
  }
}))

function AddRooms() {
  const classes=useStyles();
  const [roomType,setRoomType]=useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    data.roomType=roomType;
    data.slotsForST={'8:00 am':false,'9:30 am':false,'11:00 am':false,'12:30 pm':false,'2:00 pm':false,'3:30 pm':false};
    data.slotsForMW={'8:00 am':false,'9:30 am':false,'11:00 am':false,'12:30 pm':false,'2:00 pm':false,'3:30 pm':false};
    data.slotsForTH={'8:00 am':false,'9:30 am':false,'11:00 am':false,'12:30 pm':false,'2:00 pm':false,'3:30 pm':false};
    console.log(data);
    fetch(`http://localhost:5000/addClassRoom`,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
        })
        .then(res=>res.json())
        .then(data=>{
             if(data==true)
             { swal.fire(
                    'Great!',
                    'Room Added Successfully',
                    'success'
                  )
              document.getElementById("addRoom").reset();
              setRoomType(null)
            }
            else{
              let errorMessage;
              if(data.error.code===11000){
                errorMessage=`duplicate key inserted! ${data.error.keyValue._id} is already exist`;
              }
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:errorMessage,
              })
            }
            })
            .catch(err=>{
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:err,
                  })
            })
  };

  const handleChangeRoomType=(e)=>{
    setRoomType(e.target.value);
  }
  return (
    <section>
      <div className={classes.root}>
        <form id='addRoom' onSubmit={handleSubmit(onSubmit)}>
            <p style={{textAlign:'center',fontWeight:'700'}}>Add Room and time slot</p>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <TextField 
                  fullWidth 
                  id="demo-helper-text-misaligned-no-helper" 
                  label="Room No" 
                  {...register("_id",{ required: true })}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomType}
                    label="Room Type"
                    onChange={handleChangeRoomType}
                  >
                    <MenuItem value={'Theory'}>For Theory</MenuItem>
                    <MenuItem value={'lab'}>For Lab</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>  
            <br></br>      
            <Button variant="contained" style={{margin:"10px 0px",width:'100%'}} type="submit" color="primary">
                Add Room
            </Button>
              
        </form>
      </div>
    </section>

  )
}

export default AddRooms;