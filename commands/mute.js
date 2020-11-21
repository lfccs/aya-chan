module.exports =
{
    
    name: "mute",
    description : `muta o membro indicado\m ex: aya mute \`@membro\` **2** \`flood no chat\`\n membero sera mutado por 2 horas `,
    execute(message, args, client)
    {
        
        const ms = require("ms")
        let data = require(`../database/${message.guild.id}.json`)
        let ment = message.mentions.users.firstKey()
        if(!ment) return message,channel.send("marque alguem")
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não tem essa permissão")
        if(!args[1]) return message.channel.send(`set timer`)
        let membro = message.guild.members.cache.get(ment)
        let gcargos = message.guild.roles
        let cargosl = data[ment].cargos.length
        let cargos = data[ment].cargos
        let minutos = parseInt(args[1])*1000*60
        minutos = minutos.toString()

        data[ment] = 
        {
            ping : `<@${ment}>`,
            adv: parseInt(data[ment].adv + 1),
            cargos: cargos,
            mute: true
            
        } 
        let d = JSON.stringify(data, null, 4)
        
        for (let i = 0; i < cargosl; i++) {
            let cargo = cargos[i]
            removable = gcargos.cache.find(r => r.id === cargo.id)
            if(cargo.name != "@everyone") membro.roles.remove(removable)
            
        }
        message.channel.send(`<@${ment}> mutado por ${ms(ms(minutos))}`)
        setTimeout(function(){
            let d = client.commands.get('unmute').execute(message, args)
            return d
        }, ms(minutos));

        return d
                 

    }
}