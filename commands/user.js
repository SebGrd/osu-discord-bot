const {MessageEmbed, MessageAttachment} = require('discord.js');
const Canvas = require('canvas');
const $API = require('./../utils/api')

async function user(msg, param) {
    if (!param.length) {
        msg.reply('Please specify a user.');
    } else {
        const data = await $API('/get_user', {u: param.join(' ')});
        if (!data.length) msg.reply('User couldn\'t be found.');
        else {
            // Deconstructing needed vars
            const {
                user_id,
                username,
                pp_rank,
                level,
                pp_raw,
                accuracy,
                playcount,
                total_seconds_played,
                join_date,
                country,
                pp_country_rank
            } = data[0];
            // Generate progress bar image
            const canvas = Canvas.createCanvas(600, 30);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.font = '20px sans-serif';
            ctx.fillText(Math.floor(level).toString(), 0, 17);
            ctx.fillRect(50, 0, 600, 20);
            ctx.fillStyle = 'rgb(49, 29, 139)';
            const barFactor = ('000' + level.split('.')[1]).substr(-3);
            const barWidth = barFactor * 548 / 1000;
            ctx.fillRect(52, 2, barWidth, 16);
            const progressBar = new MessageAttachment(canvas.toBuffer(), 'progressbar.png')

            // Displaying data
            const embed = new MessageEmbed()
                .setColor(11286893)
                .setAuthor(username, `https://a.ppy.sh/${user_id}`, `https://osu.ppy.sh/users/${user_id}`)
                .addField(
                    'Ranking',
                    `▫ Rank: **#${pp_rank}**
                                    ▫ PP: **${Math.floor(pp_raw)}**
                                    ▫ Accuracy: **${Math.floor(accuracy * 100) / 100}%**
                                    ▫ Country rank: **#${pp_country_rank}**`,
                    true)
                .addField(
                    'Stats',
                    `▫ Level: **${Math.floor(level)}**
                                    ▫ Play count: **${playcount}**
                                    ▫ Time played: **${Math.floor(total_seconds_played / 60 / 60 * 100) / 100}h**`,
                    true)
                .addField(
                    '᲼᲼᲼᲼᲼᲼',
                    '**Level**'
                )
                .attachFiles(progressBar)
                .setImage('attachment://progressbar.png')
                .setFooter(`Joined osu! on ${join_date}`, `https://osu.ppy.sh/images/flags/${country}.png`)
            msg.channel.send(embed);
        }
    }
}

module.exports = user;