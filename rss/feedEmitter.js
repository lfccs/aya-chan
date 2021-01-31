async function emitter(client, items, guild, channel) {
    try {

        let title = items.title
        let link = items.link
        let Guild = client.guilds.cache.find(f=>f.id === guild)
        let Channel = Guild.channels.cache.find(f=> f.id === channel)

        Channel.send(`**${title}**\n\n${link}`)


    } catch (error) {
        console.error(error);
    }

}
module.exports = emitter