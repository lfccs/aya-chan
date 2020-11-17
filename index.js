//config 
const discord = require('discord.js')
const client = new discord.Client()
const ytdl = require('ytdl-core')
const {prefix, token} = require('./config.json')
const fs = require('fs')
const DisTube = require('distube')
const distube = new DisTube(client, {searchSongs: true, emitNewSongOnly: true, highWaterMark: 1<<125})
const filters = ["3d" , "bassboost" , "echo" , "karaoke" , "nightcore" , "vaporwave" , "flanger" , "gate" , "haas" , "reverse" , "surround" , "mcompand" , "phaser" , "tremolo" , "earwax"]

//command handler
client.commands = new discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// boot
client.once('ready', () => {
    console.log(`aya acordou!! ${client.user.tag}`)
    client.user.setActivity("radio united",{type: "LISTENING"})
})

//interactions
client.on('message', message => 
{
    if(!message.content.startsWith(prefix) || message.author.bot) return
    
    //pick data    
    const VC = message.member.voice.channel
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    //comandos
    if(cmd === 'ola' || cmd.startsWith('oi'))
    {
        client.commands.get('ola').execute(message, args)
    }
    else if (cmd === 'poderes'){
        
        client.commands.get('poderes').execute(message, args)
    }   

    //comandos da radio
    else if(cmd === 'toca' || cmd === 'play' || cmd === 'p')
    {
        return distube.play(message, args.join(" "))
    }
    else if(cmd === 'para' || cmd== 'stop')
    {
        return distube.stop(message)
    }
    else if(cmd === 'skip' || cmd==='s' || cmd== 'proxima   ') 
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
        try
        {embedbuilder(client,message,"GREEN","VOLUME", `volume setado em \`${args[0]}\``)
        return distube.setVolume(message, args[0])}
        catch{
            message.channel.send('ta dando erro aq')
        }
    }
    else if (filters.includes(cmd))
    {
        try {
            let filter = distube.setFilter(message, cmd)
            embedbuilder(client,message,"GREEN","filtro adicionado", `\`${filter}\``)
            
        } catch (error) {
            message.channel.send('Não tem musicas tocando!')
        }

    }
    else if (cmd === 'playlist'||cmd === 'pl')
    {
        let queue = distube.getQueue(message)
        return embedbuilder(client,message,"YELLOW","Playlist atual", `${queue.songs.map((song,id) => `**${id + 1}** - ${song.name}| \`${song.formattedDuration}\``).join("\n")} \n\n ${queue.status}`)

    }
    else if(cmd ===`loop`|| cmd === 'repeat'|| cmd === 'repetir')
    {
        if(0 <= args[0] && args[0] >= 2)
        {
            distube.setRepeatMode(message,parseint(args[0]))
            embedbuilder(client,message, "GREEN", "LOOP esta setado como", `${args[0].replace("0", "OFF").replace("1", "Repetindo musica!").replace("2", "Repetindo Playlist!")}`)
        }
    }

    
    


})  



const status = (queue) => `Volume: \`${queue.volume}\` | Filtro : \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode ===2 ? "All queue": "This song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "on" : "off"}\``

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
    embedbuilder(client, message, "GREEN", "tocando a playlist", `Playlist: \`${playlist.name}\` - \`${playlist.songs.length} musicas\` \n\n Requisitado por: ${song.user} \n\n tocando a musica: \`${song.name}\` `)
})
.on("addList", (message, queue, playlist, song) => 
{
    embedbuilder(client, message, "GREEN", "lista adicionada", `Playlist: \`${playlist.title}\` - \`${playlist.songs.length} musicas\` \n\n Requisitado por: ${song.user} \n\n tocando a musica: \`${song.name}\``)
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
})  */

function embedbuilder(client, message, color, title, description)
{   
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    if(title) embed.setTitle(title)
    if(description) embed.setDescription(description)
    return message.channel.send(embed)
}
client.login(token)
