const distube = require(`./distube`)
distube.run()
const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
const files = require(`./dataManager.js`)
const permVerify = require(`./permitVerify`)
const handler = require(`./handlers`)
client.commands = new discord.Collection()
client.database = new discord.Collection()

//command handler
handler.commandHandler(client)

//data handler 
handler.dataHandler(client)

// boot
client.once('ready', () => {
    console.log(`aya acordou!! ${client.user.tag}`)
    client.user.setActivity("radio united", { type: "LISTENING" })
})

//interactions
client.on('message', async (message) => {
    // get prefix
    let stringPrefix = message.content.toLowerCase()
    let prefixVerify
    for (prefix of config.prefix) {
        if (!stringPrefix.startsWith(prefix))
            prefixVerify = false
        else {
            prefixVerify = true
            return
        }
    }
    if (!prefixVerify || message.author.bot) return
    //if(message.member.id !== '427193787094401045') return console.log(`usuário nao autorizado`)//message.channel.send('comandos em beta nao habilitados')

    //pick data    
    const args = message.content.slice(config.prefix[0].length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    //cria o database do server    
    const localData = files.fileManager()

    //music commands
    if (config.distube.includes(cmd)) return

    //pega o database do server existente
    const dataServer = require(localData)

    adm = permVerify.getRolesAdmin(dataServer, message)


    client.commands.get('start').run(client, message, args)

    if (message.content.startsWith(`y!ute `)) {
        adm = permVerify.verificaradmeiro(message)
        if (adm) return
        client.commands.get(`y!mute`).run(client, message, args)
        return
    }
    else if (cmd === `reload`) {
        client.database.get(`reload`).run(client, message, args)
    }

    else {
        let comando = client.commands.get(cmd)
        try {
            comando.run(client, message, args)
        }
        catch (e) {
            console.log('comando inexistente ')
        }
    }
})

client.login(config.token)
