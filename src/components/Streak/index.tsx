import { Title } from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import CountUp from "react-countup";
import { getWinStreak } from "../../helpers/api";
import ReactTextTransition, { presets } from "react-text-transition";

interface StreakProps {}

const Streak: FunctionComponent<StreakProps> = () => {
  const [streak, setStreak] = useState<{
    win: boolean;
    streak: number;
    streakArray: number[];
  }>({
    win: false,
    streak: -1,
    streakArray: [0],
  });
  const [animateIndex, setAnimateIndex] = useState(0);
  const [animateWinIndex, setAnimateWinIndex] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  useEffect(() => {
    const asyncCall = async () => {
      setStreak(await getWinStreak());
    };
    asyncCall();
  }, []);
  useEffect(() => {
    setTimer(
      setInterval(
        () => {
          setAnimateIndex((index) => {
            if (index < streak.streak) {
              return index + 1;
            } else {
              return index;
            }
          });
        },
        200 // every 0.3 seconds
      )
    );
  }, [streak]);

  useEffect(() => {
    if (animateIndex === streak.streak) {
      streak.win && setAnimateWinIndex(1);
      clearTimeout(timer);
    }
  }, [animateIndex]);

  return (
    <>
      <Title align="center" mt="xl">
        NSB is currently on a{" "}
        <ReactTextTransition inline>
          {streak.streakArray[animateIndex]}
        </ReactTextTransition>{" "}
        <ReactTextTransition inline>
          {["lost", "win"][animateWinIndex]}
        </ReactTextTransition>{" "}
        streak
      </Title>
    </>
  );
};

export default Streak;
