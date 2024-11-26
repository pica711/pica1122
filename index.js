const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const db = require('croxydb');
const config = require("./config.json");
const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");

const client = new Discord.Client({
    intents: 3276543,
    partials: Object.values(Discord.Partials),
    allowedMentions: {
        parse: ["users", "roles", "everyone"]
    },
    retryLimit: 3
});

global.client = client;
client.commands = global.commands = [];

/* SLASH KOMUTLARI */
console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`);

for (let commandName of fs.readdirSync("./commands")) {
    if (!commandName.endsWith(".js")) continue;

    const command = require(`./commands/${commandName}`);
    client.commands.push({
        name: command.name.toLowerCase(),
        description: command.description.toLowerCase(),
        options: command.options,
        dm_permission: false,
        type: 1
    });

    console.log(`[+] ${commandName} komutu başarıyla yüklendi.`);
}

/* OLAYLAR */
console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`);

for (let eventName of fs.readdirSync("./events")) {
    if (!eventName.endsWith(".js")) continue;

    const event = require(`./events/${eventName}`);
    const event_name = eventName.split(".")[0];

    client.on(event.name, (...args) => {
        try {
            event.run(client, ...args);
        } catch (error) {
            console.error(`[HATA] ${event_name} olayı sırasında bir hata oluştu:`, error);
        }
    });

    console.log(`[+] ${eventName} olayı başarıyla yüklendi.`);
}

/* SLASH KOMUTLARINI YÜKLEME */
client.once("ready", async () => {
    const rest = new Rest.REST({ version: "10" }).setToken(config.token);
    try {
        await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
            body: client.commands,
        });
    } catch (error) {
        console.error(`[HATA] Slash komutları kaydedilirken bir hata oluştu:`, error);
    }
});

client.login(config.token)
    .then(() => {
        console.log(`[-] Discord API'ye istek gönderiliyor.`);
        eval("console.clear()");
    })
    .catch((error) => {
        console.error(`[HATA] Discord API'ye istek gönderimi başarısız:`, error);
    });

/* GLOBAL HATA YAKALAMA */

// Synchronous (senkron) hataları yakalayacak
process.on("uncaughtException", (error) => {
    console.error(`[HATA] Yakalanmamış Hata:`, error);
    // Burada process.exit() kullanılmıyor, bot kapanmaz!
});

// Asynchronous (asenkron) hataları yakalayacak
process.on("unhandledRejection", (reason, promise) => {
    console.error(`[HATA] Yakalanmamış Promise Reddedilmesi:`, reason);
    // Burada da process.exit() kullanılmıyor, bot kapanmaz!
});
