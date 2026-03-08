const CONFIG_STORE: Record<string, string> = {
  region: "us-east-1",
  "instance.type": "t3.medium",
  "instance.count": "3",
  "log.level": "info",
  "deploy.timeout": "300",
};

export function configCommand(args: string[]) {
  const subcommand = args[0];

  if (!subcommand || subcommand === "list") {
    console.log("Current configuration:");
    for (const [key, value] of Object.entries(CONFIG_STORE)) {
      console.log(`  ${key} = ${value}`);
    }
    return;
  }

  if (subcommand === "get") {
    const key = args[1];
    if (!key) {
      console.error("Usage: cloudctl config get <key>");
      process.exit(1);
    }
    const value = CONFIG_STORE[key];
    if (value === undefined) {
      console.error(`Unknown config key: ${key}`);
      process.exit(1);
    }
    console.log(value);
    return;
  }

  if (subcommand === "set") {
    const key = args[1];
    const value = args[2];
    if (!key || !value) {
      console.error("Usage: cloudctl config set <key> <value>");
      process.exit(1);
    }
    console.log(`Set ${key} = ${value}`);
    return;
  }

  console.error(`Unknown config subcommand: ${subcommand}`);
  console.error("Available: list, get, set");
  process.exit(1);
}
