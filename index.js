//config 
const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
const fs = require('fs')


//command handler
client.commands = new discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    client.commands.set(command.help.name, command)
}

//data handler 
client.database = new discord.Collection()
const databasefils = fs.readdirSync('./database/').filter(file => file.endsWith('.js'))
const save = require('./save')
client.database.set('save', save)


// boot
client.once('ready', () => {
    console.log(`aya acordou!! ${client.user.tag}`)
    client.user.setActivity("radio united",{type: "LISTENING"})
})

//interactions
client.on('message', async (message) => 
{
    if(message.content.startsWith(`y!`))
    {}
    else if(!message.content.startsWith(config.prefix[0]) || message.author.bot) return
    //if(message.member.id !== '427193787094401045') return console.log(`usuario nao autorizado`)//message.channel.send('comandos em beta nao habilitados')

    //cria o database do server    
    const localdata = `./data/${message.guild.id}.json`
    if (!fs.existsSync(localdata)) fs.writeFileSync(localdata,
    JSON.stringify({
        "permitidos": [
        ],
        "admins": [
        ]
    },null,4), err => {
        if(err)
    {
        console.log(err)
        message.channel.send(err)
    }
    })

    if (!fs.existsSync(`./database/${message.guild.id}/`)){
         fs.mkdirSync(`./database/${message.guild.id}/`, 0o776)
        }
    if (!fs.existsSync(`./database/${message.guild.id}/data.json`))
    { fs.writeFileSync(`./database/${message.guild.id}/data.json`,
    JSON.stringify({},null,4), err => {
        if(err)
        {
            console.log(err)
            message.channel.send(err)
        }
    })}
    if (!fs.existsSync(`./database/${message.guild.id}/mutes.json`))
    {fs.writeFileSync(`./database/${message.guild.id}/mutes.json`,
    JSON.stringify({},null,4), err => {
        if(err)
        {
            console.log(err)
            message.channel.send(err)
        }
    })}
    if (!fs.existsSync(`./database/${message.guild.id}/configmutes.json`))
    {fs.writeFileSync(`./database/${message.guild.id}/configmutes.json`,
    JSON.stringify({},null,4), err => {
        if(err)
        {
            console.log(err)
            message.channel.send(err)
        }
    })}
    if (!fs.existsSync(`./database/${message.guild.id}/cargos.json`))
    { fs.writeFileSync(`./database/${message.guild.id}/cargos.json`,
    JSON.stringify({},null,4), err => {
        if(err)
        {
            console.log(err)
            message.channel.send(err)
        }
    })}
    
    
    //pick data    
    const args = message.content.slice(config.prefix[0].length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    //pega o database do server existente
    const dataserver = require(localdata)


    //busca as variaveis nescessarias para validaÃ§ao de permissoes 
    let ar = message.member.roles.cache.keyArray()
    let bol = false
    let adm = false
    
    //verifica se tem permissoes especificas setadas
    try{
        for (let i = 0; i < dataserver.permitidos.length; i++)
        {
            let rest = dataserver.permitidos[i].id
            bol = !ar.includes(rest)
            if(!bol) i = dataserver.permitidos.length
        }
    }
    catch{bol= false}
    try{
        for (let i = 0; i < dataserver.admins.length; i++) 
        {
            let ad = dataserver.admins[i].id
            adm = !ar.includes(ad)
            if(!adm) i = dataserver.admins.length
        }
    }
    catch{adm = false}
        

    function verificaradmeiro(message) 
    {
        try {
            let verify = dataserver.admins
            
        }catch (erro) {
            if(message.member.id != config.owner) adm = true
            else if (!message.member.hasPermission('ADMINISTRATOR')) adm = true   
        }

       if(adm)
       {
         message.channel.send('sem acesso')                   
       }


    }


   
    
    client.commands.get('start').run(client, message, args)

    if(message.content.startsWith(`y!mute `))
    {
        verificaradmeiro(message)
        if(adm) return
        client.commands.get(`y!mute`).run(client, message, args)
        return
    }
    else if (['admins'].includes(cmd))
    {
        verificaradmeiro(message)
        if(adm) return
        //else if(!message.member.roles.cache.get(f=> f.id )) return
        let cargoadd = message.mentions.roles.first()
        if (!cargoadd) return message.channel.send("escolha um cargo para permitir o uso do bot")
        let x
        try{
            for (let i = 0; i < dataserver.admins.length; i++) {
                x = dataserver.admins[i].id
                if(x === cargoadd.id) i = dataserver.admins.length               
            }
        }
        catch{}
        if(x)
        {
            if( x === cargoadd.id){
                let remove = dataserver.admins.findIndex(f => f.id === x)
                dataserver.admins.splice(remove,1)
                message.channel.send("cargo de admin removido")
            
                
            }
            else if(x !== cargoadd.id)
            {
                dataserver.admins.push(cargoadd)
                message.channel.send("cargo de admin adicionado")
            }
        } 
        else
        {
            dataserver.admins.push(cargoadd)
            message.channel.send("cargo de admin adicionado")            
        } 
        let js = JSON.stringify(dataserver,null, 4)
        fs.writeFileSync(localdata, js, null, err => {
            if(err)
            {
                console.log(err)
            }
        })
        
    }

    
    let comando = client.commands.get(cmd)
    try{
      comando.run(client, message, args)
    }
    catch (e){
        console.log('\n\ncomando inexistente ')
    }

})  


client.login(config.token)
