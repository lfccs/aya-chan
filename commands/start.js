module.exports.run = async (client ,message, args) =>
{
        const fs = require("fs")
        const local = `../database/${message.guild.id}/cargos.json`
        const locale = `./database/${message.guild.id}/cargos.json`
        const localconfig = `../database/${message.guild.id}/configmutes.json`
        const configmute = require(localconfig)
        if(fs.existsSync(local)) return
        const data = require(local)
        const mutev = !data.mute
        
        //if(mutev) client.commands.get('configmute').execute(client, message)

        let members = message.guild.members.cache.keyArray()
        let qtde = members.length
        
            for (let i = 0; i < qtde; i++) 
            {
                
                let memb = message.guild.members.cache.find(r => r.id === `${members[i]}`)
                let lista = memb.roles.cache.keyArray()
                if(lista.includes(configmute.cargomute))
                data[members[i]].mute = true
                let cond2 = !data[members[i]]
                let cond1
                if(!cond2) cond1 = !data[members[i]].mute
                let adv
                if(!cond2) adv = parseInt(data[members[i]].adv)
                if (!adv) adv = 0
                
                if(cond1 || cond2 ){
                    data[members[i] ] = 
                    {
                        id: memb.id,
                        ping : memb.toString(),
                        adv : adv,
                        cargos: lista,
                        mute: false

                    } 
                }

            }
        
        let d = JSON.stringify(data, null, 4)
        client.database.get('save').run(client, message,args,d, locale)
    
}

module.exports.help =
{
    name: "start",
    description: "comando inicial do bot para configuraçao inicial do servidor"
}