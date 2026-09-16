import type { AppConfig } from "../config/config.js";
import type { AppContainer } from "./container.types.js";
import { createFeatures } from "../features/createFeatures.js";
import { createInfrastructure } from "../infrastructure/createInfrastructure.js";

export const createContainer = (config: AppConfig): AppContainer => {
  const infrastructure = createInfrastructure(config);
  const feature = createFeatures(infrastructure);

  return {
    config,
    features: feature,
  };
};
