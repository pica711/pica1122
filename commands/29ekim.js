const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '29ekim',
    description: '29 Ekim Cumhuriyet Bayramınız Kutlu Olsun!',
    type: 1,

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('🇹🇷 **29 Ekim Cumhuriyet Bayramı** 🇹🇷')
            .setThumbnail('https://cdn.discordapp.com/attachments/1272132466714480700/1300419063696326756/images_3.jpg?ex=6720c521&is=671f73a1&hm=eb0e0830a3712ca2e868187452b2bd103bd5d34f1069247e433e70851703cbd0&')
            .setDescription(`
                **Yunan İşgali, Sevr Antlaşması ve Türk Milleti'nin Gücü**

                1919'da Yunanlar, Anadolu'yu işgal edip milletimizi boyunduruk altına almak istediler. 
                Ardından Sevr Antlaşması, Türk milletini parçalamayı ve esarete mahkum etmeyi amaçlayan bir 
                senaryo olarak karşımıza çıktı. Fakat Türk milleti, küllerinden yeniden doğarak bu planları bozdu.

                **29 Ekim 1923'te**, Cumhuriyetimizi ilan ederek özgürlüğümüze kavuştuğumuz o büyük günü tarihe 
                altın harflerle kazıdık. Kahraman ordumuz, düşmanı püskürtmek için canını hiçe saydı ve zaferimizi 
                tarihe nakşetti. Bugün ise bu özgürlük ruhunu yaşatmanın gururunu taşıyoruz.

                **Ne Mutlu Türküm Diyene!**
            `)
            .addFields(
                { name: '🛡️ Şehitlerimizi Unutmadık', value: 'Vatan için canını veren aziz şehitlerimizi rahmetle anıyoruz.', inline: true },
                { name: '💫 Cumhuriyetimizin Gücü', value: 'Bağımsızlık ve özgürlük yolunda durmadan ilerliyoruz.', inline: true }
            )
            .setImage('https://cdn.discordapp.com/attachments/1297946872844914771/1300421776299393055/images_4.jpg?ex=6720c7a8&is=671f7628&hm=445471dc2ec37fa252e7bd4a53892dddb4950bea2b81f74e051f9a4db5eef8bc&')
            .setFooter({ text: 'Şehitlerimizin kanıyla sulanan bu topraklar daima özgür kalacaktır. 🇹🇷' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
