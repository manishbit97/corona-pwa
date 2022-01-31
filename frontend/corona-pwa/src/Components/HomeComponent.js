import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TopSummary, StateDataTable,VaccineSummary } from './HomePage';
import { useEffect, useState } from 'react';
import { getList } from '../Services/coronaService';
import Box from '@mui/material/Box';

function HomeComponent() {
    const [apiRes, setApiRes] = useState({});
    useEffect(() => {
        getList().then((data) => {
            setApiRes(data);
        })
    }, [])
    if (!apiRes || !apiRes.all_data) {
        return (<div>Loading....</div>)
    }
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <TopSummary data={apiRes.all_data} other_info={apiRes.scrap_data} />
            <VaccineSummary other_info={apiRes.scrap_data} />
            <Box mt={5}>
                <StateDataTable data={apiRes.all_data} />
            </Box>
        </div>
    );
}

export default HomeComponent;


{/* <Grid container spacing={3}>
            Chart
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart />
                </Paper>
            </Grid>
            Recent Deposits
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <TopSummary />
                </Paper>
            </Grid>
            Recent Orders
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid> */}