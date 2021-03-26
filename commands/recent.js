const $API = require('./../utils/api');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { getRankIcon, getModsEmoji, getMods, getCompletionPercentage, getAccuracy, getNotesEmoji } = require('./../utils/osuConverters')

async function recent(msg, param) {
    if (!param.length) return msg.reply('Please specify an user.'); // If user ain't specified
    const user = param.join(' ');
    const [ scoreData ] = await $API('/get_user_recent', {u: user})
    if (!scoreData) return msg.reply('No score has been found.'); // If user ain't found
    const [ beatmapData ] = await $API('/get_beatmaps', {b: scoreData.beatmap_id});
    console.log(beatmapData)
    console.log(scoreData)
    const rankIcon = new MessageAttachment(getRankIcon(scoreData.rank), 'rank.png')
    const embed = new MessageEmbed()
        .setColor(16233809)
        .attachFiles(rankIcon)
        .setAuthor(`${beatmapData.artist} - ${beatmapData.title} [${beatmapData.version}]`, 'attachment://rank.png', `https://osu.ppy.sh/beatmapsets/${beatmapData.beatmapset_id}#osu/${beatmapData.beatmap_id}`)
        .setDescription(`**${Math.floor(beatmapData.difficultyrating * 100) / 100}★** ▬ ${getModsEmoji(getMods(scoreData.enabled_mods)).join('')}`)
        .addField('Score', `Combo: ${scoreData.maxcombo}/${beatmapData.max_combo}x
        ${getNotesEmoji('miss')}: ${scoreData.countmiss}
        ${getNotesEmoji('50')}: ${scoreData.count50}
        ${getNotesEmoji('100')}: ${scoreData.count100}
        ${getNotesEmoji('300')}: ${scoreData.count300}
        `, true)
        .addField('᲼', `Accuracy: ${getAccuracy(scoreData)}%`, true)
        // .addField('Ranking', `pp: ${scoreData.pp}`, true)
        .addField('Completion (WIP)', `${getCompletionPercentage(scoreData, beatmapData)}% ▰▰▰▰▰▰▰▰▱▱`)
        .setImage(`https://assets.ppy.sh/beatmaps/${beatmapData.beatmapset_id}/covers/cover.jpg`)
        .setFooter(`Played by ${user} on ${scoreData.date}.`, `https://a.ppy.sh/${scoreData.user_id}`)
    msg.reply(embed)

}

module.exports = recent;