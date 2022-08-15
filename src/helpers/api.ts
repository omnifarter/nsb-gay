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
  //TODO: insert dil's ID.
  const players = ["162514528","93610202","90314875","60267512","143581614"]
  const matches = []
  
  for await (const player of players) {
    matches.push(  await (
        await fetch(`https://api.opendota.com/api/players/${player}/recentMatches`)
      ).json()
    )
  }

  // player_slot 0-127 are Radiant, 128-255 are Dire
  // radiant_win

  const isWin = (match: any) => {
    if (match.radiant_win) {
      return match.player_slot < 128;
    } else {
      return match.player_slot > 127;
    }
  };

  // first we sort players by latest match played.
  matches.sort((a,b)=>{
    if(a[0].match_id < b[0].match_id){
      return 1
    } else if (a[0].match_id == b[0].match_id){
      return 0
    } else{
      return -1
    }
  })

  let playerWinStreaks = []
  let playerLossStreaks = []
  
  for (let i = 0; i < matches.length; i++) {
    const playerMatches = matches[i];
    let playerWin = 0
    let playerLoss = 0
    for (let j = 0; j < playerMatches.length; j++) {
      const match = playerMatches[j];
      if (match.party_size < 4) {
        break
      }
      // first match
      if(j == 0){
        isWin(match) ? playerWin+=1 : playerLoss +=1
      } else {
        if(playerWin != 0){
          if (isWin(match)){
            playerWin += 1
          } else {
            break
          }
        } else if (playerLoss != 0){
          if(!isWin(match)){
            playerLoss += 1
          } else {
            break
          }
        }
      }
    }
    playerWinStreaks.push(playerWin) 
    playerLossStreaks.push(playerLoss)
  }

  // we only use the latest matches as streaks.
  const longestLossStreak = playerLossStreaks[0]
  const longestWinStreak = playerWinStreaks[0]
  return {
    win: longestLossStreak === 0,
    streak: longestLossStreak === 0 ? longestWinStreak : longestLossStreak,
    streakArray: Array.from(
      Array(longestLossStreak === 0 ? longestWinStreak + 1 : longestLossStreak + 1).keys()
    ),
    winArray: longestLossStreak === 0 ? ["loss", "win"] : ["win", "loss"],
  };
};
