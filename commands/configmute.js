module.exports.run = async (client, message, args) => {
    try {
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