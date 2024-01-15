import { GitManager, RemoteHead } from "./git-manager";
import { Info, Module, loadInfo, saveInfo } from "./info";
import { createTempDir, escapeFileName, execAsync, normalizePath } from "./utils";
import path from "node:path/posix";
import fs from "node:fs/promises";
import { BRANCHES, DEV_DEPENDENCIES, DIST_DIR, KYSELY_MIN_VERSION } from "./constants";
import { rimraf } from "rimraf";
import { bundle } from "./bundle";
import semverCompare from "semver/functions/compare";
import { patchDependencies } from "./deps";

(async () => {
  const gm = new GitManager();
  await gm.init();
  const tags = await gm.listVersionTags();
  const branches = await gm.listBranches();
  const info = await loadInfo();
  for (const branch of branches) {
    if (!BRANCHES.includes(branch.name)) {
      continue;
    }
    await go(info.branches, gm, "branch", branch);
  }
  for (const tag of tags) {
    if (semverCompare(KYSELY_MIN_VERSION, tag.name) === 1) {
      continue;
    }
    await go(info.tags, gm, "tag", tag);
  }
  await saveInfo(info);
})();

async function go(modules: Array<Module>, gm: GitManager, type: string, head: RemoteHead) {
  let module = modules.find((it) => it.id === head.name);

  if (module === undefined) {
    console.log(`New ${type} ${head.name}`);
    const newModule: Module = {
      id: head.name,
      commitId: head.oid,
      dependencies: {},
      exports: [],
      files: [],
      dir: "",
    };
    modules.push(newModule);
    module = newModule;
  } else if (module.commitId === head.oid) {
    console.log(`Skip ${type} ${head.name}`);
    return;
  }
  console.log(`Update ${type} ${head.name}`);
  module.dir = normalizePath(path.join(DIST_DIR, type, escapeFileName(head.name)));
  module.commitId = head.oid;

  console.log(`Checkout ${head.name}(${head.oid})`);
  await gm.restore();
  await gm.checkout(head.oid);
  const gitDir = gm.getDirectory();
  const packageJsonPath = path.join(gitDir, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: "utf-8" }));
  const newDeps = patchDependencies(
    gitDir,
    head.oid,
    packageJson.dependencies ?? [],
    packageJson.devDependencies ?? [],
    await gm.listCommitIds(),
  );
  packageJson.dependencies = newDeps.dependencies;
  packageJson.devDependencies = newDeps.devDependencies;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson));
  await execAsync(`cd "${gitDir}" && npm ci`);
  await execAsync(`cd "${gitDir}" && npm run build`);
  const exports: any = {};
  Object.keys(packageJson.exports).forEach((it) => {
    exports[it] = packageJson.exports[it].import;
  });
  const dependencies: any = {};
  DEV_DEPENDENCIES.forEach((it) => {
    dependencies[it] = packageJson.devDependencies[it];
  });
  module.exports = Object.keys(exports);
  module.dependencies = dependencies;
  const buildDir = await createTempDir("rollup");
  await bundle(gitDir, buildDir, exports);
  await rimraf(module.dir);
  await fs.mkdir(module.dir, { recursive: true });
  await fs.cp(buildDir, module.dir, { recursive: true });
  module.files = (await fs.readdir(module.dir, { recursive: true, withFileTypes: true }))
    .filter((it) => it.isFile())
    .map((it) => path.join(normalizePath(it.path), it.name))
    .map((it) => it.substring(module!!.dir.length + 1));
}
