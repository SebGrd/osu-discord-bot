const $API = require('./../utils/api');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { getRankEmoji, getRankIcon } = require('./../utils/osuConverters')

async function recent(msg, param) {
    if (!param.length) return msg.reply('Please specify an user.'); // If user ain't specified
    const [ scoreData ] = await $API('/get_user_recent', {u: param.join(' ')})
    if (!scoreData) return msg.reply('No score has been found.'); // If user ain't found
    const [ beatmapData ] = await $API('/get_beatmaps', {b: scoreData.beatmap_id});
    console.log(beatmapData)
    console.log(scoreData)
    const rankIcon = new MessageAttachment(getRankIcon(scoreData.rank), 'rank.png')
    const embed = new MessageEmbed()
        .setColor(16233809)
        .attachFiles(rankIcon)
        .setAuthor(`${beatmapData.artist} - ${beatmapData.title} [${beatmapData.version}]`, 'attachment://rank.png')
        .setDescription(getRankEmoji('XH') + getRankEmoji('X') + getRankEmoji('SH') + getRankEmoji('S') + getRankEmoji('A') + getRankEmoji('B') + getRankEmoji('C') + getRankEmoji('D') + getRankEmoji('F'))
    msg.reply(embed)

}

module.exports = recent;