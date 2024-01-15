import { JSON_PATCHES } from "./constants";
//@ts-ignore
import path from "node:path/posix";
//@ts-ignore
import fs from "node:fs/promises";
import { nestedAssign } from "./utils";

export async function patchFiles(dir: string, commitId: string, commitIds: Array<string>) {
  await patchJsonFiles(dir, commitId, commitIds);
}

async function patchJsonFiles(dir: string, commitId: string, commitIds: Array<string>) {
  for (const file in JSON_PATCHES) {
    await handleFile(dir, file, async (body) => {
      for (const patch of JSON_PATCHES[file]) {
        if (!checkRange(commitId, commitIds, patch)) {
          return;
        }
        console.log(`Patch ${file}: ${patch.description}`);
        nestedAssign(body, patch.patch);
      }
    });
  }
}

async function handleFile(dir: string, file: string, cb: (body: any) => Promise<void>) {
  const filePath = path.join(dir, file);
  const body = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }));
  await cb(body);
  await fs.writeFile(filePath, JSON.stringify(body));
}

function checkRange(commitId: string, commitIds: Array<string>, patch: { since?: string; until?: string }): boolean {
  const currentIndex = getCommitIndex(commitId, commitIds);
  if (patch.since !== undefined) {
    if (currentIndex < getCommitIndex(patch.since, commitIds)) {
      return false;
    }
  }
  if (patch.until !== undefined) {
    if (currentIndex > getCommitIndex(patch.until, commitIds)) {
      return false;
    }
  }
  return true;
}

function getCommitIndex(commitId: string, commitIds: Array<string>): number {
  const i = commitIds.indexOf(commitId);
  if (i === -1) {
    // this condition should filtered earlier
    throw new Error(`UNREACHABLE Commit ${commitId} not exists in list`);
  }
  return i;
}
