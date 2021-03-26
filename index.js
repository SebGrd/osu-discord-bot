require('dotenv').config();
const {Client} = require('discord.js');
const client = new Client();

const User = require('./commands/user')
const Scores = require('./commands/scores')
const Recent = require('./commands/recent')
const Test = require('./commands/test')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('/osu help', {type: 'COMPETING'})
});

client.on('message', msg => {
    const [prefix, command, ...param] = msg.content.split(' ');
    if (prefix === '/osu') {
        if (command === 'user') User(msg, param);
        if (command === 'scores') Scores(msg, param);
        if (command === 'recent') Recent(msg, param);
        if (command === 'test') Test(msg, param);
    }
});

client.login(process.env.DISCORD_KEY).catch(err => console.log(err))