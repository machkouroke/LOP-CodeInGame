import React from 'react';

import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid,
} from '@chakra-ui/react';

// Custom components
import CompetitorsTable from '../competion/components/CompetitorsTable';
import Card from 'components/card/Card';

import tableDataTopCreators from '../competion/variables/tableDataTopCreators';
import CountDown from "../../../components/CountDown/CountDown";
import inProgress from "../../../mocks/Competition";
import Description from "./components/Description";
import moment from "moment";
import {useLocation} from "react-router-dom";

const moment1 = moment("2023-05-28T05:20:00");
const moment2 = moment("2023-05-28T05:22:00");
export default function WaitRoom() {
    // Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const location: any = useLocation()
    const competition = location.state.competition
    return (
        <Box pt={{base: '180px', md: '80px', xl: '80px'}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={{xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr'}}
                gap={{base: '20px', xl: '20px'}}
                display={{base: 'block', xl: 'grid'}}>
                <Flex flexDirection='column' gridArea={{xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2'}}>

                    <Flex direction='column'>

                        <SimpleGrid mt='45px'
                                    mb='20px' columns={{base: 1, md: 1}} gap='20px'>
                            <Card>
                                <Text
                                    color={textColor}
                                    textAlign={{base: 'center'}}
                                    fontSize={{
                                        base: 'xl',
                                        md: 'lg',
                                        lg: 'lg',
                                        xl: 'lg',
                                        '2xl': 'md',
                                        '3xl': 'lg'
                                    }}
                                    mb='5px'
                                    fontWeight='bold'
                                    me='14px'>
                                    Problème des 8 reines
                                </Text>
                                <Flex alignContent={"center"} justifyContent={"center"}>
                                    <CountDown startDate={moment1}
                                                  endDate={moment2}
                                               name={"machkour"}/>

                                </Flex>
                            </Card>
                            <Card px='0px' mb='20px'>

                                <CompetitorsTable tableData={tableDataTopCreators}
                                                  title={"Participant ayant  réjoint"}/>
                            </Card>


                        </SimpleGrid>

                    </Flex>
                </Flex>
                <Flex mt='45px' flexDirection='column' gridArea={{xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3'}}>
                    <Description competition={inProgress[0]}/>



                </Flex>
            </Grid>
        </Box>
    );
}
