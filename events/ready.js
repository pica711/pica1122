const Discord = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: Discord.Events.ClientReady,

  run: async (client) => {
    console.log(`${client.user.tag} aktif!`);

    // Durum mesajları
    const activities = [
      "🎫 | Ticket sistemi ile sunucuna renk kat!",
      "👮🏽‍♂️ | Captcha sistemi ile sunucunu koru!",
    ];

    setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setPresence({
        activities: [{ name: activity }],
        status: "idle",
      });
    }, 1000 * 60); // 60 saniyede bir durumu değiştir

    db.set("botAcilis", Date.now()); // Bot açılış zamanı kaydı
  },
};