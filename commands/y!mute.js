module.exports.run = async (client, message, args) => {
    try {
        let role
        const fs = require('fs')
        const local = `../database/${message.guild.id}/mutes.json`
        const locale = `./database/${message.guild.id}/mutes.json`
        const lcargos = `../database/${message.guild.id}/cargos.json`
        const cargos = require(lcargos)
        const data = require(local)
        if (fs.existsSync(local)) return
        const configmute = require(`../database/${message.guild.id}/configmutes.json`)
        if (fs.existsSync(configmute)) return
        let trim
        try {
            let mention = message.mentions.members.first()
            trim = mention.id
        }
        catch
        {
            mention = args[0]
            trim = mention
        }
        let memb = cargos[trim]
        let datamembro = data[memb.ping]
        if (!datamembro) {
            data[memb] = {
                advertencia: "",
                motivos: []
            }
            let d = JSON.stringify(data, null, 4)
            client.database.get('save').run(client, message, args, d, locale)
            datamembro = data[memb]
        }
        let listamotivos = datamembro.motivos
        let membro = args[0]
        let temp = args[1]
        let motivo = args.slice(2).join(" ")
        let verify = false
        var numbadv
        for (let i = 1; i < configmute.advertencias.length; i++) {
            let adv = memb.cargos.find(f => f === configmute.advertencias[i])
            if (adv) {
                let addadv = i + 1
                numbadv = addadv
                memb = message.guild.members.cache.find(f => f.id === memb.id)
                if (numbadv <= 4) {
                    role = message.guild.roles.cache.find(f => f.id === configmute.advertencias[addadv])
                    let lista = memb.roles.cache.keyArray()
                    if (lista.includes(configmute.cargomute))
                        return
                    memb.roles.remove(adv)
                    memb.roles.add(role)
                    i = configmute.advertencias.length
                }
                verify = true
            }
        }
        if (!verify) {
            numbadv = 1
            role = message.guild.roles.cache.find(f => f.id == configmute.advertencias[1])
            memb = message.guild.members.cache.find(f => f.id === memb.id)
            memb.roles.add(role)
        }
        listamotivos[numbadv] = motivo

        if (numbadv <= 4) {
            data[memb] = {
                advertencia: role.id,
                motivos: listamotivos
            }
        }

        let d = JSON.stringify(data, null, 4)
        client.database.get('save').run(client, message, args, d, locale)
        const datat = require(`../database/${message.guild.id}/data.json`)

        let chan = message.guild.channels.cache.find(r => r.id === `789608748674973716`)
        let mod = message.guild.members.cache.find(f => f.id === message.author.id)
        chan.send(`${numbadv ? numbadv <= 4 ? `${memb} recebeu a ${role}` : `${mod} ${memb} esta passível de ban, tomou mute quando ja estava com a 4ª advertência` : `teste`}`)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.help =
{
    name: `y!mute`,
    description: `plugin do mute do yag`
}


//`0`:"<@!456612726874308629>",
//`1`:"180",
//`2`:"motivo",
//`3`:"de",
//`4`:"ser",
//`5`:"besta"