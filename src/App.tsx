import React from "react";
import logo from "./logo.svg";
import { Button, Center, Container, Header, Text, Title } from "@mantine/core";
import { cordialsInvite } from "./helpers/api";

function App() {
  return (
    <Container>
      <Title align="center" mt="xl">
        We are NSB.gay and WE OWN. We have a 10 WIN STREAK (Except Philip)
      </Title>
      <Center>
        <Button size="xl" variant="outline" mt="lg" onClick={cordialsInvite}>
          CORDIALS
        </Button>
      </Center>
    </Container>
  );
}

export default App;
