import fs from "node:fs/promises";
import { INFO_JSON_PATH } from "./constants";

export type Info = {
  tags: Array<Module>;
  branches: Array<Module>;
};

export type Module = {
  id: string;
  commitId: string;
  exports: Array<string>;
  dependencies: Record<string, string>;
  dir: string;
  files: Array<string>;
};

export async function loadInfo() {
  return JSON.parse(await fs.readFile(INFO_JSON_PATH, { encoding: "utf-8" })) as Info;
}

export function saveInfo(info: Info) {
  return fs.writeFile(INFO_JSON_PATH, JSON.stringify(info, null, 4));
}
