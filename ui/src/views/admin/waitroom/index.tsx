

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
import CompetitorsTable from 'views/admin/marketplace/components/CompetitorsTable';
import Competition from '../../../components/card/Competition';
import Card from 'components/card/Card';

import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';
import CountDown from "../../../components/CountDown/CountDown";
import inProgress from "../../../mocks/Competition";



export default function WaitRoom() {
    // Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');

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
                                    <CountDown countdownData={new Date()} name={"machkour"}/>

                                </Flex>
                            </Card>

                            <Competition
                                name={inProgress[0].name}
                                author={inProgress[0].author}
                                bidders={inProgress[0].bidders}
                                image={inProgress[0].image}
                                timeleft={inProgress[0].timeLeft}
                                download='#'
                            />


                        </SimpleGrid>

                    </Flex>
                </Flex>
                <Flex flexDirection='column' gridArea={{xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3'}}>
                    <Card px='0px' mb='20px'>
                        <CompetitorsTable tableData={tableDataTopCreators} title={"Participant ayant  réjoint"}/>
                    </Card>
                </Flex>
            </Grid>
        </Box>
    );
}
