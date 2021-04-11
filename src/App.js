import { makeStyles } from '@material-ui/core';
import { Dashboard } from '@material-ui/icons';
import { createContext, useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard/Dashboard';
import Header from './components/Header/Header';



export const contextMenuWidth=createContext();





function App() {
  const [sideMenuWidth,setSideMenuWidth]=useState(70);
  const useStyle=makeStyles(theme=>({
    marginDescription:{
      background: "#f5f5f5",
      border: "5px solid #fff",
      borderRadius: "10px",
      boxShadow: "0 0 16px rgb(41 42 51 / 7%), 0 6px 20px rgb(41 42 51 / 3%)",
      transition:theme.transitions.create(['margin'],{
        duration:'1s',
    }),
    [theme.breakpoints.up('md')]:{
      margin:`47px 20px 0px ${sideMenuWidth+20}px`,
      padding:'10px 20px',

    }
      
  
   },
  }))
  const classes=useStyle();
  return (
    <contextMenuWidth.Provider value={[sideMenuWidth,setSideMenuWidth]}>
      <Header></Header>
      <div className={classes.marginDescription}>
        <DashBoard></DashBoard>
        
        
      </div>
    </ contextMenuWidth.Provider>
  );
}

export default App;
