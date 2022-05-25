import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { BiXCircle } from "react-icons/bi";
import swal from 'sweetalert2';

const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor:"#afe3d6",
        padding:"2px 1px",
        marginRight:"4px",
        borderRadius:"4px"
    },
    hideCompontent:{
        display:"none",
    },
    crossBtn:{
        color:"red",
        '&:hover':{
            cursor:"pointer",
        }
    }
    }))
const Batch=(props)=> {
    const classes=useStyles();
    const [hide,setHide]=useState(false);
    const data=props.data;
    const studentPerBatch=props.studentPerBatch;
    const deleteBatch=props.dltBatch;

    const handleClick=()=>{
        swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete the Batch!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteBatch(data,studentPerBatch);
                swal.fire(
                    'Deleted!',
                    'Batch has been deleted from the list.',
                    'success'
                )
            }
          })
        
    }
    return (
        <Grid item >
            <small>
                <strong className={clsx(classes.root,{[classes.hideCompontent]:hide})}>
                    {data}({studentPerBatch}){props.showDltButton&&<BiXCircle onClick={()=>{handleClick()}} className={classes.crossBtn}></BiXCircle>}      
                </strong>
            </small>
        </Grid>   
    )
}
export default Batch;