module.exports =
{
    name: "unmute",
    description : `desmuta o membro indicado\m ex: aya unmute \`@membro\` `,
    execute(message, args)
    {
        let data = require(`../database/${message.guild.id}.json`)
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não tem essa permissão")
        
        let ment = message.mentions.users.firstKey()
        let membro = message.guild.members.cache.get(ment)
        let gcargos = message.guild.roles
        let cargosl = data[ment].cargos.length
        let cargos = data[ment].cargos
       

        data[ment] = 
        {
            ping : `<@${ment}>`,
            adv: parseInt(data[ment].adv),
            cargos: cargos,
            mute: false
            
        } 
        for (let i = 0; i < cargosl; i++) {
            let cargo = cargos[i]
            adicionavel = gcargos.cache.find(r => r.id === cargo.id)
            if(cargo.name != "@everyone") membro.roles.add(adicionavel)
            
        }
        let d = JSON.stringify(data, null, 4)
        
        message.channel.send(`<@${ment}> mutado`)

        return d
                 

    }
}