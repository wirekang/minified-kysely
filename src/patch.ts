import { JSON_PATCHES } from "./constants";
import { path, fs } from "./node-types";
import { checkCommitRange, nestedAssign } from "./utils";

export async function patchFiles(dir: string, commitId: string, commitIds: Array<string>) {
  await patchJsonFiles(dir, commitId, commitIds);
}

async function patchJsonFiles(dir: string, commitId: string, commitIds: Array<string>) {
  for (const file in JSON_PATCHES) {
    await handleFile(dir, file, async (body) => {
      for (const patch of JSON_PATCHES[file]) {
        if (!checkCommitRange(commitId, commitIds, patch)) {
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
