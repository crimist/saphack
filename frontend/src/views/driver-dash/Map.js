import { useState } from 'react';
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import RouteIcon from '@mui/icons-material/Route';

const TotalEarning = () => {
  const [mapper, setMapper] = useState("");

  useState(() => {
    fetch(process.env.baseURL+'/user/me/dashboard', {
        method: "GET",
        headers: {"Id": process.env.user},
      })
      .then((resp) => resp.json())
      .then((datas) => {
        setMapper(datas["url"])
      });
  }, [mapper])

  return (
    <Card>
      <CardHeader
        title="Directions"
        titleTypographyProps={{ sx: { lineHeight: '2 !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
            <Link href={mapper}>
              <Button variant="contained" endIcon={<RouteIcon />}>Open today's Route</Button>
            </Link>
      </CardContent>

      <br />  
    </Card>
  )
}

export default TotalEarning
