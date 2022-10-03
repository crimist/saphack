// ** MUI Imports
import { useState } from 'react'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import MasksIcon from '@mui/icons-material/Masks';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import BusinessIcon from '@mui/icons-material/Business';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const data = 
  {
    eta: '9:52',
    pickup: '9:12',
    people: '3',
    mask: 'Masks Required',
    title: 'Leave at',
  }

const TotalEarning = () => {
  const [arrive, setArrive] = useState("");
  const [leave, setLeave] = useState("");
  const [mask, setMask] = useState("");
  const [passengers, setPassengers] = useState("");

  useState(() => {
    fetch(process.env.baseURL+'/user/me/dashboard', {
        method: "GET",
        headers: {"Id": process.env.user},
      })
      .then((resp) => resp.json())
      .then((datas) => {
        setArrive(datas["tripinfo"]["arrive"])
        setLeave(datas["tripinfo"]["leave"])
        setMask(datas["tripinfo"]["mask"] == "true" ? "Yes" : "No")
        setPassengers(datas["tripinfo"]["passengers"])
      });
  }, [passengers, mask, leave, arrive])


  return (
    <Card>
      <CardHeader
        title="Today's Commute"
        titleTypographyProps={{ sx: { lineHeight: '2 !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={arrive}
                color='primary.main'
                title='At SAP by'
                icon={<BusinessIcon />}

              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                  stats={leave}
                  color='orange'
                  title={data.title}
                  icon={<BusAlertIcon />}
                />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                  color={mask === "Yes" ? 'red' : 'green'} 
                  title="Are masked required?"
                  icon={<MasksIcon />}
                  stats={mask}
                />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                  stats={passengers}
                  color='primary.main'
                  title="Passengers"
                  icon={<EmojiPeopleIcon />}
                />
            </Grid>
          </Grid>

      </CardContent>

      <br />  
    </Card>
  )
}

export default TotalEarning
