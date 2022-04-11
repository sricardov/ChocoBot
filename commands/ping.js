module.exports = {
	name: 'ping',
    description: 'Ping!',
    args: false,
	execute(message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Kweh! ${timeTaken}ms`);
	},
};