// I expect that the input command will be provided in the following format:
// command name, positional arguments, options, flags, and short flags.
// Since the program does not use options or short flags, they will not be parsed.
// It is also assumed that positional arguments come first, followed by flags.
// Example: copy source.txt destination.txt --force --verbose

const parseCommand = (dataInput) => {
  const commandParts = dataInput.toString().trim().split(' ').filter(Boolean);
  let flags = [];
  let positionArgs = [];
  const name = commandParts[0];
  const args = commandParts.slice(1);
  let i = 0;
  while (i < args.length && !args[i].startsWith('--')) {
    positionArgs.push(args[i]);
    i++;
  }
  while (i < args.length) {
    if (args[i].startsWith('--')) {
      flags.push(args[i].slice(2));
    }
    i++;
  }
  return {
    name,
    positionArgs,
    flags
  }
}
export { parseCommand };
