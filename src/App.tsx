import React from 'react'
import {CreateForms} from './Pages/CreateForms'
import {Provider} from "react-redux";
import {store} from "./Redux/store";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomePage from './Pages/HomePage';
import ViewPage from './Pages/ViewPage';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/:id">
                        <CreateForms/>
                    </Route>
                    <Route exact path="/:id/viewform">
                        <ViewPage/>
                    </Route>
                </Switch>
            </Router>    
        </Provider>
    )
}
