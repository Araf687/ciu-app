import React from 'react';
import {Grid, makeStyles, Paper} from '@material-ui/core'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { Fragment, useState } from "react";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";




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
          ['& a']:{
              color:'blue',
          }


    },
    paper:{
        height:"350px",
        width:"100%",
        borderRadius:"8px",
        padding:'20px',
        ['& h6']:{
            fontSize:'20px',
            color:'#3ca2fb',
        },

    },
    formRoot:{
        padding:"0px 10px"
    },
    inputBox:{
        width:"100%",
    },
    floatingLabelFocusStyle: {
        color: "red"
    }
    
}))

const AddStudent = () => {
    const classes=useStyles();

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);


    return (
        <section>
            <div className={classes.breadcumbs}>
                    <h2>Add Student</h2>
                    <span><Link to="/dashboard">Dashboard</Link> / Add Student</span> 
            </div>
            <Paper className={classes.paper}>
                <h6>BASIC INFORMATION</h6> <br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5} className={classes.formRoot}>
                    
                        <Grid item xs={12} lg={6}>
                            <TextField
                            required 
                            variant="standard"
                            label="First Name" 
                            {...register("firstName")}
                            className={classes.inputBox} 
                            {...register("firstName")}
                            InputLabelProps={{
                                sx: {
                                  
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red",
                                    fontWeight:'550'
                            }} }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField 
                            
                             variant="standard"
                             InputLabelProps={{
                                sx: {
                                  
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red"
                            }} }}
                             required 
                             label="Last Name"
                             className={classes.inputBox} 
                             {...register("lastName")}
                             />
                             
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TextField
                             variant="standard"
                             required
                             label="Phone" 
                             InputLabelProps={{
                                sx: {
                                  
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red"
                            }} }}
                             {...register("phone")}
                             className={classes.inputBox} 
                              />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Fragment>
                                <DatePicker
                                    variant="inline"
                                    label="Basic example"
                                />
                            </Fragment>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TextField
                             variant="standard"
                             required
                             label="Age" 
                             InputLabelProps={{
                                sx: {
                                  
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red"
                            }} }}
                             {...register("age")}
                             className={classes.inputBox} 
                             
                              />
                        </Grid>
                    
                    </Grid>
                </form>
            </Paper> 
       
        </section>
    );
};

export default AddStudent;