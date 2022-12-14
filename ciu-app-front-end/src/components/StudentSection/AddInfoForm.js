import React, { useContext, useState,useEffect } from 'react';
import {Grid, makeStyles, NativeSelect, Paper} from '@material-ui/core'
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { inputLabelClasses } from "@mui/material/InputLabel";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { RiUploadCloud2Fill } from "react-icons/ri";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@material-ui/core/Button';
import { contextUser } from '../../App';
import {getDayMonthYear} from '../functions';

import swal from 'sweetalert2';





const useStyles = makeStyles(theme=>({
    formRoot:{
        padding:"0px 10px"
    },
    inputBox:{
        width:"100%",
    },
    floatingLabelFocusStyle: {
        color: "red"
    },
    upFiles:{
        backgroundColor:'#f5f5f5',
        padding:'20px',

        ["& p"]:{
            fontSize: "1rem",
            textAlign: "center !important",
            marginTop: "10px",
            color: "#4aa1f3",
            fontWeight: "bold",
        }
    },

    upContent:{
        backgroundColor: "white",
        minHeight: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#f5f5f5',
        cursor:"pointer",
    },
    uploadBtn :{
        fontSize:"50px"
    }

    
}))

const AddInfoForm = () => {
    const classes=useStyles();
    const [date, setDate] = useState(null);
    const [gender, setGender] = React.useState('');
    const [dept,setDept]= useState("");
    const [imgFile,setImgFile]=useState({name:"Upload your image here"});
    const [error,setError]=useState([0,0,0,0,0])
    const [selectedFaculty,setSelectedFaculty]=useState();
    const [allFaculties,setAllFaculties]=useState();

    const hiddenFileInput = React.useRef(null);

    const [,,addOptions,]=useContext(contextUser);
    
    useEffect(() => {
        fetch("http://localhost:5000/allTeacher")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setAllFaculties(data);
        })
    }, [])
    

    const { register, handleSubmit,formState: { errors } } = useForm();
    const handleChangeFile=(e)=>{
        const file=e.target.files[0]
        setImgFile(file);
        
     }
     const handleChangeFaculty = (event) => {
        console.log(addOptions.fetchUrl);
        setSelectedFaculty(event.target.value);
      };
    const onSubmit = (data) => {
        const {firstName,lastName,phone,age,email}=data;
        const newObject={
            _id:data._id,
            name:firstName+lastName,
            dept:dept,
            phone:phone,
            email:email,
            address:data.address,
            age:age,
            gender:gender,
            dob:date,
        };
        const flag=0;
        addOptions.fetchUrl==="addStudent"?newObject.advisor=selectedFaculty:flag=1;
        const formData=new FormData();
        if(imgFile.name[0]==='U'){
            formData.append("file",null);
        }
        else{
            formData.append("file",JSON.stringify(imgFile));
        }
        formData.append("data",JSON.stringify(newObject));
        console.log(formData);
        fetch(`http://localhost:5000/${addOptions.fetchUrl}`,{
            body:formData,
            method:"post"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,typeof(data));
            handleCancelClick();
            swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1800
              })
        })
        .catch(err=>{console.log(err)})


        
    }

    const handleChange = (newDate) => {
        const convertDate=getDayMonthYear(newDate);

        setDate(`${convertDate[0]}/ ${convertDate[1]}/ ${convertDate[2]}`);
      }

      const handleChangeGender = (event) => {
        setGender(event.target.value);
      };

      const handleChangeDept = (event) => {
        setDept(event.target.value);
      };

      const handleUploadImage=(e)=>{
        hiddenFileInput.current.click();
      }
      
      const handleCancelClick=()=>{
        document.getElementById("add_student_form").reset();
        setImgFile({name:"Upload your files here"});
        setGender(null);
        setDept(null); 
        setDate(null);
      }
     const validateForm=(e,option)=>{
        const data=e.target.value;
        console.log(option)
        const tempError=error;
        if(option=="email"){
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)){
                tempError[0]++;
                console.log(tempError)
                document.getElementById("email").style.display = "block";
            }
            else{
                tempError[0]=0;
                console.log(tempError)
                document.getElementById("email").style.display = "none";
            }
        }
        if(option=="phone"){
            data.length==11&&data[0]==0&&data[1]==1&&data[2]>2&&data[2]<10?document.getElementById("phone").style.display = "none":document.getElementById("phone").style.display = "block";
        }
        if(option=="s_id"){
            data.length==8||data.length==16?document.getElementById("s_id").style.display = "none":document.getElementById("s_id").style.display = "block";
        }
        console.log(tempError)
        setError(tempError)
     }
     
    return (
        <section>
            {/* <div className={classes.breadcumbs}>
                    <h2>{addOptions.title}</h2>
                    <span><Link to="/dashboard">Dashboard</Link> / {addOptions.title}</span> 
            </div> */}
            {/* <Paper className={classes.paper}> */}
                <h6>BASIC INFORMATION</h6> <br/>
                <form onSubmit={handleSubmit(onSubmit)} id="add_student_form">
                    <Grid container spacing={5} className={classes.formRoot}>
                    
                        <Grid item xs={12} lg={addOptions.fetchUrl==="addStudent"?4:6}>
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
                            <span></span>
                        </Grid>
                        <Grid item xs={12} lg={addOptions.fetchUrl==="addStudent"?4:6}>
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
                        {addOptions.fetchUrl==="addStudent"&&<Grid item xs={12} lg={4}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className={classes.inputBox} >
                                <InputLabel id="demo-simple-select-standard-label">Advisor</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selectedFaculty}
                                onChange={handleChangeFaculty}
                                label="Advisor"
                                >
                                {allFaculties&&allFaculties.map(faculty=><MenuItem value={faculty.name}>{faculty.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>}
                       
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
                             onBlur={(event)=>{validateForm(event,"phone")}} 
                              />
                              {console.log("hiii",error)}
                              <span id="phone" style={{color:"red",display:"none"}}>Wrong Number</span>
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
                             onBlur={(event)=>{validateForm(event,"age")}} 
                            />
                            <span id="age" style={{color:"red",display:"none"}}>Wrong Number</span>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TextField
                             variant="standard"
                             required
                             label="Email" 
                             InputLabelProps={{
                                sx: {
                                  
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red"
                            }} }}
                             {...register("email")}
                             className={classes.inputBox} 
                             onBlur={(event)=>{validateForm(event,"email")}} 
                              />
                              <span id="email" style={{color:"red",display:"none"}}>Wrong Number</span>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className={classes.inputBox} >
                                <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={gender}
                                onChange={handleChangeGender}
                                label="Gender"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"male"}>male</MenuItem>
                                <MenuItem value={"female"}>female</MenuItem>
                                <MenuItem value={"others"}>others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className={classes.inputBox} >
                                <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={dept}
                                onChange={handleChangeDept}
                                label="Department"
                                
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"CSE"}>CSE</MenuItem>
                                <MenuItem value={"EEE"}>EEE</MenuItem>
                                <MenuItem value={"ETE"}>ETE</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} lg={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                label="Date of birth"
                                inputFormat="MM/dd/yyyy"
                                value={date}
                                onChange={handleChange}
                                renderInput={(params) => 
                                            <TextField 
                                                {...params} 
                                                variant="standard"
                                                {...register("dateOfBirth")}
                                                className={classes.inputBox} 
                                                
                                            />
                                        }
                                    />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField 
                            
                             variant="standard"
                             InputLabelProps={{
                                sx: {
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red"
                            }} }}
                             required 
                             label="Address"
                             className={classes.inputBox} 
                             {...register("address")}
                             />
                             
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TextField 
                            
                             variant="standard"
                             InputLabelProps={{
                                sx: {
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: "red"
                            }} }}
                             required 
                             label={addOptions.fieldName}
                             className={classes.inputBox} 
                             {...register("_id")}
                             onBlur={(event)=>{validateForm(event,"s_id")}} 
                             />
                            <span id="s_id" style={{color:"red",display:"none"}}>Wrong Number</span>
                        </Grid>


                        <Grid item xs={12} lg={12}>
                            <div className={classes.upFiles}>
                                <br/>
                                
                                <div className={classes.upContent} onClick={handleUploadImage}>
                                    <RiUploadCloud2Fill
                                        className={classes.uploadBtn}

                                    />
                                    <p>{imgFile.name}</p>
                                    <input
                                        type="file"
                                        ref={hiddenFileInput}
                                        onChange={handleChangeFile}
                                        style={{display: 'none'}}
                                    />
                                </div>
                            </div>

                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Button variant="contained" style={{margin:"10px 20px"}} type="submit" color="primary">
                                Submit
                            </Button>
                            <Button onClick={handleCancelClick} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                
                    
                    </Grid>
                </form>
            {/* </Paper>  */}
       
        </section>
    );
};

export default AddInfoForm;