import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, Button, Flex, Spacer, IconButton, Badge, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Card, CardBody, CardFooter, Stack, Divider } from "@chakra-ui/react";
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
      <Box bgImage="url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920')" bgPosition="center" bgSize="cover" h="400px">
        <Flex direction="column" alignItems="center" justify="center" h="100%" bg="rgba(0,0,0,0.5)">
          <Heading color="white" size="3xl">Welcome to Our Store</Heading>
          <Text color="white" mt={4} fontSize="xl">Find the latest fashion and trends</Text>
        </Flex>
      </Box>
      
      <Flex bg="gray.100" p={4} alignItems="center">
        <Image src="/logo.png" alt="Store Logo" w="50px" mr={4} />
        <Heading size="xl">ACME Clothing</Heading>
        <Spacer />
        <IconButton icon={<FaShoppingCart />} variant="outline" onClick={onOpen}>
          <Badge ml={1} colorScheme="red">
            {cart.length}
          </Badge>
        </IconButton>
      </Flex>

      <Grid templateColumns={{base: "repeat(1, 1fr)", md:"repeat(3, 1fr)", lg:"repeat(4, 1fr)"}} gap={6} p={10}>
        {products.map((product) => (
          <Card key={product.id} borderRadius="lg" overflow="hidden">
            <Image src={product.image} alt={product.name} />
            <CardBody>
              <Stack mt={6} spacing={3} align="center">  
                <Heading size="md">{product.name}</Heading>
                <Text fontWeight="bold" color="blue.600" fontSize="xl">
                  ${product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button w="100%" colorScheme="blue" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Grid>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader bg="blue.600" color="white">Shopping Cart</DrawerHeader>
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
                  <Divider />
                  <Box p={4}>
                    <Heading size="md">
                      Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </Heading>
                    <Button colorScheme="green" size="lg" mt={4} w="100%">
                    Checkout
                  </Button>
                </Box>
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
