module.exports.run = async (client, message, args, dadosetup) => {
    try {
        const fs = require('fs')
        const local = `../database/${message.guild.id}/configmutes.json`
        const locale = `./database/${message.guild.id}/configmutes.json`
        if (fs.existsSync(local)) return
        const data = require(local)
        let role

        if (dadosetup.startsWith(`<`)) {
            role = dadosetup.slice(3, -1)
        }
        if (!role) data[`quantidade`] = parseInt(dadosetup)
        if (data[`setados`] >= 0) data[`setados`]++
        else data[`setados`] = 0

        letstring = data[`setados`]
        letstring++

        if (dadosetup.startsWith(`<`)) {
            data.advertencias[data[`setados`]] = role
        }
        else data[`advertencias`] = []

        let d = JSON.stringify(data, null, 4)
        client.database.get('save').run(client, message, args, d, locale)

        if (data[`setados`] < data[`quantidade`]) {
            let frase = `Ok! sete o ${letstring}º cargo cargo de advertencia!`
            client.commands.get(`awaitreply`).run(client, message, args, frase, 'setupquantidade')
        }
        else {
            message.channel.send(`cargos configurados`)
        }
    } catch (e) {
        console.log(e);
    }
}
module.exports.help =
{
    name: `setupquantidade`,
    description: `seta a quantidade de mutes`
}