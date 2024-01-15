import { GitManager } from "../src/git-manager";

const gm = new GitManager();

beforeAll(() => {
  return gm.init();
}, 1000 * 60);

test("listBranches", async () => {
  const branches = await gm.listBranches();
  expect(branches).toContain("master");
  branches.forEach((branch) => {
    expect(typeof branch).toBe("string");
  });
});

test("listVersionTags", async () => {
  const tags = await gm.listVersionTags();
});
