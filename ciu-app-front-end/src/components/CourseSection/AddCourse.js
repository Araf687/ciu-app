import { Button, Checkbox, Grid, IconButton, makeStyles } from '@material-ui/core';
import { TextField,InputAdornment, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MdAddBox} from "react-icons/md";
import PreReqBox from './PreReqBox';
import swal from 'sweetalert2';
import clsx from 'clsx';

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
    "& input":{
      width:"100%",
      marginBottom:"10px"
    },
    
  },
  preReqField:{
    border:"1px solid #e9e8e9",
    marginTop:"10px",
    borderRadius:'5px',
    padding:"10px"
   },
   field:{
    marginBottom:"10px"
  },
  hideComponent:{
    display:"none"
}
}));

const AddCourse=()=> {
  const classes=useStyles();
  const [preReq,setPreReq]=useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [optionalCourse,setOptionalCourse]= useState(true);
  const onSubmit = data => {
    data.preReq=preReq;
    console.log(data,preReq);
    fetch(`http://localhost:5000/addCourses`,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
        })
        .then(res=>res.json())
            .then(data=>{
                swal.fire(
                    'Great!',
                    'Course Added Successfully',
                    'success'
                  )
                  document.getElementById("addCourseForm").reset();
                  setPreReq([]);
            })
            .catch(err=>{
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:err,
                  })
            })
       
    
    
  }
  const addButtonClick=()=>{
    const val=document.getElementById("preRequisite").value;
    const preReqValue=[...preReq,val];
    setPreReq(preReqValue);
    // console.log(val,preReq);
  }
    return (
      <div style={{marginBottom:"10px"}}>
        <div className={classes.breadcumbs}>
            <h2>NewOfferList</h2>
            <span><Link to="/dashboard">Dashboard</Link> / NewOfferList</span> 
        </div>
        {/* <div style={{textAlign:"center"}}>
          <Button>Add One</Button>
          <Button>Add Many</Button>
        </div> */}
        <div className={classes.formRoot}>
          <div className={classes.singleFOrm}>
            <form id="addCourseForm" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  InputProps={{className: classes.field}}
                  fullWidth label="Course Id" id="outlined-size-small" size="small" 
                  {...register("courseId", { required: true })}
                />
                {errors.courseId && <span>This field is required<br/><br/></span>}
                <TextField
                  InputProps={{className: classes.field}}
                  fullWidth label="Course Name" id="outlined-size-small" size="small" 
                  {...register("name",{ required: true })}
                />
                {errors.courseName && <span>This field is required<br/><br/></span>}
                <TextField
                  InputProps={{className: classes.field}}
                  fullWidth label="Credit Hours" id="outlined-size-small" size="small" type="number"
                  {...register("creditHours",{ required: true })}
                />
                {errors.creditHours && <span>This field is required <br/></span>}
                {errors.creditHours && <span>This field is required <br/></span>}
                <div className={classes.preReqField}>
                  <TextField
                    id="preRequisite"
                    label="Pre-Requisite"
                    size="small" 
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="primary" onClick={()=>{addButtonClick()}} component="small">
                            <MdAddBox style={{fontSize:"40px"}}/>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Grid container style={{
                    width:"100%"}}>
                    {preReq&& preReq.map(data=><PreReqBox data={[data,preReq,setPreReq]}></PreReqBox>)}
                    {/* {preReq&&console.log(preReq)} */}
                  </Grid>
                </div>
                <div className={clsx({[classes.hideComponent]:optionalCourse})}>
                  <TextField
                    InputProps={{className:classes.field }}
                    fullWidth label="Course Category Name" id="outlined-size-small" size="small" type="number"
                    {...register("category",{ required: true })}
                  />
                </div>
                <div>
                  <FormControlLabel onClick={()=>{setOptionalCourse(!optionalCourse)}} control={<Checkbox/>} label="Optional Course / have Category ?" />
                </div>
                <Button type="submit" style={{marginTop:"20px"}} fullWidth color="primary" variant="contained" size="medium"> Add Course</Button>

            </form>
          </div>
        </div>
      </div>
    )
}
export default AddCourse;