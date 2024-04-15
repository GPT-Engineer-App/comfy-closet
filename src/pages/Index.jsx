import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, Button, Flex, Spacer, IconButton, Badge, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0LXNoaXJ0fGVufDB8fHx8MTcxMzE2MjY1Nnww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Jeans",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxqZWFuc3xlbnwwfHx8fDE3MTMxNjI2NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 3,
    name: "Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxkcmVzc3xlbnwwfHx8fDE3MTMxNjI2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 4,
    name: "Jacket",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxqYWNrZXR8ZW58MHx8fHwxNzEzMTYyNjU3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Box>
      <Flex bg="gray.100" p={4} alignItems="center">
        <Heading size="xl">Clothing Store</Heading>
        <Spacer />
        <IconButton icon={<FaShoppingCart />} variant="outline" onClick={onOpen}>
          <Badge ml={1} colorScheme="red">
            {cart.length}
          </Badge>
        </IconButton>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={6} p={10}>
        {products.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" overflow="hidden">
            <Image src={product.image} alt={product.name} />
            <Box p={5}>
              <Heading size="md">{product.name}</Heading>
              <Text mt={2} fontSize="sm" fontWeight="500">
                ${product.price}
              </Text>
              <Button mt={4} colorScheme="blue" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Shopping Cart</DrawerHeader>
            <DrawerBody>
              {cart.length === 0 ? (
                <Text>Your cart is empty</Text>
              ) : (
                <>
                  {cart.map((item) => (
                    <Flex key={item.id} alignItems="center" mb={2}>
                      <Text fontSize="lg" mr={4}>
                        {item.name}
                      </Text>
                      <Text fontWeight="bold">${item.price}</Text>
                      <Spacer />
                      <Button size="xs" onClick={() => removeFromCart(item.id)}>
                        X
                      </Button>
                    </Flex>
                  ))}
                  <Heading size="md" mt={8}>
                    Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </Heading>
                  <Button colorScheme="blue" size="lg" mt={4} width="100%">
                    Checkout
                  </Button>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Index;
