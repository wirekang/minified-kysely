import { DEPENDENCY_PATCHES } from "./constants";

export function patchDependencies(
  dir: string,
  commitId: string,
  deps: Record<string, string>,
  devDeps: Record<string, string>,
  commitIds: Array<string>,
) {
  const dependencies = { ...deps };
  const devDependencies = { ...devDeps };
  DEPENDENCY_PATCHES.forEach((def) => {
    const currentIndex = getCommitIndex(commitId, commitIds);
    if (def.since !== null) {
      if (currentIndex > getCommitIndex(def.since, commitIds)) {
        return;
      }
    }
    if (def.until !== null) {
      if (currentIndex < getCommitIndex(def.until, commitIds)) {
        return;
      }
    }
    console.log(`Patch dependencies: ${def.reason}`);
    Object.entries(def.set).forEach(([k, v]) => {
      dependencies[k] = v;
    });
    Object.entries(def.setDev).forEach(([k, v]) => {
      devDependencies[k] = v;
    });
    def.remove.forEach((it) => {
      delete dependencies[it];
    });
    def.removeDev.forEach((it) => {
      delete devDependencies[it];
    });
  });
  return {
    dependencies,
    devDependencies,
  };
}

function getCommitIndex(commitId: string, commitIds: Array<string>): number {
  const i = commitIds.indexOf(commitId);
  if (i === -1) {
    throw Error(`Commit ${commitId} not exists in list`);
  }
  return i;
}
