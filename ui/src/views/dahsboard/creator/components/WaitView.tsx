import CompetitorsTable from "../../competion/components/CompetitorsTable";
import {Button, Flex, Spinner, useColorModeValue} from "@chakra-ui/react";
import React, {useEffect} from "react";
import moment from "moment";
import {WEB_SOCKET_URL} from "../../../../config";
import classnames from "classnames";
import useWebSocket from "react-use-websocket";
import CountDown from "../../../../components/CountDown/CountDown";
import {useDeleteExerciseMutation} from "../../../../services/competitionService";


function WaitView(props: {
    exercise: Exercise,
    modalIsOpen: boolean,
    onClose: () => void,
}) {
    const {exercise, onClose} = props
    const deleteButtonColor = useColorModeValue("red.500", "red.500")
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const startDate = moment(exercise.start)
    const endDate = moment(exercise.end)
    const [deleteExercise, {isLoading: isLoadingDeletion}] = useDeleteExerciseMutation()

    const [participants, setParticipants] = React.useState<any[]>([])
    const deleteExerciseHandler = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette compétition ?") === true) {
            deleteExercise(exercise.id)
                .unwrap()
                .then(() => {

                    onClose()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }
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
            setIsLoading(false)
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
                exercise_id: exercise.id,
            })


        }, 1000)


        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <Flex alignItems={"start"} className={classnames({
            loading: isLoading,
        })}
        >
            <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                <Button
                    disabled={moment().isBetween(startDate, endDate)}
                    bg={deleteButtonColor}
                    onClick={deleteExerciseHandler}
                    type={"submit"}
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'>
                    {
                        isLoadingDeletion ? <Spinner mt={"5px"} ml={"20px"} size='lg'
                        /> : "Supprimer exercice\n"
                    }
                </Button>
                <CountDown
                    startDate={startDate}
                    endDate={endDate}
                />

            </Flex>
            <Flex alignItems={"flex-start"} justifyContent={"start"} mx={"10px"}>
                <CompetitorsTable
                    tableData={participants}
                    title={"Participant ayant rejoint"}
                    style={{
                        maxHeight: "500px",
                        minWidth: "500px",
                    }}
                />
            </Flex>


        </Flex>
    )
}

export default WaitView;