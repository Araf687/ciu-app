import { Button } from '@mui/material';
import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import RoutineSlide from './RoutineSlide';
function RoutineSlider() {
  const [customize,setCustomize]=useState();
  const [confirm,setConfirm]=useState()
    const handleDragStart = (e) => e.preventDefault();
    const items = [
        <RoutineSlide day={'Saturday/Tuesday'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
        <RoutineSlide day={'Monday/WednesDay'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
        <RoutineSlide day={'Thursday'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
        ]
  return (
    <div>
        <AliceCarousel mouseTracking items={items} />
        <div>
          <Button variant="contained" size="small">
            Customize
          </Button>
        </div>
    </div>
  )
}

export default RoutineSlider