const {MessageEmbed} = require('discord.js');
const $API = require('./../utils/api')
const {getMods, getMapStatus, getAccuracy, getNotesEmoji, getModsEmoji, getRankEmoji} = require('./../utils/osuConverters')
const {formatSeconds} = require('./../utils/converters')
const {MessageAttachment} = require('discord.js')

async function scores(msg, param) {
    if (!param.length) {
        msg.reply('Please provide a beatmap link or id.');
    } else {
        if (param[1]) { // If user is specified
            const [beatmap, ...username] = param;
            const beatmapId = beatmap.split('/')[beatmap.split('/').length - 1]
            const data = await $API('/get_scores', {b: beatmapId, u: username.join(' ')});
            if (!data.length) msg.reply('Data couldn\'t be found.');
            else {
                const beatmapData = await $API('/get_beatmaps', {b: beatmapId});
                const {
                    artist,
                    title,
                    version,
                    difficultyrating,
                    max_combo,
                    beatmapset_id,
                } = beatmapData[0];
                const {
                    score,
                    username,
                    maxcombo,
                    count50,
                    count100,
                    count300,
                    countmiss,
                    perfect,
                    enabled_mods,
                    date,
                    rank,
                    pp
                } = data[0];
                const accuracy = getAccuracy(data[0])

                const embed = new MessageEmbed()
                    .setColor(16286199)
                    .setAuthor(`${artist} - ${title} [${version}]`)
                    .setDescription(`⭐${Math.floor(difficultyrating * 100) / 100}`)
                    .addField(
                        'Notes',
                        `Accuracy: **${accuracy}%**
                                ${getNotesEmoji('miss')}: **${countmiss}**
                                ${getNotesEmoji('50')}: **${count50}**
                                ${getNotesEmoji('100')}: **${count100}**
                                ${getNotesEmoji('300')}: **${count300}**
                                Max combo: **${maxcombo}/${max_combo}x**
                                `, true)
                    .addField(
                        'Score',
                        `PP: **${Math.round(pp)}**
                                Score: **${score}**
                                Rank: **${getRankEmoji(rank)}**
                                FC: **${(perfect === '1' ? '✅' : '❌')}**
                                Mods: ${getModsEmoji(getMods(enabled_mods))}
                                `, true)
                    .setImage(`https://assets.ppy.sh/beatmaps/${beatmapset_id}/covers/cover.jpg`)
                    .setFooter(`Played by ${username} on ${date}.`)

                msg.reply(embed);
            }
        } else { // Is user isn't specified
            const [beatmap] = param;
            const beatmapId = beatmap.split('/')[beatmap.split('/').length - 1]
            const scoreData = await $API('/get_scores', {b: beatmapId, limit: 10})
            const beatmapData = await $API('/get_beatmaps', {b: beatmapId});

            console.log(beatmapData)
            const {
                beatmapset_id, beatmap_id, artist, title, version, bpm, total_length,
                approved, max_combo, difficultyrating, playcount, passcount
            } = beatmapData[0]
            const scores = await scoreData.map((score, key) => ({
                name: `#${key + 1} - ${score.username}`,
                value: `${score.rank} - ${getMods(score.enabled_mods).join('')} - ${getAccuracy(score)}% - ${score.maxcombo}/${max_combo}x - ${Math.floor(score.pp)}pp
                300: ${score.count300} / 100: ${score.count100} / 50: ${score.count50} / X: ${score.countmiss}`
            }))
            const statusIcon = new MessageAttachment(getMapStatus(approved).icon, 'status.png')
            const embed = new MessageEmbed()
                .attachFiles(statusIcon)
                .setColor(16286199)
                .setDescription(`${Math.floor(difficultyrating * 100) / 100} ⭐ / BPM: ${bpm} / Length: ${formatSeconds(total_length)}`)
                .setAuthor(`${artist} - ${title} [${version}]`, 'attachment://status.png', `https://osu.ppy.sh/beatmapsets/${beatmapset_id}#osu/${beatmap_id}`)
                .addFields(scores)
                .setImage(`https://assets.ppy.sh/beatmaps/${beatmapset_id}/covers/cover.jpg`)
                .setFooter(`Played ${playcount} times for a ${Math.floor(passcount / playcount * 10000) / 100}% pass rate.`)

            msg.reply(embed);
        }

    }
}


module.exports = scores;