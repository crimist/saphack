import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WeeklyForm from '../../views/schedule/WeeklyForm'
import { useState } from 'react'



function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

const WeeklyOverview = () => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Card>
        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <h1>Schedule your Ride!</h1>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Monday" {...a11yProps(0)} />
                <Tab label="Tuesday" {...a11yProps(1)} />
                <Tab label="Wednesday" {...a11yProps(2)} />
                <Tab label="Thursday" {...a11yProps(3)} />
                <Tab label="Friday" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <WeeklyForm index={0}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WeeklyForm index={1}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <WeeklyForm index={2}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <WeeklyForm index={3}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <WeeklyForm index={4}/>
            </TabPanel>
          </Box>
      </CardContent>
    </Card>
  
    )

  }
  
  export default WeeklyOverview
  