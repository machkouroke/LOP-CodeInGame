// Chakra imports
import {Portal, Box, useDisclosure} from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';

import {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import CompetitionBoard from "../../views/dahsboard/competion";
import WaitRoom from "../../views/dahsboard/waitroom";

// Custom Chakra theme
export default function Competition(props: { [x: string]: any }) {
    const {...rest} = props;
    // states and functions
    const [fixed] = useState(false);


    document.documentElement.dir = 'ltr';
    const {onOpen} = useDisclosure();
    return (
        <Box>

            <Box
                minHeight='100vh'
                height='100%'
                overflow='auto'
                position='relative'
                maxHeight='100%'
                width='100%'

                transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                transitionDuration='.2s, .2s, .35s'
                transitionProperty='top, bottom, width'
                transitionTimingFunction='linear, linear, ease'>
                <Portal>
                    <Box>
                        <Navbar
                            onOpen={onOpen}
                            logoText={'Horizon UI Dashboard PRO'}
                            brandText={"Compétition"}
                            secondary={true}
                            message={"Compétition"}
                            fixed={fixed}
                            {...rest}
                        />
                    </Box>
                </Portal>

                {
                    <Box mx='auto' p={{base: '20px', md: '30px'}} pe='20px' minH='100vh' pt='50px'>
                        <Switch>
                            <Route path='/competition' exact component={CompetitionBoard}/>;
                            <Route path='/competition/waitroom' exact component={WaitRoom}/>;
                        </Switch>
                    </Box>
                }
                <Box>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    );
}