import { Button } from '@mui/material';
import { Grid, makeStyles } from '@material-ui/core';
import React, { PureComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewOfferList from './NewOfferList';
import CustomizedOfferList from './CustomizedOfferList';

const useStyles=makeStyles(them4=>({
    root:{},
    breadcumbs:{
        ['& h2']:{
            margin:'0',
            fontSize:'28px',
            fontWeight:'400',
          },
          ['& p']:{
            margin:'6px 0 0 2px',
            fontSize:'15px'
          },
          marginBottom:'30px',
          ['& a']:{
              color:'blue',
          }


    },

    offeBoard:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"20px",
    },
    rules:{
        
            backgroundColor:"white",
            padding:"20px",
            borderRadius:"10px",
        
    }


}) )

const OfferlistBoard=()=> {
    
    const [offerList,setOfferList]=useState([]);
    const classes=useStyles();
    const [newOfferList,setNerOfferList]=useState(true);
    const [genarateOfferList,setGenarateOfferList]=useState(false);
    const [customiseList,setCustomiseList]=useState(false);
    const [current_New_semester,set_current_new_semester_]=useState({currentSem:"",nextSem:""});
    const [isCustomListExist,setIsCUstomListExist]=useState();

    const handleCompleteStepClick=()=>{
        setNerOfferList(false);
    }
    const handleCustomiseListClick=()=>{
        // setGenarateOfferList(true);
        setCustomiseList(true);
       
    }
    const findNextSemester=(semester)=>{
        if(semester=="Spring"){
            return "Summer"
        }
        else if(semester=="Summer"){
            return "Autumn"
        }
        else{
            return "Spring"
        }
    }
    
    useEffect(()=>{
        var dateObj = new Date();
        var month = dateObj.getUTCMonth(); 
        var year = dateObj.getUTCFullYear();
        let currentSemester="";
        let nextSemester="";
        if(month>=1&&month<=4){
            currentSemester="Spring"; 
        }
        else if(month>=5&&month<=8){
            currentSemester="Summer";
        }
        else{
            currentSemester="Autumn";
            
        }
        nextSemester=findNextSemester(currentSemester)+year.toString().substring(2, 4);
        currentSemester=currentSemester+year.toString().substring(2, 4);
        set_current_new_semester_({ciurrentSem:currentSemester,nextSem:nextSemester});

        fetch(`http://localhost:5000/searchCustomizedList/${nextSemester}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setIsCUstomListExist(data);
        });
    

    },[])

    return (
     <section>
        <div className={classes.breadcumbs}> 
            {genarateOfferList==false && customiseList==false&&
            <div>
                <h2>Offer List</h2>
                <span><Link to="/dashboard">Dashboard</Link> / Offer List</span>
            </div> }
            {genarateOfferList==true &&
            <div>
                <h2>Genarated List</h2>
                <span><Link to="/dashboard">Dashboard</Link> / <Link onClick={()=>{setGenarateOfferList(false);setCustomiseList(false)}}>Offer List</Link> /Generated List </span>
            </div> }
            {customiseList==true&&
            <div>
                <h2>Customized List</h2>
                <span><Link to="/dashboard">Dashboard</Link> / <Link onClick={()=>{setGenarateOfferList(false);setCustomiseList(false)}}>Offer List</Link> /Customized List </span>

            </div> }
        </div>
            {genarateOfferList==false&&customiseList==false&&<div className={classes.offeBoard}>
                <div className={classes.rules}>
                    <h5>Please finish the steps before generating the Offer List</h5>
                    <ul>
                        <li>Upload all the students data</li>
                        <li>Upload the previous semesters addAdvisingList</li>
                        <li>Please check if you have upload the proper format file</li>
                    </ul>
                </div>
            </div>}

            {newOfferList&&<div style={{textAlign:"center",margin:"10px 0px"}}>
                <Button onClick={()=>{handleCompleteStepClick()}} variant="contained">Yes, I have complete the steps</Button>
            </div>
            }
            {genarateOfferList==false&&customiseList==false&&newOfferList==false&&
            <div style={{textAlign:"center",margin:"10px 0px"}}>
                <Button onClick={()=>{setGenarateOfferList(true);}} style={{marginRight:"20px"}} variant="contained">Generate OfferList</Button>
                <Button onClick={()=>{handleCustomiseListClick()}} variant="contained">Customized OfferList</Button>
            </div>}
        
        {
            genarateOfferList&&<NewOfferList generateList={genarateOfferList} isCustomListExist={isCustomListExist} semester={current_New_semester}></NewOfferList>
        }
        {
            customiseList&& <CustomizedOfferList semester={current_New_semester}></CustomizedOfferList>
        }
        

    </section>
    )
}
export default OfferlistBoard ;