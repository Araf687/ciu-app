import React from 'react';
import CourseWIseRow from './CourseWIseRow';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Button} from '@mui/material';

const CourseWiseList=(props)=> {
    const data=props.data;
    console.log(data);
    let i=0;
    return (
      <div>
        <div>
            <Button size='small' onClick={()=>{props.state(false)}} variant="contained"><KeyboardBackspaceIcon></KeyboardBackspaceIcon></Button>   
          </div>
        {
          data.map(dt=><CourseWIseRow inc={++i} data={dt}></CourseWIseRow>)
        }
      </div>
    )
  }
export default CourseWiseList;