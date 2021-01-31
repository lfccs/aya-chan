async function publish (client, message, msg){
    try {
        
        var options = {
            'method': 'POST',
            'url': `https://discord.com/api/v8/channels/${message.channel.id}/messages/${msg.id}/crosspost`,
            'headers':{
                'Authorization': `Bot ${client.token}`
            }
        }
        request(options, function (error, response) {
            if (error) throw new Error(error);
        })

    } catch (error) {
        console.error(error);
    }

}
module.exports = publish