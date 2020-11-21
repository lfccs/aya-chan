module.exports=
{
    name: "poderes",
    description: "mostra todos os poderes dos cargos de acordo coms os canais",
    execute(message, args)
    {  
        const fs = require("fs")
        var texto = ""
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
        let chan = mychannel(GetChannel(args))
        let emb = CriarEmbed(rol.name)

        if (!chan)
        {
            for(i = 0; channelLength > i; i++)
            {
                //texto = `${texto} \n ${chan}`

                chan = mychannel(i)
                let perms = chan.permissionsFor(rol)
                let stringPermissions = perms.map(p => `${[p]}`).join()
                addpcanal(chan.name, stringPermissions, emb)
            }
            message.channel.send(emb)
        }
        else 
        {
            let perms = chan.permissionsFor(rol)
            let stringPermissions = permissoes(perms).map(p => `${p}`).join("\n")
            addpcanal(chan.name, stringPermissions, emb)
            message.channel.send(emb)
        }

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
            if(!id && id != 0) return

            if(id.length > 4)
            {
                let chan = message.guild.channels.cache.find(r => r.id === `${id}`);
                return chan   
            }
            else 
            {
                let chan = message.guild.channels.cache.find(r => r.id == `${channelList[id]}`)
                return chan
            }
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
        function GetChannel(args) 
        {
            if (!args) return;

            let ment = args[1]
            if (!ment) {
                return
            }

            if (ment.startsWith('<#') && ment.endsWith('>')) 
            {
		        ment = ment.slice(2, -1);

                if (ment.startsWith('!')) 
                {
			        ment = ment.slice(1);
		        }

		        return ment
	        }
        }
    }     
}