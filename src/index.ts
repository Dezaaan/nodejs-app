import { createContainer } from "./app/container.js";
import { createApp } from "./app.js";
import { createConfig } from "./config/config.js";
import { createEnv } from "./config/env.js";

const env = createEnv();
const config = createConfig(env);
const container = createContainer(config);

const app = createApp(container);

console.log("Running the app");

app.listen(config.app.port, () => {
  console.log(`Server running on http://localhost:${config.app.port}`);
});
