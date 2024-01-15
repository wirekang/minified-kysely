import { exec } from "node:child_process";
import os from "node:os";
import path from "node:path/posix";
import fs from "node:fs/promises";

export async function createTempDir(name: string) {
  // const parent = os.tmpdir();
  const parent = path.join(os.homedir(), "minified-kysely-temp");
  const dir = path.join(parent, name + `${Date.now()}`);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export function execAsync(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Exec " + cmd);
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
