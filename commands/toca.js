module.exports=
{
    name : "toca",
    descrption :"inicia a radio",
    execute (discord,client,message,distube,cmd)
    {
           
        if(cmd === 'toca' || cmd === 'play' || cmd === 'p')
        {
            return distube.play(message, args.join(" "))
        }
        else if(cmd === 'para' || cmd== 'stop')
        {
            return distube.stop(message)
        }
        else if(cmd === 'skip' || cmd==='s') 
        {
            return distube.skip(message)
        } 
        else if(cmd === 'atrasa' || cmd==='a')
        {
            embedbuilder(client,message,"GREEN","atrasado", `Atrasou a musica em \`${args[0]} segundos\``)
            return distube.seek(message, args[0]*1000)
        }  
        else if(cmd === 'volume' || cmd==='v')
        {
            embedbuilder(client,message,"GREEN","VOLUME", `volume setado em \`${args[0]}\``)
            return distube.setVolume(message, args[0])
        } 
        
        const status = (queue) => `Volume: \`${queue.volume}\` | Filter : \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode ===2 ? "All queue": "This song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "on" : "off"}\``

        distube
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.user} \n ${status(queue)}`)
        })
        .on("addSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "adicionada a lista", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.user} `)
        })
        .on("playList", (message, queue, playlist, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a playlist", `Playlist: \`${playlist.name}\` - \`${playlist.duration} musicas\` \n\n Requisitado por: ${song.user} \n\n tocando a musica: \`${song.name}\` `)
        })
        .on("addList", (message, queue, playlist, song) => 
        {
            embedbuilder(client, message, "GREEN", "lista adicionada", `Playlist: \`${playlist.title}\` - \`${playlist.total_items} musicas\` \n\n Requisitado por: ${song.user} \n\n tocando a musica: \`${song.name}\``)
        })
        .on("searchResult", (message, result) => 
        {
            let i = 0
            embedbuilder(client, message, "YELLOW","", `**Escolha a musica** \n${result.map(song => `**${++i}** - ${song.name} : \`${song.formattedDuration}\``).join("\n")} \n *Escolha uma des opções ou espere 60 segundos para cancelar*`)
        })
        .on("searchCancel", (message) => 
        {
            embedbuilder(client, message, "RED", "Procura cancelada", "")
        })
        .on("error", (message, err) => 
        {
            embedbuilder(client, message, "RED", "ocorreu um erro", err)
        })
        /*
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })
        .on("playSong", (message, queue, song) => 
        {
            embedbuilder(client, message, "GREEN", "tocando a musica", `Musica: \`${song.name}\` | \`${song.formattedDuration}\` \n\n Requisitado por: ${song.username} \n \`${status(queue)}\``)
        })*/

        function embedbuilder(client, message, color, title, description)
        {   
            let embed = new discord.MessageEmbed()
            .setColor(color)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            if(title) embed.setTitle(title)
            if(description) embed.setDescription(description)
            return message.channel.send(embed)
        }
    }
}

//const status = (queue) => `Volume \`${queue.volume}\` | Filter ${queue.filter || "OFF"} | Loop \`${queue.repeatMode ? queue.repeatMode ===2 ? "All queue": "This song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "on" : "off"}\` `

/*async execute(message, args, ytdl, VC, client)
{
    //checa se esta em um canal de voz
    if(!VC) return message.channel.send("bora pra call!!")

    //checa as permissoes 
    const permissions = VC.permissionsFor(message.client.user)
    if(!permissions.has('CONNECT')) return message.channel.send("não tenho permissão")
    if(!permissions.has('SPEAK')) return message.channel.send('não posso falar')

    let teste = args.join(" ")
    
    //entra na call
    try{
        var connection = await VC.join()
    }catch(error)
    {
        console.log(`erro conexao ${error}`)
        return message.channel.send(`erro conexao ${error}`)
    }
    
    return distube.play(message, args.join(" "))
    
    
    function embedbuilder(client, message, color, title, description)
    {   
        const discord = require(`discord.js`)
        let embed = new discord.MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        if(title) embed.setTitle(title)
        if(description) embed.description(description)
        return message.channel.send(embed)
    }
    /* //musicas 
    const dispatcher = connection.play(ytdl(args[0]), 
    {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    })
    .on('finish', () => {
        VC.leave()
    })
    .on('error', error =>{
        console.log(error)
    })
    
    //volume
    dispatcher.setVolumeLogarithmic(5/5) 
}*/