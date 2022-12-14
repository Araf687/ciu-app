import { Button, Grid, IconButton, Skeleton } from '@mui/material';
import React, { PureComponent, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Collapse from "@mui/material/Collapse";
import RemoveIcon from '@material-ui/icons/Remove';
import swal from 'sweetalert2';

const useStyles=makeStyles(theme=>({
    root:{backgroundColor:"#86bce3",
    borderRadius:"8px",
    marginBottom:"10px",
    border:"1px solid #86bce3"
},
    courseRow:{
        padding:"5px 10px 5px 10px",
        borderRadius:"8px",
        textAlign:"center"
    },
    addBTN:{
        backgroundColor:"white",
        borderRadius:"4px",
        '&:hover':{
            cursor:"pointer",
        },
        float:"right"
    },
    hideComponent:{
        display:"none",
    },
    courseDescription:{
        textAlign:"left",
        backgroundColor:"white",
        borderRadius:"5px",
        marginTop:"10px",
        padding:"5px",
        "& p":{
            margin:0
        }
    }
}))

const Course=(props)=> {
    const classes=useStyles();
    const data=props.info;
    const [collapse,setCollapse]=useState(false);
    const [show,setShow]=useState(false);
    const [completeStudentList,setCompleteStudentList]=useState({_id:1});
    const [incompleteStudentList,setIncompleteStudentList]=useState({_id:1});

    const preReqLength=data.preReq.length;
    console.log(data,preReqLength);
    const clickExpand=()=>{
        console.log(data._id);
        setShow(!show);
        fetch(`http://localhost:5000/conplete_Incomplete_Student/${data._id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.completed,data.incompleted);
            setCompleteStudentList(data.completed);
            setIncompleteStudentList(data.incompleted);
        })
    }
    const clickDelete=()=>{
        
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
                fetch(`http://localhost:5000/deleteCourseById/${data._id}`,{
                    method: 'DELETE',
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    setShow(true);
                    swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
               
            }
          })
    }
    
    return (
      <div className={classes.root}>
          {/* <button onClick={()=>{handleCLick()}}>delete teacher</button> */}
          <Grid container className={classes.courseRow}>
              <Grid item lg={1}><strong>{data.slNo}</strong></Grid>
              <Grid item lg={2}><strong>{data._id}</strong></Grid>
              <Grid item lg={5}><strong>{data.name}</strong></Grid>
              <Grid item lg={2}><strong>{data.level}</strong></Grid>
              <Grid item lg={1}><strong>{preReqLength}</strong></Grid>
              <Grid item lg={1}>
                    {!show?<AddIcon onClick={()=>{clickExpand()}}  className={classes.addBTN}></AddIcon>:<RemoveIcon onClick={()=>{setShow(!show)}} className={classes.addBTN}/> }
             </Grid>
             <Grid item lg={12} style={{padding:"0px 5px"}}>
             <Collapse in={show}>
                
                    <div className={classes.courseDescription}>
                        <div>
                            <strong >Course Description:</strong >
                            <p>
                                <span>
                                    {data.name + " is a course of level"+` ${data.level}. `}
                                    {data.category?`It is a course of ${data.category} category.`:`it is a course of general category.` }
                                </span>
                            </p>
                        </div>
                        <div style={{margin:"10px 0px"}}>
                            <p>
                                <strong >Pre-requisite courses:</strong >
                            </p>
                            <p>{preReqLength===0 && <span>no prerequisite needed</span>}</p>
                            <p>{preReqLength>0&& data.preReq.map(name=><span>{name}</span>)}</p>

                            <p>
                                <strong >Completed students list: {completeStudentList.length&&completeStudentList._id!=1&&completeStudentList[0].studentId.length}</strong >
                            </p>
                            {completeStudentList._id!=1?
                            <div>
                                {completeStudentList.length? 
                                <p>{ completeStudentList[0].studentId.map(data=><small><strong>{`${data}, `}</strong></small>)}</p>
                                :"No one have completed the course" }
                            </div>
                            :<Skeleton variant="rectangular" style={{borderRadius:"10px"}} width="100%" height={80} /> }
                        
                        </div>
                        <div>
                            <p>
                                <strong>incompleted students list: {incompleteStudentList.length&&incompleteStudentList._id!=1&&incompleteStudentList[0].studentId.length}</strong>  
                            </p>
                            {incompleteStudentList._id!=1?
                            <div>
                                {incompleteStudentList.length? 
                                <p>{ incompleteStudentList[0].studentId.map(data=><small><strong>{`${data}, `}</strong></small>)}</p>
                                :"All the students has completed the course" }
                            </div>
                            :<Skeleton variant="rectangular" style={{borderRadius:"10px"}} width="100%" height={80} /> }
                        </div>
                        <div style={{textAlign:"right",margin:"10px"}}>
                            <Button style={{margin:"0px 5px", backgroundColor:"red"}} size='small' variant="contained">Delete</Button>
                            <Button  size='small' variant="contained">Edit</Button>
                        </div>
                    </div>
                    </Collapse> 
                </Grid>

             
            

          </Grid>
          
      </div>
    );
}
export default Course;