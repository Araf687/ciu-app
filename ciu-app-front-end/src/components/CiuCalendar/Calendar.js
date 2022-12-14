import React, {useState} from 'react';
import {Calendar,dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse"
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Toolbar from 'react-big-calendar';
import DatePicker from "react-datepicker";
import enUS from 'date-fns/locale/en-US';
import { Grid, makeStyles} from '@material-ui/core';
import {FcNext,FcPrevious} from "react-icons/fc";
import {ImCalendar} from 'react-icons/im';
const locales={
  "en-US": require("date-fns/locale/en-US")
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
    description:'',
    querryKey:'',
    allDay:true,
    start: new Date(2022,5,0),
    end: new Date(2022,5,0),
  },
  {
    title:"Vacation jhjjjjjjjjjjjjhhh",
    description:'',
    querryKey:'',
    start: new Date(2022,5,7),
    end: new Date(2022,5,7),
  },
  {
    title:"Conference",
    description:'asba',
    querryKey:'',
    start:new Date(2022,5,20),
    end:new Date(2022,5,23),
  },
]

export default function CiuCalendar(props) {
  const [calEvents,seCalEvents]=useState(props.calData);
  const xh=(event) =>{
    console.log("done"+event.title,event.description);
    const slotSTyle={background:'#182a6c'}
    return {style:slotSTyle};
  }
  
  return <div>
    <Calendar localizer={localizer} 
      events={events}
      startAccessor="start" 
      endAccessor="end"
      components = {{toolbar : CustomToolbar}}
      style={{height:500,margin:"50px"}}
      eventPropGetter={xh}
    />
  </div>;
}
class CustomToolbar extends React.Component {
  render() {
    const StyleCalenderHeading={background: '#070764',
      padding: '4px',
      borderRadius:'4px',
      textAlign: 'center',
      fontSize:'20px',
      fontWeight:600,
      color:'white'
    }
    return (
      <Grid container className='rbc-toolbar'>
        <Grid item xs={12} lg={12}>
            <p style={StyleCalenderHeading}><ImCalendar/><span style={{marginLeft:'10px'}}>Ciu Calender</span></p>
        </Grid>
        <Grid item lg={5} xs={12}>
          <span className="rbc-btn-group">
            <button type="button" onClick={() => this.navigate('PREV')}><FcPrevious/></button>
            <button type="button" onClick={() => this.navigate('TODAY')} >Today</button>
            <button type="button" onClick={() => this.navigate('NEXT')}><FcNext/></button>
          </span>
        </Grid>
        <Grid item lg={3} xs={12}>
          <span className="rbc-toolbar-label" style={{paddingLeft:'20px',fontWeight:'600'}}>{this.props.label}</span>
        </Grid>
        <Grid item lg={4} xs={12}>
          <span className="rbc-btn-group" style={{float:'right'}}>
            <button type="button" onClick={() => this.views('month')}>Month</button>
            <button type="button" onClick={() => this.views('week')} >Week</button>
            <button type="button" onClick={() => this.views('day')}>day</button>
            <button type="button" onClick={() => this.views('day')}>agenda</button>
          </span>
        </Grid>


      </Grid>
    );
  }
  navigate = action => {
    console.log(action);
    this.props.onNavigate(action)
  }
  views= action =>{
    console.log(action)
    this.props.onView(action)
  }

}