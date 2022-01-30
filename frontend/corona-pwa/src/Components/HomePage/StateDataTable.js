import * as React from 'react';
import Title from '../Common/Title'
import { spacing } from '@mui/system';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formattedNumber } from '../../Utils';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const mapResponseData = (data) => {
    var filtered = data.filter(function (stateD) {
        return stateD.sno < 1000;
    });
    let newData = filtered.map((state) => {
        state['active'] = parseInt(state['new_active']);
        state['cured'] = parseInt(state['new_cured']);
        state['death'] = parseInt(state['new_death']);
        state['delta_death'] = parseInt(state['delta_death']);
        state['delta_cured'] = parseInt(state['delta_cured']);
        state['delta_active'] = parseInt(state['delta_active']);
        state['id'] = state['sno'];
        state['active_main'] = { 'delta_active': state['delta_active'], 'active': state['active'] };
        state['cured_main'] = { 'delta_cured': state['delta_cured'], 'cured': state['cured'] };
        state['death_main'] = { 'delta_death': state['delta_death'], 'death': state['death'] };
        return state;
    })
    return newData;

}


function StateDataTable(props) {
    const columns = [
        { field: 'id', headerName: 'S.no', width: 70 },
        {
            field: 'state_name',
            headerName: 'Name of State / UT',
            width: 300,
            editable: false,
            noWrap: true
        },
        {
            field: 'active_main',
            headerName: 'Active',
            width: 210,
            editable: false,
            renderCell: (params) => {
                let isRed = parseInt(params.value.delta_active) > 0 ? true : false;
                return (
                    <div>
                        {isRed ?
                            <ArrowUpwardIcon style={{ color: "red", fontSize: 15 }} /> :
                            <ArrowDownwardIcon fontSize="small" style={{ color: "green", fontSize: 15 }} />}
                        <Typography color={isRed ? 'red' : 'green'} align="right" variant="subtitle3" >
                            {Math.abs(params.value.delta_active)}
                        </Typography>
                        <Typography variant="subtitle1" align="right" >
                            {formattedNumber(params.value.active)}
                        </Typography>
                    </div>
                )
            },
            sortComparator: (v1, v2) => v1.active - (v2.active)
        },
        {
            field: 'cured_main',
            headerName: 'Recovered',
            width: 210,
            editable: false,
            renderCell: (params) => {
                let isRed = parseInt(params.value.delta_cured) > 0 ? false : true;
                return (
                    <div style={{ align: "right" }}>
                        {isRed ?
                            <ArrowDownwardIcon style={{ color: "red", fontSize: 15 }} /> :
                            <ArrowUpwardIcon style={{ color: "green", fontSize: 15 }} />}
                        <Typography color={isRed ? 'red' : 'green'} variant="subtitle3" >
                            {Math.abs(params.value.delta_cured)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {formattedNumber(params.value.cured)}
                        </Typography>
                    </div>
                )
            },
            sortComparator: (v1, v2) => v1.cured - (v2.cured)
        },
        {
            field: 'death_main',
            headerName: 'Death',
            width: 210,
            editable: false,
            renderCell: (params) => {
                let isRed = parseInt(params.value.delta_death) > 0 ? true : false;
                return (
                    <div>
                        {isRed ?
                            <ArrowUpwardIcon style={{ color: "red", fontSize: 15 }} /> :
                            <ArrowDownwardIcon style={{ color: "green", fontSize: 15 }} />}
                        <Typography color={isRed ? 'red' : 'green'} variant="subtitle3" >
                            {Math.abs(params.value.delta_death)}
                        </Typography>
                        <Typography variant="subtitle1" style={{ htmlFontSize: 18 }}>
                            {formattedNumber(params.value.death)}
                        </Typography>
                    </div>
                )
            },
            sortComparator: (v1, v2) => v1.death - (v2.death)
        },
    ];
    const rows = mapResponseData(props.data);
    return (
        <React.Fragment>
            {/* <Paper sm={{ my: 10, p: 2 }} md={{ my: 10, p: 2 }} lg={{ my: 10, p: 2 }}> */}
            <div style={{ height: '100%', width: '90%' }} >

                <Title style={{ marginTop: '55px' }} >State Wise Data</Title>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={39}
                    rowHeight={70}
                    // rowsPerPageOptions={[5]}
                    autoHeight
                    disableSelectionOnClick
                    hideFooter={true}
                />
            </div>
            {/* </Paper> */}
        </React.Fragment>
    );
}

export default StateDataTable;