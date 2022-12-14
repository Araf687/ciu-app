import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {makeStyles} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import swal from 'sweetalert2'; 
const useStyles = makeStyles((theme) => ({
  root:{
    padding:"20px",
  },
  eventSection:{
    
  }
}));

const CreateEvent=(props)=>{
  const classes=useStyles();
  const [open, setOpen] = React.useState(true);
  const [date,setDate]=React.useState(new Date());
  const [time,setTime]=React.useState(null);
  const { register,handleSubmit,formState: { errors } } = useForm();
  const onSubmit = eventData => {
    eventData.start=date;
    eventData.end=date;
    eventData.category='event';
    const formData=new FormData();
    formData.append("eventsData",JSON.stringify(eventData));
    fetch(`http://localhost:5000/addEvent`,{
        body:formData,
        method:"post"
    })
    .then(res=>res.json())
    .then(data=>{
      console.log("..................",data)
      
        if(data===true){
          console.log(eventData)
          handleClose();
          props.confirmEvent(eventData);
          swal.fire(
            'Good job!',
            `Added event Successfully`,
            'success'
          )
        }
        else{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:'something went wrong',
          })
        }
    })
    // .catch(err=>{console.log(err)})
  }

  const handleClose = () => {
    setOpen(false);
    props.eventClick(false);

  };
  const handleDateChange=(date)=>{
    setDate(date);
  }
  const handleTimeChange=(time)=>{
    setTime(time);
  }
  
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={1}>  
            <Grid item xs={12} lg={12}>
              <h4 style={{textAlign:"center",margin:"10px 0px"}}>Create Event</h4>
            </Grid>
            <Grid item xs={12} lg={12}>
              <div className={classes.eventSection}>
                <TextField style ={{width: '100%'}} id="outlined-basic" label="Event 
                Title" variant="outlined" {...register("title",{ required: true })} />
              </div>
              {errors.title && <span style={{color:"red",fontWeight:"600"}}>This field is required</span>}
            </Grid>
            <Grid item xs={12} lg={12}>
              <div className={classes.eventSection}>
                <TextField
                  style ={{width: '100%'}}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  {...register("description",{ required: true })}
                />
              </div>
              {errors.description && <span style={{color:"red",fontWeight:"600"}}>This field is required</span>}
            </Grid>
            <Grid item lg={4}>
              <div className={classes.eventSection}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} type='date'  {...register("date",{ required: true })}/>}
                />
              </div>
              {errors.date && <span style={{color:"red",fontWeight:"600"}}>This field is required</span>}
            </Grid>
            <Grid item lg={4}>
              <div className={classes.eventSection}>
                <TimePicker
                  label="Time"
                  value={time}
                  onChange={handleTimeChange}
                  renderInput={(params) => <TextField {...params} {...register("startingtTime")}/>}
                />
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className={classes.eventSection}>
                  <TextField
                    label="Duration"
                    id="outlined-start-adornment"
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="start">{"  hour"}</InputAdornment>,
                    }}
                    {...register("duration",{ required: true })}
                  />
              </div>
              {errors.duration && <span style={{color:"red",fontWeight:"600"}}>This field is required</span>}
            </Grid>
            <Grid item xs={12} lg={12}>
              <Button type="submit"  style ={{width: '100%',background:'#04407a'}}  variant="contained">Confirm Event</Button>
            </Grid>
          </Grid></LocalizationProvider>
        </form>
    </div>
  </Dialog>
      
  );
  
}
export default CreateEvent;