// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState } from 'react';
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import TotalEarning from 'src/views/driver-dash/TotalEarning'
import StatisticsCard from 'src/views/driver-dash/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import Map from "src/views/driver-dash/Map";

const data  = [
  {
    driver:true
  }
]

const DriverDash = (props) => {

  //const [data, setData] = useState();
  const [passenger, setPassengers] = useState();


  useState(() => {
    fetch(process.env.baseURL+'/user/me/dashboard', {
        method: "GET",
        headers: {"Id": process.env.user},
      })
      .then((resp) => resp.json())
      .then((datas) => {
        //setData(datas);
        setPassengers(data["members"])
      });
  }, [passenger])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={4}>
          {data[0].driver ? <Map /> : null}
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <TotalEarning />
        </Grid>
        
        <Grid item xs={12} md={6} lg={7}>
          <SalesByCountries passengers={passenger}/>
        </Grid>
        
        
      </Grid>
    </ApexChartWrapper>
  )
}

export default DriverDash

