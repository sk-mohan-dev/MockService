import { confirm, select } from "@inquirer/prompts";

const environment = await select({
  message: "Choose environment",
  choices: [
    {
      name: "Developement",
      description: "Development environment",
      value: "dev",
    },
    {
      name: "Staging",
      description: "Staging environment",
      value: "staging",
    },
    {
      name: "Production",
      description: "Production environment",
      value: "prod",
    },
  ],
});

const confirmation = await confirm({
  message: `Confirm deployment to ${environment}`,
  default: true,
});

console.log(environment, confirmation);
