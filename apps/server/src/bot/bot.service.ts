import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  Interaction,
  InteractionType,
} from 'discord.js'
import { DiscordConfig } from '../app.config'
import { BotExplorer } from './bot.explorer'
import { BotRegistry } from './bot.registry'
import { Command, SubCommand } from './commands'
import { CommandMismatchException } from './exceptions/command-mismatch.exception'
import { CommandNotFoundException } from './exceptions/command-not-found.exception'

@Injectable()
export class BotService extends Client implements OnModuleInit {
  private readonly logger = new Logger('BotService')

  constructor(
    private readonly config: DiscordConfig,
    private readonly registery: BotRegistry,
    private readonly explorer: BotExplorer
  ) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
    })
  }

  async onModuleInit() {
    this.explorer.explore()
    // await this.setApplicationGuildCommands()
    this.on('ready', this.onReady.bind(this))
    this.on('interactionCreate', this.onInteraction.bind(this))
    this.registerEvents()

    this.login(this.config.BOT_TOKEN)
  }

  onReady(_client: Client) {
    this.logger.log(`Discord is Ready`)
  }

  // private async setApplicationGuildCommands() {
  //   const rest = new REST({ version: '10' }).setToken(this.config.BOT_TOKEN)

  //   try {
  //     const commands = [...this.registery.commands.values()].map((c) => c.toJSON())

  //     const data = await rest.put(
  //       Routes.applicationGuildCommands(this.config.ID, this.config.GUILD_ID),
  //       {
  //         body: commands,
  //       }
  //     )

  //     console.log(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  private getChatInputCommandPath(interaction: ChatInputCommandInteraction) {
    const subCommandGroup = interaction.options.getSubcommandGroup(false)
    const subCommand = interaction.options.getSubcommand(false)

    const path: string[] = [interaction.commandName]

    if (subCommandGroup) {
      path.push(subCommandGroup)
    }

    if (subCommand) {
      path.push(subCommand)
    }

    return path
  }

  private registerEvents() {
    for (const [event, handlers] of this.registery.events) {
      this.on(event, (...args) => {
        for (const { instance, method } of handlers) {
          try {
            method.call(instance, ...args)
          } catch (error: any) {
            this.logger.error(`Discord Event Error: ${event}`, error?.stack, {
              method: method.name,
              instance: instance.name,
            })
          }
        }
      })
    }
  }

  onInteraction(interaction: Interaction) {
    switch (interaction.type) {
      case InteractionType.ApplicationCommand:
        switch (interaction.commandType) {
          case ApplicationCommandType.ChatInput:
            return this.handleChatInputCommand(interaction)
          case ApplicationCommandType.Message:
          case ApplicationCommandType.User:
        }
        break
      case InteractionType.ModalSubmit:
        // Modal
        break
      case InteractionType.MessageComponent:
        // Button, Select, or TextInput
        break
      case InteractionType.ApplicationCommandAutocomplete:
        // AutoComplete
        break
    }
  }

  getInteractionOptions(command: Command | SubCommand, interaction: ChatInputCommandInteraction) {
    return [...command.options.values()].map((option) => {
      switch (option.type) {
        case ApplicationCommandOptionType.String:
          return interaction.options.getString(option.name, option.required)
        case ApplicationCommandOptionType.Integer:
          return interaction.options.getInteger(option.name, option.required)
        case ApplicationCommandOptionType.Boolean:
          return interaction.options.getBoolean(option.name, option.required)
        case ApplicationCommandOptionType.User:
          return interaction.options.getUser(option.name, option.required)
        case ApplicationCommandOptionType.Channel:
          return interaction.options.getChannel(option.name, option.required)
        case ApplicationCommandOptionType.Role:
          return interaction.options.getRole(option.name, option.required)
        case ApplicationCommandOptionType.Mentionable:
          return interaction.options.getMentionable(option.name, option.required)
        case ApplicationCommandOptionType.Number:
          return interaction.options.getNumber(option.name, option.required)
        default:
          throw new Error(`Unexpected SubCommand option type — ${option.type}`)
      }
    })
  }

  handleChatInputCommand(interaction: ChatInputCommandInteraction) {
    const path = this.getChatInputCommandPath(interaction)

    try {
      const command = this.registery.getCommand(path, ['ExecutableCommand', 'SubCommand'])
      const options = this.getInteractionOptions(command, interaction)

      return command.methodRef(interaction, ...options)
    } catch (error: any) {
      if (error instanceof CommandNotFoundException) {
        interaction.reply('I could not find that command, it may be unimplemented.')
      } else if (error instanceof CommandMismatchException) {
        interaction.reply("I found something, but it wasn't a command 😕")
      } else {
        interaction.reply("Something... something about this command isn't right 🤔")
      }
    }
  }
}
