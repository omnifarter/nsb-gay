import { Avatar, Text, Button, Paper } from "@mantine/core";
import { playerInfo } from "../../helpers/data";

export function TeamCards() {
  return (
    <>
      {playerInfo.map((player) => (
        <Paper
          radius="md"
          withBorder
          p="lg"
          mb="sm"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          })}
        >
          <Avatar src={player.avatar} size={120} radius={120} mx="auto" />
          <Text align="center" size="lg" weight={500} mt="md">
            {player.name}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {player.role}
          </Text>
          <Text align="center" size="md">
            {player.quote}
          </Text>
        </Paper>
      ))}
    </>
  );
}
