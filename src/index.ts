import { parseArgs } from "./parser.js";
import { initCommand } from "./commands/init.js";
import { deployCommand } from "./commands/deploy.js";
import { statusCommand } from "./commands/status.js";
import { configCommand } from "./commands/config.js";
import { logsCommand } from "./commands/logs.js";
import { rollbackCommand } from "./commands/rollback.js";

const COMMANDS: Record<string, (args: string[]) => void> = {
  init: initCommand,
  deploy: deployCommand,
  status: statusCommand,
  config: configCommand,
  logs: logsCommand,
  rollback: rollbackCommand,
};

function main() {
  const { command, args, flags } = parseArgs(process.argv.slice(2));

  if (flags.version) {
    console.log("cloudctl v0.3.0");
    return;
  }

  if (flags.help || !command) {
    printHelp();
    return;
  }

  const handler = COMMANDS[command];
  if (!handler) {
    console.error(`Unknown command: ${command}`);
    console.error(`Run 'cloudctl --help' for usage.`);
    process.exit(1);
  }

  handler(args);
}

function printHelp() {
  console.log(`
cloudctl - Cloud Deployment CLI

Usage:
  cloudctl <command> [options]

Commands:
  init          Initialize a new project
  deploy        Deploy the current project
  status        Show deployment status
  config        Manage configuration
  logs          View deployment logs
  rollback      Roll back to a previous deployment

Options:
  --help        Show help
  --version     Show version

Run 'cloudctl <command> --help' for more information on a command.
`);
}

main();
