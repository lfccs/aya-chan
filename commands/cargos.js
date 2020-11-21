module.exports = {
    name: "cargos",
    description: "mostra todos os cargos de todos os membros do servidor",
    execute(client, message, args){
        const fs = require(`fs`)
        const data = require(`../database/${message.guild.id}.json`)

        let dados = Object.entries(data).map(v => `${v[1].ping} - advertências: ${v[1].adv} | Mutado agora: \`${v[1].mute ? "Sim": "Não"}\` \n ${v[1].cargos}`).join('\n\n')
        embedbuilder(client,message,"#00ffff","cargos dos membros",dados)
        

        function embedbuilder(client, message, color, title, description, page, quantia,requisitos)
        {   
            const discord = require(`discord.js`)
            let embed = new discord.MessageEmbed()
            .setColor(color)
            if(requisitos)embed.setFooter(`${client.user.username} Requisitado por ${requisitos}`, client.user.displayAvatarURL())
            else if(!page) embed.setFooter(client.user.username, client.user.displayAvatarURL())
            else if(page) embed.setFooter(`Pagina: ${page} de ${quantia}`)
            if(title) embed.setTitle(title)
            if(description) embed.setDescription(description)
            if(page) return embed
            return message.channel.send(embed)
        }

    }
}