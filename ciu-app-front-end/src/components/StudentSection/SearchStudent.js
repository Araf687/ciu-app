import React, { PureComponent, useState } from 'react';
import { makeStyles} from '@material-ui/core';
import InputBase from '@mui/material/InputBase';
import {FcSearch} from "react-icons/fc";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import StudentProfile from './StudentProfile';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const useStyles=makeStyles(theme=>({
    searchSection:{
        display:"flex",
        backgroundColor:'#5ccb8d',
        borderRadius:'6px',
        border:'2px solid #35bd72',
        padding:'10px'

    },
    searchBar:{
        // position: 'relative',
        
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        border:'none',
        
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        '&:focus':{
            border:'2px solid red'
        },
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
}))
const SearchStudent=()=>{
    const classes=useStyles();
    const [studentData,setSudentData]=useState();
    const handleSearch=()=>{
        const x=document.getElementById('search').value;
        console.log(typeof(x));

        fetch(`http://localhost:5000/searchStudentById/${x}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setSudentData(data);
        })
        .catch(err=>{console.log(err)})
    }
    return (
      <div>
        <div className={classes.breadcumbs}> 
            <div>
                <h2>Search Student</h2>
                <span><Link to="/dashboard">Dashboard</Link> / Search Student</span>
            </div>
        </div>
          <section className={classes.searchSection}>
            <Search style={{width:'90%'}}> 
                <SearchIconWrapper>
                    <FcSearch />
                </SearchIconWrapper>
                <input
                id='search'
                style={{width:'100%',fontWeight:'700',color:'#060c5a',height:'39px',marginLeft:'0px',paddingLeft:'2.1rem'}}
                className={classes.searchBar}
                onFocus={()=>{document.getElementById('search').style.border = "none"; }}
                placeholder='Search By Id...'
                 ></input>
            </Search>
            <Button variant="contained" size="medium" onClick={()=>{handleSearch()}} style={{margin:"2px",backgroundColor:'#091176e3'}}>
                Search
            </Button>
        </section>
        <section>
            {studentData &&<StudentProfile data={studentData}></StudentProfile>}
        </section>
      </div>
    )
  }
export default SearchStudent;
