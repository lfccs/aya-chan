module.exports.run = async (client, message, args, resposta) => {
    try {
        const data = require(`../database/${message.guild.id}/data.json`)
        const locale = `./database/${message.guild.id}/data.json`
        if (resposta === `iniciar`) {
            data[`${message.author.id}`] = {
                key: 1,
                denunciado: ``,
                motivo: ``,
                linkimg: ``
            }
            let d = JSON.stringify(data, null, 4)
            client.database.get(`save`).run(client, message, args, d, locale)

            let descrit =
                `Ok então, me diz ai o nome ou o id de que você quer denunciar.
            tem 30 segundos para isso`
            let embed = client.commands.get(`embedBuilder`).run(client, message, `RED`, `denunciar`, descrit, '', '', '', true)
            client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 30000)
            delete require.cache(`.${locale}`)
            data = require(`.${locale}`)

        }

        const datauser = data[`${message.author.id}`]
        let key
        if (datauser === undefined)
            key = undefined
        else
            key = datauser.key
            
            
        switch (key) {
            case undefined:
                var descrit =
                    `Oii, quer fazer uma denuncia?
                beleza, só preciso que você tenha as respostas pra essasa perguntas
                
                **1** - \`ID ou nome de quem deseja denunciar.\`
                **2** - \`Motivo da denuncia.\`
                **3** - \`Print do ocorrido.\`
                
                para começar a denuncia respoda com \`iniciar\` em menos de 1 minuto`
                let embed = client.commands.get(`embedBuilder`).run(client, message, `RED`, `denunciar`, descrit, '', '', '', true)
                client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 60000)

                break;
            case '3':
                if (image === undefined) {
                    client.commands.get(`awaitreply`).run(client, message, args, `teste`, `denunciar`)
                }
                else {
                    if (data[`canal`] === undefined) return message.channel.send(`configure o canal para os reports`)

                    var url = image.attachment
                    var nome = image.name
                    let chan = message.guild.channels.cache.find(r => r.id == data[`canal`])

                    var request = require('request');
                    var options = {
                        'method': 'POST',
                        'url': 'https://api.imgur.com/3/image',
                        'headers': {
                            'Authorization': 'Client-ID bfe73b66210fcb7'
                        },
                        formData: {
                            'image': url,
                            'name': nome
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        var teste = JSON.parse(response.body)
                        var link = teste.data[`link`]
                        chan.send(link)
                    });
                }
                break;

        }

    } catch (error) {
        console.log(error);

    }
}
module.exports.help =
{
    name: `denunciar`,
    description: `denuncia um membro com atitudes fora das regras`
}

/*
        if (image === undefined) {
            client.commands.get(`awaitreply`).run(client, message, args, `envie uma imagem`, `teste`)
        }
        else {
            const fs = require('fs')
            const https = require('https')

            var url = image.attachment
            var nome = image.name
            var local = `./temp/${Date.now()}${nome}`
            var localpath = fs.createWriteStream(local)

            var request = https.get(url, (res)=>{
                console.log(res);
                res.pipe(localpath)

            })
            var request = require('request');
        var options = {
            'method': 'POST',
            'url': 'https://api.imgur.com/3/image',
            'headers': {
                'Authorization': 'Client-ID bfe73b66210fcb7'
            },
            formData: {
                'image': 'https://cdn.discordapp.com/attachments/782668929440284681/787462065631002634/aya.jpg'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var teste = JSON.parse(response.body)
            var link = teste.data[`link`]
            message.channel.send(link)
        });
        }


        */