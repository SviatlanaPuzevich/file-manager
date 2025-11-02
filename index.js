import os from 'os';
import { executeCommand } from './commandExecuter.js'

const usernameArgs = process.argv.slice(2).find(arg => arg.startsWith('--username='));
const username = usernameArgs ? usernameArgs[0].split('=')[1] : 'Anonym';
console.log(`Welcome to the File Manager, ${username}!`)
process.chdir(os.homedir());
printCurrentDir();
process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});
process.on('SIGINT', () => {
  process.exit(0);
});

process.stdin.on('data', async (data) => {
  await executeCommand(data);
  printCurrentDir()
});

function printCurrentDir() {
  console.log(`You are currently in ${process.cwd()}`)
}


