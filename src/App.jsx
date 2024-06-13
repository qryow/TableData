import React from "react";
import { Container } from "@chakra-ui/react";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <Container my={8} maxW={"70%"}>
      <MainRoutes />
    </Container>
  );
};

export default App;
