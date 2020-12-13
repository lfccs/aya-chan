module.exports.run = (client, message, color, title, description, page, quantia, requisitos, enviar) => {
    try {
        const discord = require(`discord.js`)
        let embed = new discord.MessageEmbed()
            .setColor(color)
        if (requisitos) embed.setFooter(`${client.user.username} Requisitado por ${requisitos}`, client.user.displayAvatarURL())
        else if (!page) embed.setFooter(client.user.username, client.user.displayAvatarURL())
        else if (page) embed.setFooter(`Pagina: ${page} de ${quantia}`)
        if (title) embed.setTitle(title)
        if (description) embed.setDescription(description)
        if (page) return embed
        if(enviar) return embed
        return message.channel.send(embed)
    } catch (e) {
        console.log(e);
    }
}
module.exports.help =
{
    name: `embedBuilder`,
    description: `criaçao de embeds`
}