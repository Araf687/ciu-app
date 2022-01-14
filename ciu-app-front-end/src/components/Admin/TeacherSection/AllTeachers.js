// import React from 'react';

// const AllTeachers = () => {
//     return (
//         <div>
//             <h3>all teeachers section</h3>
//         </div>
//     );
// };

// export default AllTeachers;


import { Grid, makeStyles, Paper } from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import InputBase from "@mui/material/InputBase";
import {AiOutlineDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";
import { DataGrid} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';

import afridi from '../../../image/afridi.jpg';
import tasmu from '../../../image/tasmu.jpg';
import opu from '../../../image/opu.jpg';
import joyi from '../../../image/joyi.jpg';

const useStyles=makeStyles(theme=>({
    breadcumbs:{
        ['& h2']:{
            margin:'0',
            fontSize:'28px',
            fontWeight:'400',
          },
          ['& span']:{
            margin:'6px 0 0 2px',
            fontSize:'15px'
          },
          marginBottom:'30px',

    },
    paper:{
        width:"100%",
        padding:"20px",
        borderRadius:"8px",
    },
    searchBar:{
        border:"1px solid #e5e4e4",
        borderRadius:"6px",
        padding:"18px",
        marginBottom:"15px",
        display:"flex",
        justifyContent:"space-between",
        boxShadow: "0 0 10px #f1ecec",
        '& input':{
            borderRadius:"3px",
            border:"1px solid #e5e4e4",
            padding:"3px",
        },
        '& input:focus':{
            border: "1.5px solid #3ca2e3",
            boxShadow: "0 0 5px #3fb1f9",
            transition:theme.transitions.create(['border','box-shadow'],{
                duration:'0.3s',
              }),
            
        }    
    },
    studentList:{
        border:"1px solid #e5e4e4",
        borderRadius:"7px",
        padding:"5px",
        height:"700px"

    },

}))  

const TeacherData=
    [
        {
            
            id:"12345",
            image:joyi,
            name:"joyi",
            dept:"cse",
            email:"joyi@gmail.com",
            phone:"+880 1821 484048",
            
        },
        {
            id:"123455",
            image:tasmu,
            name:"tasmu",
            dept:"cse",
            email:"tasmu@gmail.com",
            phone:"+880 1863 341939",
        },
        {
            id:"122785",
            image:opu,
            name:"opu",
            dept:"eee",
            email:"opu@gmail.com",
            phone:"+880 1684 372374",
        },
        {
            id:"17202155",
            image:afridi,
            name:"Mohammad Afridi Arafat Emon",
            dept:"eee",
            email:"afridi@gmail.com",
            phone:"+974 3024 3935",
        },
    ];



const AllTeachers = () => {
    const classes=useStyles();
    const {register,handleSubmit}= useForm();
    const [searchData,setSearchData]=useState();
    const [stData, setStData] = useState(TeacherData);

    const collums=[
        {field:'id', headerName:'ID',width:"100"},
        {
            field: "image",
            headerName: "image",
            width: "80",
            height: "500",
            renderCell: (params) =>  <Avatar alt="Remy Sharp" sx={{ width: 45, height: 45 }}src={params.value} />
          },

        {field:'name', headerName:'Name',width:"240"},
        {field:'dept', headerName:'Dept',width:"80"},
        {field:'email', headerName:'Email',width:"200"},
        {field:'phone', headerName:'Phone',width:"150"},
        {field:"action", headerName:'Actions',sortable:"false",renderCell:(cv)=> <><AiOutlineDelete style={{height:"35px",margin:"0px 10px",width:'25px',color:'red'}} onClick={()=>{clickDLT(cv.row)}}/> <BsPencilSquare style={{height:"25px",width:'20px',color:'blue'}}/></>}
    ];

    const onSubmit = data =>{
        console.log(data);
        setSearchData(data);
        
    }
    const clickDLT=(cellValues)=>{
        const newTeacherData=TeacherData.filter((value)=>{
            if(value.name!=cellValues.name){
                return value;
            }
            
        })
        setStData(newTeacherData);
        
    }
    // useEffect(() => {
    //     fetch("http://localhost:5000/allStudents")
    //     .then(res=>res.json())
    //     .then(data=>console.log(data))
    // }, []);
    return (
        <section>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.breadcumbs}>
                        <h2>All Teachers</h2>
                        <span><Link to="/dashboard">Dashboard</Link> / All Teachers</span> 
                    </div>
                </Grid>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className={classes.searchBar}>
                            <InputBase variant="Outlined" {...register("TeacherName")} style={{width:"450px"}} placeholder='Teacher Name'></InputBase>
                            <InputBase variant="Outlined" {...register("dept")} placeholder='Department' style={{width:"250px"}}></InputBase>
                            <Button variant="contained" type="submit">Search</Button>
                        </div>
                    </form>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={stData}
                            columns={collums}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                        
                    </div>

                </Paper>
               
            </Grid>
        </section>
    );
};

export default AllTeachers;