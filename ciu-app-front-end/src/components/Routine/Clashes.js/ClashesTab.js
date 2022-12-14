import { Box, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import ClashesInParticularSlots from './ClashesInParticularSlots'

function ClashesTab(props) {
    const [value, setValue] = React.useState('stClash');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
    <Box sx={{ width: '100%' }}> 
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="stClash" label="Alter Batch"/>
                        <Tab value="teacherClash" label="Add Rooms" />
                        
                    </Tabs>
                </Box> 
                <hr></hr>
                {value==="stClash"&&<ClashesInParticularSlots slot={props.slot} data={props.data}/>}</div>
  )
}

export default ClashesTab