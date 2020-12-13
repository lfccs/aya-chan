const discord = require(`discord.js`)
module.exports.run = async (client, message, args, conteudo, comando, timer) => {
    //if (message.author.id !== `777191329389215764`) return
    try {
        if (timer === undefined)
            timer = 60000
        const filter = m => m.author.id === message.author.id
        message.reply(conteudo)
        message.channel.awaitMessages(filter,
            {
                max: 1,
                time: timer
            }).then(collected => {
                if (collected.first().content === 'cancelar')
                    return
                var img = collected.first().attachments.first()
                let colect
                if (img === undefined)
                    colect = collected.first().content
                else
                    colect = img
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
