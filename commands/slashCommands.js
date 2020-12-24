const request = require('request')
module.exports.slashTeste = (client, message, args) => {
    let id = client.user.id

    var options = {
        'method': 'POST',
        'url': `https://discord.com/api/v8/applications/${id}/guilds/${message.guild.id}/commands`,
        'headers': {
            'Authorization': `${client.token}`
        },
        formData: {
            'json': {
                "name": "blep",
                "description": "Send a random adorable animal photo",
                "options": [
                    {
                        "name": "animal",
                        "description": "The type of animal",
                        "type": 3,
                        "required": true,
                        "choices": [
                            {
                                "name": "Dog",
                                "value": "animal_dog"
                            },
                            {
                                "name": "Cat",
                                "value": "animal_dog"
                            },
                            {
                                "name": "Penguin",
                                "value": "animal_penguin"
                            }
                        ]
                    },
                    {
                        "name": "only_smol",
                        "description": "Whether to show only baby animals",
                        "type": 5,
                        "required": false
                    }
                ]
            }
        }
    }

    request(options, function callback(request, response) {
        if (error) throw new Error(error);
        var resp = JSON.parse(response.body)
        data[`${message.author.id}`].linkimg = resp.data[`link`]
    })
}
module.exports.help = {
    name: `slash`
}
