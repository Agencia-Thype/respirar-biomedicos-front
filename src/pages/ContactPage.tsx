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
import image from "../assets/image 4.png";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <Container maxW={"8xl"}>
      <Flex flexDir={"column"} gap="2rem" mt="2rem">
        <Heading textAlign={"center"}>Contatos</Heading>
        <Image src={image} />
        <Text fontFamily={"Montserrat"} color={"#c2c1c1"}>
          Aqui na Downtown Hamburgueria Gourmet, adoramos ouvir nossos clientes!
          Se você tiver dúvidas, comentários, sugestões ou simplesmente quiser
          conversar conosco, entre em contato através de um dos métodos abaixo.
          Nossa equipe está sempre pronta para ajudar e garantir que você tenha
          a melhor experiência possível em nossa hamburgueria.
        </Text>
        <Flex flexDir={{ base: "column", lg: "row" }} gap="1rem" pb="2rem">
          <Flex flexDir={"column"} gap="1rem">
            <Flex flexDir={"column"} gap="0.5rem">
              <Heading>Endereço</Heading>
              <Text color={"#c2c1c1"}>
                Rua Exemplo, 123 - Bairro, Balneário Camboriú - SC, 12345-678
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading>Telefone</Heading>
              <Text color={"#c2c1c1"}>(47) 1234-5678</Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading>Whatsapp</Heading>
              <Text color={"#c2c1c1"}>(47) 91234-5678</Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading>Email</Heading>
              <Text color={"#c2c1c1"}>contato@downtownhamburgueria.com.br</Text>
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap="2rem" w={{ base: "100%", lg: "30%" }}>
            <Flex flexDir={"column"} gap="0.5rem">
              <Heading>Horario de Funcionamento:</Heading>
              <Text color={"#c2c1c1"}>Segunda a Quinta: 18h00 às 23h00</Text>
              <Text color={"#c2c1c1"}>Sexta e Sábado: 18h00 às 00h00</Text>
              <Text color={"#c2c1c1"}>Domingo: 18h00 às 22h30</Text>
            </Flex>
            <Flex flexDir={"column"} gap="1rem">
              <Heading>Redes Sociais</Heading>
              <Text color={"#c2c1c1"}>
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
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap="2rem" w={{ base: "100%", lg: "30%" }}>
            <Flex
              flexDir={"column"}
              gap="1rem"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Heading>Formulário de Contato</Heading>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel color={"#FFFF"}>Nome</FormLabel>
                <Input
                  {...register("name")}
                  placeholder="Digite seu nome"
                  bg="#EDE2CA"
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
                  bg="#EDE2CA"
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
                  bg="#EDE2CA"
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
                  bg="#EDE2CA"
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
