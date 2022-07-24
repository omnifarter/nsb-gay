import { showNotification } from "@mantine/notifications"

export const cordialsInvite = () => {
    fetch(`https://api.telegram.org/${process.env.REACT_APP_TELEBOT_TOKEN}/sendMessage?chat_id=${process.env.REACT_APP_TELEBOT_CHAT_ID}&text=CORDIALS HAS BEEN SUMMONED`)
        showNotification({
            title: 'Message sent!',
            message: 'Cordials has been summoned.',
          })

    // TODO (if i'm not lazy): discord app requires a backend, cannot call request from browser directly.
}