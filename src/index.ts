import { loadInfo, saveInfo } from "./info";
import { createTempDir, escapeBranchName, execAsync, getDialects, removePathSuffix } from "./utils";
import { BRANCHES, DEV_DEPENDENCIES, DIST_DIR } from "./constants";
import { bundle } from "./bundle";
import { patchFiles } from "./patch";
import { checkout, clone, getCommits, restore } from "./git";
import { Module } from "./info-type";
import { path, fs } from "./node-types";

(async () => {
  const dir = await createTempDir("kysely");
  console.log(`Clone kysely into ${dir}`);
  await clone(dir);
  const commits = await getCommits(dir);
  console.log(`Commits: ${commits.length}`);

  const branches: Record<string, string> = {};
  const tags: Record<string, string> = {};
  commits.forEach((commit) => {
    commit.branches.forEach((branch) => {
      if (BRANCHES.includes(branch)) {
        branches[branch] = commit.id;
      }
    });
    commit.tags.forEach((tag) => {
      tags[tag] = commit.id;
    });
  });
  console.log(`Branches: ${Object.keys(branches).join(",")}`);
  console.log(`Tags: ${Object.keys(tags).join(",")}`);

  const commitIds = commits.map((it) => it.id);
  const info = await loadInfo();
  for (const branch in branches) {
    await go(dir, info.branches, "branch", branch, branches[branch], commitIds);
  }
  for (const tag in tags) {
    await go(dir, info.tags, "tag", tag, tags[tag], commitIds);
  }
  info.lastCommitId = commitIds[commitIds.length - 1];
  await saveInfo(info);
})();

async function go(
  dir: string,
  modules: Array<Module>,
  type: string,
  name: string,
  commitId: string,
  commitIds: Array<string>
) {
  let module = modules.find((it) => it.name === name);

  if (module === undefined) {
    console.log(`New ${type} ${name}`);
    const newModule: Module = {
      name: name,
      commitId,
      dependencies: {},
      exports: [],
      files: [],
      dialects: getDialects(commitId, commitIds),
      dir: "",
    };
    modules.push(newModule);
    module = newModule;
  } else if (module.commitId === commitId) {
    console.log(`Skip unchanged ${type} ${name}`);
    return;
  }
  console.log(`Update ${type} ${name}`);
  module.dir = removePathSuffix(path.join(DIST_DIR, type, escapeBranchName(name)));
  module.commitId = commitId;

  console.log(`Checkout ${name}(${commitId})`);
  await restore(dir);
  await checkout(dir, commitId);
  await patchFiles(dir, commitId, commitIds);
  await execAsync(`cd "${dir}" && pnpm install --frozen-lockfile`);
  await execAsync(`cd "${dir}" && pnpm run build`);
  const packageJson = JSON.parse(await fs.readFile(path.join(dir, "package.json"), { encoding: "utf-8" }));
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
  const bundleDir = await createTempDir("rollup");
  await bundle(dir, bundleDir, exports);
  await execAsync(`rm -rf "${module.dir}"`);
  await fs.mkdir(module.dir, { recursive: true });
  await fs.cp(bundleDir, module.dir, { recursive: true });
  module.files = (await fs.readdir(module.dir, { recursive: true, withFileTypes: true }))
    .filter((it) => it.isFile())
    .map((it) => path.join(it.path, it.name))
    .map((it) => it.substring(module!!.dir.length + 1));
}
