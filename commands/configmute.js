module.exports.run = async (client, message, args, adm) => {
    try {
        if (adm) {
            message.channel.send('sem acesso')
            return
        }
        let cont1 = ('vamos configurar as puniçoes, primeiro me diga quantas advertencias tem neste servidor')
        client.commands.get('awaitreply').run(client, message, args, cont1, `setupquantidade`)
    } catch (e) {
        console.log(e);

    }
}
module.exports.help = {
    name: 'configmute',
    descriprion: 'configuraçoes'
}