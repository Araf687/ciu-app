import { Grid, makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OfferTableRow from './OfferTableRow';
import StudentWiseofferedCourse from './StudentWiseofferedCourse';
import swal from 'sweetalert2';
import CourseWiseList from './CourseWiseList';
import ReAddCourse from './ReAddCourse';


const XLSX=require('xlsx');





const useStyles=makeStyles(theme=>({
  row:{
    textAlign:"center",
    backgroundColor:"white",
    padding:"10px",
    borderRadius:"8px",
    marginBottom:"5px",
    "& h6":{
        margin:"0",
        fontWeight:"700",
    },
  },
  breadcumbs:{
      ['& h2']:{
          margin:'0',
          fontSize:'28px',
          fontWeight:'400',
        },
        marginBottom:'20px',
        ['& a']:{
            color:'blue',
        }
  },
  tableField:{
    textAlign:"center",
  },
  buttons:{
    textAlign:"center",
    padding:"10px"
  }
}));

const fakeData=[
  {
    _id:1,
    slNo:1,
    name:1,
    type:1,
  },
]

const CustomizedOfferList=(props) => {
  const [customizeData,setCustomizeData]=useState();
  const [stWiseCourses,setStWiseCourses]=useState(false);
  const [confirmList,setConfirmList]=useState(false);
  const [showDeleteBtn,setShowDeleteBtn]=useState(false);
  const [removalCourses,setRemovalCourses]=useState([]);
  const [prevRemovedData,setPrevRemovedData]=useState([]);
  const [courseWiseList,setCourseWiseList]=useState(false);
  const [reAddCourse,setReAddCourse]=useState(false);

  let i=1;
  const semester=props.semester;

  const classes=useStyles();

  const deleteCourseStudentWise=(studentId,courseId)=>{
    console.log(studentId,courseId);
    let credit=0;
    customizeData.map(data=>{
      if(data._id._id===courseId){
        let eligibleArray=data.eligibleStudents;
        const index=eligibleArray.indexOf(studentId);
        eligibleArray.splice(index,1);
        credit=data._id.creditHours;
        console.log(credit)
        return credit;
      }
      
    })
    console.log(customizeData);
  }

  const handleCUstomizedListClick=()=>{
    setConfirmList(true);
    setShowDeleteBtn(true);
  }

  const handleDelete=(object)=>{
    console.log( object._id._id);
    const newData=customizeData.filter(item => item._id._id !== object._id._id);
    setRemovalCourses([...removalCourses,object]);
    setCustomizeData(newData);
    console.log([...removalCourses,object],newData);
  }

  const handleConfirmList=()=>{

    setConfirmList(false);
    setShowDeleteBtn(false);
    console.log(customizeData,removalCourses);
    const newData={_id:semester.nextSem,customiseList:customizeData,removalCourses:[...prevRemovedData,...removalCourses]};

    fetch(`http://localhost:5000/updateCustomizedList`,{
                method:'PATCH',
                body:JSON.stringify(newData),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{console.log(data)})
  }
  const handleReAddClick=()=>{
    setReAddCourse(true);
  }

  const handleReAddCancle=()=>{
    setReAddCourse(false);

  }
  const handleAddRemovedCourse=()=>{

  }
  const handleClickDOwnload=()=>{


  }
  const handleDeleteBatch=(courseId,eligibleSt)=>{
    const newOfferData=customizeData.map(data=>{
      if(courseId===data._id._id){
        data.eligibleStudents=eligibleSt;
      }
      return data;
    })
    setCustomizeData(newOfferData);
  }
    useEffect(()=>{
        fetch(`http://localhost:5000/getCustomizedList/${semester.nextSem}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log("get offer")
          setCustomizeData(data[0].customiseList);
          setPrevRemovedData(data[0].removalCourses.sort((a,b)=>{return a._id.slNo-a._id.slNo}));
          console.log(data[0].removalCourses.sort((a,b)=>{return a._id.slNo-a._id.slNo}));
    })},[])
    return (
      <section >
        <div style={{textAlign:"center",margin:"5px 0px"}}>
          <h4>{"Semester: "+semester.nextSem}</h4>
        </div>
       {stWiseCourses===false&&courseWiseList===false&&reAddCourse===false?
       <div id='offerList'>
        <div style={{textAlign:"right",padding:"10px"}}>
          <Button size='small' variant="contained" style={{marginRight:"15px"}} onClick={()=>{setCourseWiseList(true);}}>
            <strong>Course Wise List</strong>
          </Button>
          <Button size='small' variant="contained" onClick={()=>{setStWiseCourses(true);}}>
            <strong>Student Wise List</strong>
          </Button>
       </div>
       <Grid className={classes.row} container>
          <Grid item lg={1}>
              <h6>Sl No</h6>
          </Grid>
          <Grid item lg={1}>
              <h6>Course Id</h6>
          </Grid>
          <Grid item lg={4}>
              <h6>Course Name</h6>
          </Grid>
          <Grid item lg={3}>
              <h6>Batch</h6>
          </Grid>
          <Grid item lg={2}>
              <h6>Total Student</h6>
          </Grid>
          <Grid item lg={1}>
              <h6>Actions</h6>
          </Grid>

      </Grid>
        {customizeData && reAddCourse===false&&
        customizeData.map(data=> data._id && <OfferTableRow 
                                  dltBtn={showDeleteBtn} 
                                  rowData={data} slNo={i++}
                                   delete={handleDelete}
                                   dltBatch={handleDeleteBatch}
                                   ></OfferTableRow>)
        } 

        </div>
      
      :stWiseCourses==true && reAddCourse===false?<StudentWiseofferedCourse 
      state={setStWiseCourses}  
      showDlt={showDeleteBtn} 
      dltCourseStWIse={deleteCourseStudentWise} 
      data={customizeData}>
      </StudentWiseofferedCourse>
      :reAddCourse===false&&<CourseWiseList state={setCourseWiseList} data={customizeData}></CourseWiseList>
    }
    {
      reAddCourse&& <ReAddCourse data={prevRemovedData} semester={semester.nextSem}  backFunc={handleReAddCancle}></ReAddCourse>
    }

      {courseWiseList===false&& reAddCourse===false&&
      <div className={classes.buttons}>
        {confirmList?
        <>
          <Button onClick={()=>{handleConfirmList()}} variant="contained">Confirm List</Button>
          <Button variant="contained" style={{marginLeft:"15px"}} onClick={()=>{setConfirmList(false);setShowDeleteBtn(false);}}>
                Cancel
          </Button>
        </>:<Button variant="contained" onClick={()=>{handleCUstomizedListClick()}} >Update Customize List</Button>
        } 
          {stWiseCourses===false&&<Button variant="contained" style={{marginLeft:"15px"}} 
                onClick={()=>{handleReAddClick()}}>
                Re-Add Course
          </Button>}
          
          <Button variant="contained" style={{marginLeft:"15px"}} onClick={()=>{handleClickDOwnload()}}>
            Download
          </Button>
      </div>}
      </section>
      
    );
}
export default CustomizedOfferList;

