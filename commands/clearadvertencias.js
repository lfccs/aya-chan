module.exports.run = async (client, message, args, adm) => {
    try {
        if (adm) {
            message.channel.send(`acesso negado`)
            return
        }

        const local = `./database/${message.guild.id}/configmutes.json`
        const cargosAdv = require(`.${local}`)

        memberList = message.guild.members.cache.keyArray()

        for(const member of memberList){
            //find member object 
            let membro = message.guild.members.cache.find(f => f.id === member)
            let cargos = membro.roles.cache.keyArray()

            for (let i = 1; i < cargosAdv.advertencias.length; i++) {

                let adv = cargosAdv.advertencias[i]
                if (cargos.includes(adv)) {
                    membro.roles.remove(adv)
                }
            }
        }
        message.channel.send(`advertencias zeradas`)

    } catch (error) {
        console.error(error);
    }

}
module.exports.help =
{
    name: `clearadvertencias`,
    description: `limpa as advertências de todos os membros do servidor`
}