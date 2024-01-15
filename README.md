## minified-kysely

Kysely runs in the browser without any problem, just `import from "kysely"` will works well.
`minified-kysely` is for the rare cases where using Kysely directly without passing through any bundler(like Webpack or Rollup).

Multiple version of Kyselys are built from `git` commits.
All tagged commits, and tracking branches(see below) are targets.
Generated files are stored in the same repository: [/dist](https://github.com/wirekang/minified-kysely/tree/main/dist)

#### dist/info.json
Contains informations about generated files.  See [the type definition](https://github.com/wirekang/minified-kysely/tree/main/src/info-type.ts).

#### dist/(branch|tag)/{id}/

Generated from a commit which is tagged or is pointed by a tracking branch.
Examples:
 * [dist/branch/master](https://github.com/wirekang/minified-kysely/tree/main/dist/branch/master)
 * [dist/tag/0.27.2](https://github.com/wirekang/minified-kysely/tree/main/dist/tag/0.27.2)


### Tracking branches
* master


### Output format
* ES Module
* ES2015


