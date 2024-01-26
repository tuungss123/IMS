import React from 'react'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

function MenuPage() {
  return (
    <Box sx={{
        flexGrow: 1,
        }}
    >   
        <Grid container spacing={2} alignItems={'center'}>
            <Grid xs={7} container>
                <Grid xs={12}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={3}>
                    <Paper>xs=12</Paper>
                </Grid>
            </Grid>
            <Grid xs={5} container direction={'column'} alignItems={'center'}>
                <Grid item xs={10}>
                    <Paper sx={{height:"50vh"}}>
                        xs=3
                    </Paper>
                </Grid>
                <Grid xs={10}>
                    <Paper>xs=3</Paper>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default MenuPage;