module.exports.run = async (client, message, args, adm) => {
   
    if (adm) {
        message.channel.send('sem acesso')
        return
    }
    const fs = require(`fs`)
    const data = require(`../database/${message.guild.id}/cargos.json`)
    let dados = Object.entries(data).map(v => `${v[1].id}`)
    let stringcargos = []
    for (let i = 0; i < dados.length; i++) {
        let cargos = data[dados[i]].cargos
        let cachecargos = []
        for (let i = 0; i < cargos.length; i++) {
            cachecargos.push(message.guild.roles.cache.find(f => f.id === cargos[i]))
        }
        stringcargos[dados[i]] = cachecargos
    }
    let string = Object.entries(stringcargos).map(r => `<@${r[0]}>:  ${r[1]}`).join(`\n\n`)

    embedbuilder(client, message, "#00ffff", "cargos dos membros", string)


    function embedbuilder(client, message, color, title, description, page, quantia, requisitos) {
        const discord = require(`discord.js`)
        let embed = new discord.MessageEmbed()
            .setColor(color)
        if (requisitos) embed.setFooter(`${client.user.username} Requisitado por ${requisitos}`, client.user.displayAvatarURL())
        else if (!page) embed.setFooter(client.user.username, client.user.displayAvatarURL())
        else if (page) embed.setFooter(`Pagina: ${page} de ${quantia}`)
        if (title) embed.setTitle(title)
        if (description) embed.setDescription(description)
        if (page) return embed
        return message.channel.send(embed)
    }

}
module.exports.help =
{
    name: "cargos",
    description: "mostra todos os cargos de todos os membros do servidor"
}