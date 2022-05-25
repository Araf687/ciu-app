import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Grid } from '@mui/material';
import AllRooms from './AllRooms';



function RoomSlider() {
    const handleDragStart = (e) => e.preventDefault();
    const items = [
        <AllRooms day={'Saturday/Tuesday'} onDragStart={handleDragStart} role="presentation"></AllRooms>,
        <AllRooms day={'Monday/WednesDay'} onDragStart={handleDragStart} role="presentation"></AllRooms>,
        <AllRooms day={'Thursday'} onDragStart={handleDragStart} role="presentation"></AllRooms>,
        ]
  return (
    <div>
        <AliceCarousel mouseTracking items={items} />
    </div>
    
  )
}

export default RoomSlider