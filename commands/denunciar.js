module.exports.run = (client, message, args, resposta) => {
    try {
        const data = require(`../database/${message.guild.id}/data.json`)
        const locale = `./database/${message.guild.id}/data.json`
        if (data[`canal`] === undefined) return message.channel.send(`configure o canal para os reports`)
        let embed
        let descrit
        let d
        if (resposta) {
            if (typeof (resposta) === "string")
                resposta = resposta.toLowerCase()
        }
        if (resposta === `iniciar`) {

            data[`${message.author.id}`] = {
                key: 1,
                denunciado: ``,
                motivo: ``,
                linkimg: ``,
                messages: []
            }
            d = JSON.stringify(data, null, 4)
            client.database.get(`save`).run(client, message, args, d, locale)

            descrit =
                `Ok! Diz ai o **nome** ou o **id** de que você quer denunciar.

            tem 30 segundos para isso`
            embed = client.commands.get(`embedBuilder`).run(client, message, `BLUE`, `denunciar`, descrit, '', '', '', true)
            client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 30000)
            return
        }

        const datauser = data[`${message.author.id}`]
        let key
        if (datauser === undefined)
            key = undefined
        else
            key = datauser.key


        switch (key) {
            case undefined:
                descrit =
                    `Oii, quer fazer uma denuncia?
                beleza, só preciso que você tenha as respostas pra essas perguntas
                
                **1** - ID ou nome de quem deseja denunciar.

                **2** - Motivo da denuncia.

                **3** - Print do ocorrido.
                
                
                para começar a denuncia responda com __iniciar__ em menos de 1 minuto`
                embed = client.commands.get(`embedBuilder`).run(client, message, `BLUE`, `Denunciar`, descrit, '', '', '', true)
                client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 60000)

                break;
            case 1:
                data[`${message.author.id}`].key = 2
                data[`${message.author.id}`].denunciado = resposta

                d = JSON.stringify(data, null, 4)
                client.database.get(`save`).run(client, message, args, d, locale)
                descrit =
                    `Qual o **motivo** da denuncia?

            tem __2 minutos__ para responder`
                embed = client.commands.get(`embedBuilder`).run(client, message, `BLUE`, `Denunciar`, descrit, '', '', '', true)
                client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 120000)
                break;
            case 2:
                data[`${message.author.id}`].key = 3
                data[`${message.author.id}`].motivo = resposta

                d = JSON.stringify(data, null, 4)
                client.database.get(`save`).run(client, message, args, d, locale)
                descrit =
                    `Mande um **print** do ocorrido
                    
            tem __2 minutos__ para responder`
                embed = client.commands.get(`embedBuilder`).run(client, message, `BLUE`, `Denunciar`, descrit, '', '', '', true)
                client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 120000)
                break;
            case 3:
                if (resposta === undefined) {
                    client.commands.get(`awaitreply`).run(client, message, args, `envie uma imagem`, `denunciar`)
                }
                else {
                    var url = resposta.attachment
                    var nome = resposta.name

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
                        var resp = JSON.parse(response.body)
                        data[`${message.author.id}`].linkimg = resp.data[`link`]
                    });
                    
                    if (data[`${message.author.id}`].denunciado.length === 18) {
                        data[`${message.author.id}`].denunciado = `<@${data[`${message.author.id}`].denunciado}>`
                    }
                    data[`${message.author.id}`].key = 4
                    d = JSON.stringify(data, null, 4)
                    client.database.get(`save`).run(client, message, args, d, locale)
                    role = message.guild.roles.cache.find(r => r.id === `705568542753292288`)
                    role2 = message.guild.roles.cache.find(r => r.id === `339221534927224854`)
                    descrit =
                        `Marque um ${role}\n caso nenhum esteja ON marque um ${role2} ON!`
                    embed = client.commands.get(`embedBuilder`).run(client, message, `BLUE`, `Denunciar`, descrit, '', '', '', true)
                    client.commands.get(`awaitreply`).run(client, message, args, embed, `denunciar`, 120000)
    
                }
                break;
            case 4:
                let chan = message.guild.channels.cache.find(r => r.id == data[`canal`])
                let datauser = data[`${message.author.id}`]
                dedoDuro = message.guild.members.cache.find(f => f.id === message.author.id)
                descrit =
                    `${dedoDuro} ***reportou*** ${datauser.denunciado} !!

                **MOTIVO**: ${datauser.motivo}
                `
                let gd = client.guilds.cache.find(f => f.id === `216713090518089729`)
                let e = gd.emojis.cache.find(f => f.id === '611322980047388682')
                let f = gd.emojis.cache.find(f => f.id === '611322980047388682')
                let g = gd.emojis.cache.find(f => f.id === '766343070605115452')
                embed = client.commands.get(`embedBuilder`).run(client, message, `BLUE`, `Nova denuncia!!`, descrit, '', '', '', true, datauser.linkimg)
                chan.send(resposta)
                chan.send(embed).then(msg => {
                    msg.react(e)
                    msg.react(`❌`)
                    msg.react(g)
                })

                descrit = `${message.author} sua denuncia foi enviada com sucesso!`
                embed = client.commands.get(`embedBuilder`).run(client, message, `GREEN`, `Obrigado por sua ajuda!`, descrit, '', '', '', true)

                let id = message.channel.messages.cache.keyArray()
                let deletar = []
                for (let i = 0; i < 12; i++) {
                    index = id.length - i
                    deletar.push(id[index])
                }
                for (let i = 0; i < deletar.length; i++) {
                    message.channel.messages.fetch(deletar[i]).then(msg => {
                        msg.delete()
                    })
                }
                message.channel.send(embed)


                delete data[`${message.author.id}`]

                d = JSON.stringify(data, null, 4)
                client.database.get(`save`).run(client, message, args, d, locale)

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