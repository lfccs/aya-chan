module.exports.run = async (client, message, args, adm) => {
    try {

        const fs = require('fs')
        const set = require(`../rss/timers`)
        
        let feed = './rss/feeds.json'
        

       if (!fs.existsSync(feed)) {
            fs.writeFileSync(feed, JSON.stringify({ 'rss': [{}] }, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            }
            )
        }
        const feeds = require(`.${feed}`)


        if (!args[0]) {
            message.channel.send(
                `sintaxe para adicionar feeds\naya news __link__ __#canal__ __checkTimer__(em minutos)
                `)
        }

        let channelId = trim(args[1])
        let _feed = {
            link: args[0],
            guild: message.guild.id,
            channel: channelId,
            time: args[2]
        }
        set(client, _feed)

        feeds.rss.push(_feed)

        let data = JSON.stringify(feeds, null, 4)
        client.database.get('save').run(client, message, args, data, './rss/feeds.json')

        message.channel.send('anuncio cadastrado com sucesso')

    } catch (error) {
        console.error(error);
    }

}

function trim(arg) {
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
    name: `news`,
    description: ``
}