import React from 'react';
import classnames from 'classnames'
// Chakra imports
import {
    Box,
    Flex,
    Grid,
    SimpleGrid,
    Icon,
    useDisclosure, Spinner, AlertIcon, Alert,
} from '@chakra-ui/react';

// Custom components

import ExerciseCard from '../../../components/card/ExerciseCard';
import Card from 'components/card/Card';

import Modal from "../../../components/Modal/Modal";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import useColorIcon from "../../../hooks/useColorIcon";

import {BsPlusCircleFill} from "react-icons/bs";
import CreateExercise from "./components/CreateExercise";
import ManageCompetition from "./components/ManageCompetition";
import {getUserInfo} from "../../../slices/selector";
import {useSelector} from "react-redux";
import {useGetTeachersExercisesQuery} from "../../../services/competitionService";

export default function CreatorBoard() {
    const user = useSelector(getUserInfo);
    const {data: exercises, isLoading, isError, error, isFetching} =
        useGetTeachersExercisesQuery(user.id);
    const {isOpen: isOpenCreation, onOpen: onOpenCreation, onClose: onCloseCreation} = useDisclosure()
    const {isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage} = useDisclosure()
    const [selected, setSelected] = React.useState<string | null>(null);

    const content = () => {
        if (isLoading) {
            return <Spinner mt={"5px"} ml={"20px"} size='lg' className={"center"}/>
        } else {
            const all = exercises as Exercise[]
            if (all.length === 0) {
                return <Alert status='info'
                              variant='subtle'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='center'
                              textAlign='center'
                              borderRadius={10}
                              width={"100%"}
                              gridArea={{xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2'}}
                              height='200px'>
                    <AlertIcon/>
                    Vous n'avez pas encore d'exercices
                </Alert>
            }
            return (<Flex flexDirection='column'
                          gridArea={{xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2'}}>
                <Flex direction='column'>

                    <SimpleGrid columns={{base: 1, md: 3}} gap='20px'>
                        {all.map((item, index) => (
                            <ExerciseCard
                                exercise={item}
                                hoverable={true}
                                onClick={() => {
                                    setSelected(item.id);
                                    onOpenManage();
                                }}
                                download='#'
                                className={classnames({
                                    loading: isFetching
                                })}
                            />))}


                    </SimpleGrid>

                </Flex>
            </Flex>)


        }
    }

    return (
        <>

            <Modal isOpen={isOpenCreation} onClose={onCloseCreation}>
                <CreateExercise/>
            </Modal>
            <ManageCompetition
                isOpenManage={isOpenManage}
                selected={exercises?.find((item: Exercise) => item.id === selected) || null}
                onCloseManage={onCloseManage}
                isFetching={isFetching}
            />

            <Box pt={{base: '180px', md: '80px', xl: '80px'}}>
                {/* Main Fields */}
                <Grid
                    mb='20px'
                    gridTemplateColumns={{xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr'}}
                    gap={{base: '20px', xl: '20px'}}
                    display={{base: 'block', xl: 'grid'}}>

                    {content()}
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
