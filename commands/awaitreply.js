const discord = require(`discord.js`)
module.exports.run = async (client, message, args, conteudo, comando) => {
    //if (message.author.id !== `777191329389215764`) return
    try {
        const filter = m => m.author.id === message.author.id
        message.reply(`${conteudo}`)
        message.channel.awaitMessages(filter,
            {
                max: 1,
                time: 60000
            }).then(collected => {
                if (collected.first().content === 'cancelar')
                    return

                let colect = collected.first().content
                direcionador(colect)
            }).catch(err => { console.log(err) })
        function direcionador(get) {
            client.commands.get(comando).run(client, message, args, get)
        }
    } catch (e) {
        console.log(e);

    }
}
module.exports.help = {
    name: "awaitreply",
    description: "backend"
}
