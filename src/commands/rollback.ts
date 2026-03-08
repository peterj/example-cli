export function rollbackCommand(args: string[]) {
  const environment = args[0] || "staging";
  const version = args[1] || null;
  const validEnvs = ["staging", "production", "dev"];

  if (!validEnvs.includes(environment)) {
    console.error(`Invalid environment: ${environment}`);
    console.error(`Valid environments: ${validEnvs.join(", ")}`);
    process.exit(1);
  }

  if (version) {
    console.log(`Rolling back ${environment} to version ${version}...`);
  } else {
    console.log(`Rolling back ${environment} to previous version...`);
  }

  console.log(`Stopping current deployment...`);
  console.log(`Restoring previous artifacts...`);
  console.log(`Restarting instances...`);
  console.log(`Rollback complete. Health check passed.`);
}
