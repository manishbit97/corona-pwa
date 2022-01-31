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
function TopSummary(props) {
    let indiaObj = props.data ? props.data.find((ele) => ele.sno == "11111") : {};
    let active = indiaObj ? (indiaObj.new_active) : 0;
    let recovered = indiaObj ? (indiaObj.new_cured) : 0;
    let death = indiaObj ? (indiaObj.new_death) : 0;
    let delta_active = indiaObj ? (indiaObj.delta_active) : 0;
    let delta_cured = indiaObj ? (indiaObj.delta_cured) : 0;
    let delta_death = indiaObj ? (indiaObj.delta_death) : 0;
    return (
        <React.Fragment>
            {/* <img height="100px" width="100px" src="https://www.learningcontainer.com/wp-content/uploads/2020/08/Small-Sample-png-Image-File-Download.jpg" /> */}
            <Typography color="text.primary" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                {props.other_info &&
                    <span>Last updated at : {props.other_info.time}</span>
                }
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 150,
                        }}
                    >
                        <Card title={"Active"}
                            delta={delta_active}
                            number={active}
                            isUp={delta_active > 0 ? true : false}
                            isRed={delta_active < 0 ? true : false}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 150,
                        }}
                    >
                        <Card title={"Recovered"}
                            delta={delta_cured}
                            number={recovered}
                            isUp={delta_cured > 0 ? true : false}
                            isRed={delta_cured < 0 ? true : false}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 150,
                        }}
                    >
                        <Card title={"Deceased"}
                            delta={delta_death}
                            number={death}
                            isUp={delta_death > 0 ? true : false}
                            isRed={delta_death > 0 ? true : false}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default TopSummary;