import CountDown from "../../../../components/CountDown/CountDown";
import CompetitorsTable from "../../competion/components/CompetitorsTable";
import tableDataTopCreators from "../../competion/variables/tableDataTopCreators";
import {Button, Flex, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import moment from "moment";


export default function WaitView(props: {
    competition: Competition
}) {
    const {competition} = props
    const deleteButtonColor = useColorModeValue("red.500", "red.500")
    const startDate = moment(competition.start)
    const endDate = moment(competition.end)
    console.log("startDate", startDate)
    return (
        <Flex alignItems={"center"}>
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
                tableData={tableDataTopCreators}
                title={"Participant ayant rejoint"}
                style={{
                    maxHeight: "500px",
                }}
            />

        </Flex>
    )
}