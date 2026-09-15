import { createApp } from "./app.js";
import { createConfig } from "./config/config.js";
import { createEnv } from "./config/env.js";

const env = createEnv();

const config = createConfig(env);

const app = createApp();

app.listen(config.app.port, () => {
  console.log(`Server running on http://localhost:${config.app.port}`);
});
