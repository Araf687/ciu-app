import { Grid ,makeStyles} from '@material-ui/core';
import {getBatchFromStudentsId} from '../../functions';
import Batch from '../../OfferList/Batch';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import swal from 'sweetalert2';
import { ContactSupportOutlined } from '@material-ui/icons';
// import { useEffect, useState } from 'react';
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
  }

}))

function OfferedCourseRow(props) {
  
  const data=props.data;
  console.log(data);
  console.log(props.allFaculties);
  // data.faculty.append("TBA");
  const {eligibleStudents}=data;
  const {ignoredStudent}=data;
  const batchData=getBatchFromStudentsId(eligibleStudents);
  const batch=Object.keys(batchData);
  const ignoredBatchData=ignoredStudent.map(data=>{
    const obj={batch:data[0].toString().slice(0,3),numberOfStudents:data.length}
    return obj;
  });
  // const ignoredBatch=Object.keys(ignoredBatchData);
  const [faculty, setFaculty] = React.useState(data.faculty||"TBA");
  const allFaculties=props.allFaculties;
  // allFaculties.push("TBA")
  const handleChangeFaculty = (event) => {
    
    const facultyName=event.target.value;
    swal.fire({
      title: 'Are you sure?',
      text: `Set ${facultyName} as the faculty of ${data._id._id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, set faculty!'
    }).then((result) => {
      if (result.isConfirmed) {
        setFaculty(event.target.value);
        props.func[1](data._id._id,facultyName);
      }
    })
  };

  const removeBatchFromEligible=(batch,studentPerBatch)=>{
    console.log(batch);
    props.func[0](batch,data._id._id,'eligibleList');
  }
  const removeBatchFromIgnored=(batch,studentPerBatch)=>{
    props.func[0](batch,data._id._id,'ignoredList');
  }

  
  // console.log(data);
  const classes=useStyles();
  return (
    <Grid container className={classes.root}>
        <Grid item xs={12} lg={1}>
          <strong>{props.slNo}</strong>
        </Grid>
        <Grid item xs={12} lg={1}>
          <strong>{data._id._id}</strong>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container>
            {batch&&batch.map(dt=><Batch data={dt} 
              showDltButton={props.showDeleteBtn} 
              studentPerBatch={batchData[dt]}
              dltBatch={removeBatchFromEligible}
              >
            </Batch>)}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Grid container>
              {ignoredBatchData&&ignoredBatchData.map(dt=><Batch data={dt.batch} 
                  showDltButton={props.showDeleteBtn} 
                  studentPerBatch={dt.numberOfStudents}
                  dltBatch={removeBatchFromIgnored}
                  >
              </Batch>)}
          </Grid>
            
        </Grid>
        <Grid item xs={12} lg={3}>
          <FormControl size="small">
            <InputLabel id="demo-select-small">faculty</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={faculty}
              label="Faculty"
              onChange={handleChangeFaculty}
              autoWidth={true}
              inputProps={{ readOnly: props.changeFaculty}}
            >
              {props.changeFaculty==true&&<MenuItem value={faculty}><small>{faculty}</small></MenuItem>}
              {allFaculties&&allFaculties.map(faculty=><MenuItem value={faculty.name||(faculty.firstName+faculty.lastName)}><small>{faculty.name||(faculty.firstName+faculty.lastName)}</small></MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

    </Grid>
  )
}

export default OfferedCourseRow;