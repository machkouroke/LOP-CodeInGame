import React from 'react';

// Chakra imports
import {
    Box,
    Flex,
    Grid,
    SimpleGrid,
    Icon,
    useDisclosure,
} from '@chakra-ui/react';

// Custom components

import CompetitionCard from '../../../components/card/CompetitionCard';
import Card from 'components/card/Card';

import Modal from "../../../components/Modal/Modal";
import inProgress from "../../../mocks/Competition";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import useColorIcon from "../../../hooks/useColorIcon";

import {BsPlusCircleFill} from "react-icons/bs";
import CreateCompetition from "./components/CreateCompetition";
import ManageCompetition from "./components/ManageCompetition";
import {getUserInfo} from "../../../slices/selector";
import {useSelector} from "react-redux";

export default function CreatorBoard() {
    const user = useSelector(getUserInfo);

    const {isOpen: isOpenCreation, onOpen: onOpenCreation, onClose: onCloseCreation} = useDisclosure()
    const {isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage} = useDisclosure()
    const [selected, setSelected] = React.useState<Competition | null>(null);

    return (
        <>

            <Modal isOpen={isOpenCreation} onClose={onCloseCreation}>
                <CreateCompetition/>
            </Modal>
            <Modal isOpen={isOpenManage} onClose={onCloseManage} size={"4xl"}>
                <ManageCompetition competition={selected}/>
            </Modal>

            <Box pt={{base: '180px', md: '80px', xl: '80px'}}>
                {/* Main Fields */}
                <Grid
                    mb='20px'
                    gridTemplateColumns={{xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr'}}
                    gap={{base: '20px', xl: '20px'}}
                    display={{base: 'block', xl: 'grid'}}>

                    <Flex flexDirection='column'
                          gridArea={{xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2'}}>
                        <Flex direction='column'>

                            <SimpleGrid columns={{base: 1, md: 3}} gap='20px'>
                                {
                                    inProgress.map((item, index) => (
                                        <CompetitionCard
                                            hoverable={true}
                                            name={item.name}
                                            author={item.author}
                                            bidders={item.bidders}
                                            image={item.image}
                                            timeleft={item.timeLeft}
                                            onClick={() => {
                                                setSelected(item);
                                                onOpenManage();
                                            }}
                                            download='#'
                                        />))
                                }


                            </SimpleGrid>

                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' order={{base: 1,}}
                          mt={{base: '20px', xl: '0px'}}

                          gridArea={{xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3'}}>
                        <Card p='0px'>
                            <MiniStatistics
                                onClick={onOpenCreation}

                                style={{height: "100%"}}

                                startContent={
                                    <IconBox
                                        w='56px'
                                        h='56px'
                                        bg={useColorIcon("#4707ec")}
                                        icon={<Icon w='32px' h='32px' as={BsPlusCircleFill} color={"white"}/>}
                                    />
                                }
                                value='Ajouter un exercice'
                            />
                        </Card>
                    </Flex>
                </Grid>
            </Box>
        </>
    );
}
