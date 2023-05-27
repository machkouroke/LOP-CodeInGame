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

import getRoutes from "./routes";

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
                        {getRoutes('').map((route, index) =>{
                            return  <Route path={route.fullpath}  component={route.component} key={index}/>
                        })}

                        <Redirect from='/' to='/dashboard'/>
                    </Switch>
                </BrowserRouter>
            </React.StrictMode>
        </ChakraProvider>
    </Provider>,
    document.getElementById('root')
);
