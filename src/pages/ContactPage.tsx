import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import image from "../assets/Sede.png";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "../components/Header";

export const ContactPage = () => {
  const contactFormSchema = z.object({
    name: z.string().min(3, { message: "Pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email invalido" }),
    phone: z
      .string()
      .min(11, { message: "Pelo menos 11 caracteres" })
      .max(11, { message: "São 11 caracteres" }),
    message: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    // console.log(data);
  };

  return (
    <Container padding={"0"} maxW={"100vw"}>
      <Header/>
      <Flex padding={"0 10%"} flexDir={"column"} gap="2rem" mt="2rem">
        <Heading fontFamily={"Inter"} textAlign={"center"}  color={"#116CA0"}>Sobre nós</Heading>
        <Image border={"2px solid #116CA0"} src={image} />
        <Flex  flexDir={"column"} gap="0.5rem" >
          <Text fontFamily={"Montserrat"} color={"#116CA0"}>
              A RESPIRAR PRODUTOS BIOMÉDICOS Ltda. é uma empresa jovem no Brasil, mas foi criada com a suma de experiencia de mais de 20 anos no mercado de atenção domiciliar prestando o serviço de aluguel e venda de equipamento médicos para internação domiciliar.
          </Text>
          <Text fontFamily={"Montserrat"} color={"#116CA0"}>
            Nossos especialistas são formados para dar o melhor serviço e assessoramento na hora de atenção domiciliar, tendo os cuidados que você merece e o correto mantenimento de cada um de os aparelhos para cuidar sua saúde.
          </Text>
          <Text fontFamily={"Montserrat"} color={"#116CA0"}>
            Dispomos de uma grande variedade de equipamentos, produtos, além de acessórios como circuitos, máscaras e informações digitalizadas para um acompanhamento mais próximo, tanto para o tratamento da DPOC, para apneia do sono e doenças neuromusculares que afetam a função respiratória. fazer o tratamento em sua própria casa com seus entes queridos é uma recuperação pronta. 
          </Text>
          <Text fontFamily={"Montserrat"} color={"#116CA0"}>
            Contamos também com uma completa línea de equipamentos para professionais da saúde e hospitalar. Temos sistemas de respiração autônomos portátil, equipamento para poligrafias e polissonografia, exercitador pulmonar, e muitos mais.
          </Text>
          <Text fontFamily={"Montserrat"} color={"#116CA0"}>
            Venha conferir e procure um orçamento!
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap="1rem" pb="2rem">
          <Flex flexDir={"column"} gap="1rem">
            <Flex flexDir={"column"} gap="0.5rem">
              <Heading fontFamily={"Inter"}  color={"#116CA0"}>Endereço</Heading>
              <Text color={"#116CA0"}>
                Rua 244, 375 Sala 02 Meia Praia - Itapema -SC 
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading fontFamily={"Inter"} color={"#116CA0"}>Telefone</Heading>
              <Text color={"#116CA0"}>(47) 1234-5678</Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading  fontFamily={"Inter"}  color={"#116CA0"}>Whatsapp</Heading>
              <Text color={"#116CA0"}>(47) 91234-5678</Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading  fontFamily={"Inter"}  color={"#116CA0"}>Email</Heading>
              <Text color={"#116CA0"}>contato@downtownhamburgueria.com.br</Text>
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap="2rem" w={{ base: "100%", lg: "30%" }}>
            <Flex flexDir={"column"} gap="0.5rem">
              <Heading fontFamily={"Inter"}  color={"#116CA0"}>Horario de Funcionamento:</Heading>
              <Text color={"#116CA0"}>Segunda a Quinta: 18h00 às 23h00</Text>
              <Text color={"#116CA0"}>Sexta e Sábado: 18h00 às 00h00</Text>
              <Text color={"#116CA0"}>Domingo: 18h00 às 22h30</Text>
            </Flex>
            {/* <Flex flexDir={"column"} gap="1rem">
              <Heading fontFamily={"Inter"}  color={"#116CA0"}>Redes Sociais</Heading>
              <Text color={"#116CA0"}>
                Siga-nos em nossas redes sociais para ficar por dentro das
                novidades, promoções e eventos especiais!
              </Text>
              <Flex justify={"space-evenly"} w="80%">
                <Icon
                  as={AiFillInstagram}
                  fontSize="45"
                  cursor="pointer"
                  transition={"0.3s"}
                  color="#c13584"
                  _hover={{ transform: "scale(1.2)" }}
                />
                <Icon
                  as={AiOutlineTwitter}
                  fontSize="45"
                  cursor="pointer"
                  transition={"0.3s"}
                  color="#1da1f2"
                  _hover={{ transform: "scale(1.2)" }}
                />
                <Icon
                  as={AiFillFacebook}
                  fontSize="45"
                  cursor="pointer"
                  transition={"0.3s"}
                  color="#3b5998"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Flex>
            </Flex> */}
          </Flex>
          <Flex flexDir={"column"} gap="2rem" w={{ base: "100%", lg: "30%" }}>
            <Flex
              flexDir={"column"}
              gap="1rem"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Heading fontFamily={"Inter"}  color={"#116CA0"}>Formulário de Contato</Heading>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel color={"#FFFF"}>Nome</FormLabel>
                <Input
                  {...register("name")}
                  placeholder="Digite seu nome"
                  bg="#E9F1F5"
                />
                {!!errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel color={"#FFFF"}>E-mail</FormLabel>
                <Input
                  {...register("email")}
                  placeholder="Seu melhor e-mail"
                  bg="#E9F1F5"
                />
                {!!errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel color={"#FFFF"}>Telefone/Whatsapp</FormLabel>
                <Input
                  {...register("phone")}
                  placeholder="Seu melhor telefone"
                  bg="#E9F1F5"
                />
                {!!errors.phone ? (
                  <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                ) : (
                  <FormHelperText color="white">
                    Ex: (11) 91234-5678
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.message}>
                <FormLabel color={"#FFFF"}>Mensagem</FormLabel>
                <Textarea
                  {...register("message")}
                  placeholder="Digite sua mensagem"
                  bg="#E9F1F5"
                />
                {!!errors.message && (
                  <FormErrorMessage>{errors.message.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" bg="logo-color">
                Enviar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
