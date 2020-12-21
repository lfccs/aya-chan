export function commandHandler(client) {
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        client.commands.set(command.help.name, command)
    }

}
export function dataHandler(client) {
    const save = require('./save')
    client.database.set('save', save)
    const reload = require(`./reload`)
    client.database.set(`reload`, reload)

}