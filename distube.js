module.exports.run = async () => {//config 
    const discord = require('discord.js')
    const client = new discord.Client()
    let dir = '../aya-chan/config.json'
    const config = require(dir)
    const DisTube = require('distube')
    const fs = require(`fs`)
    const distube = new DisTube(client, {
        leaveOnEmpty: true, leaveOnFinish: false, searchSongs: false, emitNewSongOnly: true, highWaterMark: 1 << 125,
        youtubeCookie:
            "YSC=jOGNNXmG5ss; VISITOR_INFO1_LIVE=ivFiDIhbG_8; GPS=1; HSID=ARbbZhFXYmos2X_Yt; SSID=AQSoMgkNju0Ky-kO-; APISID=eT0aiBENsNyxGcep/A1bqlPtBKpkRgi1LR; SAPISID=IWATJ4hX1j3D00kK/AzRwzibyoZmpa2Iol; __Secure-3PAPISID=IWATJ4hX1j3D00kK/AzRwzibyoZmpa2Iol; LOGIN_INFO=AFmmF2swRgIhALpcfKMr6sU4ybtCc2J-9nP_QROpfPfl40nJgGMO_C5JAiEAgodQTcdmP86j8Vol_osEPaMQ4f-n6bEbQT8QFBCtm28:QUQ3MjNmd3hOTnFJTnBKTGh5X01HTFdyMks3T2g0d2k5N0trUWllYVpvT1A5WnE3V2RvUTdnaXRwdnh2VEVDOXoxYmxNaXg1bWdqaUtfd1hpMlhHQU1RYmlDZXZtYUlrQ2QyWlhYMDJGNWxid2d5RmVKOGxoWThEMmlFaEc0XzZIMzFxOVlfQVBrOGJyZkNOTm9uWTJubFRmb0NScHd0eWxyVHFfYkhPN0dhSUFpckZ1ZEhBdVlXSUlPdWpLMTh1UnNIN0ZXVGFRV0sw; SID=4AebSY4DZ9fip2aYWggSUrdKls2E0tfvPi-tClshLOgpTkwwv_tJLGzgBjVqMIqdnQcEaw.; __Secure-3PSID=4AebSY4DZ9fip2aYWggSUrdKls2E0tfvPi-tClshLOgpTkwwoRexFQB30JfQ9cIUDKXqsQ.; PREF=volume=100; SIDCC=AJi4QfH1mjs1sXwYxPvwkeFUKTcCliuxzVbkUXZNOReoBJtnja_MJ7zvZ2Bm_ovexbdJ0Yoa; __Secure-3PSIDCC=AJi4QfHInItLOguhk7vMYD39ZbatRAPQ_CT5QrLggPS7lQ0C8oqHEL38dOPvU-l429RPF_Mu"
    })
    const filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "gate", "haas", "reverse", "surround", "mcompand", "phaser", "tremolo", "earwax"]

    client.once('ready', () => {
        console.log(`aya ligou a radio!! ${client.user.tag}`)
        client.user.setActivity("radio united", { type: "LISTENING" })
    })


    client.on("message", async (message) => {
        //valida se a mensagem e um comando
        if (!message.content.startsWith(config.prefix[0]) || message.author.bot) return

        //cria o database do server
        const localdata = `./data/${message.guild.id}.json`
        if (!fs.existsSync(localdata)) fs.writeFileSync(localdata,
            JSON.stringify({
                "permitidos": [
                ],
                "admins": [
                ]
            }, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            })



        //pega o database do server existente
        const dataserver = require(localdata)


        //busca as variaveis nescessarias para validaçao de permissoes 
        let ar = message.member.roles.cache.keyArray()
        let bol = false
        let adm = false

        //verifica se tem permissoes especificas setadas
        try {
            for (let i = 0; i < dataserver.permitidos.length; i++) {
                let rest = dataserver.permitidos[i].id
                bol = !ar.includes(rest)
                if (!bol) i = dataserver.permitidos.length
            }
        }
        catch{ bol = false }
        try {
            for (let i = 0; i < dataserver.admins.length; i++) {
                let ad = dataserver.admins[i].id
                adm = !ar.includes(ad)
                if (!adm) i = dataserver.admins.length
            }
        }
        catch{ adm = false }


        //pega os dados nescessarios da mensagem para executar os comandos 
        const args = message.content.slice(config.prefix[0].length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase()

        function verificaradmeiro(message) {
            try {
                let verify = Object.entries(dataserver.admins).map(f => f[1].id)
                for (let i = 0; i < verify.length; i++) {
                    if (ar.includes(verify[i])) return adm = false
                }

            } catch (erro) {
                if (message.member.id != config.owner) adm = true
                else if (!message.member.hasPermission('ADMINISTRATOR')) adm = true
            }

            if (adm) {
                message.channel.send('sem acesso')
            }

            return adm
        }

        try {

            if (['restringir', 'restrict'].includes(cmd)) {

                adm = verificaradmeiro(message)
                if (adm) return

                //else if(!message.member.roles.cache.get(f=> f.id )) return
                let cargoadd = message.mentions.roles.first()
                if (!cargoadd) return message.channel.send("escolha um cargo para permitir o uso do bot")
                let x
                try {
                    for (let i = 0; i < dataserver.permitidos.length; i++) {
                        x = dataserver.permitidos[i].id
                        if (x === cargoadd.id) i = dataserver.permitidos.length
                    }
                }
                catch{ }
                if (x) {
                    if (x === cargoadd.id) {
                        dataserver.permitidos.pop()
                        message.channel.send("restriçao removida")
                    }
                    else {
                        dataserver.permitidos.push(cargoadd)
                        message.channel.send("restriçao adicionada")
                    }
                }
                else {
                    dataserver.permitidos.push(cargoadd)
                    message.channel.send("restriçao adicionada")
                }
                let js = JSON.stringify(dataserver, null, 4)
                fs.writeFileSync(localdata, js, null, err => {
                    if (err) {
                        console.log(err)
                    }
                })


            }
            if (['listasetup'].includes(cmd)) {

                adm = verificaradmeiro(message)
                if (adm) return

                let adms = Object.entries(dataserver.admins).map(v => `${v[1].id}`)
                let perms = Object.entries(dataserver.permitidos).map(v => `${v[1].id}`)
                let stringcargos = []
                let cachecargos = []
                for (let i = 0; i < adms.length; i++) {

                    cachecargos.push(message.guild.roles.cache.find(f => f.id === adms[i]))


                }
                for (let i = 0; i < perms.length; i++) {

                    stringcargos.push(message.guild.roles.cache.find(f => f.id === perms[i]))


                }
                let stringadm = Object.entries(cachecargos).map(r => `${r[1]}`).join(` | `)
                let stringperms = Object.entries(stringcargos).map(r => `${r[1]}`).join(` | `)

                embedbuilder(client, message, "#0000ff", "lista de configuraçao", `administradores\n${stringadm} \n\n cargos com permissao de comandos\n${stringperms}`)
            }
            else if (['admins'].includes(cmd)) {
                adm = verificaradmeiro(message)
                if (adm) return

                //else if(!message.member.roles.cache.get(f=> f.id )) return
                let cargoadd = message.mentions.roles.first()
                if (!cargoadd) return message.channel.send("escolha um cargo para permitir o uso do bot")
                let x
                try {
                    for (let i = 0; i < dataserver.admins.length; i++) {
                        x = dataserver.admins[i].id
                        if (x === cargoadd.id) i = dataserver.admins.length
                    }
                }
                catch{ }
                if (x) {
                    if (x === cargoadd.id) {
                        let remove = dataserver.admins.findIndex(f => f.id === x)
                        dataserver.admins.splice(remove, 1)
                        message.channel.send("cargo de admin removido")


                    }
                    else if (x !== cargoadd.id) {
                        dataserver.admins.push(cargoadd)
                        message.channel.send("cargo de admin adicionado")
                    }
                }
                else {
                    dataserver.admins.push(cargoadd)
                    message.channel.send("cargo de admin adicionado")
                }
                let js = JSON.stringify(dataserver, null, 4)
                fs.writeFileSync(localdata, js, null, err => {
                    if (err) {
                        console.log(err)
                    }
                })

            }
            else if (['toca', 't'].includes(cmd)) {
                if (!args[0]) return message.channel.send(`escolha uma musica ou playlist pra eu tocar.`)
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                if (args[0].includes("playlist", 24)) embedbuilder(client, message, "#ffff00", "Procurando!", `[Playlist](${args[0]})`)

                else embedbuilder(client, message, "#ffff00", "Procurando!", `\`${args.join(" ")}\``)
                return distube.play(message, args.join(" "))

            }
            else if (cmd === 'filtros' || cmd === 'ft') {
                return embedbuilder(client, message, "#ffff00", "Filtros disponiveis!", (filters.map((filtros) => `${filtros}`).join("\n")))
            }
            else if (cmd === 'para' || cmd == 'p' || cmd === `stop`) {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                return distube.stop(message)
            }
            else if (cmd === 'skip' || cmd === 's' || cmd == 'proxima') {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                } return distube.skip(message)
            }
            else if (cmd === 'tempo' || cmd === 'tp') {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                embedbuilder(client, message, "#00ff00", "Tempo", `a sua musica esta em \`${args[0]} segundos\``)
                return distube.seek(message, args[0] * 1000)
            }
            else if (cmd === 'volume' || cmd === 'v') {
                if (adm) return message.channel.send('voce nao tem permissao')
                try {
                    embedbuilder(client, message, "#00ff00", "VOLUME", `volume setado em \`${args[0]}\``)
                    return distube.setVolume(message, args[0])
                }
                catch{
                    message.channel.send('ta dando erro aq')
                }
            }
            else if (filters.includes(cmd)) {
                if (adm) return message.channel.send('voce nao tem permissao')
                try {
                    let filter = distube.setFilter(message, cmd)
                    if (filter) embedbuilder(client, message, "#00ff00", "filtro adicionado", `\`${filter}\``)
                    else embedbuilder(client, message, "#ff0000", "filtro removido", `\`${cmd}\``)
                } catch (error) {
                    message.channel.send('Não tem musicas tocando!')
                }

            }
            else if (cmd === 'playlist' || cmd === 'pl') {
                let queue = distube.getQueue(message)
                let queuelength = queue.songs.length
                let dur = queue.formattedDuration
                let playlistfull = queue.songs.map((song, id) => `**${id + 1}** - [${song.name}](${song.url}) | \`${song.formattedDuration}\``).join("\n")
                let titulo = `Playlist atual - ${queuelength} musicas| duração da playlist ${dur}`
                embedpages(playlistfull, queuelength, client, message, titulo)
                //return embedbuilder(client,message,"YELLOW","Playlist atual", `${queue.songs.map((song,id) => `**${id + 1}** - ${song.name}| \`${song.formattedDuration}\``).join("\n")} \n\n ${queue.status}`)

            }
            else if (cmd === 'pula') {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                try {
                    let queue = distube.jump(message, parseInt(args[0]) - 1)
                    return embedbuilder(client, message, "#00ff00", "Tocando musica", `${queue.songs.map((song) => `${song.name}`)}`)
                }
                catch
                {
                    return embedbuilder(client, message, "#ff0000", "Escolha como deseja repetir!", " **1** - Repetir musica atual. \n **2** - Repetir playlist. \n **0** - OFF.")
                }
            }
            else if (cmd === `loop` || cmd === 'l') {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                if (parseInt(args[0]) < 3) {
                    distube.setRepeatMode(message, parseInt(args[0]))
                    return embedbuilder(client, message, "#00ff00", "LOOP esta setado como", `${args[0].replace("0", "OFF").replace("1", "Repetindo musica!").replace("2", "Repetindo Playlist!")}`)
                }
                else return embedbuilder(client, message, "#ff0000", "Escolha como deseja repetir!", " **1** - Repetir musica atual. \n **2** - Repetir playlist. \n **0** - OFF.")

            }
            else if (["musica", "m"].includes(cmd)) {

                let queue = distube.getQueue(message)
                let song = queue.songs[0]
                embedbuilder(client, message, "#00ff00", "tocando agora!", `Musica: [${song.name}](${song.url}) | \`${song.formattedDuration}\`\n\n ${status(queue)}`, "", "", song.user.username)

            }
            else if (["aleatorio", "al"].includes(cmd)) {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                distube.shuffle(message)
                let queue = distube.getQueue(message)
                embedbuilder(client, message, "#ffff00", "Playlist embaralhada!", `${queue.songs.length} musicas.`)
            }
            else if (cmd === "pause" || cmd === "ps") {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                distube.pause(message)
                embedbuilder(client, message, "#ffff00", "Musica pausada!", "")
            }
            else if (cmd === "return" || cmd === "rt" || cmd == "r") {
                if (bol) {
                    if (adm)
                        return message.channel.send('voce nao tem permissao')
                }
                distube.resume(message)
                embedbuilder(client, message, "#00ff00", "Retomando musica!", "")
            }
            else if (["autoplay", "ap"].includes(cmd)) {
                if (adm) return message.channel.send('voce nao tem permissao')
                let mode = distube.toggleAutoplay(message)
                embedbuilder(client, message, "#ffff00", `autoplay esta \`${(mode ? "On" : "Off")}\` `, '')
            }
            else if ("procurar" === cmd) {
                if (adm) return message.channel.send('voce nao tem permissao')
                if (distube.options.searchSongs) {
                    distube.options.searchSongs = false
                    embedbuilder(client, message, "ORANGE", "Modo de busca", "O modo de busca esta desativado!")
                }
                else {
                    distube.options.searchSongs = true
                    embedbuilder(client, message, "ORANGE", "Modo de busca", "O modo de busca esta ativado!")

                }
            }
            else if (cmd === "configurações" || cmd === "config" || cmd === "c") {
                let queue = distube.getQueue(message)
                if (!queue) return embedbuilder(client, message, "#ff0000", "Não esta tocando nenhuma musica")
                embedbuilder(client, message, "#0000ff", "Configurações atuais!", ` ${status(queue)}`)
            }
            else if (cmd === `h` || cmd === `help`) {

                embedbuilder(client, message, "#00ff00", "Comandos bot [BETA]",
                    `qualquer bug reporte no pv <@427193787094401045>\n
        **toca, t      **  :Começa a tocar ou adiciona uma nova musica a playlist(tanto nomes quanto links)\n
         **para, p      **  :desliga a radio\n
         **pause, ps    **  :Pausa a musica atual\n
         **return, rt   **  :retoma a musica atual\n
         **skip, s      **  :pula para a proxima musica\n
         **musica, m    **  :exibe a musica que esta tocando no momento\n
         **playlist, pl **  :exibe a playlist completa\n
         **tempo, tp    **  :coloca a musica no segundo desejado\n
         **volume, v    **  :coloca o radio no volume desejado\n
         **loop, l      **  :coloca a musica ou a playlist em loop (1 para repetir a musica, 2 para playlist)\n
         **filtros, ft  **  :exibe uma lista de filtros disponiveis
         \`para adicionar um filtro basta pedir aya (nome do filtro)\`\n
         **pula         **  :pula para a musica da playlist desejada\n
         **autoplay, ap **  :procura automaticamente a proxima musica se não houver mais nenhuma na playlist\n
         **procurar     **  :se ativado o bot procura uma lista dos 15 primeiros resultados baseados no nome da musica que escolheu`, "", "")

            }
        }
        catch (err) {
            console.log(err)
        }

    })


    const status = (queue) => `Volume: \`${queue.volume}\` | Filtro : \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda playlist" : "Essa musica" : "Off"}\` | Autoplay: \`${queue.autoplay ? "on" : "off"}\` \n Procurar lista de musicas \`${distube.options.searchSongs ? "on" : "off"}\``


    //captadoer de eventos do stream das musicas

    distube
        .on("playSong", (message, queue, song) => {
            embedbuilder(client, message, "#00ff00", "tocando agora!", `Musica: [${song.name}](${song.url}) | \`${song.formattedDuration}\` \n\n ${status(queue)}`, "", "", song.user.username)
        })
        .on("addSong", (message, queue, song) => {
            embedbuilder(client, message, "#00ff00", "adicionada a lista", `Musica: [${song.name}](${song.url}) | \`${song.formattedDuration}\` `, "", "", song.user.username)
        })
        .on("playList", (message, queue, playlist, song) => {
            embedbuilder(client, message, "#00ff00", "tocando a playlist", `Playlist: \`${playlist.name}\` - \`${playlist.songs.length} musicas\` \n\n tocando a musica: \`${song.name}\``, "", "", song.user.username)
        })
        .on("addList", (message, queue, playlist) => {
            embedbuilder(client, message, "#00ff00", "lista adicionada", `Playlist: \`${playlist.name}\` - \`${playlist.songs.length} musicas\` \n\n ${status(queue)}`)
        })
        .on("searchResult", (message, result) => {
            let i = 0
            embedbuilder(client, message, "#ffff00", "", `**Escolha a musica** \n${result.map(song => `**${++i}** - [${song.name}](${song.url}) : \`${song.formattedDuration}\``).join("\n")} \n *Escolha uma des opções ou espere 60 segundos para cancelar*`)
        })
        .on("searchCancel", (message) => {
            embedbuilder(client, message, "#ff0000", "Procura cancelada", "")
        })
        .on("error", (message, err) => {
            embedbuilder(client, message, "#ff0000", "ocorreu um erro", err)
        })
        .on("empty", message => {
            embedbuilder(client, message, "#ff4d00", "Acabou as musicas. bye!")
        })




    //cria as paginas de embed
    function embedpages(playlistfull, length, client, message, titulo) {
        let plf = playlistfull
        let pagesPlaylist = []
        let page = 1
        let lengthpgs = Math.ceil(length / 10)

        for (let i = 0; i < lengthpgs; i++) {
            let qtd
            if (i === 0) {
                qtd = 10
            }
            else qtd = 11
            pagesPlaylist[i] = plf.split("\n", qtd)
            let t3 = pagesPlaylist[i].toString().length
            plf = plf.slice(t3)
        }
        let first = pagesPlaylist[page - 1]

        let embed = embedbuilder(client, message, "#ffff00", titulo, `${first.join('\n')}`, page, lengthpgs)
        message.channel.send(embed).then(msg => {
            msg.react('⏪').then(r => {
                msg.react('⏩')

                const backfilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id
                const forwardfilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id

                const back = msg.createReactionCollector(backfilter, { time: 600000 })
                const forward = msg.createReactionCollector(forwardfilter, { time: 600000 })

                back.on('collect', r => {
                    if (page === 1) return
                    page--
                    embed.setDescription(pagesPlaylist[page - 1])
                    embed.setFooter(`Pagina: ${page} de ${lengthpgs}`)
                    msg.edit(embed)
                })
                forward.on('collect', r => {
                    if (page === pagesPlaylist.length) return
                    page++
                    embed.setDescription(pagesPlaylist[page - 1])
                    embed.setFooter(`Pagina: ${page} de ${lengthpgs}`)
                    msg.edit(embed)
                })


            })
        })

    }

    //cria o embed e envia
    function embedbuilder(client, message, color, title, description, page, quantia, requisitos) {
        let embed = new discord.MessageEmbed()
            .setColor(color)
        if (requisitos) embed.setFooter(`${client.user.username}| Adicionada por ${requisitos}`, client.user.displayAvatarURL())
        else if (!page) embed.setFooter(client.user.username, client.user.displayAvatarURL())
        else if (page) embed.setFooter(`Pagina: ${page} de ${quantia}`)
        if (title) embed.setTitle(title)
        if (description) embed.setDescription(description)
        if (page) return embed
        return message.channel.send(embed)
    }


    client.login(config.token)
}