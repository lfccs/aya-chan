module.exports=
{
    name: 'stop',
    description: 'desliga o radio.',
    async execute(message, args, VC)
    {
        if(!VC) return message.channel.send("você precisa estar comigo pra eu te obedecer")
        await VC.leave()
    }
}