import { createContainer } from "../../app/container.js";
import { createTestConfig } from "./createTestConfig.js";

export const createTestContainer = () => {
  const config = createTestConfig();

  return createContainer(config);
};
