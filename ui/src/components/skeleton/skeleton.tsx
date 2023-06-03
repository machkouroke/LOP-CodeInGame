import {Skeleton, Stack} from "@chakra-ui/react";
import {ReactElement} from "react";

export function ThreeLine(props: {
    children: ReactElement
    isLoaded: boolean,
    height: number,
    [x: string]: any
}) {
    const {children, isLoaded, height, ...rest} = props
    const threeLinesHeight = `${height / 3}px`
    if (!isLoaded) {
        return (<Stack>
            <Skeleton height={threeLinesHeight}/>
            <Skeleton height={threeLinesHeight}/>
            <Skeleton height={threeLinesHeight}/>
        </Stack>)
    } else {
        return children
    }
}