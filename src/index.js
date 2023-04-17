import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import registerCommands from './register-commands';

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

registerCommands();

client.on('ready', (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'add') {
    let result = 0;

    interaction.options.data.forEach((option) => {
      const { value } = option;
      result += value;
    });

    interaction.reply({ content: `The result is ${result}` });
  }
});

client.login(process.env.TOKEN);
