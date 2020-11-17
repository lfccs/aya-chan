module.exports=
{
    name: "poderes",
    description: "mostra todos os poderes dos cargos de acordo coms os canais",
    execute(message, args)
    {   var texto = ""
        var permlist = []

        //lista das permissoes e emojis
        const {array, emojis, nomes} = require('../config.json')

        // lista dos cargos 
        const roleList = message.guild.roles.cache.keyArray()
        let roleLength = roleList.length

        //lista dos canais
        const channelList = message.guild.channels.cache.keyArray()
        let channelLength = channelList.length
        
        //let rol = myrole(2)
        let rol = myrole(GetRoleMentions(args))
        let emb = CriarEmbed(rol.name)

        for(i = 0; channelLength > i; i++)
        {
            //texto = `${texto} \n ${chan}`

            let chan = mychannel(i)
            let perms = chan.permissionsFor(rol)
            let stringPermissions = permissoes(perms).toString()
            addpcanal(chan.name, stringPermissions, emb)
        }

        message.channel.send(emb)
        //message.channel.send(texto)
        
        /*const myle = myrole.length
        for(j = 0; array.length > j; j++){
            texto = array[j]
            for(i = 0; myle > i; i++)
            {
               let role = message.guild.roles.cache.find(r => r.id === `${myrole[i]}`);               
               let nameperm = array[j]
               let check = perms.has(nameperm)    
               if(check) texto = `${texto}\n ${role} ✅`
               //else texto = `${texto}\n ${role} ❌`
            }
            message.channel.send(texto) 
        }*/

        //busca o cargo
        function myrole(id)
        {
            if(id.length > 4)
            {
                let role = message.guild.roles.cache.find(r => r.id === `${id}`);
                return role   
            }
            else 
            {
                let role = message.guild.roles.cache.find(r => r.id === `${roleList[id]}`);
                return role  
            }       

        }
        
        //busca o canal 
        function mychannel(id)
        {
            let chan = message.guild.channels.cache.find(r => r.id == `${channelList[id]}`)
            return chan
        }

        //busca as permissoes
        function permissoes(perms)
        {
            let permtemp = []
            for(j = 0; array.length > j; j++)
            {

                    let nameperm = array[j]
                    let check = perms.has(nameperm)    
                    if(check) permlist.push(nomes[j])
                    //`${texto}\n ${role} ✅`
                    //else texto = `${texto}\n ${role} ❌`
            }
            permtemp = permlist
            permlist =[]
            return permtemp

        }

        //criar o embed
        function CriarEmbed(cargo)
        {
            const Discord = require('discord.js')

            const embedp = new Discord.MessageEmbed()
            .setColor('#009E23')
            .setTitle(`${cargo}`)            
            .setDescription('esse cargo tem as seguintes permissõees')
            .setFooter('by FELCS', 'https://i.imgur.com/wSTFkRM.png');
           
            return embedp
        }
        
        //adicionar infos
        function addpcanal(canal, perms, embd) 
        {
            embd.addFields
            (
                { 
                    name: `${canal}`, value: `${perms}` 
                },
            )
        }

        function GetRoleMentions(args) 
        {
            if (!args) return;

            let ment = args[0]

            if (ment.startsWith('<@&') && ment.endsWith('>')) 
            {
		        ment = ment.slice(3, -1);

                if (ment.startsWith('!')) 
                {
			        ment = ment.slice(1);
		        }

		        return ment
	        }
        }
    }     
}