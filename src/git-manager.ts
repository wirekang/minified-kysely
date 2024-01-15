import Git from "nodegit";
import semverCompare from "semver/functions/compare";
import semverValid from "semver/functions/valid";
import { createTempDir, execAsync } from "./utils";
import { KYSELY_GIT_URL } from "./constants";

export type RemoteHead = {
  name: string;
  oid: string;
};

const lazy: any = null;
export class GitManager {
  private repository: Git.Repository = lazy;
  private remote: Git.Remote = lazy;
  private remoteHeads: Array<any> = lazy;
  private gitDir: string = lazy;
  private commitIds: Array<string> = lazy;

  async init() {
    this.gitDir = await createTempDir("kysely");
    console.log(`Clone kysely into ${this.gitDir}`);
    this.repository = await Git.Clone(KYSELY_GIT_URL, this.gitDir);
    this.remote = await this.repository.getRemote("origin");
    await this.remote.connect(Git.Enums.DIRECTION.FETCH, {});
    this.remoteHeads = await this.remote.referenceList();
    this.commitIds = await this.walk(await this.repository.getHeadCommit());
    console.log(`RemoteHeads: ${this.remoteHeads.length} Commits: ${this.commitIds.length}`);
  }

  getDirectory(): string {
    return this.gitDir;
  }

  async listBranches(): Promise<Array<RemoteHead>> {
    return this.filterRemoteHeads("refs/heads/");
  }

  async listVersionTags(): Promise<Array<RemoteHead>> {
    return this.filterRemoteHeads("refs/tags/")
      .filter((it) => semverValid(it.name) !== null)
      .sort((a, b) => semverCompare(a.name, b.name, true));
  }

  async listCommitIds(): Promise<Array<string>> {
    return this.commitIds;
  }

  private filterRemoteHeads(namePrefix: string): Array<RemoteHead> {
    return this.remoteHeads
      .filter((it) => it.name().startsWith(namePrefix))
      .map((it) => ({ name: it.name().substring(namePrefix.length), oid: it.oid().toString() }));
  }

  restore() {
    return execAsync(`cd "${this.gitDir}" && git restore .`);
  }

  checkout(oid: string) {
    return execAsync(`cd "${this.gitDir}" && git checkout ${oid}`);
  }

  private async walk(c: Git.Commit): Promise<Array<string>> {
    const rw = this.repository.createRevWalk();
    rw.sorting(Git.Revwalk.SORT.TIME);
    rw.push(c.id());
    const commits = await rw.getCommitsUntil(() => true);
    return commits.map((it) => it.id().toString());
  }
}
