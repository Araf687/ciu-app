import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import TimeSlot from './TimeSlot';
import {AiOutlineDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";
import { ImCheckboxChecked } from 'react-icons/im';
import swal from 'sweetalert2';
import confirm from '../../image/confirm.png';
import cancel from '../../image/cancel.png';
import { set } from 'date-fns';

const useStyles=makeStyles(theme=>({
    root:{
        // textAlign:'center',
        fontWeight:'600',
        borderRadius:'5px',
        paddingLeft:'5px',
        paddingTop:'5px'
    },
    dltIcon:{
        height:"35px",
        margin:"0px 10px",
        width:'25px',
        color:'red',
        cursor:'pointer',
    },
    editIcon:{
        height:"25px",
        width:'20px',
        color:'blue',
        cursor:'pointer',
    },
    checkBox:{
        fontSize:'14px',
        marginLeft:'6px',
        marginRight:'10px',
        color:'#323d40',
        borderRadius:'2px'
    }

    }));


function RoomRow(props) {
  const classes=useStyles();
  const data=props.roomData;
  const slNo=props.slNo;
  const roomFor=data.roomType;
  const roomNo=data._id;
  const [prevSelectedSlots,setPrevSelectedSlots]=useState();
  const [timeSlots,setTimeSlots]=useState(props.day[0]==='S'?data.slotsForST:props.day[0]==='M'?data.slotsForMW:data.slotsForTH);
  const isSlotsEmpty=Object.values(timeSlots).every(x =>  x===false);
  const [edit,setEdit]=useState(false);
  const allSlots=['8:00 am','9:30 am','11:00 am','12:30 pm','2:00 pm','3:30 pm'];
  let color1=slNo%2===1?'#dcecf1':'white';
  const clickEdit=()=>{
      setEdit(true);
      setPrevSelectedSlots(timeSlots);
      setTimeSlots({'8:00 am':false,'9:30 am':false,'11:00 am':false,'12:30 pm':false,'2:00 pm':false,'3:30 pm':false});
  }
  const clickDLT=()=>{
      props.handleDltRoom(roomNo);
  }
  const cancelEdit=()=>{
      setEdit(false);
      setTimeSlots(prevSelectedSlots);
  }
  const confirmEdit=()=>{
    swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setTimeSlots(timeSlots)
          props.handleEditRoom(roomNo,timeSlots);
          setEdit(false);
        } else if (result.isDenied) {
          swal.fire('Changes are not saved', '', 'info')
          
        }
        else if(result.isDismissed){
            setEdit(false);
        }
      })
    

  }
  const editSlot=(slot)=>{
      timeSlots[slot]=!timeSlots[slot];
  }
  return (
    <div style={{backgroundColor:color1}} className={classes.root}>
        <Grid container>
            <Grid item xs={12} lg={1}>
                <p>{slNo}</p>
            </Grid>
            <Grid item xs={12} lg={1}>
                <p>{roomNo}</p>
            </Grid>
            <Grid item xs={12} lg={1}>
                <p>{roomFor}</p>
            </Grid>
            <Grid item xs={12} lg={8}>
                
                <Grid container>
                    {edit===true?allSlots.map(time=><TimeSlot edit={edit} setSLot={editSlot} time={time}></TimeSlot>)
                    :!isSlotsEmpty?allSlots.map(time=>timeSlots[time]===true&&<span style={{marginRight:'20px'}}><ImCheckboxChecked className={classes.checkBox}/>{time}</span>)
                            :<p style={{textAlign:'center',width:'100%'}}>no slots have been selected</p>}
                </Grid>
            </Grid>
            <Grid item xs={12} lg={1}>
                {edit===false?
                <div> 
                    <><AiOutlineDelete className={classes.dltIcon} onClick={()=>{clickDLT()}}/>
                    <BsPencilSquare onClick={()=>{clickEdit()}} className={classes.editIcon}/></>
                </div>:
                <div>
                    <strong className={classes.cancelButton} onClick={()=>{confirmEdit()}}><img style={{width:'30px',cursor:'pointer'}} src={confirm} alt=""/> </strong> 
                    <strong className={classes.confirmButton} onClick={()=>{cancelEdit()}}><img style={{width:'30px',cursor:'pointer'}} src={cancel} alt=""/> </strong>
                </div>}
            </Grid>
        </Grid>
    </div>
  )
}

export default RoomRow