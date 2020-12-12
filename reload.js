module.exports.run = async (client, message, args) => {
    try {
        if (message.author.id != `427193787094401045`) {
            return message.channel.send(`tu não é meu pai`)
        }
        const fs = require(`fs`)
        client.commands.clear()
        var ver = client.commands
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            delete require.cache[require.resolve(`./commands/${file}`)]
            const command = require(`./commands/${file}`)
            client.commands.set(command.help.name, command)
        }
        message.channel.send(`comandos atualizados`)
    } catch (error) {
        console.log(error)
    }

}
module.exports.help =
{
    name: `reload`,
    description: `description`
}