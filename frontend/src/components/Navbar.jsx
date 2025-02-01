import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container>
      <Flex justifyContent={"space-between"}>
        <Link to>FaqSystem</Link>
        <HStack spaceX={3}>
          <Link to={"/admin/create"}>CREATE</Link>
          <Link to={"/admin"}>HOME</Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
