const DEPRECATED_KEYS: Record<string, string> = {
  "deploy.timeout": "deploy.timeout_seconds",
};

const CONFIG_STORE: Record<string, string> = {
  region: "us-east-1",
  "instance.type": "t3.medium",
  "instance.count": "3",
  "log.level": "info",
  "deploy.timeout_seconds": "300",
  "deploy.strategy": "rolling",
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
    if (DEPRECATED_KEYS[key]) {
      console.warn(`Warning: '${key}' is deprecated. Use '${DEPRECATED_KEYS[key]}' instead.`);
    }
    const resolvedKey = DEPRECATED_KEYS[key] || key;
    const value = CONFIG_STORE[resolvedKey];
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
