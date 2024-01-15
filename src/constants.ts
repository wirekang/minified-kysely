import path from "node:path/posix";

export const KYSELY_GIT_URL = "https://github.com/kysely-org/kysely.git";
export const DIST_DIR = "dist";
export const INFO_JSON_PATH = path.join(DIST_DIR, "info.json");
export const DEV_DEPENDENCIES = ["typescript"];
export const BRANCHES = ["master"];
export const KYSELY_MIN_VERSION = "0.24.0";

export const DEPENDENCY_PATCHES: Array<DependencyPatch> = [
  {
    reason: "make @types/node explicit to prevent compile error",
    since: null,
    until: "b5ffb793e611343c47b1e59e546d643d86e5e7ab",
    set: {},
    setDev: { "@types/node": "^18" },
    remove: [],
    removeDev: [],
  },
  {
    reason: "remove test-only dependencies",
    since: null,
    until: null,
    set: {},
    setDev: {},
    remove: [],
    removeDev: [
      "@types/better-sqlite3",
      "@types/chai",
      "@types/chai-as-promised",
      "@types/chai-subset",
      "@types/mocha",
      "@types/pg",
      "@types/pg-cursor",
      "@types/sinon",
      "@types/tedious",
      "better-sqlite3",
      "chai",
      "chai-as-promised",
      "chai-subset",
      "esbuild",
      "mocha",
      "mysql2",
      "pg",
      "pg-cursor",
      "playwright",
      "prettier",
      "sinon",
      "tarn",
      "tedious",
      "tsd",
    ],
  },
  {
    reason: "remove site-only depedencies",
    since: null,
    until: null,
    set: {},
    setDev: {},
    remove: [],
    removeDev: ["typedoc"],
  },
];

type DependencyPatch = {
  reason: string;
  since: string | null;
  until: string | null;
  set: Record<string, string>;
  setDev: Record<string, string>;
  remove: Array<string>;
  removeDev: Array<string>;
};
