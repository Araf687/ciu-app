import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import RoutineSlide from './RoutineSlide';
function RoutineSlider(props) {
  const [customize,setCustomize]=useState();
  const [confirm,setConfirm]=useState();
  const handleDragStart = (e) => e.preventDefault();
 

  const items = [
      <RoutineSlide changeOfferdCourse={props.changeOfferdCourse} day={'Saturday/Tuesday'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
      <RoutineSlide changeOfferdCourse={props.changeOfferdCourse} day={'Monday/WednesDay'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
      <RoutineSlide changeOfferdCourse={props.changeOfferdCourse} day={'Thursday'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
    ]

  return (
    <div>
        <AliceCarousel items={items} />
        <div style={{textAlign:'center'}}>
          <Button variant="contained" size="small">
            Customize
          </Button>
        </div>
    </div>
  )
}

export default RoutineSlider