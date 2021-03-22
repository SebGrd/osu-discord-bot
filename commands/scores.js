require('dotenv').config();
const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');

function scores(msg, param) {
    if (!param.length) {
        msg.reply('Please provide a beatmap link or id.');
    } else {
        if (param[1]) { // If user is specified
            const [beatmap, ...username] = param;
            const beatmapId = beatmap.split('/')[beatmap.split('/').length - 1]
            fetch(`${process.env.OSU_URL}/get_scores?k=${process.env.OSU_KEY}&b=${beatmapId}&u=${username.join(' ')}`)
                .then(res => res.json())
                .then(async data => {
                    if (!data.length) msg.reply('Data couldn\'t be found.');
                    else {
                        const response = await fetch(`${process.env.OSU_URL}/get_beatmaps?k=${process.env.OSU_KEY}&b=${beatmapId}`)
                        const beatmapData = await response.json()
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
                        const notes = {
                            50: parseInt(count50),
                            100: parseInt(count100),
                            300: parseInt(count300),
                            miss: parseInt(countmiss),
                        }
                        const accuracy = Math.floor(((50 * notes["50"]) + (100 * notes["100"]) + (300 * notes["300"])) / (300 * (notes.miss + notes["50"] + notes["100"] + notes["300"])) * 10000) / 100;

                        const embed = new MessageEmbed()
                            .setColor(16286199)
                            .setAuthor(`${title} [${version}]`)
                            .setDescription(`⭐${Math.floor(difficultyrating * 100) / 100}`)
                            .addField(
                                'Notes',
                                `Accuracy: **${accuracy}%**
                                ❌: **${countmiss}**
                                50: **${count50}**
                                100: **${count100}**
                                300: **${count300}**
                                Max combo: **${maxcombo}/${max_combo}**
                                `, true)
                            .addField(
                                'Score',
                                `PP: **${pp}**
                                Score: **${score}**
                                Rank: **${rank}**
                                FC: **${(perfect === '1' ? '✅' : '❌')}**
                                Mods: **${enabled_mods}**
                                `, true)
                            .setImage(`https://assets.ppy.sh/beatmaps/${beatmapset_id}/covers/cover.jpg`)
                            .setFooter(`Played by ${username} on ${date}.`)

                        msg.reply(embed);
                    }
                })
        } else { // Is user isn't specified
            msg.reply('No user specified.');
        }
    }
}


module.exports = scores;