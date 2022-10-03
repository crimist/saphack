// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  // ** Var

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography style={{color: '#B2BEB5'}} sx={{ mr: 2 }}>
        Made for SAP Hackathon Materio and Material UI (Demo)
      </Typography>
      
    </Box>
  )
}

export default FooterContent
