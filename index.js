const { Client } = require('discord.js');
require('dotenv').config;
const keep_alive = require('./keep_alive.js');

const prefix = '-';
const ownerID = '829825563496808488';

const intentsValue = 3276799; // Your desired intents value

const client = new Client({
  intents: intentsValue,
});

client.on('ready', () => {
    console.log(`Bot is running: ${client.user.tag}!`);
    console.log(`Bot ID: ${client.user.id}!`);
    console.log(`Developed by: its.zoro!`);
});


client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'كت') {
        const randomQuestion = await getRandomQuestion();
        if (randomQuestion) {
            message.channel.send({ embeds: [randomQuestion] });
        } else {
            message.channel.send('No questions available. Add questions using !add command.');
        }
    }

    if (command === "يوزر") {
        if (message.author.id !== ownerID)
          return message.reply(
            "__عمرييييي , شوفو هاد الصغنن عم بيلعب بشي اكبر منو هههه__",
          );
        const newUsername = args.join(" ");
        if (!newUsername) {
          message.reply(
            "__ كيف تغير اسم بدون الاسم بالله عليك؟ اكتب اسم الي تبيه بعد الامر__",
          );
          return;
        }
    
        // Set the new bot username
        client.user
          .setUsername(newUsername)
          .then(() =>
            message.reply(`BOT NEW USERNAME : ${newUsername}, تم تغيير الاسم `),
          )
          .catch((error) => {
            console.error("Error changing bot username:", error);
            message.reply("__ممكن تحاول بعد مدة زمنية لان صار في error بل بوت__");
          });
      } else if (command === "افاتار") {
        if (message.author.id !== ownerID)
          return message.reply(
            "عمرييييي , شوفو هاد الصغنن عم بيلعب بشي اكبر منو هههه",
          );
        const newAvatarUrl = args[0];
        if (!newAvatarUrl) {
          message.reply("__ممكن تكتب رابط الصورة بعد الامر__.");
          return;
        }
    
        // Set the new bot avatar
        client.user
          .setAvatar(newAvatarUrl)
          .then(() => message.reply("__ايواا تم تغيير الصورة بنجاح يا غالي/ة__."))
          .catch((error) => {
            console.error("Error changing bot avatar:", error);
            message.reply("An error occurred while changing the bot avatar.");
          });
      }
      // dev by its.zoro
    });


async function getRandomQuestion() {
    try {
        const channelId = '1202942728938459147'; // Replace with the actual channel ID
        const channel = await client.channels.fetch(channelId);

        if (!channel) {
            console.error(`Channel with ID ${channelId} not found.`);
            return null;
        }

        const messages = await channel.messages.fetch({ limit: 100 });
        const questionMessages = messages.filter(message => !message.author.bot && message.content.trim() !== '');

        if (questionMessages.size === 0) {
            console.error(`No non-bot messages found in the channel.`);
            return null;
        }

        const randomMessage = questionMessages.random();
        const randomQuestionContent = randomMessage.content.trim();

        const randomQuestion = {
            title: 'كت تويت',
            description: randomQuestionContent,
            color: 0x7b4d00,
            footer: {
                text: 'Its Community',
            },
            thumbnail: {
                url: 'https://cdn.discordapp.com/emojis/1109959963159306292.gif?size=96&quality=lossless',
            },
        };

        return randomQuestion;
    } catch (error) {
        console.error('Error fetching random question:', error);
        return null;
    }
}

keep_alive

client.login(process.env.token);
