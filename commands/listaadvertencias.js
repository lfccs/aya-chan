module.exports.run = async ( client, message, args)=> 
{
    const fs = require('fs')
    const local = `../database/${message.guild.id}/configmutes.json`
    const configmutes = require(local)
    const members = message.guild.members.cache.array()
    
    let adv = []
    let adv1 = message.guild.roles.cache.find(f => f.id === configmutes.advertencias[1])
    let adv2 = message.guild.roles.cache.find(f => f.id === configmutes.advertencias[2])
    let adv3 = message.guild.roles.cache.find(f => f.id === configmutes.advertencias[3])
    let adv4 = message.guild.roles.cache.find(f => f.id === configmutes.advertencias[4])

    for(let i = 1; i <= configmutes.quantidade; i++)
    {
        adv[i] = []

        for (let j = 0; j < members.length; j++) 
        {
            try
            {
            let madv = members[j].roles.cache.find(f => f.id === configmutes.advertencias[i])
            if(madv) adv[i].push(members[j])
            }
            catch{}
        }
    }
    let length = adv[1].length + adv[2].length + adv[3].length + adv[4].length 

    let string =`${adv4} :
    ${adv[4].join(`\n`)}
    
    ${adv3} :
    ${adv[3].join(`\n`)}
    
    ${adv2} :
    ${adv[2].join(`\n`)}
    
    ${adv1} :
    ${adv[1].join(`\n`)}`

    client.commands.get(`embedPage`).run(string, string.length, client, message, `Os seguintes membros estão com as advertencias abaixo`)

    //client.commands.get(`embedBuilder`).run(client,message,`BLACK`, `Os seguintes membros estão com as advertencias abaixo`,string)
}
module.exports.help = 
{
    name: `listaadvertencias`,
    description: `mostra todos os membros com advertencias `
}