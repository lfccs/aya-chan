//config 
const discord = require('discord.js')
const client = new discord.Client()
const {prefix, token} = require('./config.json')
const fs = require('fs')
//command handler

client.commands = new discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}


//set banco de dados 
/*client.database = new discord.Collection()
const dataFiles = fs.readdirSync('./database/').filter(dfile => dfile.endsWith('.json'))
for (const dfile of dataFiles)
{
    const data = require(`./database/${dfile}`)
    client.dataFiles.set(database.name, data)

}*/



// boot
client.once('ready', () => {
    console.log(`aya acordou!! ${client.user.tag}`)
    client.user.setActivity("radio united",{type: "LISTENING"})
})

//interactions
client.on('message', async (message) => 
{
    //cria o database do server
    if (!fs.existsSync(`./database/${message.guild.id}.json`)) fs.writeFileSync(`./database/${message.guild.id}.json`,
    JSON.stringify({},null,4), err => {
        if(err)
    {
        console.log(err)
        message.channel.send(err)
    }
    })
    

    // atualiza o database
    //client.commands.get('base').execute(message)

    if(!message.content.startsWith(prefix[0]) || message.author.bot) return
    
    //pick data    
    const VC = message.member.voice.channel
    const args = message.content.slice(prefix[0].length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    
    
    
    //comandos
    if(cmd === 'ola' || cmd.startsWith('oi'))
    {
        client.commands.get('ola').execute(message, args)
    }
    else if (cmd === 'poderes'){
        
        client.commands.get('poderes').execute(message, args)
    }   
    else if (cmd === "start")
    {
        let d = client.commands.get('start').execute(message, args, 0)
        writedoc(message, d)

    }
    else if (cmd === "cargos"){
        let d = client.commands.get('start').execute(message, args, 0)
        writedoc(message, d)

        client.commands.get("cargos").execute(client,message,args   )
    }
    else if (cmd === "mute"){
        let d = client.commands.get('mute').execute(message, args, client)
        writedoc(message, d)
    }
    else if (cmd === "unmute"){
        let d = client.commands.get('unmute').execute(message, args)
        
        writedoc(message, d)
    }
    else if (cmd === "setupmutes"){

    }


})  

function writedoc(message, d) {
    fs.writeFileSync(`./database/${message.guild.id}.json`,
        d, err => {
            if(err)
            {
                console.log(err)
                message.channel.send(err)
            }
        })
        
}



client.login(token)
