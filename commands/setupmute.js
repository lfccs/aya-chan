module.exports.run = async(client,message, args, get) =>
{
    message.channel.send(`${get} ok `)
}
module.exports.help = {
    name: 'setupmute'
}