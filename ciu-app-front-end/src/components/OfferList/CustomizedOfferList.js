import { Grid, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OfferTableRow from './OfferTableRow';
import StudentWiseofferedCourse from './StudentWiseofferedCourse';
import swal from 'sweetalert2';
import CourseWiseList from './CourseWiseList';
import ReAddCourse from './ReAddCourse';
import {getNextSemester,changeObjFormatForDownload,formatedForReport} from '../functions';
import { IoMdArrowDropdown } from 'react-icons/io';
import { red } from '@material-ui/core/colors';


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
  },
  dropDown:{
    background:"#075baf",
    width:'17%',
    height:'99%',
    display:'inline-block',
    borderRadius:'0px 4px 4px 0px',
    '&:hover':{
      cursor:'pointer'
    }
  },
  downloadBTN:{
    padding:0,
    display:'inline-block',
    border:'4px solid #1976d2',
    borderRadius:'5px',
    marginLeft:"15px",
    height:'38px',
    width:'195px',
  },
  optSec:{
    display:'inline-block',
    color:'white',
    fontWeight:'500',
    background:'#1976d2',
    width:'82%',
    height:'99%',
    borderRadius:'4px 0px 0px 4px',
    '&:hover':{
      cursor:'pointer'
    }

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
  const [downloadType,setDownloadType]=useState('Download as List');

  let i=1,customisedDataExist=true;
  const semester=props.semester;
  // console.log(semester)

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
      else{
        customisedDataExist=false;
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
  const handleClickDownload=()=>{
    console.log(downloadType);
    if(downloadType=='Download as List'){
      const formatedObjArr=changeObjFormatForDownload(customizeData);
      const myFile=`${'OfferList_'+getNextSemester()}.xlsx`;
      const myWorksheet=XLSX.utils.json_to_sheet(formatedObjArr);
      const myWorkbook=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(myWorkbook,myWorksheet,"Course list");
      XLSX.writeFile(myWorkbook,myFile);
    
    }
    else{
      fetch("http://localhost:5000/findAllStudentsName_Id")
      .then(res=>res.json())
      .then(data=>{
        if('result' in data){
          const formatedObj=formatedForReport(customizeData,data.result);
          const myWorkbook=XLSX.utils.book_new();
          const myFile=`${'OfferList_Report_'+getNextSemester()}.xlsx`;
          Object.keys(formatedObj).forEach(item=>{
            let tempObject=formatedObj[item],courseName=item;
            const myWorksheet=XLSX.utils.json_to_sheet(tempObject);
            XLSX.utils.book_append_sheet(myWorkbook,myWorksheet,courseName);
          })
          XLSX.writeFile(myWorkbook,myFile);
        }
        else{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })

    }


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
          if(data.length){
            console.log("get offer")
            setCustomizeData(data[0].customiseList);
            setPrevRemovedData(data[0].removalCourses.sort((a,b)=>{return a._id.slNo-a._id.slNo}));
            console.log(data[0].removalCourses.sort((a,b)=>{return a._id.slNo-a._id.slNo}));
          }
          else{
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please customise your generated offerlist first',
            })
          }
          
    })},[])


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
      setAnchorEl(null);
    };
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
        {/* {customisedDataExist&&<h5 style={{textAlign:'center',padding:'15px',margin:'10px 0px',borderRadius:'6px'}}>OfferList customization has not completed yet.</h5>} */}
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
          
          <div className={classes.downloadBTN}>
            <div onClick={()=>{handleClickDownload()}} className={classes.optSec}>{downloadType}</div> 
            <div className={classes.dropDown} onClick={handleClick}>
              <IoMdArrowDropdown style={{color:'white'}}/>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={()=>{
                  setDownloadType('Download as List')
                  handleClose();
                }}
                >Download as List</MenuItem>
                <MenuItem onClick={()=>{
                  setDownloadType('Download as Report');
                  handleClose();
                  }}>Download as report</MenuItem>
              </Menu>

          </div>
      </div>}
      </section>
      
    );
}
export default CustomizedOfferList;

