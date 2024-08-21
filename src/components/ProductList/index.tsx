import React, { Fragment } from 'react';
import { MenuItensCard } from '../MenuItemCard';
import { Box, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { IMenuItemInterfaceData, ProductListProps } from '../../interfaces/menuItem.interfaces';

export const ProductList: React.FC<ProductListProps> = ({ cardapio, categories = [], selected, handleSearch, isSearching, filteredCardapio }) => {
  // Decide qual lista de itens usar com base na prop `isSearching`
  const itemsToDisplay = isSearching ? filteredCardapio : cardapio;
  const filteredItems = selected
    ? itemsToDisplay.filter((item) => item.categoryId === selected)
    : itemsToDisplay;

  return (
    <Container maxW={"5xl"} w={{ base: "100%", md: "65%", lg: "60%" }}>
      <Flex width={"100%"} flexDir="column" justifyContent="center" alignItems="flex-start">
        {selected ? (
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="10rem">
            {filteredItems.map((item) => (
              <Fragment key={item.id}>
                <MenuItensCard item={item} />
              </Fragment>
            ))}
          </SimpleGrid>
        ) : (
          categories.map((category) => (
            <Fragment key={category.id}>
              <Heading m="1.125rem 0 1.5rem 0">{category.name}</Heading>
              <Flex
                overflowX={"scroll"}
                gap={"2rem"}
                paddingBottom={"2rem"}
                sx={{
                  '::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '::-webkit-scrollbar-track': {
                    background: 'none',
                  },
                  '::-webkit-scrollbar-thumb': {
                    backgroundColor: '#116CA0',
                    borderRadius: '20px',
                    border: '3px solid transparent',
                  },
                }}
              >
                {itemsToDisplay
                  .filter((item) => item.categoryId === category.id)
                  .map((item) => (
                    <Fragment key={item.id}>
                      <Box w="100%">
                        <MenuItensCard item={item} />
                      </Box>
                    </Fragment>
                  ))}
              </Flex>
            </Fragment>
          ))
        )}
      </Flex>
    </Container>
  );
};