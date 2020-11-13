  ////////////////////////////
  //////CONFIG LOAD///////////
  ////////////////////////////
  const { MessageEmbed } = require("discord.js");
  const Discord = require("discord.js");
  const db = require('quick.db');
  //all radio stations
  const Radiostations = [
    "Standard-Radio https://streams.ilovemusic.de/iloveradio14.mp3",
    "Base-Radio.de https://baseradiode.stream.laut.fm/baseradiode",
    "Chill-Radio https://streams.ilovemusic.de/iloveradio17.mp3",
    "Dance-Radio https://streams.ilovemusic.de/iloveradio2.mp3",
    "Deutsch-Rap-Radio https://streams.ilovemusic.de/iloveradio6.mp3",
    "Greatest-hits-Radio https://streams.ilovemusic.de/iloveradio16.mp3",
    "Hip-hop-Radio https://streams.ilovemusic.de/iloveradio3.mp3",
    "Party-Radio https://streams.ilovemusic.de/iloveradio14.mp3",
    "Us-Rap-Radio https://streams.ilovemusic.de/iloveradio13.mp3",
    "X-Mas-Radio https://streams.ilovemusic.de/iloveradio8.mp3",
    "Greatest-hits-Radio https://stream-mz.planetradio.co.uk/net2national.mp3", //britten
    "Absolut-Radio http://icy-e-bab-02-gos.sharp-stream.com/absoluteradio.mp3",//britten
    "Absolut-70s-Radio http://ais.absoluteradio.co.uk/absolute70s.mp3",//britten
    "Absolut-80s-Radio http://ais.absoluteradio.co.uk/absolute80s.mp3",//britten
    "Absolut-90s-Radio http://ais.absoluteradio.co.uk/absolute90s.mp3",//britten
    "Absolut-2000s-Radio http://ais.absoluteradio.co.uk/absolute00s.mp3",//britten
    "Absolut-Classic-Rock http://icy-e-bab-04-cr.sharp-stream.com/absoluteclassicrock.mp3",//britten

    "Top-Radio http://loadbalancing.topradio.be/topradio.mp3", //australia

    "88.6-Radio http://radio886.fluidstream.eu/886_live.mp3", //austria
    "Hitradio-Ö3 http://mp3stream7.apasf.apa.at:8000/.mp3", //austria

    "NRJ-Radio http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3",//france
    "Radio-France-Radio http://direct.fipradio.fr/live/fip-midfi.mp3",//france

    "Rai-Radio http://icestreaming.rai.it:80/1.mp3",//italy
    "Veronica-Radio http://icestreaming.rai.it:80/2.mp3",//italy

    "ERR-Radio http://icecast.err.ee:80/vikerraadio.mp3",//Estonia
    "Tallin-Radio http://icecast.err.ee:80/raadiotallinn.mp3",//Estonia

    "Color-Music-Radio http://icecast8.play.cz/color128.mp3",//Spain
    "Helax-93.7-Radio http://ice.abradio.cz:8000/helax128.mp3",//Spain

    "Český-rozhlas-Radio http://icecast6.play.cz/cro2-128.mp3",//Czech
    "Spin-Radio http://icecast4.play.cz/spin128.mp3",//Czech

    "BB-Radio http://icecast.omroep.nl/radio1-bb-mp3",//netherlands
    "538-Radio http://21223.live.streamtheworld.com/RADIO538.mp3",//netherlands

    "radio90-cieszyn http://streams2.radio90.pl:8000/radio90_128kbps_stereo.mp3",//Polska
    "Fama-Radio http://stream2.nadaje.com:8076/,stream.mp3"//Polska
  ]
  ////////////////////////////
  //////COMMAND BEGIN/////////
  ////////////////////////////
  module.exports = async function (client, message, args) {
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = "!!!";

    //define the No args Embed, lmao
    let resultsEmbed = new Discord.MessageEmbed()
        .setTitle(`**🎵 Available Radio Stations**`)//
        .addFields(
          { name: `***📻 Standard Radio***`, value: `**1:  ** [\`${Radiostations[1-1].split(" ")[0]}\`](${Radiostations[1-1].split(" ")[1]})
          **2:  ** [\`${Radiostations[2-1].split(" ")[0]}\`](${Radiostations[2-1].split(" ")[1]})
          **3:  ** [\`${Radiostations[3-1].split(" ")[0]}\`](${Radiostations[3-1].split(" ")[1]})
          **4:  ** [\`${Radiostations[4-1].split(" ")[0]}\`](${Radiostations[4-1].split(" ")[1]})
          **5:  ** [\`${Radiostations[5-1].split(" ")[0]}\`](${Radiostations[5-1].split(" ")[1]})
          ` , inline: true}, { name: `***📻 Standard Radio***`, value: `**6:  ** [\`${Radiostations[6-1].split(" ")[0]}\`](${Radiostations[6-1].split(" ")[1]})
          **7:  ** [\`${Radiostations[7-1].split(" ")[0]}\`](${Radiostations[7-1].split(" ")[1]})
          **8:  ** [\`${Radiostations[8-1].split(" ")[0]}\`](${Radiostations[8-1].split(" ")[1]})
          **9:  ** [\`${Radiostations[9-1].split(" ")[0]}\`](${Radiostations[9-1].split(" ")[1]})
          **10: ** [\`${Radiostations[10-1].split(" ")[0]}\`](${Radiostations[10-1].split(" ")[1]})
          ` , inline: true},
          { name: `\u200b`, value: `\u200b` , inline: true},

          { name: `***🇬🇧 British RADIO:***`, value: `**11: ** [\`${Radiostations[11-1].split(" ")[0]}\`](${Radiostations[11-1].split(" ")[1]})
  **12: ** [\`${Radiostations[12-1].split(" ")[0]}\`](${Radiostations[12-1].split(" ")[1]})
  ` , inline: true},
  { name: `***🇬🇧 British RADIO:***`, value: `
  **13: ** [\`${Radiostations[13-1].split(" ")[0]}\`](${Radiostations[13-1].split(" ")[1]})
  **14: ** [\`${Radiostations[14-1].split(" ")[0]}\`](${Radiostations[14-1].split(" ")[1]})
  ` , inline: true},
  { name: `***🇬🇧 British RADIO:***`, value: `
  **15: ** [\`${Radiostations[15-1].split(" ")[0]}\`](${Radiostations[15-1].split(" ")[1]})
  **16: ** [\`${Radiostations[16-1].split(" ")[0]}\`](${Radiostations[16-1].split(" ")[1]})
  ` , inline: true},

  { name: `***🇦🇺 AUSTRALIA RADIO:***`, value: `**17: ** [\`${Radiostations[17-1].split(" ")[0]}\`](${Radiostations[17-1].split(" ")[1]})
  **18: ** [\`${Radiostations[18-1].split(" ")[0]}\`](${Radiostations[18-1].split(" ")[1]})`, inline: true  },
        
  { name: `***🇦🇹 AUSTRIA RADIO:***`, value: `**19: ** [\`${Radiostations[19-1].split(" ")[0]}\`](${Radiostations[19-1].split(" ")[1]})
  **20: ** [\`${Radiostations[20-1].split(" ")[0]}\`](${Radiostations[20-1].split(" ")[1]})`, inline: true },

          { name: `***🇫🇷 France RADIO:***`, value: ` **21: ** [\`${Radiostations[21-1].split(" ")[0]}\`](${Radiostations[21-1].split(" ")[1]})
  **22: ** [\`${Radiostations[22-1].split(" ")[0]}\`](${Radiostations[22-1].split(" ")[1]})`, inline: true },

          { name: `***🇮🇹 Italy RADIO:***`, value: `**23: ** [\`${Radiostations[23-1].split(" ")[0]}\`](${Radiostations[23-1].split(" ")[1]})
  **24: ** [\`${Radiostations[24-1].split(" ")[0]}\`](${Radiostations[24-1].split(" ")[1]})`, inline: true },

          { name: `***🇪🇪 Estonia RADIO:***`, value: `**25: ** [\`${Radiostations[25-1].split(" ")[0]}\`](${Radiostations[25-1].split(" ")[1]})
  **26: ** [\`${Radiostations[26-1].split(" ")[0]}\`](${Radiostations[26-1].split(" ")[1]})`, inline: true },

          { name: `***🇪🇸 Spain RADIO:***`, value: `**27: ** [\`${Radiostations[27-1].split(" ")[0]}\`](${Radiostations[27-1].split(" ")[1]})
  **28: ** [\`${Radiostations[28-1].split(" ")[0]}\`](${Radiostations[28-1].split(" ")[1]})`, inline: true },

          { name: `***🇨🇿 Czech RADIO:***`, value: `**29: ** [\`${Radiostations[29-1].split(" ")[0]}\`](${Radiostations[29-1].split(" ")[1]})
  **30: ** [\`${Radiostations[30-1].split(" ")[0]}\`](${Radiostations[30-1].split(" ")[1]})`, inline: true },

          { name: `***🇳🇱 Netherlands RADIO:***`, value: `**31: ** [\`${Radiostations[31-1].split(" ")[0]}\`](${Radiostations[31-1].split(" ")[1]})
  **32: ** [\`${Radiostations[32-1].split(" ")[0]}\`](${Radiostations[32-1].split(" ")[1]})`, inline: true },

          { name: `***🇵🇱 Polska RADIO:***`, value: `**33: ** [\`${Radiostations[33-1].split(" ")[0]}\`](${Radiostations[33-1].split(" ")[1]})
  **34: ** [\`${Radiostations[34-1].split(" ")[0]}\`](${Radiostations[34-1].split(" ")[1]})`, inline: true },
        )		
        .setColor("#c219d8")
        .setFooter(`Type: ${prefix}radio <1-34>`,  client.user.displayAvatarURL())
        .setTimestamp();

      //if no args
      if (args[0] == null) {
        return message.channel.send(resultsEmbed);
      }
    const { channel } = message.member.voice;
    //if not a valid channel
    if (!channel) return message.reply("Please join a Voice Channel first");  
      //If not in the same channel return error
      if (message.guild.me.connection && channel !== message.guild.me.voice.channel)
      return message.reply(`You must be in the same Voice Channel as me`);
      //check permissions
      const permissions = channel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT"))
        return attentionembed(message,"I need permissions to join your channel!");
      if (!permissions.has("SPEAK"))
        return attentionembed(message,"I need permissions to speak in your channel");
      //If not a number return
      if(isNaN(args[0])) {
        channel.leave();
        return message.reply(
        new MessageEmbed()
        .setColor("#ff0e7a")
        .setTitle( `Not a valid radio station please use a Number between \`1\` and \`${Radiostations.length}\``)
      );}

  let i;

  //get which radio station
  for(i=1; i <= 1 + Radiostations.length; i++){

    if(Number(args[0])===Number(i)) {
      break;
    } 
  }
  //if number to big
  if(Number(i) === 35) {
    channel.leave();
    return message.reply(  new MessageEmbed()
  .setColor("#ff0e7a")
  .setTitle( `Not a valid radio station please use a Number between \`1\` and \`${Radiostations.length}\``));}
  //define the Radio Args like title and url
  const args2 = Radiostations[i-1].split(` `);
  //song infos
  const song = {
    title: args2[0],
    url: args2[1],
    thumbnail: "https://cdn.discordapp.com/attachments/748095614017077318/769672148524335114/unknown.png",
    duration: 10000,
  };

  //try to join the Channel
  let connection = await channel.join().catch(console.error);
  //send Search something embed
  message.channel.send(new MessageEmbed().setColor("#c219d8")
  .setDescription(`**🔴 Searching 🔍 \`${Radiostations[i-1].split(" ")[0]}\`**`));
  //mute yourself
  await connection.voice.setSelfDeaf(true);
  await connection.voice.setDeaf(true);
 
    const newsong = new MessageEmbed()
      .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }))
      .setTitle("🎵 Started playing" + song.title)
      .setColor("#c219d8")
      .setThumbnail(song.thumbnail)
      .setURL(song.url)
      .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    //send the Embed into the Queue Channel
      message.channel
      .send(newsong)

      try {    
    const dispatcher = await connection.play(song.url);

  dispatcher.on("end", end => {radioexecuteadmin()});
  } catch (error) {
    console.error(error);
    await channel.leave();
    return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
  }
    //sende bestätigung
  }