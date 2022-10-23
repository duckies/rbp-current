import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  Interaction,
  InteractionType,
} from 'discord.js';
import { DiscordConfig } from '../app.config';
import { BotRegistry } from './bot.registry';
import { CommandNotFoundException } from './exceptions/command-not-found.exception';

@Injectable()
export class BotService extends Client implements OnModuleInit {
  private readonly logger = new Logger('BotService');

  constructor(
    private readonly config: DiscordConfig,
    private readonly registery: BotRegistry,
  ) {
    super({
      intents: [GatewayIntentBits.Guilds],
    });
  }

  async onModuleInit() {
    this.on('ready', this.onReady.bind(this));
    this.on('interactionCreate', this.onInteraction.bind(this));

    this.login(this.config.BOT_TOKEN);
  }

  onReady(client: Client) {
    const user = client.user?.username || 'Missing Username';
    this.logger.log(`Discord Bot Ready: ${user}`);
  }

  private getChatInputCommandPath(interaction: ChatInputCommandInteraction) {
    const subCommandGroup = interaction.options.getSubcommandGroup();
    const subCommand = interaction.options.getSubcommand();
    const path: string[] = [interaction.commandName];

    if (subCommandGroup) {
      path.push(subCommandGroup);
    }

    if (subCommand) {
      path.push(subCommand);
    }

    return path;
  }

  onInteraction(interaction: Interaction) {
    switch (interaction.type) {
      case InteractionType.ApplicationCommand:
        switch (interaction.commandType) {
          case ApplicationCommandType.ChatInput:
            return this.handleChatInputCommand(interaction);
          case ApplicationCommandType.Message:
          case ApplicationCommandType.User:
        }
        break;
      case InteractionType.ModalSubmit:
        // Modal
        break;
      case InteractionType.MessageComponent:
        // Button, Select, or TextInput
        break;
      case InteractionType.ApplicationCommandAutocomplete:
        // AutoComplete
        break;
    }
  }

  handleChatInputCommand(interaction: ChatInputCommandInteraction) {
    const path = this.getChatInputCommandPath(interaction);

    try {
      const command = this.registery.get(path);
      return (command as any).methodRef(interaction);
    }
    catch (error) {
      if (error instanceof CommandNotFoundException) {
        interaction.reply(
          'I could not find that command, it may be unimplemented.',
        );
      }
    }
  }
}
