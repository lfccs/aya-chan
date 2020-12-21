module.exports.getRolesAdmin = (dataServer, message) => {

    // busca as variáveis necessárias para validaÃ§ao de permissões 
    let ar = message.member.roles.cache.keyArray()
    let bol = false
    let adm = false

    //verifica se tem permissões especificas seteadas
    try {
        for (let i = 0; i < dataServer.permitidos.length; i++) {
            let rest = dataServer.permitidos[i].id
            bol = !ar.includes(rest)
            if (!bol) i = dataServer.permitidos.length
        }
    }
    catch{ bol = false }
    try {
        for (let i = 0; i < dataServer.admins.length; i++) {
            let ad = dataServer.admins[i].id
            adm = !ar.includes(ad)
            if (!adm) i = dataServer.admins.length
        }
    }
    catch{ adm = false }
    
    console.log(`Roles Verified`);
    
    return adm

}
module.exports.verificaradmeiro = (message) => {
    try {
        let verify = Object.entries(dataServer.admins).map(f => f[1].id)
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