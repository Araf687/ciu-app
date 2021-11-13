// /* eslint-disable no-underscore-dangle */
// import React from "react";
// import TextField from "@material-ui/core/TextField";
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

// export default function DatePickersVariants(demoProps) {
//   const [value, setValue] = React.useState({});

//   return (
//     <React.Fragment>
//       <DesktopDatePicker
//         label="For desktop"
//         value={value}
//         minDate={new Date("2017-01-01")}
//         onChange={(newValue) => setValue(newValue)}
//         renderInput={(props) => <TextField {...props} />}
//       />
//     </React.Fragment>
//   );
// }
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState({});

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          variant="standard-search"
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
       />
    </LocalizationProvider>
  );
}
