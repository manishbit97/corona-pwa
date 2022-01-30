import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Link } from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/State Data">
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="State Data" />
        </ListItem>
        <ListItem button component={Link} to="/About">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/Blog">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button component={Link} to="/Contact us">
            <ListItemIcon>
                <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Contact us" />
        </ListItem>
    </div>
);

export default mainListItems;