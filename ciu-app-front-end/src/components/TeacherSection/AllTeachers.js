import { Grid, makeStyles, Paper } from '@material-ui/core';
import React ,{useState,useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import InputBase from "@mui/material/InputBase";
import {AiOutlineDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";
import { DataGrid} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import swal from 'sweetalert2';
import { contextUser } from '../../App';


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

// const TeacherData=
//     [
//         {
            
//             id:"12345",
//             image:joyi,
//             name:"joyi",
//             dept:"cse",
//             email:"joyi@gmail.com",
//             phone:"+880 1821 484048",
            
//         },
//         {
//             id:"123455",
//             image:tasmu,
//             name:"tasmu",
//             dept:"cse",
//             email:"tasmu@gmail.com",
//             phone:"+880 1863 341939",
//         },
//         {
//             id:"122785",
//             image:opu,
//             name:"opu",
//             dept:"eee",
//             email:"opu@gmail.com",
//             phone:"+880 1684 372374",
//         },
//         {
//             id:"17202155",
//             image:afridi,
//             name:"Mohammad Afridi Arafat Emon",
//             dept:"eee",
//             email:"afridi@gmail.com",
//             phone:"+974 3024 3935",
//         },
//     ];



const AllTeachers = () => {
    const classes=useStyles();
    const {register,handleSubmit}= useForm();
    const [searchData,setSearchData]=useState();
    const [teacherData, setTeacherData] = useState([]);
    const [user,,,]=useContext(contextUser);

    const collums=[
        {field:'id', headerName:'ID',width:"100"},
        {
            field: "image",
            headerName: "image",
            width: "80",
            height: "500",
            renderCell: (params) =>  <Avatar alt="Remy Sharp" sx={{ width: 45, height: 45 }}src={params.value} />
          },

        {field:'name', headerName:'Name',width:"200"},
        {field:'dept', headerName:'Dept',width:"100"},
        {field:'email', headerName:'Email',width:"200"},
        {field:'phone', headerName:'Phone',width:"150"},
        user.role==="Admin"&&{field:"action", headerName:'Actions',sortable:"false",renderCell:(cv)=> <><AiOutlineDelete style={{cursor:'pointer',height:"35px",margin:"0px 10px",width:'25px',color:'red'}} onClick={()=>{clickDLT(cv.row)}}/> <BsPencilSquare style={{cursor:'pointer',height:"25px",width:'20px',color:'blue'}}/></>}
    ];

    const onSubmit = data =>{
        console.log(data);
        setSearchData(data);
        
    }
    const clickDLT=(cellValues)=>{
        console.log(cellValues.id);
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

                fetch(`http://localhost:5000/dltTeacherById/${cellValues.id}`, {
                    method: 'DELETE',
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data){
                        const newStData=teacherData.filter((value)=>{
                            if(value.id!=cellValues.id){
                                return value;
                            }
                            
                        })
                        setTeacherData(newStData);
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
    useEffect(() => {
        fetch("http://localhost:5000/allTeacher")
        .then(res=>res.json())
        .then(data=>{
            let newTeacherData=[];
            console.log(data);
            data.map(dt=>{
                dt.img&&console.log(dt.img.img);
                newTeacherData.push({
                    id:dt._id||0,
                    img:dt.img&&dt.img.img,
                    name:dt.name||dt.firstName+dt.lastName||'failed to fetch',
                    dept:dt.dept||dt.department||"failed to fetch",
                    email:dt.email||"failed to fetch",
                    phone:dt.phone,
                });
            })
            // console.log(studentData);
            setTeacherData(newTeacherData);
        })
    }, []);
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
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={teacherData}
                            columns={collums}
                            pageSize={9}
                            rowsPerPageOptions={[8]}
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