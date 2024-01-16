//@ts-ignore
import fs from "node:fs/promises";
import { INFO_JSON_PATH } from "./constants";
import type { Info } from "./info-type";

export async function loadInfo() {
  return JSON.parse(await fs.readFile(INFO_JSON_PATH, { encoding: "utf-8" })) as Info;
}

export function saveInfo(info: Info) {
  return fs.writeFile(INFO_JSON_PATH, JSON.stringify(info, null, 4));
}
