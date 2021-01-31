const fs = require(`fs`)
const Parser = require('rss-parser')
const parser = new Parser()
const emitter = require('./feedEmitter')

async function load(url, client, channel, guild, first) {

    const feed = await parser.parseURL(url)
    const filename = `${feed.title.replace(/\s+/g, '-').replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`
    let items = []
    let folder = './rss/feeds/'
    let path = folder + filename

    if (fs.existsSync(path)) {
        items = require(`.${path}`)
    }

    await Promise.all(feed.items.map(async (currentItem) => {
        let newItem = items.filter((item) => item.link === currentItem.link)
        if (newItem.length < 1) {
            items.push(currentItem)
            if (!first)
                emitter(client, currentItem, guild, channel)
        }
    }))

    fs.writeFileSync(path, JSON.stringify(items, null, 4))

}
module.exports = load
