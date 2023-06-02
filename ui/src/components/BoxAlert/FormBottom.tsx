import SmoothBox from "../SmoothBox/SmoothBox";
import React from "react";
import {Button, Flex, FormControl, Spinner, useColorModeValue} from "@chakra-ui/react";

export default function FormBottom(props: {
    errorMessage: string | null,
    successMessage?: string | null,
    isLoading: boolean,
    children?: React.ReactNode,
    mainButtonMessage: string,
}) {
    const {errorMessage, successMessage, isLoading, children, mainButtonMessage} = props
    const errorColor = useColorModeValue("red.500", "red.300")
    const successColor = useColorModeValue("green.500", "green.300")
    return (<>
            {errorMessage &&
                <SmoothBox
                    bg={errorColor}
                    mb={"10px"}
                    w={"100%"}
                    textAlign={"center"}

                    color='white'>
                    {errorMessage}
                </SmoothBox>
            }
            {successMessage &&
                <SmoothBox
                    bg={successColor}
                    mb={"10px"}

                    textAlign={"center"}

                    color='white'>
                    {successMessage}
                </SmoothBox>
            }
                <Flex alignContent={"center"}>
                    <Button

                        type={"submit"}
                        disabled={isLoading || successMessage !== null}
                        fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        w='100%'
                        h='50'
                        mb='24px'>
                        {
                            isLoading ? <Spinner mt={"5px"} ml={"20px"} size='lg'
                        />: mainButtonMessage
                        }
                    </Button>

                    {children}
                </Flex>

        </>
    )
}