import { readFile } from "node:fs/promises";
import type { Logger } from "pino";
import { BuildError } from "../errors.js";

/**
 * Default version to use when no existing package.json is found
 */
const DEFAULT_VERSION = "0.0.1";

/**
 * Reads the version field from an existing package.json file.
 *
 * This function is used to preserve version numbers when rebuilding extension packs,
 * ensuring that version management can be handled by external tools like
 * dragoscops/version-update@v3 GitHub Action.
 *
 * @param packagePath - Absolute path to the package.json file
 * @param logger - Pino logger for debug and error logging
 * @returns The version string from package.json, or DEFAULT_VERSION if file doesn't exist
 * @throws {BuildError} If file exists but cannot be read or parsed
 *
 * @example
 * ```typescript
 * const version = await readExistingVersion(
 *   './packages/vscode/cpp/package.json',
 *   logger
 * );
 * console.log(version); // "1.2.3" or "0.0.1" if file doesn't exist
 * ```
 */
export async function readExistingVersion(
  packagePath: string,
  logger: Logger
): Promise<string> {
  logger.debug({ packagePath }, "Attempting to read existing version");

  try {
    const content = await readFile(packagePath, "utf-8");

    logger.debug({ packagePath, contentLength: content.length }, "File read successfully");

    // Parse JSON
    let packageJson: unknown;
    try {
      packageJson = JSON.parse(content);
    } catch (parseError) {
      logger.error(
        { err: parseError, packagePath },
        "Failed to parse package.json as valid JSON"
      );

      throw new BuildError(
        `Invalid JSON in package.json: ${packagePath}`,
        {
          packagePath,
          error: parseError instanceof Error ? parseError.message : String(parseError),
        }
      );
    }

    // Validate structure and extract version
    if (
      typeof packageJson !== "object" ||
      packageJson === null ||
      Array.isArray(packageJson)
    ) {
      logger.error(
        { packagePath, packageJson },
        "package.json is not a valid object"
      );

      throw new BuildError(
        `package.json is not a valid object: ${packagePath}`,
        {
          packagePath,
          type: Array.isArray(packageJson) ? "array" : typeof packageJson,
        }
      );
    }

    const pkg = packageJson as Record<string, unknown>;

    // Check if version field exists and is a string
    if (typeof pkg.version === "string" && pkg.version.length > 0) {
      logger.debug(
        { packagePath, version: pkg.version },
        "Existing version found"
      );
      return pkg.version;
    }

    // Version field missing or invalid - return default
    logger.debug(
      { packagePath, versionField: pkg.version },
      "No valid version field found, using default"
    );

    return DEFAULT_VERSION;
  } catch (error) {
    // If error is already a BuildError, re-throw it
    if (error instanceof BuildError) {
      throw error;
    }

    // Check if error is ENOENT (file not found)
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      logger.debug(
        { packagePath },
        "package.json not found, using default version"
      );
      return DEFAULT_VERSION;
    }

    // Other file system errors
    logger.error(
      { err: error, packagePath },
      "Failed to read existing package.json"
    );

    throw new BuildError(
      `Failed to read package.json: ${packagePath}`,
      {
        packagePath,
        error: error instanceof Error ? error.message : String(error),
      }
    );
  }
}

/**
 * Validates a version string format.
 *
 * Accepts semantic versioning format: major.minor.patch
 * Optionally with pre-release and build metadata.
 *
 * @param version - Version string to validate
 * @returns true if version is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidVersion("1.0.0"); // true
 * isValidVersion("1.0.0-alpha"); // true
 * isValidVersion("1.0.0+build.123"); // true
 * isValidVersion("not-a-version"); // false
 * ```
 */
export function isValidVersion(version: string): boolean {
  // Basic semantic versioning regex
  // Matches: major.minor.patch with optional pre-release and build metadata
  const semverRegex =
    /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;

  return semverRegex.test(version);
}
