module.exports.run = async  (playlistfull, length, client, message, titulo)=> 
{
    let plf = playlistfull
    let pagesPlaylist = []
    let page = 1
    let mat = plf.match(/.{1,2040}/g)
    let len = mat.length
    let lengthpgs = Math.ceil(len/25)

    for (let i = 0; i < lengthpgs; i++) 
    {
        pagesPlaylist[i] = mat.splice(0, 25)
    }
     pagesPlaylist[page-1]
    
    let embed = client.commands.get(`embedBuilder`).run(client,message,"#ffff00", titulo , `${pagesPlaylist[page-1].join(`\n`)}`,page , lengthpgs)
    message.channel.send(embed).then(msg => {
        msg.react('⏪').then(r => {
            msg.react('⏩')

            const backfilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id
            const forwardfilter = (reaction, user) => reaction.emoji.name ==='⏩' && user.id === message.author.id

            const back = msg.createReactionCollector(backfilter, {time : 600000})
            const forward = msg.createReactionCollector(forwardfilter, {time : 600000})

            back.on('collect', r => {
                if(page === 1) return
                page--
                embed.setDescription(pagesPlaylist[page-1])
                embed.setFooter(`Pagina: ${page} de ${lengthpgs}`)
                msg.edit(embed)
            })
            forward.on('collect', r => {
                if(page === pagesPlaylist.length) return
                page++
                embed.setDescription(pagesPlaylist[page-1])
                embed.setFooter(`Pagina: ${page} de ${lengthpgs}`)
                msg.edit(embed)
            })


        })
    })



}
module.exports.help = 
{
    name: `embedPage`,
    description: `criar paginas de embed`
}