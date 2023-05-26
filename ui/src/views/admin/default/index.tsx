// Chakra imports
import {Avatar, Box, Flex, Icon, SimpleGrid, useColorModeValue} from '@chakra-ui/react';
// Assets
// Custom components
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdBarChart, MdNumbers} from 'react-icons/md';

import TotalSpent from 'views/admin/default/components/TotalSpent';
import {TbMilitaryRank} from "react-icons/tb";
import TableTopCreators from "../marketplace/components/TableTopCreators";
import TopCompetitorTable from "../marketplace/variables/tableDataTopCreators";
import React from "react";
import {BsFillPlayFill} from "react-icons/bs";
import {useHistory} from "react-router-dom";

export default function UserReports() {
    const history = useHistory();
    // Chakra Color Mode
    const brandColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    return (
        <Box pt={{base: '130px', md: '80px', xl: '80px'}}>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, '2xl': 6}} gap='20px' mb='20px'>

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px'
                                        as={MdBarChart}
                                        color={brandColor}/>}
                        />
                    }
                    name='Expérience'
                    value='642.39 XP'
                />

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                            icon={<Icon w='28px' h='28px' as={TbMilitaryRank} color='white'/>}
                        />
                    }
                    name='Classement dans la filière'
                    value='154'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px' as={MdNumbers} color={brandColor}/>}
                        />
                    }
                    name='Nombre de parties jouées'
                    value='2935'
                />

            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap='20px' mb='20px' >
                <div></div>
                <Flex alignItems={"center"} justifyContent={"center"} width={"100%"} >
                    <MiniStatistics
                        onClick={() => {
                            history.push("/admin/nft-marketplace")
                        }}

                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={<Icon w='32px' h='32px' as={BsFillPlayFill} color={brandColor}/>}
                            />
                        }
                        name='Lancer une partie'
                    />
                </Flex>
                <div></div>


            </SimpleGrid>
             <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap='20px' mb='20px'>
                <div></div>

                <TotalSpent/>

            </SimpleGrid>



        </Box>
    );
}
