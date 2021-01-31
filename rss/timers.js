const load = require('./load')

async function rssTimers(client, rss) {
    const feeds = require('./feeds.json')

    if (!rss) {
        rss = feeds.rss
        for (let i = 0; i < rss.length; i++) {
            start(client, rss[i])
        }
    }
    else {
        start(client, rss, true)
    }

}
async function start(client, rss, first) {
    load(rss.link, client, rss.channel, rss.guild, first)
    timer(client, rss)
}
async function timer(client, rss) {
    setInterval(() => {
        start(client, rss)
    }, rss.time * 60 * 1000)
}
module.exports = rssTimers
