//config 
const discord = require('discord.js')
const client = new discord.Client()
const ytdl = require('ytdl-core')
const {prefix, token} = require('./config.json')
const fs = require('fs')
//const distube = require('distube')

//command handler
client.commands = new discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// boot
client.once('ready', () => {
    console.log(`aya acordou!! ${client.user.tag}`)
    client.user.setActivity("radio united",{type: "LISTENING"})
})


//interactions
client.on('message', message => 
{
    if(!message.content.startsWith(prefix) || message.author.bot) return
    
    //pick data    
    const VC = message.member.voice.channel
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase()
    
    //events
    if(cmd === 'ola' || cmd.startsWith('oi'))
    {
        client.commands.get('ola').execute(message, args)
    }
    else if(cmd === 'toca')
    {
        client.commands.get('toca ai').execute(message,args,ytdl,VC)
    }
    else if(cmd === 'stop')
    {
        client.commands.get('stop').execute(message, args, VC)
    }    
    else if (cmd === 'poderes'){
       client.commands.get('poderes').execute(message, args)
       
    }
})

client.login(token)


