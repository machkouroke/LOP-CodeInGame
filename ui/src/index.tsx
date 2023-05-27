import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import DashboardLayout from './layouts/admin';
import CompetitionLayout from './layouts/competition';
import {ChakraProvider} from '@chakra-ui/react';
import theme from './theme/theme';
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./slices";
import {Provider} from "react-redux";

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['navigation/next', 'navigation/previous'],

            },
        })

})

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <React.StrictMode>
                <BrowserRouter>
                    <Switch>
                        <Route path={`/auth`} component={AuthLayout}/>
                        <Route path={`/dashboard`} component={DashboardLayout}/>
                        <Route path={`/competition`} component={CompetitionLayout}/>
                        <Redirect from='/' to='/dashboard'/>
                    </Switch>
                </BrowserRouter>
            </React.StrictMode>
        </ChakraProvider>
    </Provider>,
    document.getElementById('root')
);
