module.exports=
{
    name : "toca ai",
    descrption :"inicia a radio",
    async execute(message, args, ytdl, VC)
    {
        //checa se esta em um canal de voz
        if(!VC) return message.channel.send("bora pra call!!")

        //checa as permissoes 
        const permissions = VC.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("não tenho permissão")
        if(!permissions.has('SPEAK')) return message.channel.send('não posso falar')
        
        //entra na call
        try{
            var connection = await VC.join()
        }catch(error)
        {
            console.log(`erro conexao ${error}`)
            return message.channel.send(`erro conexao ${error}`)
        }
        
        //musicas 
        const dispatcher = connection.play(ytdl(args[1]), 
        {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        })
        .on('finish', () => {
            VC.leave()
        })
        .on('error', error =>{
            console.log(error)
        })

        //volume
        dispatcher.setVolumeLogarithmic(5/5)
    }
}