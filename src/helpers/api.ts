import { showNotification } from "@mantine/notifications";

export const cordialsInvite = () => {
  fetch(
    `https://api.telegram.org/${
      process.env.REACT_APP_TELEBOT_TOKEN
    }/sendPoll?chat_id=${
      process.env.REACT_APP_TELEBOT_CHAT_ID
    }&question=CORDIALS HAS BEEN SUMMONED&options=${JSON.stringify([
      "Yes",
      "No",
      "Also Yes but maybe later",
    ])}&is_anonymous=false`
  );
  showNotification({
    title: "Message sent!",
    message: "Cordials has been summoned.",
  });

  // TODO (if i'm not lazy): discord app requires a backend, cannot call request from browser directly.
};

export const valCordialsInvite = () => {
  fetch(
    `https://api.telegram.org/${
      process.env.REACT_APP_TELEBOT_TOKEN
    }/sendPoll?chat_id=${
      process.env.REACT_APP_TELEBOT_CHAT_ID
    }&question=VAL CORDIALS HAS BEEN SUMMONED&options=${JSON.stringify([
      "Yes",
      "No",
      "Also Yes but maybe later",
    ])}&is_anonymous=false`
  );
  showNotification({
    title: "Message sent!",
    message: "Valorant cordials has been summoned.",
  });
};

export const getWinStreak = async () => {
  const matches: any[] = await (
    await fetch(`https://api.opendota.com/api/players/162514528/recentMatches`)
  ).json();
  // player_slot 0-127 are Radiant, 128-255 are Dire
  // radiant_win
  const isWin = (match: any) => {
    if (match.radiant_win) {
      return match.player_slot < 128;
    } else {
      return match.player_slot > 127;
    }
  };
  let lostStreak = matches.findIndex(isWin);
  let winStreak = matches.findIndex((match) => !isWin(match));

  return {
    win: lostStreak === 0,
    streak: lostStreak === 0 ? winStreak : lostStreak,
    streakArray: Array.from(
      Array(lostStreak === 0 ? winStreak + 1 : lostStreak + 1).keys()
    ),
    winArray: lostStreak === 0 ? ["loss", "win"] : ["win", "loss"],
  };
};
