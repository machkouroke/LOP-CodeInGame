/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';

// Chakra imports
import {Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid} from '@chakra-ui/react';

// Custom components
import Banner from 'views/admin/marketplace/components/Banner';
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators';
import HistoryItem from 'views/admin/marketplace/components/HistoryItem';
import Competition from '../../../components/card/Competition';
import Card from 'components/card/Card';

// Assets
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';

interface Competition {
    name: string;
    author: string;
    bidders: string[];
    image: any,
    timeLeft: string;
    postDate?: Date;
}

const inProgress: Competition[] = [
    {
        name: 'Problème des 8 reines',
        author: 'Par Khalfi ',
        bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft1,
        timeLeft: '2d 19h 23m',
        postDate: new Date(),
    },
    {
        name: 'Problème du voyageur de commerce',
        author: 'Par Hafidi ',
        bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft2,
        timeLeft: '2d 19h 23m',
        postDate: new Date(),

    },
    {
        name: 'Fibonacci',
        author: "Ghazdhali",
        bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft3,
        timeLeft: '2d 19h 23m',
        postDate: new Date(),

    }
]
export default function Marketplace() {
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
                            Compétition en cours
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
                        <TableTopCreators tableData={tableDataTopCreators}/>
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
                                price='0.91 ETH'
                            />
                        ))}
                    </Card>
                </Flex>
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}
