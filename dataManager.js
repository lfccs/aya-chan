module.exports = function fileManager() {
    const localData = `./data/${message.guild.id}.json`
    if (!fs.existsSync(localData)) {
        fs.writeFileSync(localData,
            JSON.stringify({
                "permitidos": [
                ],
                "admins": [
                ]
            }, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            })
    }
    if (!fs.existsSync(`./database/${message.guild.id}/`)) {
        fs.mkdirSync(`./database/${message.guild.id}/`, 0o776)
    }
    if (!fs.existsSync(`./database/${message.guild.id}/data.json`)) {
        fs.writeFileSync(`./database/${message.guild.id}/data.json`,
            JSON.stringify({}, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            })
    }
    if (!fs.existsSync(`./database/${message.guild.id}/mutes.json`)) {
        fs.writeFileSync(`./database/${message.guild.id}/mutes.json`,
            JSON.stringify({}, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            })
    }
    if (!fs.existsSync(`./database/${message.guild.id}/configmutes.json`)) {
        fs.writeFileSync(`./database/${message.guild.id}/configmutes.json`,
            JSON.stringify({}, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            })
    }
    if (!fs.existsSync(`./database/${message.guild.id}/cargos.json`)) {
        fs.writeFileSync(`./database/${message.guild.id}/cargos.json`,
            JSON.stringify({}, null, 4), err => {
                if (err) {
                    console.log(err)
                    message.channel.send(err)
                }
            })
    }

    return localData
}