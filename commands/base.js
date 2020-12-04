module.exports.run = async(message) =>
{
        // lista dos cargos 
        const roleList = message.guild.roles.cache.keyArray()
        let roleLength = roleList.length

        let roles = message.member.roles.cache.keyArray()
        console.log(roles)
        
        let members = message.guild.members.cache.keyArray()
        return console.log(members)


}
module.exports.help =
{
    name:"base"
}