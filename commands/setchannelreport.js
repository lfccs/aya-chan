module.exports.run = async (client, message, args) => {
    try {
        if (!args) return message.channel.send(`escolha um canal`)
        else {
            const fs = require(`fs`)
            const local = (`../database/${message.guild.id}/data.json`)
            const locale = (`./database/${message.guild.id}/data.json`)
            if (fs.existsSync(local)) return
            const data = require(local)
            let channelid = GetChannel(args)

            data[`canal`] = channelid

            let d = JSON.stringify(data, null, 4)
            client.database.get(`save`).run(client, message, args, d, locale)
            message.channel.send(`canal setado com sucesso!`)


        }



    } catch (error) {
        console.log(error);

    }

}

//busca o id 
function GetChannel(args) {
    if (!args) return;

    let ment = args[0]
    if (!ment) {
        return
    }

    if (ment.startsWith('<#') && ment.endsWith('>')) {
        ment = ment.slice(2, -1);

        if (ment.startsWith('!')) {
            ment = ment.slice(1);
        }

        return ment
    }
}

//busca o canal 
function mychannel(message, id) {
    if (!id && id != 0) return

    if (id.length > 4) {
        let chan = message.guild.channels.cache.find(r => r.id === `${id}`);
        return chan
    }
    else {
        let chan = message.guild.channels.cache.find(r => r.id == `${channelList[id]}`)
        return chan
    }
}


module.exports.help =
{
    name: `setchannelreport`,
    description: `description`
}