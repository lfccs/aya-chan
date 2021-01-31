const distube = require(`./distube`)
distube.run()
const fs = require(`fs`)
const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
const files = require(`./dataManager.js`)
const permVerify = require(`./permitVerify`)
const handler = require(`./handlers`)
client.commands = new discord.Collection()
client.database = new discord.Collection()
let adm
let bol
const rss = require('./rss/timers')
//command handler
handler.commandHandler(client)

//data handler 
handler.dataHandler(client)

// boot
client.once('ready', () => {
    console.log(`aya acordou!! ${client.user.tag}`)
    client.user.setActivity("radio united", { type: "LISTENING" })
    rss(client)
})

//interactions
client.on('message', async (message) => {
    

    const d = require(`./database/447096261921996800/data`)

    if(message.author.bot) return
    if (d.canalCriado) {
        if (message.channel.id === d.canalCriado) {
            client.commands.get(`enviarMSGS`).run(client, message)
        }
        if (message.channel.id === d.canalConversa) {
            client.commands.get(`recebermsgs`).run(client, message)            
        }
    }
    // get prefix
    let stringPrefix = message.content.toLowerCase()
    let prefixVerify
    let pref
    for (prefix of config.prefix) {
        if (!prefixVerify) {
            if (!stringPrefix.startsWith(prefix))
                prefixVerify = false
            else {
                prefixVerify = true
                pref = prefix
            }
        }
    }

    if (!prefixVerify) return
    //if(message.member.id !== '427193787094401045') return console.log(`usuário nao autorizado`)//message.channel.send('comandos em beta nao habilitados')

    //pick data    
    const args = message.content.slice(pref.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    //cria o database do server    
    const localData = files.fileManager(message)

    //music commands
    if (config.distube.includes(cmd)) return

    //pega o database do server existente
    const dataServer = require(localData)

    let pv = permVerify.getRolesAdmin(dataServer, message)
    bol = pv.bol
    adm = pv.adm

    client.commands.get('start').run(client, message, args)


    if (cmd != `reload`) {
        adm = permVerify.verificaradmeiro(dataServer, message)
        let comando = client.commands.get(cmd)
        try {
            comando.run(client, message, args, adm)
        }
        catch (e) {
            console.log('comando inexistente ')
        }
    }
    else {
        client.database.get(`reload`).run(client, message, args)
    }
})

client.login(config.token)
