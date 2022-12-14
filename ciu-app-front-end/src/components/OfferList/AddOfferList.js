import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { LinearProgress, makeStyles,Paper } from '@material-ui/core';
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import swal from 'sweetalert2';


const useStyles=makeStyles(theme=>({
    root:{
        
    },
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
        width:"100%",
        borderRadius:"8px",
        padding:'20px',
        ['& h6']:{
            fontSize:'20px',
            color:'#3ca2fb',
        },

    },
    upFiles:{
        width:'100%',
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
    },
    hideComponent:{
        display:"none"
    },
}))

const AddOfferList = () => {
    const classes=useStyles();
    const XLSX=require('xlsx');
    const [advisingInfo, setAdvisingInfo] = useState({name:"Upload your advising file here"});
    const hiddenFileInput = React.useRef(null);
    const [optionalCourses,setOptionalCourses]=useState(null);
    const [progress,setProgress]=useState(0);
    const [show,setShow]=useState(true);

    const handleChangeFile=(e)=>{
        
        const file=e.target.files[0];
        console.log(file);
        setAdvisingInfo(file);
        
     }
     const handleUploadImage=(e)=>{
        hiddenFileInput.current.click();
      }
    const handleSubmit =()=> {
        setShow(false);
        const reader= new FileReader();
        const completionObjectArray=[];
        const electiveCourseArray=[];
        reader.readAsBinaryString(advisingInfo);
        reader.onload= event =>{
            const data=event.target.result;
            let workbook=XLSX.read(data,{type: "binary"});
            let xl_row_object=XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Sheet1"]);
            console.log(xl_row_object);
            xl_row_object.map(data=>{
                const completionObject={};
                completionObject._id=data._id.toString();
                delete data._id;

                const keys=Object.keys(data).filter(key=>key.length===6 || (key[key.length-1]==='L'&&key.length===7));
                
                const category=[];

                if(keys.length>0){
                    console.log("_id: ", completionObject._id,typeof(completionObject),"opt: ", optionalCourses)
                    optionalCourses.map(course=>{

                    if(keys.includes(course._id)){
                        category.push(course.category)
                    }
                })
                if(category.length){
                    electiveCourseArray.push({_id:completionObject._id,category:category,length:category.length});
                }
                
                completionObject.completed=keys;
                completionObjectArray.push(completionObject);}
                
            })
            const mainData={completionObjectArray:completionObjectArray,electiveCourseArray:electiveCourseArray};
            console.log(mainData);
            fetch(`http://localhost:5000/addAdvisingList`,{
                method:'POST',
                body:JSON.stringify(mainData),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setShow(true);
                console.log(data);
                setAdvisingInfo({name:"Upload your advising file here"});
                swal.fire(
                    'Good job!',
                    `Added Advising list Successfully`,
                    'success'
                  )
            })
            .catch(err=>
            {
                console.log(err);
                setShow(true);
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    confirmButtonText: 'Error Issue'
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      swal.fire(err)
                    } 
                  })
            })
        }
        reader.onerror=(e)=>{
            console.log("file could not be read "+e.target.error.code);
        }   
        
    }

    useEffect(()=>{
        fetch("http://localhost:5000/getOptionalCourse")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            data.map(data=>{console.log(data.category)})
            setOptionalCourses(data);
        })

        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 6));
          }, 800);
          return () => { 
            clearInterval(timer);
          };
        
    },[])
   
    return (
        <div className={classes.root}>
            <div className={classes.breadcumbs}>
                <h2>Upload Advising List</h2>
                <span><Link to="/dashboard">Dashboard</Link> / Upload Advising List</span> 
            </div>
            <Paper className={classes.paper}>
                    <div className={clsx({[classes.hideComponent]:show})}>
                        <LinearProgress variant="determinate" value={progress} style={{width:"100%"}}></LinearProgress>
                    </div>
                    <div className={classes.upFiles}>
                        <br/>
                        <div className={classes.upContent} onClick={handleUploadImage}>
                            <RiUploadCloud2Fill className={classes.uploadBtn}/>
                            <p>{advisingInfo.name||"Upload your advising file here"}</p>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChangeFile}
                                style={{display: 'none'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                        </div>
                    </div>
                    <Button variant="contained" onClick={handleSubmit} style={{margin:"10px 20px"}} type="submit" color="primary">
                        Submit
                    </Button>
            </Paper>
        </div>
    );
};

export default AddOfferList;