/**
 * To reduce `npm ci` time
 */

//@ts-ignore
import path from "node:path/posix";
//@ts-ignore
import fs from "node:fs/promises";
//@ts-ignore
import { exec } from "node:child_process";
//@ts-ignore
import os from "node:os";

export { path, fs, os, exec };
