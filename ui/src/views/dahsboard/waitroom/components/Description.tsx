import CompetitionCard from "../../../../components/card/CompetitionCard";
import React from "react";
import Card from "../../../../components/card/Card";
import {Flex, Text, useColorModeValue} from "@chakra-ui/react";
import MarkdownRender from "../../../../theme/markdown-config";
import moment from "moment";

export default function Description(props: {
                                        competition: Exercise
                                    }
) {
    const {competition} = props;
    const content = `# CSS code example
\`\`\`python
import numpy as np
import pandas as pd
data: pd.DataFrame = pd.read_csv('data.csv')
\`\`\`
$$x=\\frac{1}{2} + 1 \\ y=2$$
`;
    const textColor = useColorModeValue('navy.700', 'white');
    return (
        <Card p='20px'>
            <CompetitionCard
                name={competition.name}
                author={competition.owner_name}
                bidders={competition.subscribers}
                image={competition.image}
                timeleft={moment(competition.end).diff(moment(), 'days')}
                download='#'
            />
            <Flex px='20px' py='5px' direction={"column"}>
                <Text
                    color={textColor}
                    fontSize={{
                        base: 'xl',
                        md: 'lg',
                        lg: 'lg',
                        xl: 'lg',
                        '2xl': 'md',
                        '3xl': 'lg'
                    }}
                    mb='20px'
                    fontWeight='bold'
                    me='14px'>
                    Description <br/>
                </Text>
                <MarkdownRender children={content}/>

            </Flex>
        </Card>)
}