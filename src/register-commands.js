import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  {
    name: 'add',
    description: 'Add two numbers',
    options: [
      {
        name: 'first-number',
        description: 'First number',
        type: ApplicationCommandOptionType.Number,
      },
      {
        name: 'second-number',
        description: 'Second number',
        type: ApplicationCommandOptionType.Number,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const registerCommands = async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};

export default registerCommands;
