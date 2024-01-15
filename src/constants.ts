import path from "node:path/posix";

export const KYSELY_GIT_URL = "https://github.com/kysely-org/kysely.git";
export const DIST_DIR = "dist";
export const INFO_JSON_PATH = path.join(DIST_DIR, "info.json");
export const DEV_DEPENDENCIES = ["typescript"];
export const BRANCHES = ["master"];
export const KYSELY_MIN_VERSION = "0.24.0";

export const JSON_PATCHES: Record<string, Array<JsonPatch>> = {
  "package.json": [
    {
      description: "remove test/site-only dependencies",
      patch: {
        devDependencies: {
          "@types/better-sqlite3": undefined,
          "@types/chai": undefined,
          "@types/chai-as-promised": undefined,
          "@types/chai-subset": undefined,
          "@types/mocha": undefined,
          "@types/pg": undefined,
          "@types/pg-cursor": undefined,
          "@types/sinon": undefined,
          "@types/tedious": undefined,
          "better-sqlite3": undefined,
          chai: undefined,
          "chai-as-promised": undefined,
          "chai-subset": undefined,
          esbuild: undefined,
          mocha: undefined,
          mysql2: undefined,
          pg: undefined,
          "pg-cursor": undefined,
          playwright: undefined,
          prettier: undefined,
          sinon: undefined,
          tarn: undefined,
          tedious: undefined,
          tsd: undefined,
          typedoc: undefined,
        },
      },
    },
    {
      description: "fix implicit dependency @types/node for old kysely",
      until: "b5ffb793e611343c47b1e59e546d643d86e5e7ab",
      patch: {
        devDependencies: {
          "@types/node": "*",
        },
      },
    },
  ],
  "tsconfig-base.json": [
    {
      description: "fix node version mismach type error",
      patch: {
        compilerOptions: {
          skipLibCheck: true,
        },
      },
    },
  ],
};

type JsonPatch = {
  description: string;
  since?: string;
  until?: string;
  patch: any;
};