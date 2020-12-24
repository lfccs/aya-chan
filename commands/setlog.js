module.exports.run = async (client, message, args, adm) => {
    try {
        if (adm) {
            return
        }
        if (!args) {
            return
        }

        const local = `./database/${message.guild.id}/data.json`
        const data = require(`.${local}`)
        
        data.log = get(args[0])

        let d = JSON.stringify(data, null, 4)
        client.database.get(`save`).run(client, message, args, d, local)
    } catch (error) {
        console.log(error);

    }

}
function get(arg) {
    if (!arg) return;

    let ment = arg

    if (ment.startsWith('<#') && ment.endsWith('>')) {
        ment = ment.slice(2, -1);

        if (ment.startsWith('!')) {
            ment = ment.slice(1);
        }

        return ment
    }
}
module.exports.help =
{
    name: `setlog`,
    description: `description`
}