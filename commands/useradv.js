module.exports.run = async ( client, message, args)=> 
{
    const fs = require('fs')
    const local = `../database/${message.guild.id}/mutes.json`
    const locala = `../database/${message.guild.id}/configmutes.json`
    const locale = `./database/${message.guild.id}/mutes.json`

    const data = require(local)
    const datam = require(locala)
    if(fs.existsSync(local)) return
    const configmute = require(`../database/${message.guild.id}/configmutes.json`)
    if(fs.existsSync(configmute)) return
    let trim
    try
    {
        let mention = message.mentions.members.first()
        trim = mention.id
    } 
    catch
    {
        mention= args[0]
        trim = mention
    }
    let memb = message.guild.members.cache.find(f => f.id === trim)
    let datamembro = data[memb]
    if(!datamembro)
    {
        data[memb]={
            advertencia: "",
            motivos: []
        }
        let d = JSON.stringify(data, null, 4)
        client.database.get('save').run(client, message,args,d, locale)   
        let datamembro = data[memb]
    }
    if(datamembro.advertencia === undefined)
    {
        message.channel.send("membro nao possui advertencias ")
        return
    }
    
    let advs = []
    for (let i = 0; i < datam.advertencias.length; i++) {
        advs[i] = message.guild.roles.cache.find(f => f.id === datam.advertencias[i])
    }
    
    let buffer = ``
    for (let i = 1; i < data[memb].motivos.length; i++) {
        let mot = data[memb].motivos[i]
        if(!mot || mot === null || mot === undefined) mot = `motivo não catalogado`
        let string1 = `${advs[i]}\n ${mot}\n\n`
        if (!buffer) {
            buffer = string1
        }
        else buffer = buffer.concat(string1)
    }
    
    client.commands.get(`embedBuilder`).run(client, message, `#ff1111`, `advertencias de ${memb.user.username}`, buffer)
}
module.exports.help = 
{
    name: `useradv`,
    description: `lista de advertencias do membro`
}