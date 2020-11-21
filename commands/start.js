module.exports=
{
    name: "start",
    description: "comando inicial do bot para configuraçao inicial do servidor",
    execute(message, args, opt)
    {
        const fs = require("fs")
        const local = `../database/${message.guild.id}.json`
        if(fs.existsSync(local)) return
        const data = require(local)
        let members = message.guild.members.cache.keyArray()
        let qtde = members.length
        if (opt === 0)
        {
            for (let i = 0; i < qtde; i++) 
            {
                
                let memb = message.guild.members.cache.find(r => r.id === `${members[i]}`)
                let lista = memb.roles.cache.array()
                let cond1 = !data[members[i]].mute
                let cond2 = !data[members[i]]
                let adv = parseInt(data[members[i]].adv)
                if (!adv) adv = 0
                
                if(cond1 || cond2 ){
                    data[members[i] ] = 
                    {
                        ping : memb.toString(),
                        adv : adv,
                        cargos: lista,
                        mute: false

                    } 
                }

            }
        }
        let d = JSON.stringify(data, null, 4)
        return d
    }
}