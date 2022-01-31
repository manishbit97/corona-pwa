import { Route, Switch } from "react-router-dom";
import HomeComponent from '../Components/HomeComponent';
import AboutUs from '../Components/AboutUs';
import * as React from 'react';

function routes() {
    return (
        <Switch>
            <Route exact path="/"><HomeComponent /></Route>
            <Route path="/about"><AboutUs /></Route>
            <Route path="/products"><div>I am priducts</div></Route>
            <Route path="*">404 page not found</Route>
        </Switch>
    )
}

export default routes;