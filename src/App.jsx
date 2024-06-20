import React from "react";
import { Container } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Container my={8} maxW={"70%"}>
      <HomePage />
    </Container>
  );
};

export default App;
