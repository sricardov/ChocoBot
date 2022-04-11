const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.eventCommands = new Discord.Collection();
const eventCommandFiles = fs.readdirSync('./event_commands').filter(file => file.endsWith('.js'));
for (const file of eventCommandFiles) {
	const command = require(`./event_commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.eventCommands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Log in successfull.');
});

var eventList = [];

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (client.commands.has(commandName)) {
		const command = client.commands.get(commandName);

		if (command.args && !args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		};
	
		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('There was an unexpected error trying to execute that command!');
		};
	}
	else if (client.eventCommands.has(commandName)) {
		const command = client.eventCommands.get(commandName);

		if (command.args && !args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		};
	
		try {
			command.execute(message, args, eventList);
		} catch (error) {
			console.error(error);
			message.reply('There was an unexpected error trying to execute that command!');
		};
	}
	else {
		return message.channel.send(`Unknown command`);;
	};
});

client.login(token);