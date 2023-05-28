import {Box, Button, Flex, FormLabel, Input, Text, useColorModeValue} from "@chakra-ui/react";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import moment from "moment";
import SmoothBox from "../../../../components/SmoothBox/SmoothBox";

export default function DateSelector() {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const {register, handleSubmit} = useForm()
    const [errorMessage, setErrorMessage] = useState(null)
    const [sucessMessage, setSucessMessage] = useState(null)
    const submitForm = (data: CompetitionSchedule) => {
        const MINIMUM_TIME_BEFORE_START = 5 * 60 * 1000
        // @ts-ignore
        const startDate = moment(data.startDate + "T" + data.startTime, "YYYY-MM-DDTHH:mm:ss")
        const endDate = moment(data.endDate + "T" + data.endTime, "YYYY-MM-DDTHH:mm:ss")


        if (moment.duration(startDate.diff(moment())).asMilliseconds() < MINIMUM_TIME_BEFORE_START) {
            setErrorMessage("La date de départ doit être au moins 5 minutes après la date actuelle")
            return
        }
        if (startDate.isAfter(endDate)) {
            setErrorMessage("La date de fin doit être après la date de départ")
            return
        } else if (startDate.isSame(endDate)) {
            setErrorMessage("La date de fin ne peut pas être la même que la date de départ")
            return
        }
        setErrorMessage(null)

        try {
            const competitionSchedule: CompetitionSchedule = {
                startDate: startDate.format("YYYY-MM-DDTHH:mm:ss"),
                endDate: endDate.format("YYYY-MM-DDTHH:mm:ss"),
                competitionId: "OK"
            }
        } catch (e: any) {
            console.log(e)
        }

    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Date de départ<Text color={brandStars}>*</Text>
                </FormLabel>
                <Flex>
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='date'
                        mb='24px'
                        mr={'24px'}
                        fontWeight='500'
                        size='lg'
                        defaultValue={moment().format("YYYY-MM-DD")}
                        {...register('startDate')}
                    />
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='time'
                        placeholder='Maze'
                        mb='24px'
                        ml={'24px'}
                        fontWeight='500'
                        size='lg'
                        defaultValue={moment().format("HH:mm")}
                        {...register('startTime')}
                    />
                </Flex>


                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Date de Fin<Text color={brandStars}>*</Text>
                </FormLabel>
                <Flex>
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='date'
                        placeholder='Maze'
                        mb='24px'
                        mr={'24px'}
                        defaultValue={moment().format("YYYY-MM-DD")}
                        fontWeight='500'
                        size='lg'
                        {...register('endDate')}


                    />
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='time'
                        placeholder='Maze'
                        mb='24px'
                        ml={'24px'}
                        {...register('endTime')}
                        defaultValue={moment().format("HH:mm")}
                        fontWeight='500'
                        size='lg'
                    />
                </Flex>
            </div>
            {errorMessage && (

                    <SmoothBox bg={"#fdecea"}   p="10px" mb="24px" >
                        <Text color='red.500' fontSize='sm' fontWeight='500' textAlign={"center"}>
                            {errorMessage}
                        </Text>
                    </SmoothBox>

            )}
            <Button
                type='submit'
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                bg={"#d54910"}
                w='100%'
                h='50'
                mb='24px'>
                Lancer la compétition
            </Button>
        </form>
    )
}