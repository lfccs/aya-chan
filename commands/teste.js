module.exports.run = async (client, message, args) => {
    try {
        let msg = message.guild.emojis.cache.map((e, x) => `${e} ${x}`)
        console.log(msg);
        let role = message.guild.roles.cache.find(f => f.id === '777700466595332126')
        console.log(relo)

        client.commands.get(`embedPage`).run(msg.join(`\n`), ``, client, message, `emojis`)

        let em = message.guild.emojis.cache.find(e => e.id === `611322980047388682`)
        message.channel.send(`${em}`)
          


    } catch (error) {
        console.log(error);

    }

}
module.exports.help =
{
    name: `teste`,
    description: `description`
}
