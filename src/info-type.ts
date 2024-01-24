export type Info = {
  lastCommitId: string;
  tags: Array<Module>;
  branches: Array<Module>;
};

export type Module = {
  name: string;
  commitId: string;
  exports: Array<string>;
  dependencies: Record<string, string>;
  dir: string;
  files: Array<string>;
  dialects: Array<string>;
};
