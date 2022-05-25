import React, { Component,useContext,useEffect,useState } from 'react'
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { LinearProgress, makeStyles } from '@material-ui/core';
import { RiUploadCloud2Fill } from "react-icons/ri";
import { contextUser } from '../../App';
import swal from 'sweetalert2';
import clsx from 'clsx';

const useStyles=makeStyles(theme=>({
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
    }
}))

const AddInfoByFile = () => {
    const classes=useStyles();
    const XLSX=require('xlsx');
    const [studentInfoFile, setstudentInfoFile] = useState({name:"Add Students Informstion"});
    const  [wbObject, setWbObject] = useState();
    const hiddenFileInput = React.useRef(null);
    const [progress,setProgress]=useState(0);
    const [show,setShow]=useState(true);

    

    const [,,addOptions,]=useContext(contextUser);

    const handleChangeFile=(e)=>{
        
        const file=e.target.files[0];
        console.log(file);
        setstudentInfoFile(file);
        
    }
    const handleUploadImage=(e)=>{
        hiddenFileInput.current.click();
      }


    const handleSubmit =()=> {
        setShow(false);
        const formData=new FormData();
        formData.append("file",studentInfoFile);
        console.log(studentInfoFile);
        const reader= new FileReader();
        reader.readAsBinaryString(studentInfoFile);
        reader.onload= event =>{
            const data=event.target.result;
            let workbook=XLSX.read(data,{type: "binary"});
            let xl_row_object=XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Sheet1"]);
            console.log(xl_row_object);
            
            fetch(`http://localhost:5000/${addOptions.insertMany}`,{
                method:'POST',
                body:JSON.stringify(xl_row_object),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{
                setShow(true);
                console.log(data);
                swal.fire(
                    'Good job!',
                    `Added ${addOptions.title} Successfully`,
                    'success'
                  )
                setstudentInfoFile({name:"Add Students Informstion"});
            })
            .catch(err=>
                {
                console.log(xl_row_object);
                setShow(true);
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:err,
                  })
                })
            }
            reader.onerror=(e)=>{
                console.log("file could not be read "+e.target.error.code);
            }
        
        
    }

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 6));
        }, 800);
        return () => { 
          clearInterval(timer);
        };
      }, []);
    return (
        <div>
            <div className={clsx({[classes.hideComponent]:show})}>
                <LinearProgress variant="determinate" value={progress} style={{width:"100%"}}></LinearProgress>
            </div>
            
            <div className={classes.upFiles}>
                <br/>
                <div className={classes.upContent} onClick={handleUploadImage}>
                    <RiUploadCloud2Fill className={classes.uploadBtn}/>
                    <p>{studentInfoFile.name||"Add Students Informstion"}</p>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChangeFile}
                        style={{display: 'none'}}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                </div>
            </div>
            <Button variant="contained" onClick={()=>{handleSubmit()}} style={{margin:"10px 20px"}} type="submit" color="primary">
                Submit
            </Button>
        </div>
        )
    }
export default AddInfoByFile;
