import React, { useEffect, useState } from 'react';
import {Avatar, Grid, makeStyles, Paper} from '@material-ui/core';
import { TextField,InputAdornment, FormControlLabel } from '@mui/material';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import Course from '../OfferList/Course';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert2';


const StudentProfile=(props)=>{
    const data=props.data;
    console.log(data);
    const [editCompleteCourseSection,seteditCompleteCourseSection]=useState(false);
    const [changeEligibleCourse,setChangeEligibleCourse]=useState(false);
    
    const personalDetails=data.personalDetails[0];
    const [completeCourseDetails,setCompleteCourseDetails]=useState(data.academicDetails[0].completed)
    const [incompleteCourseDetails,setIncompleteCourseDetails]=useState(data.academicDetails[0].incompleted);
    const completeCredit=data.academicDetails[0].completeCredit;
    const [customisedData,setCustomisedData]=useState(data.customisedCourse[0].courses[0]);
    const [eligibleForCourse,setEligibleForCourse]=useState(data.eligibleForNextSemester);
    const [editedCourses,setEditedCourses]=useState({addedToCompleted:[],deletedFromCompleted:[]});
    const [customisedEligibleCourse,setCustomisedEligibleCourse]=useState({addCourse:[],removedCourse:[]});
    // const x=eligibleForCourse.fiter(data=>!customisedData.indexOf());
    console.log(personalDetails._id,typeof(personalDetails._id))

    // console.log(customisedData,eligibleForCourse);
    const handleIncompletedEdit=()=>{
      console.log('incompleted');
      seteditCompleteCourseSection(true);
    }
    const handleDeleteCourse=(state,course)=>{
      console.log('arfn')
      const section=state;
      console.log(course,section);
      if(section===1){
        //dlt from comp sec
        const newData=completeCourseDetails.filter(data=>data!==course);
        setCompleteCourseDetails(newData);
        setIncompleteCourseDetails([...incompleteCourseDetails,{_id:course}]);
        setEditedCourses({addedToCompleted:[...editedCourses.addedToCompleted],deletedFromCompleted:[...editedCourses.deletedFromCompleted,course]})
        
      }
      else{
        //dlt from incomp sec
        const newData=incompleteCourseDetails.filter(data=>data._id!==course);
        setCompleteCourseDetails([...completeCourseDetails,course]);
        setIncompleteCourseDetails(newData);
        setEditedCourses({addedToCompleted:[...editedCourses.addedToCompleted,course],deletedFromCompleted:[...editedCourses.deletedFromCompleted]})



      }
    }
    const handleEditEligibleCourse=(id,course)=>{
      console.log(id,course);
      const courseDetails=eligibleForCourse.filter(data=>data._id._id===course);
      console.log(courseDetails[0]._id);
      if(id===1){
        setCustomisedData(customisedData.filter(data=>data!==course));
        const newData={addCourse:[...customisedEligibleCourse.addCourse],removedCourse:[...customisedEligibleCourse.removedCourse,courseDetails[0]._id._id]}
        setCustomisedEligibleCourse(newData);
      }
      if(id===2){
        setCustomisedData([...customisedData,course]);
        const newData={addCourse:[...customisedEligibleCourse.addCourse,courseDetails[0]._id._id],removedCourse:[...customisedEligibleCourse.removedCourse]}
        setCustomisedEligibleCourse(newData);
      }
      
    }
    const confirmEligibleCourse=()=>{
      customisedEligibleCourse.id=personalDetails._id;
      console.log(customisedEligibleCourse);
      fetch(`http://localhost:5000/editStudentsEligibleCourse`,{
        method:'POST',
        body:JSON.stringify(customisedEligibleCourse),
        headers:{
          "Content-Type":"application/json"
        }
            
        })
        .then(res=>res.json())
        .then(data=>{
           
            console.log(data);
            setCustomisedEligibleCourse({addCourse:[],removedCourse:[]});
            swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Changes has done in Eligible Course section Successfully',
                showConfirmButton: false,
                timer: 1800
              })
        })
        .catch(err=>{console.log(err)})

    }
    const confirmCompletedCourse=()=>{
      console.log(editedCourses);
      editedCourses.id=personalDetails._id;
      fetch(`http://localhost:5000/editStudentsCourses`,{
        method:'POST',
        body:JSON.stringify(editedCourses),
        headers:{
          "Content-Type":"application/json"
        }
            
        })
        .then(res=>res.json())
        .then(data=>{
           
            console.log(data);
            setEditedCourses({addedToCompleted:[],deletedFromCompleted:[]});
            swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Changes has done in Course section Successfully',
                showConfirmButton: false,
                timer: 1800
              })
        })
        .catch(err=>{console.log(err)})

    }
    return (
      <div style={{marginTop:'20px',borderRadius:'5px',padding:"20px",backgroundColor:'white'}}>
        <Grid container>
          <Grid item lg={4}>
            <ul style={{listStyle:'none'}}>
              <Avatar alt="Remy Sharp" style={{width: "240px",height: "240px",borderRadius:'6px'}} src="" variant="square"/>
              <br/>
              <h5>About Student</h5>
              <li>
                <h6>Name</h6>
                <p>{personalDetails.name}</p>
              </li>
              <li>
                <h6>Department</h6>
                <p>CSE</p>
              </li>
              <li>
                <h6>Email Id</h6>
                <p>{personalDetails.email}</p>
              </li>
              <li>
                <h6>Enrolled Semester</h6>
                <p>{personalDetails.semester}</p>
              </li>
              <li>
                <h6>Advisor</h6>
                <p>{personalDetails.advisor}</p>
              </li>
              <li>
                <h6>Transferred</h6>
                <p>{personalDetails["Are you transferred student from other university?"]}</p>
              </li>
            </ul>
          </Grid>
          <Grid item lg={8}>
            <div>
              <h5>Completed Courses</h5>
              <h6>Total Credit: {completeCredit}</h6>
              <Grid container>
                {completeCourseDetails.map(data=> <Course course={data} func={handleDeleteCourse} id={"1"} showDltBtn={editCompleteCourseSection}></Course> )}
              </Grid>
              <br/>
            </div>
            <hr/>
            <div>
              <h5>Incompleted Courses</h5>
              <h6>Total Credit: {140-completeCredit}</h6>
              <Grid container>
                {incompleteCourseDetails&&incompleteCourseDetails.map(data=><Course course={data._id}
                func={handleDeleteCourse} id={"2"} showDltBtn={editCompleteCourseSection}></Course>)}
              </Grid>
              <br/> 
              <Button size='small' variant="contained" color="primary" style={{marginRight:'5px'}} onClick={handleIncompletedEdit}>
                 <BiEdit style={{fontSize:'15px'}}/> Edit
              </Button> 
              {editCompleteCourseSection&&<Button onClick={()=>{seteditCompleteCourseSection(false);confirmCompletedCourse()}} size='small' variant="contained" color="primary">
                 <BiEdit style={{fontSize:'15px'}}/> confirm
              </Button>}
            </div>
            <hr/>
            <div>
              <h5>Eligible for next semester</h5>
              <br/>
              <strong>courses that given by the advisor</strong>
              <Grid container>
                {customisedData&&customisedData.map(data=>
                <Course course={data} func={handleEditEligibleCourse} id={'1'} showDltBtn={changeEligibleCourse}></Course>)}
              </Grid>
              <br/>
              <strong>Rest eligible Courses</strong>
              <Grid container>
                {eligibleForCourse&&eligibleForCourse.map(data=>!customisedData.includes(data._id._id)&&
                <Course id={'2'} func={handleEditEligibleCourse} course={data._id._id} showDltBtn={changeEligibleCourse}></Course>)}
              </Grid>
              <div>
                <Button size='small' variant="contained" color="primary" onClick={()=>{setChangeEligibleCourse(true)}}>
                  <BiEdit style={{marginRight:'3px',fontSize:'15px'}}/> Edit
                </Button> 
                {changeEligibleCourse&&<Button style={{marginLeft:'5px'}} size='small' variant="contained" color="primary" onClick={()=>{setChangeEligibleCourse(false);confirmEligibleCourse();}}>
                  confirm
                </Button>}
              </div>
            </div>

          </Grid>
        </Grid>
      </div>
    )
  
}
export default StudentProfile;
