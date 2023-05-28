import CountDown from "../../../../components/CountDown/CountDown";
import CompetitorsTable from "../../competion/components/CompetitorsTable";
import tableDataTopCreators from "../../competion/variables/tableDataTopCreators";
import {Flex} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
const moment1 = moment("2023-05-28T03:00:00");
const moment2 = moment("2023-05-28T04:00:00");
export default function WaitView() {
    return (
        <Flex alignItems={"center"}>
            <CountDown
                startDate={moment1}
                endDate={moment2}
                name={"Début"}/>

            <CompetitorsTable
                tableData={tableDataTopCreators}
                title={"Classement de votre classe"}
                style={{
                    maxHeight: "500px",
                }}
            />

        </Flex>
    )
}