import { showNotification } from "@mantine/notifications"

export const cordialsInvite = () => {
    fetch(`https://api.telegram.org/${process.env.REACT_APP_TELEBOT_TOKEN}/sendMessage?chat_id=${process.env.REACT_APP_TELEBOT_CHAT_ID}&text=CORDIALS HAS BEEN SUMMONED`)
        showNotification({
            title: 'Message sent!',
            message: 'Cordials has been summoned.',
          })

    // TODO (if i'm not lazy): discord app requires a backend, cannot call request from browser directly.
}

export const getWinStreak = async() => {
   const matches:any[] = (await (await fetch(`https://api.opendota.com/api/players/162514528/recentMatches`)).json())
   // player_slot 0-127 are Radiant, 128-255 are Dire
   // radiant_win
   const isWin = (match:any) => {
    if(match.radiant_win){
        return match.player_slot < 128
    }else{
        return match.player_slot > 127
    }
   }
   let lostStreak = matches.findIndex(isWin)
   let winStreak = matches.findIndex((match)=>!isWin(match))

       return {
           win:lostStreak === 0,
           streak: lostStreak === 0 ? winStreak : lostStreak,
           streakArray: Array.from(Array(lostStreak === 0 ? winStreak + 1 : lostStreak + 1).keys()),
           winArray: lostStreak === 0 ? ['loss', 'win'] : ['win','loss']
       }
}