import { Button, Grid ,makeStyles} from '@material-ui/core';
import React, { useState } from 'react';
import login from '../../image/login.jpg'
import ciuLogo from '../../image/ciuLogo.png';
import { useForm } from "react-hook-form";
import { FaUserCircle} from 'react-icons/fa';
import {BsPersonBoundingBox} from 'react-icons/bs';
import {AiFillLock} from 'react-icons/ai';
import {MdAssignmentTurnedIn} from 'react-icons/md';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import {
    Link
  } from "react-router-dom";
import firebaseConfig from '../firebase.config';

const useStyles=makeStyles(theme=>({
    cardLogIn:{
        width:'60%',
        borderRadius: '10px',
        background:' #f5f5f5',
        border: '5px solid #fff',
        boxShadow: '0 0 16px rgb(41 42 51 / 6%), 0 6px 20px rgb(41 42 51 / 2%)',
        padding:'15px',
    },
    logInHeader:{
        textAlign:'center',
    },
    logInBody:{
        textAlign:'center',
        paddingTop:"30px",
        fontWeight:'600',
        '& a':{
            textDecoration:'none',
            color:'#0c7ce6',
            '&:hover':{
                color:'#070764',
            },
        }

    },
    loginBtn:{
        width:"100%",
        background:'#0c7ce6',
        '&:hover':{
            background:'#070764'
        }
    },

    inputGroup:{
        border:'2px solid lightgrey',
        borderRadius:'5px',
        width:'100%',
        height:'35px',
        marginBottom:'20px',
        display:"flex",
        ["& input"]:{
            width:'100%',
            border:'none',
            height:'100%',
            
        },
    },
    inputField:{
        height:'100%',
        width:'92%',
        borderRight:"2px solid lightgrey",
        
        
    },
    inputIcon:{
        width:"35px",
        fontSize:'20px',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }
    

}));

const app = initializeApp(firebaseConfig);

const Login = () => {
    const classes=useStyles();
    const [createAccount,setCreateAccount]=useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        if(createAccount===true){
            console.log("sign up");
            const {name,email,password,confirmPass}=data;
            console.log(name,email,password,confirmPass);
            
            if(ValidateEmail(email)&&password===confirmPass&&password.toString().length>=6){
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log("USER CREATED");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    // ..
                });


            }
            
        }
        else{
            console.log("log in ");
            const {email,password}=data;
            console.log(email,password);
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }
        function ValidateEmail(mail) 
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
                return (true)
            }
                alert("You have entered an invalid email address!")
                return (false)
            }
    }

    return (
        <div className="d-flex align-items-center" style={{height:"100vh"}}>
            <Grid container>
                <Grid item className="d-flex align-items-center justify-content-center" xs={12} lg={5}>
                       <div className={classes.cardLogIn}>
                       
                            <div className={classes.logInHeader}>
                                <img src={ciuLogo} style={{height:'120px'}} alt="" />
                                <p style={{margin:'0',fontSize:'28px',fontWeight:'bold',color:'rgb(1 1 86)'}}>{!createAccount?"Login":"Sign UP"}</p>
                            </div>
                            <div className={classes.logInBody}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                {createAccount && 
                                    <div className={classes.inputGroup}>
                                        <div className={classes.inputField}>
                                            <input placeholder=" Name" {...register("name", { required: true })} />
                                            {/* errors will return when field validation fails  */}
                                            {errors.name && <span>This field is required</span>}
                                        </div>
                                        <div className={classes.inputIcon}>
                                          <BsPersonBoundingBox className={classes.inputIcon}/>
                                        </div>  
                                    </div>}

                                    <div className={classes.inputGroup}>
                                        <div className={classes.inputField}>
                                            <input placeholder=" Email" {...register("email", { required: true })} />
                                            {/* errors will return when field validation fails  */}
                                            {errors.userName && <span>This field is required</span>}
                                        </div>
                                        <div className={classes.inputIcon}>
                                            <FaUserCircle className={classes.inputIcon}/>
                                        </div>
                                    </div>

                                    <div className={classes.inputGroup}>
                                        <div className={classes.inputField}>
                                            <input type="password" placeholder=" Password" {...register("password", { required: true })} />
                                            {/* errors will return when field validation fails  */}
                                            {errors.password && <span>This field is required</span>}
                                        </div>
                                        <div className={classes.inputIcon}>
                                            <AiFillLock className={classes.inputIcon}/>
                                        </div>
                                    </div>
                                    {createAccount && 
                                    <div className={classes.inputGroup}>
                                        <div className={"d-flex",classes.inputField}>
                                            <input type="password"  placeholder=" Confirm Password" {...register("confirmPass", { required: true })} />
                                            {/* errors will return when field validation fails  */}
                                            {errors.confirmPass && <span>This field is required</span>}
                                        </div>
                                        <div className={classes.inputIcon}>
                                            <MdAssignmentTurnedIn className={classes.inputIcon}/>
                                        </div>
                                    </div>}
                                    
                                    <Button type="submit" variant="contained"className={classes.loginBtn} size="small" color="secondary">
                                        Submit
                                    </Button>
                                   {!createAccount && <p><br /> Do not have account?<Link onClick={()=>{setCreateAccount(true)}}>Create Account</Link></p>}
                                   {createAccount && <p>Already have account?<Link onClick={()=>{setCreateAccount(false)}}>Log In</Link></p>}
                                    </form>
                                </div>
                                

                        </div>
                    
                </Grid>
                <Grid item xs={12} lg={6} >
                    
                    <img src={login} className="img-fluid" alt="" />
                
                    
                </Grid>

            </Grid>     
        </div>
        
           
        
    );
};

export default Login;