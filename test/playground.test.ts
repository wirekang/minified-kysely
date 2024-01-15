import { bundle } from "../src/bundle";
import { GitManager } from "../src/git-manager";
import { createTempDir, normalizePath } from "../src/utils";
import { Module, loadInfo, saveInfo } from "../src/info";
import path from "node:path/posix";

test("playground", async () => {
  const gm = new GitManager();
  await gm.init();
  const branches = await gm.listBranches();
  const tags = await gm.listVersionTags();
  const info = await loadInfo();

  {
  }
  await saveInfo(info);
}, 50000);
