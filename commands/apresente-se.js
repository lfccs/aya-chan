module.exports.run = async (client, message, args) => {
    try {
        message.delete()
        let apresent = `
    Eu sou a Aya, estou chegando por aqui para contribuir com o servidor, 
    por enquanto estou somente  tocando músicas para vocês, e se você esquecer 
    de adicionar musicas novas na playlist eu procuro algumas também,  se precisarem de ajuda 
    é só me chamar e pedir um help beleza? 
    Me chame pelo meu nome para me pedir algo 
    
    exemplo:
    aya help
    
    até mais, conto com vocês!   
    `
        embedbuilder(client, message, "#195080", `Olá a todos!!`, apresent)



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
    catch (e) {
        console.log(e)
    }
}
module.exports.help =
{
    name: `apresente-se`,
    description: ``
}