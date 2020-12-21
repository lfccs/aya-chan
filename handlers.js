const fs = require(`fs`)

module.exports.commandHandler = (client) => {
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        client.commands.set(command.help.name, command)
    }
    console.log(`commands success`);

}
module.exports.dataHandler = (client) => {
    const save = require('./save')
    client.database.set('save', save)
    const reload = require(`./reload`)
    client.database.set(`reload`, reload)
    console.log(`data success`);

}