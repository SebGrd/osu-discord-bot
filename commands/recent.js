const $API = require('./../utils/api');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { getRankIcon, getModsEmoji, getMods, getCompletionPercentage, getAccuracy } = require('./../utils/osuConverters')

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
        .setDescription(`**${Math.floor(beatmapData.difficultyrating * 100) / 100}★** ▬ ${getModsEmoji(getMods(scoreData.enabled_mods)).join('')}`)
        .addField('Score', `Combo: ${scoreData.maxcombo}/${beatmapData.max_combo}x
        X: ${scoreData.countmiss}
        50: ${scoreData.count50}
        100: ${scoreData.count100}
        300: ${scoreData.count300}
        `, true)
        .addField('᲼', `Accuracy: ${getAccuracy(scoreData)}%`, true)
        // .addField('Ranking', `pp: ${scoreData.pp}`, true)
        .addField('Completion (WIP)', `${getCompletionPercentage(scoreData, beatmapData)}% ▰▰▰▰▰▰▰▰▱▱`)
        .setImage(`https://assets.ppy.sh/beatmaps/${beatmapData.beatmapset_id}/covers/cover.jpg`)
    msg.reply(embed)

}

module.exports = recent;