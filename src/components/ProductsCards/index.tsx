import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"

interface productsCardType {
    img: string,
    description: string
}
export const ProductCard = ({img, description}:productsCardType) => {
    return (
        <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} overflow={"hidden"} maxW={"367px"} height={"430px"} borderRadius={"16px"} border={"1px solid #116CA0"} padding={"32px"}>
            <Flex width={"100%"} height={"200px"} overflow={"hidden"}>
                <Image height={"100%"} src={img}/>
            </Flex>
            <Heading textAlign={"justify"} padding={"0 15px"} color={"#000000"} fontSize={"20px"} fontWeight={"700"}>{description}</Heading>
            <Button background={"#116CA0"} color={"#FFFFFF"}>Comprar</Button>
        </Flex>
    )
}