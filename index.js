
const args = process.argv.slice(2);
console.log(args);
const username = args[1]?.split("=")[1]
console.log(`Welcome to the File Manager, ${username || "Anonym"}!`)
console.log(`You are currently in ${process.cwd()}`)
process.on("exit", () => {
  console.log(`Thank you for using File Manager, ${username || "Anonym"}, goodbye!`);
})
while (true) {
  command = process.stdin
}


