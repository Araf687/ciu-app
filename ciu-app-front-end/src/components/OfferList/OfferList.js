import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { makeStyles,Paper } from '@material-ui/core';
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';


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
    }
}))

const OfferList = () => {
    const classes=useStyles();
    const XLSX=require('xlsx');
    const [advisingInfo, setAdvisingInfo] = useState({name:"Upload your advising file here"});
    const { register,handleSubmit} = useForm();
    const hiddenFileInput = React.useRef(null);

    const handleChangeFile=(e)=>{
        
        const file=e.target.files[0];
        console.log(file);
        setAdvisingInfo(file);
        
     }
     const handleUploadImage=(e)=>{
        hiddenFileInput.current.click();
      }

    const onSubmit = data => {
        
        const file=data.advisingFile[0];
        console.log(file);
        const formData=new FormData()
        formData.append('file',file);

        const reader= new FileReader()
        reader.readAsBinaryString(file);
        reader.onload= event =>{
            const data=event.target.result;
            let workbook=XLSX.read(data,{type: "binary"});
            // workbook.SheetNames.forEach((sheet)=>{
            let xl_row_object=XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Sheet1"]);
            // })
            console.log(xl_row_object);
            setAdvisingInfo(xl_row_object);
        }
        reader.onerror=(e)=>{
            console.log("file could not be read "+e.target.error.code);
        }
        

        fetch('http://localhost:5000/offerlist',{
            method:'POST',
            body:JSON.stringify(advisingInfo),
            headers:{
                "Content-Type":"application/json"
            }

        })
        .then(res=>res.json())
        .catch(err=>{
            console.log(err);
        })


    }
   
    return (
        <div className={classes.root}>
            <div className={classes.breadcumbs}>
                <h2>Offerlist</h2>
                <span><Link to="/dashboard">Dashboard</Link> / Offerlist</span> 
            </div>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.upFiles}>
                        <br/>
                        <div className={classes.upContent} onClick={handleUploadImage}>
                            <RiUploadCloud2Fill className={classes.uploadBtn}/>
                            <p>{advisingInfo.name}</p>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChangeFile}
                                style={{display: 'none'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                        </div>
                    </div>
                    <Button variant="contained" style={{margin:"10px 20px"}} type="submit" color="primary">
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default OfferList;