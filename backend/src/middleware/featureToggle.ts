import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const TOGGLES_PATH = path.resolve(__dirname, "../../config/featureToggles.json");

/**
 * Feature toggle middleware (Deployability tactic).
 *
 * Reads the state from config/featureToggles.json
 *
 * **How to use:** app.get("/route", featureToggle("route"), handler);
 *
 * @param featureName - The key in featureToggles.json that controls this feature.
 */
export function featureToggle(featureName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const raw = fs.readFileSync(TOGGLES_PATH, "utf-8");
      const toggles = JSON.parse(raw);

      if (toggles[featureName] === true) {
        return next();
      }
    } catch (err) {
      // If the config file is missing or a bozo has touched it
      console.error("Failed to read feature toggles:", err);
    }

    return res.status(404).send("Feature not available");
  };
}
