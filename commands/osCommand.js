import InvalidInputError from './InvalidInputError.js'
import os from 'node:os'

const FLAG_VALUES = ['EOL', 'cpus', 'homedir', 'username', 'architecture'];

const osCommand = async (positionArgs, flags) => {
  if (!flags || flags.length === 0 || !FLAG_VALUES.includes(flags[0])) {
    throw new InvalidInputError()
  }
  const key = flags[0];
  try {
    switch (key) {
      case FLAG_VALUES[0]:
        console.log(JSON.stringify(os.EOL))
        break;
      case FLAG_VALUES[1]: {
        const cpus = os.cpus();
        console.log(`cpus count: ${cpus.length}`)
        for (const cpu of cpus) {
          const speedGHz = cpu.speed / 1000;
          console.log(`model: ${cpu.model}; Clock rate: ${speedGHz.toFixed(2)} GHz`)
        }
        break;
      }
      case FLAG_VALUES[2]: {
        console.log(os.homedir());
        break;
      }
      case FLAG_VALUES[3]: {
        console.log(os.userInfo().username);
        break;
      }
      case FLAG_VALUES[4]: {
        console.log(process.arch)
        break;
      }
    }
  } catch (error) {
    throw error
  }
}

export { osCommand }