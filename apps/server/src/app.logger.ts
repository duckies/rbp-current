import { Logtail } from '@logtail/node'
import { LogtailTransport } from '@logtail/winston'
import safeStringify from 'fast-safe-stringify'
import { Format } from 'logform'
import { inspect } from 'util'
import { createLogger, format, transports } from 'winston'

const logtail = new Logtail('m84RbMDZyeNBHuHgMrqzoKqF')

const colorScheme: Record<string, (text: string) => string> = {
  info: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  error: (text: string) => `\x1B[31m${text}\x1B[39m`,
  debug: (text: string) => `\x1B[95m${text}\x1B[39m`,
  verbose: (text: string) => `\x1B[96m${text}\x1B[39m`,
}

const consoleFormat: Format = format.printf(({ level, message, timestamp, ...meta }) => {
  try {
    if (timestamp === new Date(timestamp).toISOString()) {
      timestamp = new Date(timestamp).toLocaleString()
    }
  } catch (error) {}

  const color: (text: string) => string = colorScheme[level] || ((text) => text)
  const stringifiedMeta = safeStringify(meta)
  const formattedMeta = inspect(JSON.parse(stringifiedMeta), { depth: null })

  return `[${color('RBP')}] ${level} ${timestamp ? `${timestamp} ` : ''}${color(
    message
  )} — ${formattedMeta}`
})

export const logger = createLogger({
  level: 'verbose',
  format: format.errors({ stack: true }),
  transports: [
    new LogtailTransport(logtail),
    new transports.Console({
      level: 'info',
      format: consoleFormat,
    }),
  ],
})
