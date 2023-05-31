import CountDown from "../../../../components/CountDown/CountDown";
import CompetitorsTable from "../../competion/components/CompetitorsTable";
import {Button, Flex, useColorModeValue} from "@chakra-ui/react";
import React, {useEffect} from "react";
import moment from "moment";
import {WEB_SOCKET_URL} from "../../../../config";
import classnames from "classnames";
import useWebSocket from "react-use-websocket";


function WaitView(props: {
    competition: Exercise,
    modalIsOpen: boolean,
}) {
    const {competition, modalIsOpen} = props
    const deleteButtonColor = useColorModeValue("red.500", "red.500")

    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const startDate = moment(competition.start)
    const endDate = moment(competition.end)
    // const participants = lastJsonMessage || []
    const [participants, setParticipants] = React.useState<any[]>([])
    const {lastJsonMessage, getWebSocket, sendJsonMessage} = useWebSocket(`${WEB_SOCKET_URL}/exos/participants`, {
        share: true,
        filter: (message) => {
            return JSON.stringify(message.data) === JSON.stringify(participants)
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
                id_exo: competition.id,
            })


        }, 1000)


        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <Flex alignItems={"center"} className={classnames({
            loading: isLoading,
        })}>
            <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                <Button
                    bg={deleteButtonColor}
                    type={"submit"}
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'>
                    Supprimer exercice
                </Button>
                <CountDown
                    startDate={startDate}
                    endDate={endDate}
                    name={"Début"}/>
            </Flex>

            <CompetitorsTable
                tableData={participants}
                title={"Participant ayant rejoint"}
                style={{
                    maxHeight: "500px",
                }}
            />

        </Flex>
    )
}

export default WaitView;