//configuration 
const Discord = require("discord.js");
const DisTube = require("distube");
const client = new Discord.Client({disableMentions: "everone"});
const config = {
    prefix: "?",
    token: "NzQ4MDk2MTcwNjk3NTU1OTY5.X0Yc2g.pLoDQa1J_aUi8O2_Pwo9ov_pyQo"
}
const distube = new DisTube(client, {
    searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 50, leaveOnEmpty: true, leaveOnFinish: true, leaveOnStop: true, searchSongs: false, customFilters:
    {
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "8d": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "subboost": "asubboost",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
    }
})
const db = require('quick.db');
const filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "subboost"];


//events
client.login(config.token);

let stateswitch = false;

client.on("ready", () => {
    console.log(`Bot has started as : ${client.user.tag}`);
    setInterval(() => {

        stateswitch = !stateswitch;

        if (stateswitch)
            client.user.setActivity(`${config.PREFIX}help | 2.musicium.eu`, { type: "PLAYING" });
        else
            client.user.setActivity(`${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} User | ${client.guilds.cache.size} Server`, { type: "PLAYING" });
    }, (5000));
})
client.on("message", async message => {
    if (message.author.bot) { return; }
    if (!message.guild) return;
    //getting prefix 
    let prefix = await db.get(`prefix_${message.guild.id}`)
    //if not prefix set it to standard prefix in the config.json file
    if (prefix === null) prefix = config.PREFIX;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (message.content.startsWith(prefix)){
        let emojis = ["🟢","🟩","✅","☑️", "💚", "👌", "👍", "💪"];
        let random = getRandomInt(8);
        message.react(emojis[random]);
    }
    else{
        return;
    }
    if (command === "help") {
        embedbuilder(client, message, "#c219d8", "Commands:", `
        Prefix is: \`?\` change with: \`?prefix <NEW PREFIX>\`

        \`${prefix}help\`   --  Gives you a list of all Commands  --  Aliases: \`h\`
        \`${prefix}play <URL/NAME>\`   --  Plays a song  --  Aliases: \`p\`
        \`${prefix}prefix <PREFIX>\`   --  Changes the prefix  --  Aliases: \` \`
        \`${prefix}search <URL/NAME>\`   --  Searches for top 15 results  --  Aliases: \` \`
        \`${prefix}status\`   --  Shows queue status  --  Aliases: \` \`
        \`${prefix}nowplaying\`   --  Shows current song  --  Aliases: \`np\`
        \`${prefix}pause\`   --  Pauses the playing song  --  Aliases: \` \`
        \`${prefix}resume\`   --  Resume the paused song  --  Aliases: \`r\`
        \`${prefix}shuffle\`   --  Shuffles the queue  --  Aliases: \`mix\`
        \`${prefix}playskip\`   --  Plays new song and skips current  --  Aliases: \`ps\`
        \`${prefix}autoplay\`   --  Enables autoplay, random similar songs  --  Aliases: \`ap\`
        \`${prefix}skip\`   --  Skips current song  --  Aliases: \`s\`
        \`${prefix}stop\`   --  Stops playing and leaves the channel  --  Aliases: \`leave\`
        \`${prefix}seek <DURATION>\`   --  Moves in the Song in: seconds  --  Aliases: \` \`
        \`${prefix}volume <VOLUME\`   --  Changes volume  --  Aliases: \`vol\`
        \`${prefix}queue\`   --  Shows current Queue  --  Aliases: \`qu\`
        \`${prefix}loop <0/1/2>\`   --  Enables loop for off / song / queue  --  Aliases: \`mix\`
        \`${prefix}jump <Queue num.>\`   --  Jumps to a queue song --  Aliases: \` \`
        \`${prefix}3d\`   --  Changes filter to 3d
        \`${prefix}bassboost\`   --  Changes filter to bassboost
        \`${prefix}echo\`   --  Changes filter to echo
        \`${prefix}karaoke\`   --  Changes filter to karaoke
        \`${prefix}nightcore\`   --  Changes filter to nightcore
        \`${prefix}vaporwave\`   --  Changes filter to vaporwave
        \`${prefix}flanger\`   --  Changes filter to flanger
        \`${prefix}subboost\`   --  Changes filter to subboost

        Supported sources: youtube, soundcloud, spotify...
        Bot by: Tomato#6966  [Server](https://discord.com/invite/fqBPdXBHwV)  [Musicium](https://musicium.eu)
        `)
        return;
    }
    else if (command === "prefix") {

        let prefix = await db.get(`prefix_${message.guild.id}`)

        if (prefix === null) prefix = config.PREFIX;

        message.react("✅");

        if (!args[0]) return embedbuilder(client, message, "RED", "Current Prefix: \`${prefix}\`", `Please provide a new prefix`)


        if (!message.member.hasPermission("ADMINISTRATOR")) return embedbuilder(client, message, "RED", "PREFIX", `❌ You don\'t have permission for this Command!`)


        if (args[1]) return embedbuilder(client, message, "RED", "PREFIX", `'❌ The prefix can\'t have two spaces'`)

        db.set(`prefix_${message.guild.id}`, args[0])

        return embedbuilder(client, message, "#c219d8", "PREFIX", `✅ Successfully set new prefix to **\`${args[0]}\`**`)
    }
    else if (command === "search") {

        embedbuilder(client, message, "#c219d8", "Searching!", args.join(" "))

        let result = await distube.search(args.join(" "));

        let searchresult = "";

        for (let i = 0; i <= result.length; i++) {
            try {
                searchresult += await `**${i + 1}**. ${result[i].name} - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }
        let searchembed = await embedbuilder(client, message, "#c219d8", "Current Queue!", searchresult)

        let userinput;

        await searchembed.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
            userinput = collected.first().content;
            if (isNaN(userinput)) {
                embedbuilder(client, message, "RED", "Not a right number!", "so i use number 1!")
                userinput = 1;
            }
            if (Number(userinput) > 0 && Number(userinput) <= 15) {
                embedbuilder(client, message, "RED", "Not a right number!", "so i use number 1!")
                userinput = 1;
            }
            searchembed.delete({ timeout: Number(client.ws.ping) });
        }).catch(() => { console.log(console.error); userinput = 404 });
        if (userinput === 404) {
            return embedbuilder(client, message, "RED", "Something went wrong!")
        }
        embedbuilder(client, message, "#c219d8", "Searching!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
        return distube.play(message, result[userinput - 1].url)
    }
    else if (command == "status") {
        let queue = distube.getQueue(message);
        const status = `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
        return embedbuilder(client, message, "#c219d8", "Current status:", status)
    }
    else if (command == "np" || command === "nowplaying") {
        let queue = distube.getQueue(message);
        let cursong = queue.songs[0];
        console.log(cursong)
        return embedbuilder(client, message, "#c219d8", "Current Song!", `[${cursong.name}](${cursong.url})\n\nDuration: \`${cursong.formattedDuration}\``, cursong.thumbnail)
    }
    else if (command == "pause") {
        embedbuilder(client, message, "#c219d8", "Paused!")
        return distube.pause(message);
    }
    else if (command == "resume" || command == "r") {
        embedbuilder(client, message, "#c219d8", "Resume!")
        return distube.resume(message);
    }
    else if (command == "shuffle" || command == "mix") {
        embedbuilder(client, message, "#c219d8", "Shuffled!")
        return distube.shuffle(message);
    }
    else if (command == "playskip" || command == "ps") {
        embedbuilder(client, message, "#c219d8", "Searching and Skipping!", args.join(" "))
        return distube.playSkip(message, args.join(" "));
    }
    else if (command == "autoplay" || command == "ap") {
        embedbuilder(client, message, "#c219d8", `Autoplay is now on ${distube.toggleAutoplay(message) ? "ON" : "OFF"}!`)
        return;
    }
    else if (command === "ping") {
        return embedbuilder(client, message, `sBLUE`, `PING:`, `\`${client.ws.ping} ms\``)
    }
    else if (command === "play" || command === "p") {
        embedbuilder(client, message, "#c219d8", "Searching!", args.join(" "))
        return distube.play(message, args.join(" "));
    }
    else if (command === "skip" || command === "s") {
        embedbuilder(client, message, "#c219d8", "SKIPPED!", `Skipped the song`)
        return distube.skip(message);
    }
    else if (command === "stop" || command === "leave") {
        embedbuilder(client, message, "RED", "STOPPED!", `Leaved the channel`)

        return distube.stop(message);
    }
    else if (command === "seek") {
        embedbuilder(client, message, "#c219d8", "Seeked!", `seeked the song for \`${args[0]} seconds\``)
        return distube.seek(message, Number(args[0] * 1000));
    }
    else if (filters.includes(command)) {
        let filter = distube.setFilter(message, command);
        return embedbuilder(client, message, "#c219d8", "Adding filter!", filter)
    }
    else if (command === "volume" || command === "vol") {

        embedbuilder(client, message, "#c219d8", "VOLUME!", `changed volume to \`${args[0]} %\``)
        return distube.setVolume(message, args[0]);
    }
    else if (command === "queue" || command === "qu") {
        let queue = distube.getQueue(message);

        let curqueue = queue.songs.map((song, id) =>
            {if(id>20) return; `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``}
        ).join("\n");

        return embedbuilder(client, message, "#c219d8", "Current Queue!", curqueue)
    }
    else if (command === "loop" || command === "repeat") {
        if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
            distube.setRepeatMode(message, parseInt(args[0]))
            return embedbuilder(client, message, "#c219d8", "Repeat mode set to:!", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
        }
        else {
            return embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }
    }
    else if (command === "jump") {
        let queue = distube.getQueue(message);

        if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
            embedbuilder(client, message, "RED", "ERROR", `Jumped ${parseInt(args[0])} songs!`)
            return distube.jump(message, parseInt(args[0]))
                .catch(err => message.channel.send("Invalid song number."));
        }
        else {
            return embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }

    }
    else if (message.content.startsWith(prefix)) {
        return embedbuilder(client, message, "RED", "Unknown Command", `Type ${prefix}help to see all available commands!`)
    }
})

//queue
const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
//distube
distube
    .on("playSong", (message, queue, song) => {

        return embedbuilder(client, message, "#c219d8", "Playing new Song!", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n\nVolume: \`${queue.volume} %\`\nLoop: \`${queue.repeatMode ? "On" : "Off"}\`\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\`\nFilter: \`${queue.filter || "OFF"}\``, song.thumbnail)
    })
    .on("addSong", (message, queue, song) => {
        console.log(queue.duration);
        console.log(song.duration);

        let round = Math.floor((queue.duration - song.duration) / 60 * 100) / 100;
        console.log(round)
        let durationformat = round.toString().replace(".", ": ");
        return embedbuilder(client, message, "#c219d8", "Added a Song!", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user} \n\nVolume: \`${queue.volume} %\`\nLoop: \`${queue.repeatMode ? "On" : "Off"}\`\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\`\nFilter: \`${queue.filter || "OFF"}\`\nEstimated Time: ${queue.songs.length - 1} Song(s)\`${durationformat}\`\nQueue duration: \`${queue.formattedDuration}\``, song.thumbnail)
    })
    .on("playList", (message, queue, playlist, song) => {
        embedbuilder(client, message, "#c219d8", "Playling playlist", `Playlist: [\`${playlist.title ? playlist.title : "playlist.title" }\`](${playlist.url})  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}\n\nstarting playing Song: \`${song.name}\`  -  \`${song.formattedDuration}\`\n${status(queue)}`, playlist.thumbnail)
    })
    .on("addList", (message, queue, playlist, song) => {
        embedbuilder(client, message, "#c219d8", "Added a Playling!", `Playlist: [\`${playlist.title}\`](${playlist.url})  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}`, playlist.thumbnail)
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        embedbuilder(client, message, "#c219d8", "", `**Choose an option from below**\n${result.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    .on("searchCancel", (message) => {
        try{
            message.reactions.removeAll();
            message.react("❗️")
        }catch{
        }
        embedbuilder(client, message, "RED", `Searching canceled`, "")
    })
    .on("error", (message, err) => {
        try{
            message.reactions.removeAll();
            message.react("❗️")
        }catch{
        }
        embedbuilder(client, message, "RED", "An error encountered:", err)
    })
    .on("finish", message => {
        embedbuilder(client, message, "RED", "LEFT THE CHANNEL", "There are no more songs left")
    })
    .on("empty", message => {
        
        embedbuilder(client, message, "RED", "Left the channel cause it got empty!")
    })
    .on("noRelated", message => {
        embedbuilder(client, message, "RED", "Can't find related video to play. Stop playing music.")
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 69;
    });

//function embeds
//embedbuilder(client, message, "RED", "TITEL", "DESCRIPTION")
function embedbuilder(client, message, color, title, description, thumbnail) {
    let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL());
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail)
    return message.channel.send(embed);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
