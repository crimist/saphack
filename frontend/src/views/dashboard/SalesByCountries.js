// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'
// ** Icons Imports
const data = [
  {
    sales: 'Driver',
    subtitle: 'Data & Analytics',
    title: 'Leo Jung',
    avatarText: 'LJ',
    avatarColor: 'error',
  },
  {
    sales: 'Passenger',
    subtitle: 'Data & Analytics',
    title: 'Taniyah Rocha',
    avatarText: 'TR',
    avatarColor: 'success',
  },{
    sales: 'Passenger',
    subtitle: 'Penetration Tester',
    title: 'Xavier Briggs',
    avatarText: 'XB',
    avatarColor: 'success',
  },{
    sales: 'Passenger',
    subtitle: 'Management',
    title: 'Jorden Montes',
    avatarText: 'NS',
    avatarColor: 'success',
  }
]

const SalesByCountries = (props) => {
  //FETCH DATA
  //const [data, setData] = useState();
  const [passenger, setPassengers] = useState([]);


  useState(() => {
    fetch(process.env.baseURL+'/user/me/dashboard', {
        method: "GET",
        headers: {"Id": process.env.user},
      })
      .then((resp) => resp.json())
      .then((datas) => {
        setPassengers(datas["members"])
      });
  }, [passenger])

  // == - ==
  return (
    <Card>
      <CardHeader
        title='Members on Trip'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {(passenger ? passenger : []).map((name, number) => {

          console.log("Burp =>", name)
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(number !== passenger.length - 1 ? { mb: 5.875 } : {})
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `${data[number].avatarColor}.main`
                }}
              >
                {name[0]}
              </Avatar>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}>{name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {data[number].trend}
                      <Typography
                        variant='caption'
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.5,
                          color: data[number].trendDir === 'down' ? 'error.main' : 'success.main'
                        }}
                      >
                        {data[number].trendNumber}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    {data[number].subtitle}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    {data[number].sales}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
    
  )
}

export default SalesByCountries
