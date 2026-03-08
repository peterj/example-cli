export function statusCommand(_args: string[]) {
  console.log(`Deployment Status`);
  console.log(`─────────────────`);
  console.log(`Project:     my-project`);
  console.log(`Environment: staging`);
  console.log(`Status:      running`);
  console.log(`Version:     v0.3.0`);
  console.log(`Uptime:      3d 14h 22m`);
  console.log(`Instances:   3/3 healthy`);
}
