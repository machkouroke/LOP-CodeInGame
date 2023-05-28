import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route} from 'react-router-dom';
import React, {FunctionComponent} from "react";
import {logout} from "../../slices/auth";
import {useGetUserDetailsQuery} from "../../services/authService";
import {Spinner} from "@chakra-ui/react";

const LoginRequiredRoute = (props: { component: FunctionComponent | null, [rest: string]: any }) => {
    const {component, ...rest} = props;

    const {data, isFetching, error} = useGetUserDetailsQuery('userDetails', {
        // perform a refetch every 15mins
        pollingInterval: 900000,
        /* retry settings */

    })
    const success = useSelector((state: { authentication: IAuthState }) => state.authentication.success)
    const dispatch = useDispatch()
    if (isFetching) {
        return <Spinner mt={"5px"} thickness='4px' size='lg' style={{

            position: 'absolute',
            top: "100px",
            left: "50%",

        }}/>
    } else if (error) {
        const userToken: string = localStorage.getItem('userToken')
        // @ts-ignore
        userToken && !success && localStorage.removeItem('userToken') && dispatch(logout())
        return <Redirect to="/auth/login"/>
    } else {
        const user = data
        const createComponent = (props: any) => {
            return React.createElement(component, {
                ...props,
                user
            })
        }
        return (
            <Route {...rest} render={createComponent}/>
        );
    }

};

export default LoginRequiredRoute;