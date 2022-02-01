import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Corona-pwa tracker
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            <Typography component="h4" variant="h7" color="text.secondary" gutterBottom>
                Designed and Developed by <a href="http://linkedin.com/in/manishbit97" target="_blank">Manish Kumar </a>
            </Typography>
        </Typography>
    );
}

export default Copyright;
