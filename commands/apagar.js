module.exports.run = async (message, amount) => {
    
    message.channel.messages.fetch({ limit: amount })
        .then(messages => {
            message.channel.bulkDelete(messages)
        })
        .catch(e => console.log(e))
}
module.exports.help = {
    name: `apagar`,
    description: `apagar a quantidade de mensagens desejadas`
}