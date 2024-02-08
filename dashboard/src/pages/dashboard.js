import { Typography } from '@mui/material'
import React from 'react'
import Sidebar from './sidebar'
import './dashboard.css'

const dashboard = () => {
  return (
    <div id='container'>

    <Sidebar />
    
      <Typography variant='h3' id='title'>
        Welcome to Saint Mary's University
      </Typography>
    </div>
  )
}

export default dashboard
