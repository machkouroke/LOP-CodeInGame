import {useColorModeValue} from "@chakra-ui/react";

function useColorIcon(firstColor: string) {
    return useColorModeValue(`linear-gradient(90deg, ${firstColor} 0%, #f4f7fe 100%)`,
        `linear-gradient(90deg, ${firstColor} 0%, #0b1437 100%)`)
}

export default useColorIcon;