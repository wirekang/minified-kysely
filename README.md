# minified-kysely

Kysely runs in the browser without any problem, just `import from "kysely"` will works well in most enviroments.
`minified-kysely` is for the rare cases where using Kysely dynamically without passing through any bundler(like Webpack or Rollup).

Multiple version of Kyselys are built from Git commits.
All tagged commits, and [tracking branches](https://github.com/wirekang/minified-kysely/blob/main/src/constants.ts#L9) are targets.
Generated files are stored in the same repository: [/dist](https://github.com/wirekang/minified-kysely/tree/main/dist).

## dist/

#### info.json
Contains informations about generated files.  See [the type definition](https://github.com/wirekang/minified-kysely/tree/main/src/info-type.ts).

#### (branch|tag)/{name}/

Examples:
 * [dist/branch/master/](https://github.com/wirekang/minified-kysely/tree/main/dist/branch/master)
 * [dist/tag/0.27.2/](https://github.com/wirekang/minified-kysely/tree/main/dist/tag/0.27.2)


## Usage

You can use [jsDelivr](https://www.jsdelivr.com/?query=fgg&docs=gh) to request the files from stable CDN.
Responsed files are not always up-to-date because of [the caching logic](https://www.jsdelivr.com/documentation#id-caching).
It's not a problem for fixed versions like `tag/0.24.0`, however, for files like `info.json` or `branch/master/index.js` it's a big problem since they should be kept latest. To solve this problem:

1. Check out the latest commit id using [GitHub API](https://api.github.com/repos/wirekang/minified-kysely/git/refs/heads/main).
2. Request to jsDelivr using commit id. (e.g. [wirekang/minified-kysely@{commitId}/dist/info.json](https://cdn.jsdelivr.net/gh/wirekang/minified-kysely@937acb05887cfee4e670e2e46cd0ce2a8ffe98cc/dist/info.json))

