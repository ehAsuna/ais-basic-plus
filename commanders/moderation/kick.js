const Discord = require('discord.js');
const BaseCommand = require('../../BaseClasses/baseCommand');

module.exports = class kick extends BaseCommand {
    constructor(){
        super({
            aliases: ['kickuser'],
            description: "kicks a user.",
            name: 'kick',
            permissions: ['KICK_MEMBERS'],
            usage: '`+kick <user> <optional reason>`',
            category: 'moderation'
        });
    }

    async run(client, message, args){
        if(message.member.permissions.has('KICK_MEMBERS')){
            const memberr = message.mentions.members.first();
            if(memberr.kickable == false){
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFB6C1')
                .setDescription(`You cannot ban ${memberr}, sorry!`)
                message.channel.send(newEmbed).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
            if(memberr.kickable == true){
                const memberTarget = message.guild.members.cache.get(memberr.id);
                const reasonn = args.slice(1).join(' ');
                if(reasonn===undefined||reasonn===null) reasonn = 'No reason';
                memberTarget.send(`You have been kicked from ${message.guild.name} \n Reason: ${reasonn}`);
                memberTarget.kick({reason: reasonn});
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFB6C1')
                .setDescription(`${memberr} was kicked\nReason: ${reasonn}`)
                message.channel.send(newEmbed).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);  
            } else{
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFB6C1')
                .setDescription(`User not found/mentioned.`)
                message.channel.send(newEmbed).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
            }
         } else {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#FFB6C1')
            .setDescription(`You cannot ban members.`)
            message.channel.send(newEmbed).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
        }
    }
}}