import {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

// Chakra imports
import {Box, useColorModeValue} from '@chakra-ui/react';
import SignIn from 'views/auth/signIn';
import getRoutes from "../../routes";
// Layout components

// Custom Chakra theme
export default function Auth() {
    // states and functions
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const authBg = useColorModeValue('white', 'navy.900');
    document.documentElement.dir = 'ltr';
    return (
        <Box>

                <Box
                    bg={authBg}
                    float='right'
                    minHeight='100vh'
                    height='100%'
                    position='relative'
                    w='100%'
                    transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                    transitionDuration='.2s, .2s, .35s'
                    transitionProperty='top, bottom, width'
                    transitionTimingFunction='linear, linear, ease'>

                    <Box mx='auto' minH='100vh'>
                        <Switch>
                            {
                                getRoutes('/auth').map((route, index) =>{
                                    return  <Route path={route.fullpath} exact component={route.component} key={index}/>

                                })
                            }
                            <Redirect from='/auth/' to='sign-in'/>
                        </Switch>
                    </Box>

                </Box>
        </Box>
    );
}
