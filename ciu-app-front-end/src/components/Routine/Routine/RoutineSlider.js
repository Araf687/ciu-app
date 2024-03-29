import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import RoutineSlide from './RoutineSlide';
function RoutineSlider(props) {
  const handleDragStart = (e) => e.preventDefault();
  const items = [
      <RoutineSlide data={props.data} confirm={props.confirm} changeOfferdCourse={props.changeOfferdCourse} day={'Sunday/Tuesday'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
      <RoutineSlide data={props.data} confirm={props.confirm} changeOfferdCourse={props.changeOfferdCourse} day={'Monday/WednesDay'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
      <RoutineSlide data={props.data} confirm={props.confirm} changeOfferdCourse={props.changeOfferdCourse} day={'Thursday'} onDragStart={handleDragStart} role="presentation"></RoutineSlide>,
    ]

  return (
    <div style={{width:'auto'}}>
        <AliceCarousel items={items} style={{width:'auto'}} />
    </div>
  )
}

export default RoutineSlider