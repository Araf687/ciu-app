import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import swal from 'sweetalert2';

const useStyles=makeStyles(theme=>({
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        marginBottom:'20px',
        ['& a']:{
            color:'blue',
        }
  },
  formRoot:{
    display:"flex",
    justifyContent:"center",
  },
  singleFOrm:{
    width:"500px",
    backgroundColor:"white",
    borderRadius:"10px",
    padding:"40px",
  },
  field:{
      marginBottom:"20px"
  }
}));
const AddUser=()=>{
    const classes=useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [role, setRole] = React.useState('');
    const [showDeptField,setShowDeptField]=useState(false);
    const [dept,setDept]=useState('');

    const onSubmit = data =>{
        data.role=role;
        dept?data.dept=dept:data.dept='';
        console.log(data);
        fetch(`http://localhost:5000/addUser`,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
        })
        .then(res=>res.json())
            .then(data=>{
                swal.fire(
                    'Good job!',
                    'Added User Successfully',
                    'success'
                  )
                  document.getElementById("addUserForm").reset();
                  setRole('');
            })
            .catch(err=>{
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:err,
                  })
            })
       
    }
   

    const handleChange = (event) => {
      setRole(event.target.value);
      if(event.target.value==="Teacher"){
          setShowDeptField(true);
          setDept('');
      }
      else{
        setShowDeptField(false);
      }
    };
    const handleDeptChange = (event) => {
        setDept(event.target.value);
    }
    return (
        <div>
        <div className={classes.breadcumbs}>
            <h2>Add User</h2>
            <span><Link to="/dashboard">Dashboard</Link> / Add User</span> 
        </div>
        <div className={classes.formRoot}>
          <div className={classes.singleFOrm}>
            <form onSubmit={handleSubmit(onSubmit)} id='addUserForm'>
              <TextField
                InputProps={{className: classes.field}}
                fullWidth label="User Name" id="outlined-size-small" size="small" 
                {...register("name", { required: true })}
              />
              {errors.role && <span>This field is required</span>}
              <TextField
                InputProps={{className: classes.field}}
                fullWidth label="Email" id="outlined-size-small" size="small" 
                {...register("_id",{ required: true })}
              />
              {errors.role && <span>This field is required</span>}
              <FormControl fullWidth InputProps={{className: classes.field}} size="small" >
                <InputLabel id="demo-simple-select-label">User Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="User Role"
                    onChange={handleChange}
                    >
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Teacher"}>Teacher</MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              {showDeptField&&<FormControl fullWidth style={{marginTop:"20px"}} size="small" >
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dept}
                    label="Department"
                    onChange={handleDeptChange}
                    >
                    <MenuItem value={"CSE"}>CSE</MenuItem>
                    <MenuItem value={"EEE"}>EEE</MenuItem>
                    <MenuItem value={"ETE"}>ETE</MenuItem>
                </Select>
              </FormControl>}

              <Button type="submit" style={{marginTop:"20px"}} fullWidth color="primary" variant="contained" size="medium"> Add User</Button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default AddUser;