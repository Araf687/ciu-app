import { Grid, makeStyles, Paper } from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";
import { DataGrid} from '@mui/x-data-grid';

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
    studentList:{
        border:"1px solid #e5e4e4",
        borderRadius:"7px",
        padding:"5px",
        height:"700px"

    },

})) 
const AllUsers=()=>{
    const classes=useStyles();
    const [userData, setUserData] = useState([]);

    const collums=[
        {field:'profile', headerName:'Profile ',width:"150"},
        {field:'id', headerName:'Email Id',width:"250"},
        {field:'name', headerName:'Name',width:"250"},
        {field:'role', headerName:'User Role',width:"200"},
        {field:"action", headerName:'Actions',sortable:"false",renderCell:(cv)=> <><AiOutlineDelete style={{height:"35px",margin:"0px 10px",width:'25px',color:'red'}} onClick={()=>{clickDLT(cv.row)}}/> <BsPencilSquare style={{height:"25px",width:'20px',color:'blue'}}/></>}
    ];
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
                const newStData=userData.filter((value)=>{
                    if(value.name!=cellValues.name){
                        return value;
                    }
                    
                })
            //  setUserData(newStData);
            swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
        
    }
    useEffect(() => {
        fetch("http://localhost:5000/allUsers")
        .then(res=>res.json())
        .then(data=>{
            data.map(dt=>{
                dt['id']=dt['_id'];
            })
            console.log(data);
            setUserData(data);
        })
    }, []);
    return (
        <section>
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.breadcumbs}>
                    <h2>All Users</h2>
                    <span><Link to="/dashboard">Dashboard</Link> / All Users</span> 
                </div>
            </Grid>
            <Paper className={classes.paper}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={userData}
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
}
export default AllUsers;