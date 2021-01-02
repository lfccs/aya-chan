module.exports.run = async (client, message, args, adm) => {
    try {
        if(adm){
            message.channel.send(`acesso negado`)
            return
        }
        message.channel.send(`Se você realmente quer zerar todas as advertências, aguarde 2 minutos para dar sua confirmação`)
        setTimeout(() => {
            client.commands.get('awaitreply').run(client,message,args,'digite confirmar para zerar todas as advertências', 'clearverify', 30000)
        }, 120000);
        
    } catch (error) {
        console.error(error);
    }

}
module.exports.help =
{
    name: `clearadv`,
    description: `zera todas as advertências do servidor`
}