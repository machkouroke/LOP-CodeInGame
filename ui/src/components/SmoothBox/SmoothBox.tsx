import {Box, Flex} from "@chakra-ui/react";
import React from "react";


export default function SmoothBox(props: {children: any,  [x: string]: any})  {
    const {children, ...rest} = props
    return (
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Box
                borderRadius='xl'
                textAlign={"center"}

                w={"75%"} p={4}
                {...rest}
            >
                {children}
            </Box>
        </Flex>
    )
}