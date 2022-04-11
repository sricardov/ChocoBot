const Discord = require('discord.js');

module.exports = {
	name: 'party',
    description: 'Creates a new party.',
    args: true,
	execute(message, args) {
        message.reply('please enter the name of your party.');

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 30000 });

        collector.on('collect', m => {
            const embedtitle = m.content;
            message.reply('please enter date and time of your event.');
            const collector2 = message.channel.createMessageCollector(filter, { time: 30000 });

            collector2.on('collect', m => {
                const embeddescription = m.content;
                const eventEmbed = new Discord.MessageEmbed()
                    .setColor('#fee12b')
                    .setTitle(embedtitle)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(embeddescription)
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: `<:tank:738125108975108168> TANKS`, value: `${args[0]}`, inline: true },
                        { name: `<:healer:738125802922573945> HEALERS`, value: `${args[1]}`, inline: true },
                        { name: `<:dps:738125803216175177> DPS`, value: `${args[2]}`, inline: true },
                    )
                    .setFooter('Confirme sua presença reagindo abaixo.');

                message.channel.send(eventEmbed);
            });
        });
	},
};