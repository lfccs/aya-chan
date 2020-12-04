const fs = require('fs')
module.exports.run = async(client, message, args, data, local) =>
{
    fs.writeFileSync(local,
        data, err => {
            if(err)
            {
                console.log(err)
                message.channel.send(err)
            }
        }
    )
}