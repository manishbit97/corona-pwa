import * as React from 'react';
import Box from '@mui/material/Box';
import IndiaMap from '../IndiaMap';

function AboutUs(props){
    return (
        <Box
        sx={{
            minHeight: 400,
        }}
        >
            This is about us component
            <IndiaMap />
        </Box>
    )
}
export default AboutUs;