import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { useState } from 'react'
import Alert from '@mui/material/Alert';



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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //FETCH DATA
  const [data, setData] = useState();

  useState(() => {
    fetch(process.env.baseURL+'/user/me/schedule/team', {
        method: "GET",
        headers: {"Id": process.env.user},
      })
      .then((resp) => resp.json())
      .then((datas) => {
        setData(datas);
      });
  }, [data])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card>
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <h1>{data?.currentUser + ", your s" || "S"}chedule for the Week</h1>
            <Alert severity="info">You can click on your team members to see what time they arrive to the office</Alert>
          <br />
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
              <Chip avatar={<Avatar>L</Avatar>} label="Leo Jung" color='primary' onClick={handleClick} />
              <br />
              <br />
              {(data?.users[0] || []).map((name, number) => {
                return (<> 
                  <Chip avatar={<Avatar>{name[0]}</Avatar>} label={name} color={name === "Jorden Montes" ? 'secondary' : 'primary'} onClick={handleClick} />
                          <br />
                          <br />
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                          >
                            <Typography sx={{ p: 2 }}>{data.times[0][number]}</Typography>
                          </Popover>
                        </>)
                        })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Chip avatar={<Avatar>L</Avatar>} label="Leo Jung" color='secondary' onClick={handleClick} />
            <br />
            <br />
            {(data?.users[1] || []).map((name, number) => {
                console.log(data.times[1][number])
                return (<>
                  <Chip avatar={<Avatar>{name[0]}</Avatar>} label={name} color={name === "Jorden Montes" ? 'secondary' : 'primary'} onClick={handleClick} />
                          <br />
                          <br />
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                          >
                            <Typography sx={{ p: 2 }}>{data.times[1][number]}</Typography>
                          </Popover>
                          
                </>)
              })}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {(data?.users[2] || []).map((name, number) => {
                  return (<>
                    <Chip avatar={<Avatar>{name[0]}</Avatar>} label={name} color={name === "Jorden Montes" ? 'secondary' : 'primary'} onClick={handleClick} />
                            <br />
                            <br />
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                            >
                              <Typography sx={{ p: 2 }}>{data.times[2][number]}</Typography>
                            </Popover>
                            
                  </>)
                })}
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Chip avatar={<Avatar>L</Avatar>} label="Leo Jung" color='secondary' onClick={handleClick} />
            <br />
            <br />
            {(data?.users[3] || []).map((name, number) => {
                    return (<>
                      <Chip avatar={<Avatar>{name[0]}</Avatar>} label={name} color={name === "Jorden Montes" ? 'secondary' : 'primary'} onClick={handleClick} />
                              <br />
                              <br />
                              <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
                              >
                                <Typography sx={{ p: 2 }}>{data.times[3][number]}</Typography>
                              </Popover>
                              
                    </>)
                  })}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {(data?.users[4] || []).map((name, number) => {
                      return (<>
                                
                        <Chip avatar={<Avatar>{name[0]}</Avatar>} label={name} color={name === "Jorden Montes" ? 'secondary' : 'primary'} onClick={handleClick} />
                                <br />
                                <br />
                                <Popover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  }}
                                >
                                  <Typography sx={{ p: 2 }}>{data.times[4][number]}</Typography>
                                </Popover>
                                
                      </>)
                    })}
          </TabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}
