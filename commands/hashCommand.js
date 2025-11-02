import crypto from 'node:crypto';
import fs from 'node:fs'
import InvalidInputError from './InvalidInputError.js'

const hashCommand = async (args) => {
  if (!args || args.length === 0) {
    throw new InvalidInputError();
  }
  const fileName = args[0];
  const digest = await new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const rs = fs.createReadStream(fileName);
    rs.on('data', (chunk) => {
      hash.update(chunk);
    });
    rs.on('end', () => {
      resolve(hash.digest('hex'));
    });
    rs.on('error', (error) => {
      if (error.code === 'ENOENT' || error.code === 'EISDIR') {
        reject(new InvalidInputError());
      } else {
        reject(error);
      }
    });
  });
  console.log(digest);
}

export { hashCommand }