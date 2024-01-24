import { path, fs, os, exec } from "./node-types";
import { DIALECTS } from "./constants";

export async function createTempDir(name: string) {
  // const parent = os.tmpdir();
  const parent = path.join(os.homedir(), "minified-kysely-temp");
  const dir = path.join(parent, name + `${Date.now()}`);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export function execAsync(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(stdout);
        console.error(stderr);
        return reject(err);
      }
      return resolve(stdout);
    });
  });
}

export function removePathSuffix(p: string): string {
  if (p.endsWith("/")) {
    return p.substring(0, p.length - 1);
  }
  return p;
}

export function escapeBranchName(name: string): string {
  return name.replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "_");
}

export function nestedAssign(target: any, source: any) {
  Object.keys(source).forEach((sourceKey) => {
    if (typeof source[sourceKey] === "object") {
      target[sourceKey] = nestedAssign(target[sourceKey] || {}, source[sourceKey]);
    } else {
      target[sourceKey] = source[sourceKey];
    }
  });

  return target;
}

export function checkCommitRange(
  commitId: string,
  commitIds: Array<string>,
  range: { since?: string; until?: string }
): boolean {
  const currentIndex = getCommitIndex(commitId, commitIds);
  if (range.since !== undefined) {
    if (currentIndex < getCommitIndex(range.since, commitIds)) {
      return false;
    }
  }
  if (range.until !== undefined) {
    if (currentIndex > getCommitIndex(range.until, commitIds)) {
      return false;
    }
  }
  return true;
}

function getCommitIndex(commitId: string, commitIds: Array<string>): number {
  const i = commitIds.indexOf(commitId);
  if (i === -1) {
    throw new Error(`[UNREACHABLE] Commit ${commitId} not exists in list. This exception should filtered earlier.`);
  }
  return i;
}

export function getDialects(commitId: string, commitIds: Array<string>): Array<string> {
  return DIALECTS.find((dialect) => {
    return checkCommitRange(commitId, commitIds, dialect);
  })!.dialects;
}
