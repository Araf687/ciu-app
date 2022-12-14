import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {FormControl, InputLabel, makeStyles, MenuItem, NativeSelect, Select} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import swal from 'sweetalert2'; 
import { useState } from 'react';
import Data from '../Routine/Routine/Data';

const useStyles = makeStyles((theme) => ({
  root:{
    padding:"20px",
  },
  eventSection:{
    
  }
}));

function EditFormForStudent(props) {
  console.log(props)
  const classes=useStyles();
  const allFaculties=props.allfac;
  // const [open, setOpen] = React.useState(props.editAction);
  // const [date,setDate]=React.useState(new Date());
  const {register,handleSubmit,formState: { errors } } = useForm();
  const [faculty,setFaculty]=useState(props.prevData.advisor);
  const [dept,setDept]=useState(props.prevData.dept);
  const handleChangeFaculty = (event) => {
    setFaculty(event.target.value);
  };
  const onSubmit = changedData => {
    changedData.dept=dept;
    changedData.advisor=faculty;
    fetch('http://localhost:5000/updateStudentsData', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changedData),
  })
    .then((response) => response.json())
    .then((data) => {
      props.editAction[1](false);
      if(data){
        
        swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: true,
        })
      }
      else{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    })
    console.log(changedData,dept,faculty);
  }

  const handleClose = () => {
    // setOpen(false);
    props.editAction[1](false);
  };
  const handleChangeDept=(event)=>{
    setDept(event.target.value);
  }
  
  return (
    <div>
      <Dialog
        open={props.editAction[0]}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>  
                <Grid item xs={12} lg={12}>
                  <h4 style={{textAlign:"center",margin:"10px 0px"}}>Edit Student's Info</h4>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <div className={classes.eventSection}>
                    <TextField style ={{width: '100%'}} defaultValue={props.prevData.id} id="outlined-basic" label="Id" variant="outlined" {...register("id",{ required: true })} />
                  </div>
                  {errors.title && <span style={{color:"red",fontWeight:"600"}}>This field is required</span>}
                </Grid>
                <Grid item xs={12} lg={12}>
                  <div className={classes.eventSection}>
                    <TextField style ={{width: '100%'}} defaultValue={props.prevData.name} id="outlined-basic" label="name" variant="outlined" {...register("name",{ required: true })} />
                  </div>
                  {errors.title && <span style={{color:"red",fontWeight:"600"}}>This field is required</span>}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Faculty
                    </InputLabel>
                    <NativeSelect
                      defaultValue={faculty}
                      value={faculty}
                      onChange={handleChangeFaculty}
                      inputProps={{
                        name: 'dept',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {allFaculties.map(faculty=><option value={faculty.name}>{faculty.name}</option>)}
                    </NativeSelect>
                  </FormControl> 
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Department
                    </InputLabel>
                    <NativeSelect
                      defaultValue={"CSE"}
                      value={dept}
                      onChange={handleChangeDept}
                      inputProps={{
                        name: 'dept',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={"CSE"}>CSE</option>
                      <option value={"EEE"}>EEE</option>
                      <option value={"ETE"}>ETE</option>
                    </NativeSelect>
                  </FormControl> 
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Button type="submit"  style ={{width: '100%',marginTop:"15px",background:'#04407a'}}  variant="contained">Submit New Information</Button>
                </Grid>
              </Grid>
            </form>
        </div>
      </Dialog>
    </div>
  )
}

export default EditFormForStudent;