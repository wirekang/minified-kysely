export type Info = {
  lastCommitId: string;

  /**
   * `Module.id` is a tag name.
   */
  tags: Array<Module>;

  /**
   * `Module.id` is a branch name.
   */
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
