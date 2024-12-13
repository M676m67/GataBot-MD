import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = m => m
handler.before = async function (m, { conn, usedPrefix }) {
	
    if (!db.data.chats[m.chat].autolevelup) return
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let username = conn.getName(who)

    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    if (!chat.autolevelup) return !0

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        conn.reply(m.chat, `*❐═━━━═╊⊰⚡⊱╉═━━━═❐*\n*『🆙┇تـم تـرقـيـتـك┇🆙』*\n\n*❐↞┇الـلـفـل الـسـابـق ☁️ ↞ ${before} ┇*\n*❐↞┇الـلـفـل الـحـالـي ⚡ ↞ ${user.level} ┇*\n*❐↞┇الـرتـبـة 🎀 ↞ ${user.role} ┇*\n*❐↞┇الـتـريـخ 📑 ↞ ${new Date().toLocaleString('id-ID')}*\n\n*❐═━━━═╊⊰⚡⊱╉═━━━═❐*`, m)

        // تخصيص المكافآت بناءً على المستوى
        let especial = ['limit', 'diamond', 'joincount', 'emerald', 'berlian', 'kyubi', 'gold', 'money', 'tiketcoin', 'stamina'].getRandom()
        let especialCant = [6, 7, 6, 7, 6, 6, 6, 7, 8, 9, 8, 3, 9, 7, 9].getRandom()

        if (user.level % 5 === 0) { // على سبيل المثال، لكل 5 مستويات
            conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} ${user.level}!!* 🏆
𓃠 *${especialCant * (user.level / 5)} ${global.rpgshop.emoticon(especial)}*`, m)

            user[especial] += especialCant * (user.level / 5)
        }
    }
}

export default handler