import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMenuItemSchema } from "../../schemas/menuItem.schemas";
import { IMenuItemUpdate } from "../../interfaces/menuItem.interfaces";
import { useContext, useEffect, useRef, useState } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { IMenuItemInterfaceData } from '../../interfaces/menuItem.interfaces';
import { createPortal } from "react-dom";

interface ModalEditProps {
  toggleEditModal: () => void
  item: IMenuItemInterfaceData
}

export const EditMenuItem = ({ toggleEditModal, item }: ModalEditProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { data: categories, isFetching } = useContext(CategoriesContext);
  const {
    data: menuItens,    
    menuItemDeatilData,
    updateMenuItem,
  } = useContext(MenuItemContext);

  const itemId = item.id

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
        if(!ref.current) {
            return
        }

        if(!event.target) {
            return
        }

        if(!ref.current.contains(event.target as HTMLElement)) {
          toggleEditModal()
        }
    }
    window.addEventListener("mousedown", handleClick)

    return () => {
        window.removeEventListener("mousedown", handleClick)
    }
}, [toggleEditModal])
  // useEffect(() => {
  //   listItemDetail(item.id);
  // }, [item.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMenuItemUpdate>({ resolver: zodResolver(updateMenuItemSchema) });

  function filterEmptyStrings(obj: { [key: string]: any }): {
    [key: string]: any;
  } {
    const filtered: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "") {
        filtered[key] = obj[key];
      }
    });
    return filtered;
  }

  const onSubmit: SubmitHandler<IMenuItemUpdate> = (data) => {
    let newData = {};

    if (data.price) {
      let priceWithoutCurrency = data.price.replace("R$", "").trim();
      let formatedCurrency = priceWithoutCurrency.replace(",", ".");
      const filtredData = filterEmptyStrings(data);

      newData = {
        ...filtredData,
        price: +formatedCurrency,
      };
    } else {
      const filtredData = filterEmptyStrings(data);

      newData = {
        ...filtredData,
      };
    }
    console.log(newData)
    updateMenuItem({ newData, itemId });
  };

  return createPortal (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      top={0}
      backgroundColor={"rgba(0, 0, 0, 0.85)"}
      w={"100vw"}
      h={"100vh"}
      position={"fixed"}
      zIndex={999}
      >
          <Flex
            as="form"
            flexDir={"column"}
            maxW={"400px"}
            margin={"0 auto"}
            mt="2rem"
            gap="1rem"
            onSubmit={handleSubmit(onSubmit)}
            ref={ref}
          >
            <Divider />
            <FormControl isInvalid={!!errors.name}>
              <FormLabel color={"primary-color"}>Nome</FormLabel>
              <Input
                placeholder="Digite o nome do produto"
                {...register("name")}
                bg="title-color"
                defaultValue={item.name}
                borderRadius={"20px"}
              />
              {!!errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.imageURL}>
              <FormLabel color={"primary-color"}>Imagem</FormLabel>
              <Input
                placeholder="Digite a URL da imagem"
                defaultValue={item.imageURL}
                {...register("imageURL")}
                bg="title-color"
                borderRadius={"20px"}
              />
              {!!errors.imageURL && (
                <FormErrorMessage>{errors.imageURL.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.price}>
              <FormLabel color={"primary-color"}>Preço</FormLabel>
              <Input
                bg="title-color"
                borderRadius={"20px"}
                placeholder="Digite o preço do produto"
                {...register("price")}
                defaultValue={item.price?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
                type="text"
              />
              {!!errors.price && (
                <FormErrorMessage>{errors.price.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel color={"primary-color"}>Descrição</FormLabel>
              <Textarea
                bg="title-color"
                borderRadius={"20px"}
                placeholder="Digite a descrição do produto"
                defaultValue={item.description}
                {...register("description")}
              />
              {errors.description && (
                <FormErrorMessage>{errors.description.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.categoryId}>
              <FormLabel color={"primary-color"}>Categoria</FormLabel>
              <Select
                {...register("categoryId")}
                bg="title-color"
                borderRadius={"20px"}
              >
                <option>Selecione a categoria</option>
                {isFetching ? (
                  <Spinner />
                ) : (
                  categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </Select>
            </FormControl>
            <Button bg="logo-color" border={"20px"} type="submit">
              Atualizar
            </Button>
          </Flex>      
    </Flex>,
        document.body
  );
};
