const Discord = require('discord.js');

module.exports = {
	name: 'giveaway',
    description: 'Start your own Giveaway!',
    args: false,
	execute(message, args, eventList) {
        message.channel.send('Kweh!')
            .then(message => {
                const messageid = message.id
                eventList.push([messageid, 'giveaway.js']);
                
                message.react('🎉');

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '🎉';
                };
                
                const collector = message.createReactionCollector(filter, { time: 1500000 });
                
                collector.on('collect', (reaction, user) => {
                    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                });
                
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                });
            });
    },
};