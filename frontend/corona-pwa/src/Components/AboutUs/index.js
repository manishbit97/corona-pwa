import * as React from 'react';
import Box from '@mui/material/Box';
import IndiaMap from '../IndiaMap';
import Typography from '@mui/material/Typography';

function AboutUs(props) {
    return (
        <Box
            sx={{
                minHeight: 400,
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                About Us - Corona PWA tracker
            </Typography>
            The data shown here is sourced from mohfw.gov.in. <br />We do not verify the sources and corectness of the data.
            The data sourced from govt website is highly optimised for performance.
            <br /><br />This is completely for educational purposes and for non commercial use.
            {/* <IndiaMap /> */}
            <br/><br /><br />
            <Typography component="h4" variant="h7" color="text.secondary" gutterBottom>
                CodeBase :  <a href="https://github.com/manishbit97/corona-pwa" target="_blank">Gihub Link </a>
            </Typography>


        </Box>
    )
}
export default AboutUs;