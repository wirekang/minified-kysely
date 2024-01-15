import { exec } from "node:child_process";
import os from "node:os";
import path from "node:path/posix";
import fs from "node:fs/promises";

export async function createTempDir(name: string) {
  // msbuild not working in the os temp directory
  // const parent = os.tmpdir();
  const parent = normalizePath(path.join(os.homedir(), "minified-kysely-temp"));
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

export function normalizePath(p: string): string {
  const r = p.replace(/\\/g, "/");
  if (r.endsWith("/")) {
    return r.substring(0, r.length - 1);
  }
  return r;
}

export function escapeFileName(name: string): string {
  return name.replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "_");
}
