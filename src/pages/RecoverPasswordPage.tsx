import { Flex, Container, Heading, Link, Text } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RecoverPasswordForm } from "../components/RecoverPasswordForm";

export const RecoverPasswordPage: React.FC<ProductSearchProps>  = ({setFilteredCardapio, handleSearch}) => {
//   const navigate = useNavigate();
    return (
        <Flex flexDir="column" w="100%">
        <Flex w="100%">
            <Header handleSearch={handleSearch} setFilteredCardapio={setFilteredCardapio}/>
        </Flex>
        <Flex justifyContent="center" w="100%">
            <Container maxW="lg" mt="1rem">
            <Heading textAlign="center">Recuperar a Senha</Heading>
            <RecoverPasswordForm />
            {/* <Flex w={"100%"} justifyContent={"center"} mt={"1rem"} gap={"3rem"}>
                <Text 
                fontSize="18px"
                cursor="pointer"
                color="primary-color" 
                textAlign="center" 
                onClick={() => navigate("/login")}
                >
                Login
                </Text>
            </Flex> */}
            </Container>
        </Flex>
        </Flex>
    );
};
