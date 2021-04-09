const db = require('quick.db');
const BaseCommand = require('../../BaseClasses/baseCommand');
const Discord = require('discord.js');

module.exports = class nickname extends BaseCommand {
    constructor(){
        super({
            aliases: ['nn', 'nick', 'nickn'],
            description: "Change a user's nickname",
            name: 'nickname',
            permissions: ['MANAGE_NICKNAMES'],
            usage: '`+nickname <optional tag>`',
            category: 'moderation'
        });
    }

    async run(client, message, args){
      try{
        if(message.member.permissions.has("MANAGE_NICKNAMES")){
          const target = message.mentions.members.first();
          if(target){
            const nn = args.slice(1).join(' ');
            target.setNickname(nn);

            const newEmbed = new Discord.MessageEmbed()
            .setColor('#FFB6C1').setDescription(`<@${target.id}> set to **${nn}**`);
            message.channel.send(newEmbed);
          } else {
          const nn = args.slice(0).join(' ');
          message.member.setNickname(nn);

          const newEmbed = new Discord.MessageEmbed()
          .setColor('#FFB6C1').setDescription(`Nickname set to **${nn}**`);
          message.channel.send(newEmbed);
          }
        }
        else {
          const newEmbed = new Discord.MessageEmbed()
          .setColor('#FFB6C1').setDescription(`<@${message.author.id}> you don't have permission to use this command.`);
          message.channel.send(newEmbed);
        }
      } catch(e){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1').setDescription(`Invalid Option. Nickname too long or un-usable character`);
        message.channel.send(newEmbed);
      }
    }
}