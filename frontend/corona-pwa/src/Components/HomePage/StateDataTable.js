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
            headerName: 'State / UT',
            width: 250,
            editable: false,
            noWrap: true,
            headerClassName: 'super-app-theme--header'

        },
        {
            field: 'active_main',
            headerName: 'Active',
            flex: 1,
            editable: false,
            headerClassName: 'super-app-theme--header',
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
            flex: 1,
            editable: false,
            headerClassName: 'super-app-theme--header',
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
            flex: 0.8,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                let isRed = parseInt(params.value.delta_death) > 0 ? true : false;
                return (
                    <Box
                        sx={{
                            width: {
                                xs: "100%", // theme.breakpoints.up('xs')
                                sm: 600, // theme.breakpoints.up('sm')
                                md: 100, // theme.breakpoints.up('md')
                                lg: 75, // theme.breakpoints.up('lg')
                                xl: 75, // theme.breakpoints.up('xl')
                            },
                        }}
                    >
                        {isRed ?
                            <ArrowUpwardIcon style={{ color: "red", fontSize: 15 }} /> :
                            <ArrowDownwardIcon style={{ color: "green", fontSize: 15 }} />}
                        <Typography color={isRed ? 'red' : 'green'} variant="subtitle3" >
                            {Math.abs(params.value.delta_death)}
                        </Typography>
                        <Typography variant="subtitle1" style={{ htmlFontSize: 18 }}>
                            {formattedNumber(params.value.death)}
                        </Typography>
                    </Box>
                )
            },
            sortComparator: (v1, v2) => v1.death - (v2.death)
        },
    ];
    if (!props.data || props.data.length <= 0) {
        return (<div>Loading...</div>)
    }
    const rows = mapResponseData(props.data);
    return (
        <React.Fragment>
            {/* <Paper sm={{ my: 10, p: 2 }} md={{ my: 10, p: 2 }} lg={{ my: 10, p: 2 }}> */}
            <Box
                sx={{
                    width: {
                        xs: "100%", // theme.breakpoints.up('xs')
                        sm: "100%", // theme.breakpoints.up('sm')
                        md: "100%", // theme.breakpoints.up('md')
                        lg: "100%", // theme.breakpoints.up('lg')
                        xl: "75%", // theme.breakpoints.up('xl')
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: '#a5c7e9',
                    },
                    borderRadius: 5
                }}
            >

                <Title style={{ marginTop: '55px' }} >State Wise Data</Title>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={39}
                    rowHeight={55}
                    disableColumnMenu={true}
                    // rowsPerPageOptions={[5]}
                    autoHeight
                    disableSelectionOnClick
                    hideFooter={true}
                    sx={{
                        boxShadow: 5,
                    }}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'active_main', sort: 'desc' }],
                        },
                    }}
                />
            </Box>
            {/* </Paper> */}
        </React.Fragment>
    );
}

export default StateDataTable;