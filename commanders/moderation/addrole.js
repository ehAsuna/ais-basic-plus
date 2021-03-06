const Discord = require('discord.js');
const BaseCommand = require('../../BaseClasses/baseCommand');

module.exports = class addrole extends BaseCommand {
    constructor(){
        super({
            aliases: ['roleadd'],
            description: "Adds a role to a user.",
            name: 'addrole',
            permissions: ['MANAGE_ROLES'],
            usage: '`+addrole <user> <role>`',
            category: 'moderation'
        });
    }

    async run(client, message, args){
        if(message.member.permissions.has("MANAGE_ROLES")){
            let target = message.mentions.members.first(); 
            if(target){
            let memberRoles = target.roles.cache;
            let addRoler = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.add(addRoler.id);

            message.channel.send({embed: {
              color: '#FFB6C1',
              description: `<@${memberTarget.user.id}> has been given the <@&${args[1]}> role.`
            }}).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
            } else {
            message.channel.send('User or role not found.').then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
            }   
        } else{
            message.channel.send('You are not allowed to add roles.').then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
        }
    }
}
