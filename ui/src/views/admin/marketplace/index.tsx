
import React from 'react';

// Chakra imports
import {Box, Flex, Grid, Text, useColorModeValue, SimpleGrid} from '@chakra-ui/react';

// Custom components
import Banner from 'views/admin/marketplace/components/Banner';
import CompetitorsTable from 'views/admin/marketplace/components/CompetitorsTable';
import HistoryItem from 'views/admin/marketplace/components/HistoryItem';
import Competition from '../../../components/card/Competition';
import Card from 'components/card/Card';


import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';
import inProgress from "../../../mocks/Competition";

export default function CompetitionBoard() {
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
                    <Banner/>
                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{base: 'column', md: 'row'}}
                            align={{base: 'start', md: 'center'}}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Compétition en cours
                            </Text>

                        </Flex>
                        <SimpleGrid columns={{base: 1, md: 3}} gap='20px'>
                            {
                                inProgress.map((item, index) => (
                                    <Competition
                                        name={item.name}
                                        author={item.author}
                                        bidders={item.bidders}
                                        image={item.image}
                                        timeleft={item.timeLeft}
                                        download='#'
                                    />))
                            }


                        </SimpleGrid>
                        <Text mt='45px' mb='36px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                            Exercice
                        </Text>
                        <SimpleGrid columns={{base: 1, md: 3}} gap='20px' mb={{base: '20px', xl: '0px'}}>
                            {
                                inProgress.map((item, index) => (
                                    <Competition
                                        name={item.name}
                                        author={item.author}
                                        bidders={item.bidders}
                                        image={item.image}
                                        timeleft={item.timeLeft}
                                        download='#'
                                        to_come={true}
                                    />))
                            }
                        </SimpleGrid>
                    </Flex>
                </Flex>
                <Flex flexDirection='column' gridArea={{xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3'}}>
                    <Card px='0px' mb='20px'>
                        <CompetitorsTable tableData={tableDataTopCreators} title={"Classement de votre classe"}/>
                    </Card>
                    <Card p='0px'>
                        <Flex
                            align={{sm: 'flex-start', lg: 'center'}}
                            justify='space-between'
                            w='100%'
                            px='22px'
                            py='18px'>
                            <Text color={textColor} fontSize='xl' fontWeight='600'>
                                6 dernières compétition participé
                            </Text>
                        </Flex>

                        {inProgress.map((item, index) => (

                            <HistoryItem
                                name={item.name}
                                author={item.author}
                                date={item.postDate}

                            />
                        ))}
                    </Card>
                </Flex>
            </Grid>
        </Box>
    );
}
