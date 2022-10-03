import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react'


export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState("");
  const [value2, setValue2] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };


  const handleChange2 = (newValue) => {
    setValue2(newValue);
  };

  function saved() {
    alert("This feature hasn't been implemented!");
  }

  //FETCH DATA
  const [driving, setDriving] = useState(20);
  const [driving2, setDriving2] = useState(20);

  const drivingChange = (newValue) => {
    setDriving(newValue);
  };


  const drivingChange2 = (newValue) => {
    setDriving2(newValue);
  };

  useState(() => {
    fetch(process.env.baseURL+'/user/me/schedule', {
        method: "GET",
        headers: {"Id": process.env.user},
      })
      .then((resp) => resp.json())
      .then((datas) => {
        setValue(datas.days[props.index]["arrive"]);
        setValue2(datas.days[props.index]["leave"]);
        setDriving(datas.days[props.index]["driveto"] == "true" ? 10 : 20)
        setDriving2(datas.days[props.index]["drivefrom"] == "true" ? 10 : 20)
      });
  }, [value, value2, driving, driving2])


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <h3>Select your Time</h3>
        <TimePicker
          label="Arrive By"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Leave at"
          value={value2}
          onChange={handleChange2}
          renderInput={(params) => <TextField {...params} />}
        />
        <br />
        <h3>Will you drive to the Office?</h3>
        <FormControl fullWidth>
            <InputLabel>Select</InputLabel>
            <Select
                onChange={drivingChange}
                value={driving}
            >
                <MenuItem value={10}>Yes</MenuItem>
                <MenuItem value={20}>No</MenuItem>
            </Select>
        </FormControl>
        <br />
        <h3>Will you drive back Home?</h3>
        <FormControl fullWidth>
            <InputLabel>Select</InputLabel>
            <Select
                onChange={drivingChange2}
                value={driving2}
            >
                <MenuItem value={10}>Yes</MenuItem>
                <MenuItem value={20}>No</MenuItem>
            </Select>
        </FormControl>
        <br />
        
        <Button variant="contained" endIcon={<SaveIcon />} onClick={saved}>
            Save
        </Button>
        

        
      </Stack>
    </LocalizationProvider>
  );
}
