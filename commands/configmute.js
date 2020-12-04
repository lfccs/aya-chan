module.exports.run = async(client ,message, args)=>
{
    
        let cont1 = ('vamos configurar as puniçoes, primeiro me diga quantas advertencias tem neste servidor')
        client.commands.get('awaitreply').run(client, message, args, cont1, `setupquantidade`)

}
module.exports.help ={
    name: 'configmute',
    descriprion: 'configuraçoes'
}