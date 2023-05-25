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

// Chakra imports
import {Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue} from '@chakra-ui/react';
// Assets
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy, MdNumbers} from 'react-icons/md';
import CheckTable from 'views/admin/rtl/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
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
             <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px' mb='20px'>
                <TotalSpent/>
                <TableTopCreators tableData={TopCompetitorTable}/>

            </SimpleGrid>



        </Box>
    );
}
