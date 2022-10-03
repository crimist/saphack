
import * as React from 'react';
import TeamPlanner from "src/views/schedule/TeamPlanner"
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import Table from 'src/views/dashboard/Table';

const Schedule = (props) => {
  return (
    <ApexChartWrapper>
      <Grid container spacing ={6}>
        <Grid item xs={6}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={6}>
          <TeamPlanner />
        </Grid>
      </Grid>
    </ApexChartWrapper>
    )
}



export default Schedule
