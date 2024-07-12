import { Box, Flex } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

interface IMenuOpenProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MenuToggle = ({ isOpen, onToggle }: IMenuOpenProps) => {
  return (
    <Flex align={"flex-end"} justify={"flex-start"}>
      <Box
        p="1rem"
        onClick={onToggle}
        display={{
          base: "block",
          md: "none",
        }}
        color="logo-color"
      >
        {isOpen ? (
          <IoMdClose size={"30px"} cursor="pointer" color="logo-color" />
        ) : (
          <GiHamburgerMenu size={"30px"} cursor="pointer" />
        )}
      </Box>
    </Flex>
  );
};
