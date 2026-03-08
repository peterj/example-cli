export function initCommand(args: string[]) {
  const projectName = args[0] || "my-project";
  console.log(`Initializing project '${projectName}'...`);
  console.log(`Created cloudctl.yaml`);
  console.log(`Created .cloudctl/ directory`);
  console.log(`Project '${projectName}' initialized successfully.`);
}
