import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import Provider from "./Provider";
import ProviderDetail from "./ProviderDetail";

const ProviderRouting = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <ProviderDetail/>
            </Route>
            <Route path="/" component={Provider}/>
        </Switch>
    );
};

export default ProviderRouting;