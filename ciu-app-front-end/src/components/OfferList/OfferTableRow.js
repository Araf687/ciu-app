import { Grid, makeStyles} from '@material-ui/core';
import React, { PureComponent, useEffect, useState } from 'react';
import clsx from 'clsx';
import {AiOutlineDelete} from "react-icons/ai";
import swal from 'sweetalert2';
import Batch from './Batch';
const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor:"white",
        padding:"10px",
        marginBottom:"10px",
        borderRadius:"8px",
        textAlign:"center",
        "& h6":{
            margin:"0",
            fontWeight:600,
        },
        border:"1px solid #e3e1e1",
        

    },
    colorComponent:{
        backgroundColor:"#f4b95f"
    },
    deleteButton:{
        fontSize:"25px",
        color:"#ff073a",
        "&:hover":{
            cursor:"pointer"
        }
    },
    hideComponent:{display:"none"},
    batch:{
        backgroundColor:"#afe3d6",
        padding:"1px 2px",
        marginRight:"4px",
        borderRadius:"4px"
    }
}))

const OfferTableRow=(props)=>{
    const total=props.rowData.eligibleStudents||props.rowData.eligible;
    const [colorComponent,setColorComponent]=useState(false);
    const [hide,setHide]=useState(false);
    // const [totalStudent,setTotalStudent]=useState(total);

    const {slNo,name,_id,type}=props.rowData._id;
    const handleDlete=props.delete;
    const showDltBtn=props.dltBtn;
    
    // const total=props.rowData.eligibleStudents;
    let batch={}; 
    total.map(id=>{
        const newId=id.slice(0,3);
        if(!batch[newId]){
            batch[newId]=1;
        }
        else{
             batch[newId]=batch[newId]+1;
        } 
    })
    const batchKeys=Object.keys(batch);
    // console.log(batch);
    // console.log(props.rowData._id,total.length,type);
    const handleClick=()=>{
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
                // setHide(true);
                handleDlete(props.rowData);
                swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }

    useEffect(()=>{
        type==="N/A"&&setColorComponent(true);
    },[])
    const classes=useStyles();

    const deleteBatch=(batch,batchPerStudent)=>{
        // const eligibleStudents=totalStudent.filter(id=>id.slice(0,3)!=batch);
        // setTotalStudent(eligibleStudents);
        const eligibleStudents=total.filter(id=>id.slice(0,3)!=batch);
        props.dltBatch(_id,eligibleStudents);
    }
    return (
      <Grid className={clsx(classes.root,{[classes.colorComponent]:colorComponent,[classes.hideComponent]:hide})} container>
          <Grid item xs={12} lg={1}>
              <h6>{props.slNo}</h6>
          </Grid>
          <Grid item xs={12} lg={1}>
              <h6>{_id || props.rowData._id}</h6>
          </Grid>
          <Grid item xs={12} lg={4}>
              <h6>{name}</h6>
          </Grid>
          <Grid item xs={12} lg={3}>
                <Grid container>
                    {batchKeys.map(bt=><Batch data={bt} 
                            showDltButton={showDltBtn} 
                            studentPerBatch={batch[bt]}
                            dltBatch={deleteBatch}>
                            </Batch>)}
                </Grid>
          </Grid>
          <Grid item xs={12} lg={2}>
              <h6>{total.length}</h6>
          </Grid>
          {showDltBtn&&<Grid item xs={12} lg={1}>
            <AiOutlineDelete onClick={()=>{handleClick()}} className={classes.deleteButton}></AiOutlineDelete>
            
          </Grid>}

      </Grid>
    )
}
export default OfferTableRow;
