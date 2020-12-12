module.exports.run = async (client, message, args) => {
    try {
        const fs = require('fs')
        const local = `../database/${message.guild.id}/configmutes.json`
        const localm = `../database/${message.guild.id}/mutes.json`
        const locale = `./database/${message.guild.id}/mutes.json`
        const configmutes = require(local)
        const mutes = require(localm)
        const members = message.guild.members.cache.array()



        for (let j = 0; j < members.length; j++) {
            try {
                let tam
                for (let i = 1; i <= configmutes.quantidade; i++) {
                    let mutemember = mutes[members[j]]
                    if (mutes[members[j]]) {
                        i = configmutes.quantidade
                    }
                    else {
                        let madv = members[j].roles.cache.find(f => f.id === configmutes.advertencias[i])

                        if (madv) {
                            tam = i
                            i = configmutes.length
                            let motivos = []
                            for (let k = 1; k <= tam; k++) {
                                motivos[k] = null
                            }
                            mutes[members[j]] = {
                                advertencia: madv.id,
                                motivos: motivos
                            }
                        }
                    }
                }
            }
            catch{ }
        }

        let d = JSON.stringify(mutes, null, 4)
        client.database.get('save').run(client, message, args, d, locale)
    } catch (e) {
        console.log(e);
    }
}
module.exports.help =
{
    name: `initialverify`,
    description: `verificaçao inicial das advertencias `
}