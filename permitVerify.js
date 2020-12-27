const config = require(`./config.json`)
let bol = false
let adm = false

module.exports.getRolesAdmin = (dataServer, message) => {

    // busca as variáveis necessárias para 
    let ar = message.member.roles.cache.keyArray()

    //verifica se tem permissões especificas seteadas
    try {
        for (const perm of dataServer.permitidos) {
            let rest = perm.id
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
    
    return {adm, bol}

}
module.exports.verificaradmeiro = (dataServer, message) => {

    let ar = message.member.roles.cache.keyArray()

    try {
        let verify = Object.entries(dataServer.admins).map(f => f[1].id)
        for (let i = 0; i < verify.length; i++) {
            if (ar.includes(verify[i])) return adm = false
        }

    } catch (erro) {
        console.log(erro);
        
        if (message.member.id !== config.owner) adm = true
        else if (!message.member.hasPermission('ADMINISTRATOR')) adm = true
    }

    return adm
}