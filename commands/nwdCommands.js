import fs from 'node:fs/promises'
import path from 'node:path'
import InvalidInputError from './InvalidInputError.js'

const upCommand = () => {
  const currentPath = process.cwd();
  const parts = currentPath.split(path.sep);
  if (parts.length > 1) {
    process.chdir(parts.slice(0, parts.length - 1).join(path.sep) + path.sep);
  }
}

const cdCommand = (args) => {
  if (!args || args.length === 0) {
    throw new InvalidInputError()
  } else {
    try {
      const targetPath = args[0];
      process.chdir(targetPath)
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new InvalidInputError()
      } else {
        throw error;
      }
    }
  }
}

const lsCommand = async () => {
  const files = await fs.readdir(process.cwd(), { withFileTypes: true });
  console.table(files.map(file => {
    return {
      'name': file.name,
      'type': file.isFile()? 'file' : 'directory'
    }
  }));
}

export { upCommand, cdCommand, lsCommand };