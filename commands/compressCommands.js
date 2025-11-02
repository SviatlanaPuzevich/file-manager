import zlib from 'node:zlib'
import fs from 'node:fs'
import { pipeline } from 'node:stream/promises';
import path from 'node:path'
import InvalidInputError from './InvalidInputError.js'

const compressCommand = async (positionArgs) => {
  if (!positionArgs || positionArgs.length < 2) {
    throw new InvalidInputError();
  }
  const fileName = positionArgs[0];
  const targetPath = positionArgs[1];
  try {
    const brotliCompress = zlib.createBrotliCompress()
    const readStream = fs.createReadStream(fileName);
    const writeStream = fs.createWriteStream(path.join(targetPath, `${path.basename(fileName)}.gz`));
    await pipeline(readStream, brotliCompress, writeStream);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      throw new InvalidInputError();
    } else {
      throw error;
    }
  }
}

const decompressCommand = async (params) => {
  if (!params || params.length < 2) {
    throw new InvalidInputError();
  }
  const fileName = params[0];
  const targetPath = params[1];
  try {
    // const archiveName = path.basename(fileName, path.extname(fileName));
    // const destDir = path.join(path.dirname(fileName), archiveName);
    // await fs.mkdir(destDir, { recursive: true });
    const brotliDecompress = zlib.createBrotliDecompress()
    const readStream = fs.createReadStream(fileName);
    const writeStream = fs.createWriteStream(path.join(targetPath));
    await pipeline(readStream, brotliDecompress, writeStream);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      new InvalidInputError();
    } else {
      throw error;
    }
  }
}

export { compressCommand, decompressCommand }