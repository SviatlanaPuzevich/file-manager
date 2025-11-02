import { cdCommand, lsCommand, upCommand } from './commands/nwdCommands.js'
import {
  addCommand,
  catCommand,
  copyCommand,
  mkdirCommand, moveCommand,
  removeCommand,
  renameCommand
} from './commands/fileCommands.js'
import { parseCommand } from './commandParser.js'
import { osCommand } from './commands/osCommand.js'
import { exit } from './commands/exitCommand.js'
import InvalidInputError from './commands/InvalidInputError.js'
import { hashCommand } from './commands/hashCommand.js'
import { compressCommand, decompressCommand } from './commands/compressCommands.js'

const COMMANDS = {
  up: upCommand,
  cd: cdCommand,
  ls: lsCommand,
  cat: catCommand,
  add: addCommand,
  mkdir: mkdirCommand,
  rn: renameCommand,
  cp: copyCommand,
  mv: moveCommand,
  rm: removeCommand,
  os: osCommand,
  hash: hashCommand,
  compress: compressCommand,
  decompress: decompressCommand,
  '.exit': exit,
}

const executeCommand = async (dataInput) => {
  try {
    const command = parseCommand(dataInput);
    if (!COMMANDS[command.name]) {
      throw new InvalidInputError()
    }
    await COMMANDS[command.name](command.positionArgs, command.flags);
  } catch (error) {
    if (error instanceof InvalidInputError) {
      console.error(error.message)
    } else {
      console.error('Operation failed')
    }
  }
}

export { executeCommand }