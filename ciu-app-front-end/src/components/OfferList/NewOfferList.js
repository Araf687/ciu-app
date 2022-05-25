import { Grid, makeStyles } from '@material-ui/core';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import OfferTableRow from './OfferTableRow';
import StudentWiseofferedCourse from './StudentWiseofferedCourse';
import swal from 'sweetalert2';
import CourseWiselist from './CourseWiseList';


const useStyles=makeStyles(theme=>({
  row:{
    textAlign:"center",
    backgroundColor:"white",
    padding:"10px",
    border:"1px solid #e3e1e1",
    borderRadius:"8px",
    marginBottom:"5px",
    "& h6":{
        margin:"0",
        fontWeight:700,
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

const NewOfferList=(props) => {
  const [offerData,setOfferData]=useState();
  const [stWiseCourses,setStWiseCourses]=useState(false);
  const [courseWiseList,setCourseWiseList]=useState(false);
  const [confirmList,setConfirmList]=useState(false);
  const [showDeleteBtn,setShowDeleteBtn]=useState(false);
  const [removalCourses,setRemovalCourses]=useState([]);
  const [minimumStudent,setMinimumStudent]=useState(0);

  let i=1;
  const semester=props.semester;
  const isCustomListExist=props.isCustomListExist;

  const classes=useStyles();

  const deleteCourseStudentWise=(studentId,courseId)=>{
    console.log(studentId,courseId);
    let credit=0;
    offerData.map(data=>{
      if(data._id._id===courseId){
        let eligibleArray=data.eligibleStudents;
        const index=eligibleArray.indexOf(studentId);
        eligibleArray.splice(index,1);
        credit=data._id.creditHours;
        console.log(credit)
        return credit;
      }
      
    })
    setOfferData(offerData);
    console.log(offerData);
  }

  const handleCUstomizedListClick=()=>{
    if(isCustomListExist){
      swal.fire({
          title: 'Are you sure?',
          text: "You have already customised the offerList before!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Customise It Newly!'


        }).then((result) => {
          if (result.isConfirmed) {
              console.log("click");
              setConfirmList(true);
              setShowDeleteBtn(true);
              
          }
        })
  }
  else{
    setConfirmList(true);
    setShowDeleteBtn(true);
  }

    
  }

  const handleDelete=(object)=>{
    console.log(offerData,object);
    const newData=offerData.filter((item) => item._id._id != object._id._id);
    setOfferData(newData);
    setRemovalCourses([...removalCourses,object]);
    
    
  }

  const handleConfirmList=()=>{

    setConfirmList(false);
    setShowDeleteBtn(false);
    let data=[];
    let removeByMinStudent=[];
    offerData.map(dt=>{
      
      if(dt.eligibleStudents.length>=minimumStudent){
        data=[...data,dt.eligibleStudents.length];

      }
      else{
        setRemovalCourses([...removeByMinStudent,dt]);
        removeByMinStudent=[...removeByMinStudent,dt]
      }
    });
    // console.log(data,removalCourses);
    let totalRemovalStudent=removalCourses;
    if(removeByMinStudent.length){
      totalRemovalStudent=[...totalRemovalStudent,removeByMinStudent];
    }

    const newData={_id:semester.nextSem,customiseList:offerData,removalCourses:totalRemovalStudent};
    
    if(isCustomListExist){
      fetch(`http://localhost:5000/updateCustomizedList`,{
                method:'PATCH',
                body:JSON.stringify(newData),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{console.log(data)})
            .catch(err=>console.log(err))

    }
    else{
      newData.editedForRoutineExternal=false;
      fetch(`http://localhost:5000/addCustomizedList`,{
                method:'POST',
                body:JSON.stringify(newData),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{console.log(data)})

    }
    
  }

const handleCheck=()=>{
  setMinimumStudent(document.getElementById('minCredit').value);
  console.log(document.getElementById('minCredit').value);
  console.log(offerData[0].eligibleStudents.length);
  // const arr=offerData.filter(data=>{console.log(data)});
}
    useEffect(()=>{
        fetch("http://localhost:5000/getOfferlist")
        .then(response => response.json())
        .then(data => {
          console.log(data.result);
          console.log("get offer")
          setOfferData(data.result);});
    },[])

    const handleDeleteBatch=(courseId,eligibleSt)=>{
      const newOfferData=offerData.map(data=>{
        if(courseId===data._id._id){
          data.eligibleStudents=eligibleSt;
        }
        return data;
      })
      setOfferData(newOfferData);
    }
    
    return (
      <section >
        <div style={{textAlign:"center",margin:"5px 0px"}}>
          <h4>{"Semester: "+semester.nextSem}</h4>
        </div>

       {stWiseCourses==false&&courseWiseList==false?<>
        <div style={{textAlign:"right",padding:"10px"}}>
          <Button size='small' variant="contained" style={{marginRight:"15px"}} 
            onClick={()=>{setCourseWiseList(true);}}>
            <strong>Course Wise List</strong>
          </Button>
          <Button size='small' variant="contained" onClick={()=>{setStWiseCourses(true);}}>
            <strong>Student Wise List</strong>
          </Button>
       </div>
      { confirmList&&<div style={{margin:"10px 0px",float:"right"}}>
        <TextField
            id="minCredit"
            label="Minimum Credit"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            size="large"
            variant="standard"
            onBlur={()=>{handleCheck()}}
          />
       </div>}
       <Grid className={classes.row} container>
          <Grid item lg={1}> <h6>Sl No</h6> </Grid>
          <Grid item lg={1}> <h6>course Id</h6> </Grid>
          <Grid item lg={4}> <h6>Course Name</h6> </Grid>
          <Grid item lg={3}> <h6>Batch</h6> </Grid>
          <Grid item lg={2}> <h6>Total Student</h6> </Grid>
          <Grid item lg={1}> <h6>Actions</h6> </Grid>
      </Grid>
        {offerData &&
        offerData.map(data=> <OfferTableRow 
                                  dltBtn={showDeleteBtn} 
                                  rowData={data} slNo={i++}
                                  delete={handleDelete}
                                  dltBatch={handleDeleteBatch}>
                                  
                              </OfferTableRow>)
        } 
        </>
        :stWiseCourses==true&&offerData?
          <StudentWiseofferedCourse 
            state={setStWiseCourses}  
            showDlt={showDeleteBtn} 
            dltCourseStWIse={deleteCourseStudentWise} 
            data={offerData}>
          </StudentWiseofferedCourse>
          :<CourseWiselist state={setCourseWiseList} data={offerData}></CourseWiselist>
    }

      <div className={classes.buttons}>
        {confirmList?
        <Button onClick={()=>{handleConfirmList()}} variant="contained">Confirm List</Button>
        :<Button variant="contained" onClick={()=>{handleCUstomizedListClick()}} >Customize Offer List</Button>}

        {confirmList&& <Button variant="contained" style={{marginLeft:"15px"}} 
          onClick={()=>{setConfirmList(false);setShowDeleteBtn(false);}}>
          Cancel
        </Button>}
      </div>
       {/* <OfferTableRow></OfferTableRow> */}
      </section>
      
    );
}
export default NewOfferList;

