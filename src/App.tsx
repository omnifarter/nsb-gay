import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  Container,
  Divider,
  Header,
  Text,
  Title,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { climbingInvite, cordialsInvite, getWinStreak, valCordialsInvite } from "./helpers/api";
import { TeamCards } from "./components/TeamCards";
import CountUp from "react-countup";
import Streak from "./components/Streak";

function App() {
  return (
    <AppShell>
      <Container>
        <Streak />
        <Divider mb="xl" />
        <Text size="xl" mb="sm">
          Active Roster
        </Text>
        <TeamCards />
        <Text align="center" mt="lg" size="xl">
          Wanna climb?
        </Text>
        <Center>
          <Button
            fullWidth
            size="xl"
            color="blue"
            variant="filled"
            mt="lg"
            onClick={climbingInvite}
          >
            CORDIALS
          </Button>
        </Center>
        <Text align="center" mt="lg" size="xl">
          Ready to play some games?
        </Text>
        <Center>
          <Button
            fullWidth
            size="xl"
            color="blue"
            variant="filled"
            mt="lg"
            onClick={cordialsInvite}
          >
            CORDIALS
          </Button>
        </Center>
        <Text align="center" mt="lg" size="xl">
          Ready to play the better game?
        </Text>
        <Center>
          <Button
            fullWidth
            size="xl"
            color="blue"
            variant="filled"
            mt="lg"
            onClick={valCordialsInvite}
          >
            VAL CORDIALS
          </Button>
        </Center>
      </Container>
    </AppShell>
  );
}

export default App;
