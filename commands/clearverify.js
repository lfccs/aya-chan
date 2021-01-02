module.exports.run = async (client, message, args, get) => {
    try {
        if (get === 'confirmar') {
            client.commands.get('clearadvertencias').run(client, message, args, false)
        }

    } catch (error) {
        console.error(error);
    }

}
module.exports.help =
{
    name: `clearverify`,
    description: ``
}