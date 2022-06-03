import { Grid, makeStyles, Paper } from '@material-ui/core';
import React ,{useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import InputBase from "@mui/material/InputBase";
import {AiOutlineDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";
import { DataGrid} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { contextUser } from '../../App';

import swal from 'sweetalert2';

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

// const studentData=
//     [
//         {
            
//             id:"12345",
//             image:joyi,
//             name:"joyi",
//             dept:"cse",
//             email:"joyi@gmail.com",
//             batch:"17",
//             cgpa:"3.24",
            
//         },
//         {
//             id:"123455",
//             image:tasmu,
  
//             name:"tasmu",
//             dept:"cse",
//             email:"tasmu@gmail.com",
//             batch:"17",
//             cgpa:"3.44",
            
//         },
//         {
//             id:"17202155",
//             image:opu,
//             name:"opu",
//             dept:"ee",
//             email:"opu@gmail.com",
//             batch:"17",
//             cgpa:"3.49",
            
//         },
//         {
//             id:"17202155",
//             image:afridi,
//             name:"Mohammad Afridi Arafat Emon",
//             dept:"ee",
//             email:"afridi@gmail.com",
//             batch:"17",
//             cgpa:"3.49",
            
//         },
//     ];



const AllStudent = () => {
    const classes=useStyles();
    const {register,handleSubmit}= useForm();
    const [searchData,setSearchData]=useState();
    const [stData, setStData] = useState([]);
    const [user,,,]=useContext(contextUser);

    const collums=[
        {field:'id', headerName:'ID',width:"100"},
        {
            field: "img",
            headerName: "image",
            width: "80",
            height: "500",
            renderCell: (params) =>  <Avatar alt="Remy Sharp" sx={{ width: 45, height: 45 }}src={params.value} />
          },

        {field:'name', headerName:'Name',width:"240"},
        {field:'dept', headerName:'DEPT',width:"70"},
        {field:'advisor', headerName:'Advisor',width:"200"},
        {field:'batch', headerName:'BATCH',width:"80"},
        {field:"action", headerName:'Actions',sortable:"false",renderCell:(cv)=> <><AiOutlineDelete style={{height:"35px",margin:"0px 10px",width:'25px',color:'red'}} onClick={()=>{clickDLT(cv.row)}}/> <BsPencilSquare onClick={()=>{clickEdit(cv.row)}} style={{height:"25px",width:'20px',color:'blue'}}/></>}
    ];

    const onSubmit = data =>{
        console.log(data);
        setSearchData(data);
        
    }
    const clickDLT=(cellValues)=>{
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/dltStudentById/${cellValues.id}`, {
                    method: 'DELETE',
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data){
                        const newStData=stData.filter((value)=>{
                            if(value.id!=cellValues.id){
                                return value;
                            }
                            
                        })
                        setStData(newStData);
                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })

                
            }
          })
        
        
    }
    const clickEdit=(data)=>{
        
    }
    useEffect(() => {
        fetch("http://localhost:5000/allStudents")
        .then(res=>res.json())
        .then(data=>{
            if(data.length){let studentData=[];
            const id=data[0]._id.toString();

            data.map(dt=>{
                studentData.push({
                    id:dt._id||0,
                    img:dt.img&&dt.img.img,
                    name:dt.name||"a",
                    dept:dt.dept||"b",
                    advisor:dt.advisor,
                    batch:id[0]+id[1],
                    cgpa:1,
                });
            })
            // console.log(studentData);
            setStData(studentData);
        }
        else{
            setStData([]);
        }
        })
    }, []);
    return (
        <section>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.breadcumbs}>
                        <h2>All Students</h2>
                        <span><Link to="/dashboard">Dashboard</Link> / All Students</span> 
                    </div>
                </Grid>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className={classes.searchBar}>
                            <InputBase variant="Outlined" {...register("stName")} style={{width:"400px"}} placeholder='Student Name'></InputBase>
                            <InputBase variant="Outlined" {...register("dept")} placeholder='Department'></InputBase>
                            <InputBase variant="Outlined" {...register("batch")} placeholder='Batch'></InputBase>
                            <Button variant="contained" type="submit">Search</Button>
                        </div>
                    </form>
    
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={stData}
                            columns={collums}
                            pageSize={10}
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

export default AllStudent;