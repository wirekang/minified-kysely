import { GIT_SEPERATOR, KYSELY_GIT_URL, START_COMMIT } from "./constants";
import { execAsync } from "./utils";

export type Commit = {
  id: string;
  branches: Array<string>;
  tags: Array<string>;
};

export function clone(dir: string): Promise<void> {
  return execAsync(`git clone ${KYSELY_GIT_URL} "${dir}"`) as any;
}

/**
 *  @returns old commit first
 */
export async function getCommits(dir: string): Promise<Array<Commit>> {
  const sep = GIT_SEPERATOR;
  const str = await execAsync(`cd "${dir}" && git --no-pager log --pretty=format:'%H${sep}%D' --decorate=full --all`);
  const lines = str.split("\n");
  let startIndex = -1;
  const commits = lines.map((line, i) => {
    const [id, refNames] = line.split(sep);
    if (id === START_COMMIT) {
      startIndex = i;
    }
    const { branches, tags } = parseRefNames(refNames);
    return {
      id,
      branches,
      tags,
    };
  });
  if (startIndex === -1) {
    throw Error("no START_COMMIT found");
  }
  return commits.slice(0, startIndex + 1).reverse();
}

function parseRefNames(refNames: string) {
  const blocks = refNames.split(", ");
  const tags = [] as Array<string>;
  const branches = [] as Array<string>;
  blocks.forEach((block) => {
    const s = block.trim();
    if (s.startsWith("refs/remotes/origin/")) {
      branches.push(s.substring("refs/remotes/origin/".length));
      return;
    }
    if (s.startsWith("tag: refs/tags/")) {
      tags.push(s.substring("tag: refs/tags/".length));
      return;
    }
  });
  return {
    tags,
    branches: branches.filter((it) => it !== "HEAD"),
  };
}

export function restore(dir: string) {
  return execAsync(`cd "${dir}" && git restore .`);
}

export function checkout(dir: string, commitId: string) {
  return execAsync(`cd "${dir}" && git checkout ${commitId}`);
}
