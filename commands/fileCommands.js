import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import InvalidInputError from './InvalidInputError.js'
import path from 'node:path'
import { pipeline } from 'node:stream/promises';


const catCommand = async (args) => {
  if (!args || args.length === 0) {
    throw new InvalidInputError();
  }
  const fileName = args[0];
  await new Promise((resolve, reject) => {
    const rs = fs.createReadStream(fileName, 'utf8');
    rs.on('data', (chunk) => process.stdout.write(chunk));
    rs.on('end', resolve);
    rs.on('error', (error) => {
      if (error.code === 'ENOENT' || error.code === 'EISDIR') {
        reject(new InvalidInputError());
      } else {
        reject(error);
      }
    });
  });
}

const addCommand = async (args) => {
  if (!args || args.length === 0) {
    throw new InvalidInputError()
  } else {
    try {
      const name = args[0];
      await fsPromises.writeFile(name, '', { encoding: 'utf8' });
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new InvalidInputError();
      } else {
        throw error;
      }
    }
  }
}

const mkdirCommand = async (args) => {
  if (!args || args.length === 0) {
    throw new InvalidInputError()
  }
  try {
    const dirName = args[0];
    await fsPromises.mkdir(dirName, {})
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new InvalidInputError()
    } else {
      throw error;
    }
  }
}

const renameCommand = async (args) => {
  if (!args || args.length < 2) {
    throw new InvalidInputError();
  }
  try {
    const oldPath = args[0];
    const newPath = args[1];
    await fsPromises.rename(oldPath, newPath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new InvalidInputError()
    } else {
      throw error;
    }
  }
}

const copyCommand = async (args) => {
  if (!args || args.length < 2) {
    throw new InvalidInputError()
  }
  const fileName = args[0];
  const dirName = args[1];
  try {
    const rs = fs.createReadStream(fileName);
    const ws = fs.createWriteStream(path.join(dirName, fileName));
    await pipeline(rs, ws);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      throw new InvalidInputError();
    } else {
      throw error;
    }
  }
}


const moveCommand = async (args) => {
  if (!args || args.length < 2) {
    throw new InvalidInputError()
  }
  const fileName = args[0];
  const targetDir = args[1];
  try {
    const rs = fs.createReadStream(fileName);
    const ws = fs.createWriteStream(path.join(targetDir, fileName));
    await pipeline(rs, ws);
    await fsPromises.unlink(fileName)
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      throw new InvalidInputError();
    } else {
      throw error;
    }
  }
}


const removeCommand = async (params) => {
  if (!params || params.length === 0) {
    throw new InvalidInputError()
  }
  try {
    const fileName = params[0];
    await fsPromises.unlink(fileName)
  } catch (error) {
    if (error.code === 'EISDIR' || error.code === 'ENOENT') {
      throw new InvalidInputError()
    } else {
      throw error;
    }
  }
}


export { catCommand, addCommand, mkdirCommand, renameCommand, copyCommand, moveCommand, removeCommand }