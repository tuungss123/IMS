import React from "react";
import { Container, Grid, Paper } from "@mui/material";

const HomePage = () => {
    return (
        <Container>
            <h1>Cafe Juan</h1>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper sx={{height:"90vh"}}>
                        1
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{height:"44vh"}}>
                                2
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{height:"44vh"}}>
                                3
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default HomePage;
