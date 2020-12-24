module.exports.run = async (client, message, args) => {
    try {
        const t = require(`./slashCommands`)
        console.log(`eba`)
        t.slashTeste(client,message,args)
    } catch (error) {
        console.log(error);

    }

}
module.exports.help =
{
    name: `teste`,
    description: `description`
}
