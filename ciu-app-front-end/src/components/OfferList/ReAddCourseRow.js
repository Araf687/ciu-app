import { Grid, makeStyles} from '@material-ui/core';
import {React,useState} from 'react';
import { GiWaterRecycling } from "react-icons/gi";
import clsx from 'clsx';
import Batch from './Batch';
import swal from 'sweetalert2';

const useStyles=makeStyles(theme=>({
    row:{
        textAlign:"center",
        backgroundColor:"white",
        padding:"10px",
        borderRadius:"8px",
        marginBottom:"10px",
        "& h6":{
            margin:"0",
        },
        border:"1px solid #e3e1e1",
      },
      reAddBtn:{
          fontSize:'1.5rem',
          color:'#109775',
          '&:hover':{
              cursor:'pointer'
          }
      }

}))


const ReAddCourseRow=(props)=> {
    const classes=useStyles();
    // console.log(props.data);
    const {_id,name}=props.data._id;
    const total=props.data.eligibleStudents;
    const [hide,setHide]=useState(false); 

    let batch={};
    total.map(id=>{
        const newId=id.toString().slice(0,3);
        if(!batch[newId]){
            batch[newId]=1;
        }
        else{
             batch[newId]=batch[newId]+1;
        } 
    })
    const batchKeys=Object.keys(batch);
    const handleClick=()=>{
        swal.fire({
            title: 'Are you sure?',
            text: "The course will be add in your customized list",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add the Course!'
          }).then((result) => {
            if (result.isConfirmed) {
                setHide(true);
                fetch("http://localhost:5000/reAddCourseInList",{
                    method:'PATCH',
                    headers: {
                      'Content-Type':'application/json',
                    },
                    body: JSON.stringify({semester:props.semester,courseData:props.data})
                }) 
                .then(res=>res.json())
                .then(data=>{console.log(data)})

                swal.fire(
                    'Deleted!',
                    'Your file has been added to the customized list',
                )
            }
          })
    }
    return ( 
      <Grid className={clsx(classes.row,{[{display:"none"}]:hide})} container>
          <Grid item xs={12} lg={1}>
              <h6>{props.i}</h6>
          </Grid>
          <Grid item xs={12} lg={1}>
              <h6>{_id}</h6>
          </Grid>
          <Grid item xs={12} lg={4}>
              <h6>{name}</h6>
          </Grid>  
           <Grid item xs={12} lg={3}>
              <Grid container>{batchKeys.map(bt=> <Batch data={bt} studentPerBatch={batch[bt]}></Batch> )}</Grid>
          </Grid>
          <Grid item xs={12} lg={2}>
              <h6>{total.length}</h6>
          </Grid>
          {<Grid item xs={12} lg={1}>
            <GiWaterRecycling 
            className={classes.reAddBtn}
            onClick={()=>{handleClick()}}
            ></GiWaterRecycling>
            
          </Grid>}

          
          

      </Grid>
    )
  }

export default ReAddCourseRow;