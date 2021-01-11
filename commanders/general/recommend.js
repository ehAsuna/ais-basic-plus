const BaseCommand = require('../../BaseClasses/baseCommand');
const Discord = require('discord.js');

module.exports = class recommend extends BaseCommand {
    constructor(){
        super({
            aliases: ['suggest'],
            description: "Suggest a new feature for me, or for the support server!",
            name: 'recommend',
            permissions: ['SEND_MESSAGES'],
            usage: '`+recommend <message>`',
            category: 'general'
        });
    }

    async run(client, message, args){
        const channelToSend = message.guild.channels.cache.find(channel => channel.name === '👍-recommendations');
        const Author = message.author.tag;        ;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle(`${Author}'s Recommendation:`)
        .setDescription(args.slice(0).join(' '));

        const errorEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setDescription('You need to reccomend something.');

        const sentEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Recommendation sent! \nStay tuned for an anime/gaming version of this commands!');

        if(message.length <= '0' || message == null || message == undefined){
            message.channel.send(errorEmbed);
        } else{
            channelToSend.send(newEmbed);
            message.channel.send(sentEmbed);
        }
    }
}