const BaseCommand = require('../../BaseClasses/baseCommand');
const usedCommand = new Set();
const Discord = require('discord.js');

module.exports = class pfp extends BaseCommand {
    constructor(){
        super({
            aliases: ['avatar', 'av', 'profilepic'],
            description: "Displays a your profile picture",
            name: 'pfp',
            permissions: ['SEND_MESSAGES'],
            usage: '`+pfp <optional user>`',
            category: 'general'
        });
    }

    async run(client, message, args){
        let user;
        if (!args[0]) user = message.author;
        if (args[0] && isNaN(args[0])) user = message.mentions.users.first();
        if (args[0] && !isNaN(args[0])) {
          user = client.users.cache.get(args[0]);

          if (!message.guild.members.cache.has(args[0]))
            return message.reply(':x: User not found.');
        }

        if (!user.avatarURL())
          return message.reply(`:x: ${user.tag} profile photo not found.`);
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(
            `[PNG](${user.avatarURL({
              format: 'png'
            })}) **|** [JPG](${user.avatarURL({
              format: 'jpg'
            })}) **|** [WEBP](${user.avatarURL({ format: 'webp' })})`
          )
          .setImage(user.avatarURL({ dynamic: true }) + '?size=2048') //Size :D
          .setTimestamp()
          .setAuthor(user.tag, user.avatarURL());

        message.channel.send(embed);
        /*const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setAuthor(user.username)
        .setImage(user.displayAvatarURL());
        message.channel.send(avatarEmbed); */
    }
}