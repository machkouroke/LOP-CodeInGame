import React, {useEffect} from 'react';

import {
    Box,
    Flex,
    Grid,
    useColorModeValue,
    SimpleGrid, Skeleton,
} from '@chakra-ui/react';

// Custom components
import CompetitorsTable from '../competion/components/CompetitorsTable';
import Card from 'components/card/Card';

import tableDataTopCreators from '../competion/variables/tableDataTopCreators';
import CountDown from "../../../components/CountDown/CountDown";
import Description from "./components/Description";
import moment from "moment";
import {useLocation} from "react-router-dom";
import {useGetExercisesQuery} from "../../../services/competitionService";
import competition from "../../../mocks/Competition";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import useWebSocket from "react-use-websocket";
import {WEB_SOCKET_URL} from "../../../config";

const moment1 = moment("2023-05-28T05:20:00");
const moment2 = moment("2023-05-28T05:22:00");
export default function WaitRoom() {
    // Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const location: any = useLocation()
    const exercise_id = location.state.exercise
    const {data, isLoading, isError} = useGetExercisesQuery(exercise_id)
    const exercise = data as Exercise
    const [participants, setParticipants] = React.useState<any[]>([])
    const [isLoadingParticipants, setIsLoadingParticipants] = React.useState<boolean>(true);

    const {sendJsonMessage} = useWebSocket(`${WEB_SOCKET_URL}/exercises/subscribers`, {
        share: true,
        filter: (message: {
            data: string
        }) => {
            return JSON.stringify(JSON.parse(message.data)) !== JSON.stringify(participants)
        },
        onOpen: () => {
            console.log('Connexion WebSocket établie');
        },
        onError: (event) => {
            console.log('Erreur WebSocket : ', event)
        },
        onMessage: (event) => {
            setIsLoadingParticipants(false)
            if (event.data) {
                const data = JSON.parse(event.data)
                if (JSON.stringify(data) !== JSON.stringify(participants)) {
                    setParticipants([...data]);
                }
            }
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            sendJsonMessage({
                exercise_id: exercise_id,
            })


        }, 1000)


        return () => {
            clearInterval(interval)
        }
    }, []);
    console.log(participants)

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
                            <Skeleton isLoaded={!isLoading} h={"100%"} borderRadius={"10px"}>

                                <Card>

                                    <Flex alignContent={"center"} justifyContent={"center"}>
                                        {!isLoading && <CountDown startDate={moment(exercise.start)}
                                                                  endDate={moment(exercise.end)}
                                        />}

                                    </Flex>
                                </Card>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoadingParticipants} h={"100%"} borderRadius={"10px"}>

                                <Card px='0px' mb='20px'>
                                    <CompetitorsTable tableData={participants}
                                                      title={"Participant ayant  réjoint"}/>
                                </Card>
                            </Skeleton>


                        </SimpleGrid>

                    </Flex>
                </Flex>
                <Skeleton isLoaded={!isLoading} borderRadius={"10px"}>

                    <Flex mt='45px' flexDirection='column' gridArea={{xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3'}}>
                        {!isLoading && <Description competition={exercise}/>}


                    </Flex>
                </Skeleton>
            </Grid>
        </Box>
    );
}
