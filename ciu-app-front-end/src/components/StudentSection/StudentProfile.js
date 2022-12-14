import React, { useEffect, useState } from 'react';
import {Avatar, Grid, makeStyles, Paper} from '@material-ui/core';
import { BiEdit } from "react-icons/bi";
import Course from '../OfferList/Course';
import Button from '@material-ui/core/Button';
import {getCurrentDtate_Time} from '../functions'
import swal from 'sweetalert2';
 
const StudentProfile=(props)=>{
  const mainData=props.data;
    const {academicDetails,eligibleForNextSemester,personalDetails}=mainData;
      
    const [editCompleteCourseSection,seteditCompleteCourseSection]=useState(false);
    const [changeEligibleCourse,setChangeEligibleCourse]=useState(false);

    const {completed,incompleted,completeCredit}=academicDetails;
    const advisedCourses=mainData.customisedCourse;
    console.log("advised courses",advisedCourses);
    const restEligibleCourse=eligibleForNextSemester.filter(course=>!advisedCourses.includes(course._id._id))

    //states for changing students academic data
    const [editedCourses,setEditedCourses]=useState({addedToCompleted:[],deletedFromCompleted:[]});
    const [customisedEligibleCourse,setCustomisedEligibleCourse]=useState({addCourse:[],removedCourse:[]});

    console.log("adv",advisedCourses);
    const handleIncompletedEdit=()=>{
      console.log('incompleted');
      seteditCompleteCourseSection(true);
    }

    const handleDeleteCourse=(state,course)=>{
      const section=state;
      console.log(course,section);
      if(section===1){
        //dlt from comp sec
        const newData=completed.filter(data=>data!==course);
        mainData.academicDetails.completed=newData
        mainData.academicDetails.incompleted=[...incompleted,{_id:course}]
        setEditedCourses({addedToCompleted:[...editedCourses.addedToCompleted],deletedFromCompleted:[...editedCourses.deletedFromCompleted,course]})
        
      }
      else{
        //dlt from incomp sec
        const newData=incompleted.filter(data=>data._id!==course);
        mainData.academicDetails.completed=[...completed,course]
        mainData.academicDetails.incompleted=newData;
        setEditedCourses({addedToCompleted:[...editedCourses.addedToCompleted,course],deletedFromCompleted:[...editedCourses.deletedFromCompleted]})
      }
    }
    const handleEditEligibleCourse=(id,course)=>{
      console.log(id,course);
      const courseDetails=eligibleForNextSemester.filter(data=>data._id._id===course);
      console.log(courseDetails[0]._id);
      if(id===1){//id=1 means a course deleted from advised course section
        const newAdvisedCourse=advisedCourses.filter(data=>data!==course);
        mainData.customisedCourse=newAdvisedCourse;
        const newData={addCourse:[...customisedEligibleCourse.addCourse],removedCourse:[...customisedEligibleCourse.removedCourse,courseDetails[0]._id._id]}
        setCustomisedEligibleCourse(newData);
      }
      if(id===2){
        // id=2 means,course delete from rest eligile course section
        const newAdvisedCourse=[...advisedCourses,course];
        mainData.customisedCourse=newAdvisedCourse;
        const newData={addCourse:[...customisedEligibleCourse.addCourse,courseDetails[0]._id._id],removedCourse:[...customisedEligibleCourse.removedCourse]}
        setCustomisedEligibleCourse(newData);
      }
      
    }
    const confirmEligibleCourse=()=>{
      customisedEligibleCourse.id=personalDetails._id;
      // props.trackFunction("editEligibleCourse",customisedEligibleCourse)
      // console.log(customisedEligibleCourse);
      // fetch(`http://localhost:5000/editStudentsEligibleCourse`,{
      //   method:'POST',
      //   body:JSON.stringify(customisedEligibleCourse),
      //   headers:{
      //     "Content-Type":"application/json"
      //   }
            
      //   })
      //   .then(res=>res.json())
      //   .then(data=>{
           
      //       console.log(data);
      //       setCustomisedEligibleCourse({addCourse:[],removedCourse:[]});
      //       swal.fire({
      //           position: 'middle',
      //           icon: 'success',
      //           title: 'Changes has done in Eligible Course section Successfully',
      //           showConfirmButton: false,
      //           timer: 1800
      //         })
      //   })
      //   .catch(err=>{console.log(err)})

    }
    const confirmCompletedCourse=()=>{
      editedCourses.id=personalDetails._id;
      editedCourses.stName=personalDetails.name;
      editedCourses.lastModified=getCurrentDtate_Time();
      // console.log(editedCourses);
      // props.trackFunction("editCompletedCourse",editedCourses)
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
              <p style={{textAlign:'center',width: "220px",marginTop:'5px',marginBottom:'20px',fontWeight:'600',fontSize:'20px'}}>
                {personalDetails.name}
              </p>
              <li>
                <h6>Id</h6>
                <p>{personalDetails._id}</p>
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
                {completed.map(data=> <Course course={data} func={handleDeleteCourse} id={"1"} showDltBtn={editCompleteCourseSection}></Course> )}
              </Grid>
              <br/>
            </div>
            <hr/>
            <div>
              <h5>Incompleted Courses</h5>
              <h6>Total Credit: {140-completeCredit}</h6>
              <Grid container>
                {incompleted.map(data=><Course course={data._id}
                func={handleDeleteCourse} id={"2"} showDltBtn={editCompleteCourseSection}></Course>)}
              </Grid>
              {/* props.systemUser==="faculty"&& */}
              <br/> 
              {<Button size='small' variant="contained" color="primary" style={{marginRight:'5px'}} onClick={handleIncompletedEdit}>
                 <BiEdit style={{fontSize:'15px'}}/> Edit
              </Button> }
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
                {advisedCourses.map(data=><Course 
                  course={data} 
                  func={handleEditEligibleCourse} 
                  id={'1'} 
                  showDltBtn={changeEligibleCourse}>
                </Course>)}
              </Grid>
              <br/>
              <strong>Rest eligible Courses</strong>
              <Grid container>
                {restEligibleCourse.map(data=><Course 
                      id={'2'} func={handleEditEligibleCourse} 
                      course={data._id._id} 
                      showDltBtn={changeEligibleCourse}>
                </Course>)}
              </Grid>
              <div>
              {/* props.systemUser==="faculty"&& */}
                {<Button size='small' variant="contained" color="primary" onClick={()=>{setChangeEligibleCourse(true)}}>
                  <BiEdit style={{marginRight:'3px',fontSize:'15px'}}/> Edit
                </Button> }
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
