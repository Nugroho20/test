const Discord = require("discord.js");
const convert = require("parse-ms");

  exports.run = async (client, message, args) => {
    message.delete({timeout: 30000});
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }
    let status;
    if (user.presence.activities.length === 1)
      status = user.presence.activities[0];
    else if (user.presence.activities.length > 1)
      status = user.presence.activities[1];
    if (
      user.presence.activities.length === 0 ||
      (status.name !== "Spotify" && status.type !== "LISTENING")
    ) {
      return message.channel.send("This user isn't listening to Spotify.");
    }
    if (
      status !== null &&
      status.type === "LISTENING" &&
      status.name === "Spotify" &&
      status.assets !== null
    ) {
      let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(
          8
        )}`,
        url = `https:/open.spotify.com/track/${status.syncID}`,
        name = status.details,
        artist = status.state,
        album = status.assets.largeText,
        timeStart = status.timestamps.start,
        timeEnd = status.timestamps.end,
        timeConvert = convert(timeEnd - timeStart);
      let minutes =
        timeConvert.minutes < 10
          ? `0${timeConvert.minutes}`
          : timeConvert.minutes;
      let seconds =
        timeConvert.seconds < 10
          ? `0${timeConvert.seconds}`
          : timeConvert.seconds;
      let time = `${minutes}:${seconds}`;
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          "Spotify Track Information",
          "https://cdn.glitch.com/f6b1e017-b0b3-48f1-9640-bc24d93b23dd%2F20210112_081843.gif?v=1610414418159"
        )
        .setColor(0x1ed768)
        .setThumbnail(image)
        .addField("Name:", name, true)
        .addField("Album:", album, true)
        .addField("Artist:", artist, true)
        .addField("Duration:", time, false)
        .addField(
          "Listen now on Spotify!",
          `[\`${artist} - ${name}\`](${url})`,
          false
        );
      return message.channel.send(embed).then(i => {i.delete({timeout: 30000})
  })
    }
 }
    
exports.help = {
    name: "spotify",
    name2: "Spotify",
    description: "Showing track info spotify",
    usage: "spotify / spotify @mention"
};

exports.conf = {
     aliases: ["st"],
     cooldown: 5
};
