import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../Common/Title'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { formattedNumber } from '../../Utils';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Card(props) {
    console.log(props);
    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Typography component="p" variant="h4">
                {formattedNumber(props.number)}
            </Typography>
            <div>
                {props.isUp ?
                    <ArrowUpwardIcon style={{ color: props.isRed ? "red" : "green", fontSize: 15 }} /> :
                    <ArrowDownwardIcon style={{ color: props.isRed ? "red" : "green", fontSize: 15 }} />
                }
                <Typography color={props.isRed ? "red" : "green"} variant="subtitle3" >
                    {formattedNumber(Math.abs(parseInt(props.delta)))}
                </Typography>
            </div>
        </React.Fragment>
    );
}
function VaccineSummary(props) {
    return (
        <React.Fragment>
            <Typography color="text.secondary" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }} mt={3}>
                {props.other_info &&
                    <span>Vaccination status last updated at : {props.other_info.time}</span>
                }
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 130,
                        }}
                    >
                        {/* <Card title={"Active"}
                            delta={delta_active}
                            number={active}
                            isUp={delta_active > 0 ? true : false}
                            isRed={delta_active < 0 ? true : false}
                        /> */}
                        <Title>Total Vaccination</Title>
                        <div>
                            <Typography component="p" variant="h4">
                                {props.other_info.total_vaccin}
                            </Typography>
                            <ArrowUpwardIcon style={{ color: "green", fontSize: 15 }} />
                            <Typography color={"green"} variant="subtitle3" >
                                {props.other_info.delta_vaccin}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default VaccineSummary;