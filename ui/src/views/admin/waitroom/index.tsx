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
import {
    Box,
    Button,
    Flex,
    Grid,
    Link,
    Text,
    useColorModeValue,
    SimpleGrid,
    AvatarGroup,
    Avatar
} from '@chakra-ui/react';

// Custom components
import Banner from 'views/admin/waitroom/components/Banner';
import CompetitorsTable from 'views/admin/marketplace/components/CompetitorsTable';
import HistoryItem from 'views/admin/marketplace/components/HistoryItem';
import Competition from '../../../components/card/Competition';
import Card from 'components/card/Card';

// Assets
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';
import CustomCard from "components/card/Card";
import CountDown from "../../../components/CountDown/CountDown";

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
                    <SimpleGrid columns={{base: 1, md: 2, lg: 2}}>
                        <Banner/>

                    </SimpleGrid>
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
