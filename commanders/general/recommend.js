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
        const Author = message.author;        ;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle(`Server Recommendation:`)
        .setDescription(args.slice(0).join(' '))
        .setAuthor(message.author.tag, message.author.avatarURL())

        const errorEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setDescription('You need to reccomend something.');

        const sentEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Recommendation sent! Thank you.');

        try {
          gogo();
        } catch(e) {
          
        } 

      async function gogo() {
        if(message.length <= '0' || message.content == null || message.content == undefined){
            message.channel.send(errorEmbed).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
        } else{
          message.channel.send(sentEmbed);
          const question = await channelToSend.send(newEmbed); 

          let ryC = 0;

          let rnC = 0;


          ['👍', '👎'].forEach(async el => await question.react(el)); 
      }
    }
  }
}
