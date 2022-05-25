import React, {useState} from 'react';
import {Calendar,dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse"
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from "react-datepicker";
import enUS from 'date-fns/locale/en-US';





const locales={
  "en-US": enUS
}

const localizer=dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events=[
  {
    title:"meeting",
    allDay:true,
    start: new Date(2022,6,25),
    end: new Date(2022,6,27),
  },
  {
    title:"Vacation",
    start: new Date(2022,6,0),
    end: new Date(2022,6,0),
  },
  {
    title:"Conference",
    start:new Date(2022,6,0),
    end:new Date(2022,6,0),
  },
]

export default function CiuCalendar() {
  return <div>
    <Calendar localizer={localizer} 
      events={events}
      startAccessor="start" 
      endAccessor="end"
      style={{height:500,margin:"50px"}}
    />
  </div>;
}
