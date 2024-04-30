import { O as OperationNode, V as ValueListNode, P as PrimitiveValueListNode, R as RawBuilder, Q as QueryExecutor, K as KyselyPlugin, D as DialectAdapter, a as RootOperationNode, b as QueryId, C as CompiledQuery, c as DatabaseConnection, d as QueryResult, e as ConnectionProvider, f as QueryCompiler, S as SelectQueryNode, g as SelectionNode, h as ColumnNode, A as AliasNode, T as TableNode, F as FromNode, i as ReferenceNode, j as AndNode, k as OrNode, l as ParensNode, J as JoinNode, m as RawNode, W as WhereNode, I as InsertQueryNode, n as DeleteQueryNode, o as ReturningNode, p as CreateTableNode, q as AddColumnNode, r as ColumnDefinitionNode, s as DropTableNode, t as OrderByNode, u as OrderByItemNode, G as GroupByNode, v as GroupByItemNode, U as UpdateQueryNode, w as ColumnUpdateNode, L as LimitNode, x as OffsetNode, y as OnConflictNode, z as OnDuplicateKeyNode, B as CreateIndexNode, E as DropIndexNode, H as PrimaryKeyConstraintNode, M as UniqueConstraintNode, N as ReferencesNode, X as CheckConstraintNode, Y as WithNode, Z as CommonTableExpressionNode, _ as CommonTableExpressionNameNode, $ as HavingNode, a0 as CreateSchemaNode, a1 as DropSchemaNode, a2 as AlterTableNode, a3 as DropColumnNode, a4 as RenameColumnNode, a5 as AlterColumnNode, a6 as ModifyColumnNode, a7 as AddConstraintNode, a8 as DropConstraintNode, a9 as ForeignKeyConstraintNode, aa as DataTypeNode, ab as SelectAllNode, ac as IdentifierNode, ad as SchemableIdentifierNode, ae as ValueNode, af as OperatorNode, ag as CreateViewNode, ah as DropViewNode, ai as GeneratedNode, aj as DefaultValueNode, ak as OnNode, al as SelectModifierNode, am as CreateTypeNode, an as DropTypeNode, ao as ExplainNode, ap as AggregateFunctionNode, aq as OverNode, ar as PartitionByNode, as as PartitionByItemNode, at as SetOperationNode, au as UsingNode, av as CaseNode, aw as WhenNode, ax as JSONReferenceNode, ay as JSONPathNode, az as JSONPathLegNode, aA as JSONOperatorChainNode, aB as MergeQueryNode, aC as AddIndexNode, aD as FetchNode, aE as TopNode, aF as OutputNode, aG as AlterTableColumnAlterationNode, aH as Driver, aI as Kysely, aJ as MigrationLockOptions, aK as Dialect, aL as DatabaseIntrospector, aM as SchemaMetadata, aN as DatabaseMetadataOptions, aO as TableMetadata, aP as DatabaseMetadata, aQ as TransactionSettings, aR as PluginTransformQueryArgs, aS as PluginTransformResultArgs, aT as UnknownRow, aU as Compilable, aV as InsertResult, aW as UpdateResult, aX as DeleteResult, aY as MergeResult, aZ as Simplify, a_ as ExpressionOrFactory } from './kysely.d-m4V51Lu6.js';
export { e1 as ARITHMETIC_OPERATORS, dv as AddIndexNodeProps, cy as AggregateFunctionBuilder, cA as AggregateFunctionBuilderProps, bJ as AliasableExpression, cz as AliasedAggregateFunctionBuilder, bK as AliasedExpression, bO as AliasedExpressionWrapper, cI as AliasedJSONPathBuilder, cR as AliasedRawBuilder, c2 as AliasedSelectQueryBuilder, dn as AlterColumnBuilder, dq as AlterColumnBuilderCallback, dw as AlterColumnNodeProps, de as AlterTableBuilder, df as AlterTableBuilderProps, dh as AlterTableColumnAlteringBuilder, di as AlterTableColumnAlteringBuilderProps, dx as AlterTableNodeTableProps, dp as AlteredColumnBuilder, bQ as AndWrapper, b1 as AnyAliasedColumn, b2 as AnyAliasedColumnWithTable, b3 as AnyColumn, b4 as AnyColumnWithTable, e8 as ArithmeticOperator, e3 as BINARY_OPERATORS, eb as BinaryOperator, e0 as COMPARISON_OPERATORS, bd as CallbackSelection, cC as CaseBuilder, cF as CaseEndBuilder, cD as CaseThenBuilder, cE as CaseWhenBuilder, dg as ColumnAlteringInterface, cW as ColumnBuilderCallback, dI as ColumnDataType, da as ColumnDefinitionBuilder, db as ColumnDefinitionBuilderCallback, dy as ColumnDefinitionNodeProps, du as ColumnMetadata, ev as ColumnType, e7 as ComparisonOperator, bv as ComparisonOperatorExpression, bE as ConnectionBuilder, dz as ConstraintNode, d2 as CreateIndexBuilder, d3 as CreateIndexBuilderProps, dA as CreateIndexNodeProps, d6 as CreateSchemaBuilder, d7 as CreateSchemaBuilderProps, dC as CreateSchemaNodeParams, cU as CreateTableBuilder, cV as CreateTableBuilderProps, dF as CreateTableNodeParams, cY as CreateTypeBuilder, cZ as CreateTypeBuilderProps, dG as CreateTypeNodeParams, dj as CreateViewBuilder, dk as CreateViewBuilderProps, dH as CreateViewNodeParams, dJ as DataTypeParams, cf as DeleteQueryBuilder, cg as DeleteQueryBuilderProps, ck as DeleteQueryBuilderWithFullJoin, ch as DeleteQueryBuilderWithInnerJoin, ci as DeleteQueryBuilderWithLeftJoin, cj as DeleteQueryBuilderWithRightJoin, dL as DropConstraintNodeProps, d4 as DropIndexBuilder, d5 as DropIndexBuilderProps, dM as DropIndexNodeProps, d8 as DropSchemaBuilder, d9 as DropSchemaBuilderProps, dN as DropSchemaNodeParams, c_ as DropTableBuilder, c$ as DropTableBuilderProps, dO as DropTablexNodeParams, d0 as DropTypeBuilder, d1 as DropTypeBuilderProps, dP as DropTypeNodeParams, dl as DropViewBuilder, dm as DropViewBuilderProps, dQ as DropViewNodeParams, dr as DynamicModule, b5 as Equals, eP as ErrorLogEvent, eJ as ExplainFormat, eK as Explainable, bI as Expression, a$ as ExpressionBuilder, bN as ExpressionWrapper, bj as ExtractTypeFromReferenceExpression, bi as ExtractTypeFromStringReference, cO as ExtractWheneableMergeQueryBuilder, dR as FetchModifier, by as FilterObject, dd as ForeignKeyConstraintBuilder, cX as ForeignKeyConstraintBuilderCallback, dc as ForeignKeyConstraintBuilderInterface, dS as ForeignKeyConstraintNodeProps, cq as FunctionModule, ew as Generated, ex as GeneratedAlways, dT as GeneratedNodeParams, b_ as HavingInterface, dB as IndexType, br as InsertObject, c7 as InsertQueryBuilder, c8 as InsertQueryBuilderProps, dU as InsertQueryNodeProps, eA as InsertType, eG as Insertable, dt as IsolationLevel, ey as JSONColumnType, e9 as JSONOperator, ea as JSONOperatorWith$, cG as JSONPathBuilder, dW as JSONPathLegType, e2 as JSON_OPERATORS, co as JoinBuilder, cp as JoinBuilderProps, bq as JoinCallbackExpression, bp as JoinReferenceExpression, dV as JoinType, bD as KyselyConfig, bB as KyselyProps, eM as LOG_LEVELS, eT as Log, eS as LogConfig, eQ as LogEvent, eN as LogLevel, eR as Logger, cM as MatchedThenableMergeQueryBuilder, cJ as MergeQueryBuilder, cK as MergeQueryBuilderProps, cm as NoResultError, cl as NoResultErrorConstructor, eD as NonNullableInsertKeys, cN as NotMatchedThenableMergeQueryBuilder, b8 as NotNull, b7 as Nullable, eC as NullableInsertKeys, dD as ON_COMMIT_ACTIONS, em as ON_MODIFY_FOREIGN_ACTIONS, e6 as OPERATORS, dE as OnCommitAction, cs as OnConflictBuilder, ct as OnConflictBuilderProps, cu as OnConflictDatabase, cw as OnConflictDoNothingBuilder, dX as OnConflictNodeProps, cv as OnConflictTables, cx as OnConflictUpdateBuilder, dY as OnDuplicateKeyNodeProps, en as OnModifyForeignAction, bz as OperandExpression, bw as OperandValueExpression, bx as OperandValueExpressionOrList, d$ as OperationNodeKind, dZ as OperationNodeSource, ee as Operator, bP as OrWrapper, bu as OrderByDirectionExpression, bt as OrderByExpression, bX as OutputCallback, bV as OutputDatabase, bW as OutputExpression, bT as OutputInterface, bU as OutputPrefix, cB as OverBuilderCallback, ek as PrimaryConstraintNode, bG as QueryCreator, bH as QueryCreatorProps, cS as QueryExecutorProvider, eO as QueryLogEvent, el as QueryNode, cP as RawBuilderProps, be as ReferenceExpression, bf as ReferenceExpressionOrList, bS as ReturningInterface, cT as SchemaModule, bb as SelectArg, ba as SelectCallback, b9 as SelectExpression, bZ as SelectExpressionFromOutputCallback, bY as SelectExpressionFromOutputExpression, eo as SelectModifier, b$ as SelectQueryBuilder, c1 as SelectQueryBuilderProps, c6 as SelectQueryBuilderWithFullJoin, c3 as SelectQueryBuilderWithInnerJoin, c4 as SelectQueryBuilderWithLeftJoin, c5 as SelectQueryBuilderWithRightJoin, ez as SelectType, eF as Selectable, bc as Selection, ep as SetOperator, bg as SimpleReferenceExpression, eq as SimpleReferenceExpressionNode, bm as SimpleTableReference, b6 as SqlBool, eL as Streamable, bh as StringReference, ds as TRANSACTION_ISOLATION_LEVELS, bn as TableExpression, bo as TableExpressionOrList, er as TopModifier, bA as Transaction, bF as TransactionBuilder, cH as TraversedJSONPathBuilder, e4 as UNARY_FILTER_OPERATORS, e5 as UNARY_OPERATORS, ed as UnaryFilterOperator, ec as UnaryOperator, es as UniqueConstraintNodeProps, eE as UpdateKeys, bs as UpdateObject, c9 as UpdateQueryBuilder, ca as UpdateQueryBuilderProps, ce as UpdateQueryBuilderWithFullJoin, cb as UpdateQueryBuilderWithInnerJoin, cc as UpdateQueryBuilderWithLeftJoin, cd as UpdateQueryBuilderWithRightJoin, eB as UpdateType, et as UpdateValuesNode, eH as Updateable, bk as ValueExpression, bl as ValueExpressionOrList, cL as WheneableMergeQueryBuilder, bR as WhereInterface, eu as WithNodeParams, cr as createFunctionModule, cQ as createRawBuilder, c0 as createSelectQueryBuilder, b0 as expressionBuilder, bM as isAliasedExpression, ei as isArithmeticOperator, eg as isBinaryOperator, dK as isColumnDataType, eh as isComparisonOperator, eI as isCompilable, bL as isExpression, ej as isJSONOperator, bC as isKyselyProps, cn as isNoResultErrorConstructor, d_ as isOperationNodeSource, ef as isOperator } from './kysely.d-m4V51Lu6.js';

interface BinaryOperationNode extends OperationNode {
    readonly kind: 'BinaryOperationNode';
    readonly leftOperand: OperationNode;
    readonly operator: OperationNode;
    readonly rightOperand: OperationNode;
}
/**
 * @internal
 */
declare const BinaryOperationNode: Readonly<{
    is(node: OperationNode): node is BinaryOperationNode;
    create(leftOperand: OperationNode, operator: OperationNode, rightOperand: OperationNode): BinaryOperationNode;
}>;

type ValuesItemNode = ValueListNode | PrimitiveValueListNode;
interface ValuesNode extends OperationNode {
    readonly kind: 'ValuesNode';
    readonly values: ReadonlyArray<ValuesItemNode>;
}
/**
 * @internal
 */
declare const ValuesNode: Readonly<{
    is(node: OperationNode): node is ValuesNode;
    create(values: ReadonlyArray<ValuesItemNode>): ValuesNode;
}>;

interface Sql {
    /**
     * Template tag for creating raw SQL snippets and queries.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const id = 123
     * const snippet = sql<Person[]>`select * from person where id = ${id}`
     * ```
     *
     * Substitutions (the things inside `${}`) are automatically passed to the database
     * as parameters and are never interpolated to the SQL string. There's no need to worry
     * about SQL injection vulnerabilities. Substitutions can be values, other `sql`
     * expressions, queries and almost anything else Kysely can produce and they get
     * handled correctly. See the examples below.
     *
     * If you need your substitutions to be interpreted as identifiers, value literals or
     * lists of things, see the {@link Sql.ref}, {@link Sql.table}, {@link Sql.id},
     * {@link Sql.lit}, {@link Sql.raw} and {@link Sql.join} functions.
     *
     * You can pass sql snippets returned by the `sql` tag pretty much anywhere. Whenever
     * something can't be done using the Kysely API, you should be able to drop down to
     * raw SQL using the `sql` tag. Here's an example query that uses raw sql in a bunch
     * of methods:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select(
     *     // If you use `sql` in a select statement, remember to call the `as`
     *     // method to give it an alias.
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   )
     *   .where(sql<boolean>`birthdate between ${date1} and ${date2}`)
     *   // Here we assume we have list of nicknames for the person
     *   // (a list of strings) and we use the PostgreSQL `@>` operator
     *   // to test if all of them are valid nicknames for the user.
     *   .where('nicknames', '@>', sql<string[]>`ARRAY[${sql.join(nicknames)}]`)
     *   .orderBy(sql<string>`concat(first_name, ' ', last_name)`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select concat(first_name, ' ', last_name) as "full_name"
     * from "person"
     * where birthdate between $1 and $2
     * and "nicknames" @> ARRAY[$3, $4, $5, $6, $7, $8, $9, $10]
     * order by concat(first_name, ' ', last_name)
     * ```
     *
     * SQL snippets can be executed by calling the `execute` method and passing a `Kysely`
     * instance as the only argument:
     *
     * ```ts
     * const result = await sql<Person[]>`select * from person`.execute(db)
     * ```
     *
     * You can merge other `sql` expressions and queries using substitutions:
     *
     * ```ts
     * const petName = db.selectFrom('pet').select('name').limit(1)
     * const fullName = sql<string>`concat(first_name, ' ', last_name)`
     *
     * sql`
     *   select ${fullName} as full_name, ${petName} as pet_name
     *   from person
     * `
     * ```
     *
     * Substitutions also handle {@link ExpressionBuilder.ref},
     * {@link DynamicModule.ref} and pretty much anything else you
     * throw at it. Here's an example of calling a function in a
     * type-safe way:
     *
     * ```ts
     * db.selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     (eb) => {
     *       // The `eb.ref` method is type-safe and only accepts
     *       // column references that are possible.
     *       const firstName = eb.ref('first_name')
     *       const lastName = eb.ref('last_name')
     *
     *       const fullName = sql<string>`concat(${firstName}, ' ', ${lastName})`
     *       return fullName.as('full_name')
     *     }
     *   ])
     * ```
     *
     * don't know if that amount of ceremony is worth the small increase in
     * type-safety though... But it's possible.
     */
    <T = unknown>(sqlFragments: TemplateStringsArray, ...parameters: unknown[]): RawBuilder<T>;
    /**
     * `sql.val(value)` is a shortcut for:
     *
     * ```ts
     * sql<ValueType>`${value}`
     * ```
     */
    val<V>(value: V): RawBuilder<V>;
    /**
     * @deprecated Use {@link Sql.val} instead.
     */
    value<V>(value: V): RawBuilder<V>;
    /**
     * This can be used to add runtime column references to SQL snippets.
     *
     * By default `${}` substitutions in {@link sql} template strings get
     * transformed into parameters. You can use this function to tell
     * Kysely to interpret them as column references instead.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const columnRef = 'first_name'
     *
     * sql`select ${sql.ref(columnRef)} from person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" from person
     * ```
     *
     * The refefences can also include a table name:
     *
     * ```ts
     * const columnRef = 'person.first_name'
     *
     * sql`select ${sql.ref(columnRef)}} from person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" from person
     * ```
     *
     * The refefences can also include a schema on supported databases:
     *
     * ```ts
     * const columnRef = 'public.person.first_name'
     *
     * sql`select ${sql.ref(columnRef)}} from person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "public"."person"."first_name" from person
     * ```
     */
    ref<R = unknown>(columnReference: string): RawBuilder<R>;
    /**
     * This can be used to add runtime table references to SQL snippets.
     *
     * By default `${}` substitutions in {@link sql} template strings get
     * transformed into parameters. You can use this function to tell
     * Kysely to interpret them as table references instead.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const table = 'person'
     *
     * sql`select first_name from ${sql.table(table)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select first_name from "person"
     * ```
     *
     * The refefences can also include a schema on supported databases:
     *
     * ```ts
     * const table = 'public.person'
     *
     * sql`select first_name from ${sql.table(table)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select first_name from "public"."person"
     * ```
     */
    table(tableReference: string): RawBuilder<unknown>;
    /**
     * This can be used to add arbitrary identifiers to SQL snippets.
     *
     * Does the same thing as {@link Sql.ref | ref} and {@link Sql.table | table}
     * but can also be used for any other identifiers like index names.
     *
     * You should use {@link Sql.ref | ref} and {@link Sql.table | table}
     * instead of this whenever possible as they produce a more sematic
     * operation node tree.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const indexName = 'person_first_name_index'
     *
     * sql`create index ${indexName} on person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on person
     * ```
     *
     * Multiple identifiers get separated by dots:
     *
     * ```ts
     * const schema = 'public'
     * const columnName = 'first_name'
     * const table = 'person'
     *
     * sql`select ${sql.id(schema, table, columnName)}} from ${sql.id(schema, table)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "public"."person"."first_name" from "public"."person"
     * ```
     */
    id(...ids: readonly string[]): RawBuilder<unknown>;
    /**
     * This can be used to add literal values to SQL snippets.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     * You almost always want to use normal substitutions that get sent to the
     * db as parameters.
     *
     * ```ts
     * const firstName = 'first_name'
     *
     * sql`select * from person where first_name = ${sql.lit(firstName)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from person where first_name = 'first_name'
     * ```
     *
     * As you can see from the example above, the value was added directly to
     * the SQL string instead of as a parameter. Only use this function when
     * something can't be sent as a parameter.
     */
    lit<V>(value: V): RawBuilder<V>;
    /**
     * @deprecated Use {@link lit} instead.
     */
    literal<V>(value: V): RawBuilder<V>;
    /**
     * This can be used to add arbitrary runtime SQL to SQL snippets.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const firstName = "'first_name'"
     *
     * sql`select * from person where first_name = ${sql.raw(firstName)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from person where first_name = 'first_name'
     * ```
     *
     * Note that the difference to `sql.lit` is that this function
     * doesn't assume the inputs are values. The input to this function
     * can be any sql and it's simply glued to the parent string as-is.
     */
    raw<R = unknown>(anySql: string): RawBuilder<R>;
    /**
     * This can be used to add lists of things to SQL snippets.
     *
     * ### Examples
     *
     * ```ts
     * function findByNicknames(nicknames: string[]): Promise<Person[]> {
     *   return db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where('nicknames', '@>', sql<string[]>`ARRAY[${sql.join(nicknames)}]`)
     *     .execute()
     * }
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where "nicknames" @> ARRAY[$1, $2, $3, $4, $5, $6, $7, $8]
     * ```
     *
     * The second argument is the joining SQL expression that defaults
     * to
     *
     * ```ts
     * sql`, `
     * ```
     *
     * In addition to values, items in the list can be also {@link sql}
     * expressions, queries or anything else the normal substitutions
     * support:
     *
     * ```ts
     * const things = [
     *   123,
     *   sql`(1 == 1)`,
     *   db.selectFrom('person').selectAll(),
     *   sql.lit(false),
     *   sql.id('first_name')
     * ]
     *
     * sql`BEFORE ${sql.join(things, sql`::varchar, `)} AFTER`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * BEFORE $1::varchar, (1 == 1)::varchar, (select * from "person")::varchar, false::varchar, "first_name" AFTER
     * ```
     */
    join(array: readonly unknown[], separator?: RawBuilder<any>): RawBuilder<unknown>;
}
declare const sql: Sql;

declare abstract class QueryExecutorBase implements QueryExecutor {
    #private;
    constructor(plugins?: ReadonlyArray<KyselyPlugin>);
    abstract get adapter(): DialectAdapter;
    /**
     * Returns all installed plugins.
     */
    get plugins(): ReadonlyArray<KyselyPlugin>;
    /**
     * Given the query the user has built (expressed as an operation node tree)
     * this method runs it through all plugins' `transformQuery` methods and
     * returns the result.
     */
    transformQuery<T extends RootOperationNode>(node: T, queryId: QueryId): T;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    abstract compileQuery(node: RootOperationNode, queryId: QueryId): CompiledQuery;
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    abstract provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method.
     */
    executeQuery<R>(compiledQuery: CompiledQuery, queryId: QueryId): Promise<QueryResult<R>>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method. Results are streamead instead of loaded
     * at once.
     */
    stream<R>(compiledQuery: CompiledQuery, chunkSize: number, queryId: QueryId): AsyncIterableIterator<QueryResult<R>>;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    abstract withConnectionProvider(connectionProvider: ConnectionProvider): QueryExecutorBase;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    abstract withPlugin(plugin: KyselyPlugin): QueryExecutorBase;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    abstract withPlugins(plugin: ReadonlyArray<KyselyPlugin>): QueryExecutorBase;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    abstract withPluginAtFront(plugin: KyselyPlugin): QueryExecutorBase;
    /**
     * Returns a copy of this executor without any plugins.
     */
    abstract withoutPlugins(): QueryExecutorBase;
}

declare class DefaultQueryExecutor extends QueryExecutorBase {
    #private;
    constructor(compiler: QueryCompiler, adapter: DialectAdapter, connectionProvider: ConnectionProvider, plugins?: KyselyPlugin[]);
    /**
     * Returns the adapter for the current dialect.
     */
    get adapter(): DialectAdapter;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    compileQuery(node: RootOperationNode): CompiledQuery;
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    withPlugins(plugins: ReadonlyArray<KyselyPlugin>): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    withPlugin(plugin: KyselyPlugin): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    withPluginAtFront(plugin: KyselyPlugin): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    withConnectionProvider(connectionProvider: ConnectionProvider): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor without any plugins.
     */
    withoutPlugins(): DefaultQueryExecutor;
}

/**
 * A {@link QueryExecutor} subclass that can be used when you don't
 * have a {@link QueryCompiler}, {@link ConnectionProvider} or any
 * other needed things to actually execute queries.
 */
declare class NoopQueryExecutor extends QueryExecutorBase {
    /**
     * Returns the adapter for the current dialect.
     */
    get adapter(): DialectAdapter;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    compileQuery(): CompiledQuery;
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(): Promise<T>;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    withConnectionProvider(): NoopQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    withPlugin(plugin: KyselyPlugin): NoopQueryExecutor;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    withPlugins(plugins: ReadonlyArray<KyselyPlugin>): NoopQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    withPluginAtFront(plugin: KyselyPlugin): NoopQueryExecutor;
    /**
     * Returns a copy of this executor without any plugins.
     */
    withoutPlugins(): NoopQueryExecutor;
}
declare const NOOP_QUERY_EXECUTOR: NoopQueryExecutor;

interface ListNode extends OperationNode {
    readonly kind: 'ListNode';
    readonly items: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const ListNode: Readonly<{
    is(node: OperationNode): node is ListNode;
    create(items: ReadonlyArray<OperationNode>): ListNode;
}>;

interface DefaultInsertValueNode extends OperationNode {
    readonly kind: 'DefaultInsertValueNode';
}
/**
 * @internal
 */
declare const DefaultInsertValueNode: Readonly<{
    is(node: OperationNode): node is DefaultInsertValueNode;
    create(): DefaultInsertValueNode;
}>;

interface UnaryOperationNode extends OperationNode {
    readonly kind: 'UnaryOperationNode';
    readonly operator: OperationNode;
    readonly operand: OperationNode;
}
/**
 * @internal
 */
declare const UnaryOperationNode: Readonly<{
    is(node: OperationNode): node is UnaryOperationNode;
    create(operator: OperationNode, operand: OperationNode): UnaryOperationNode;
}>;

interface FunctionNode extends OperationNode {
    readonly kind: 'FunctionNode';
    readonly func: string;
    readonly arguments: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const FunctionNode: Readonly<{
    is(node: OperationNode): node is FunctionNode;
    create(func: string, args: ReadonlyArray<OperationNode>): FunctionNode;
}>;

interface TupleNode extends OperationNode {
    readonly kind: 'TupleNode';
    readonly values: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const TupleNode: Readonly<{
    is(node: OperationNode): node is TupleNode;
    create(values: ReadonlyArray<OperationNode>): TupleNode;
}>;

interface MatchedNode extends OperationNode {
    readonly kind: 'MatchedNode';
    readonly not: boolean;
    readonly bySource: boolean;
}
/**
 * @internal
 */
declare const MatchedNode: Readonly<{
    is(node: OperationNode): node is MatchedNode;
    create(not: boolean, bySource?: boolean): MatchedNode;
}>;

interface CastNode extends OperationNode {
    readonly kind: 'CastNode';
    readonly expression: OperationNode;
    readonly dataType: OperationNode;
}
/**
 * @internal
 */
declare const CastNode: Readonly<{
    is(node: OperationNode): node is CastNode;
    create(expression: OperationNode, dataType: OperationNode): CastNode;
}>;

declare abstract class OperationNodeVisitor {
    #private;
    protected readonly nodeStack: OperationNode[];
    protected get parentNode(): OperationNode | undefined;
    protected readonly visitNode: (node: OperationNode) => void;
    protected abstract visitSelectQuery(node: SelectQueryNode): void;
    protected abstract visitSelection(node: SelectionNode): void;
    protected abstract visitColumn(node: ColumnNode): void;
    protected abstract visitAlias(node: AliasNode): void;
    protected abstract visitTable(node: TableNode): void;
    protected abstract visitFrom(node: FromNode): void;
    protected abstract visitReference(node: ReferenceNode): void;
    protected abstract visitAnd(node: AndNode): void;
    protected abstract visitOr(node: OrNode): void;
    protected abstract visitValueList(node: ValueListNode): void;
    protected abstract visitParens(node: ParensNode): void;
    protected abstract visitJoin(node: JoinNode): void;
    protected abstract visitRaw(node: RawNode): void;
    protected abstract visitWhere(node: WhereNode): void;
    protected abstract visitInsertQuery(node: InsertQueryNode): void;
    protected abstract visitDeleteQuery(node: DeleteQueryNode): void;
    protected abstract visitReturning(node: ReturningNode): void;
    protected abstract visitCreateTable(node: CreateTableNode): void;
    protected abstract visitAddColumn(node: AddColumnNode): void;
    protected abstract visitColumnDefinition(node: ColumnDefinitionNode): void;
    protected abstract visitDropTable(node: DropTableNode): void;
    protected abstract visitOrderBy(node: OrderByNode): void;
    protected abstract visitOrderByItem(node: OrderByItemNode): void;
    protected abstract visitGroupBy(node: GroupByNode): void;
    protected abstract visitGroupByItem(node: GroupByItemNode): void;
    protected abstract visitUpdateQuery(node: UpdateQueryNode): void;
    protected abstract visitColumnUpdate(node: ColumnUpdateNode): void;
    protected abstract visitLimit(node: LimitNode): void;
    protected abstract visitOffset(node: OffsetNode): void;
    protected abstract visitOnConflict(node: OnConflictNode): void;
    protected abstract visitOnDuplicateKey(node: OnDuplicateKeyNode): void;
    protected abstract visitCreateIndex(node: CreateIndexNode): void;
    protected abstract visitDropIndex(node: DropIndexNode): void;
    protected abstract visitList(node: ListNode): void;
    protected abstract visitPrimaryKeyConstraint(node: PrimaryKeyConstraintNode): void;
    protected abstract visitUniqueConstraint(node: UniqueConstraintNode): void;
    protected abstract visitReferences(node: ReferencesNode): void;
    protected abstract visitCheckConstraint(node: CheckConstraintNode): void;
    protected abstract visitWith(node: WithNode): void;
    protected abstract visitCommonTableExpression(node: CommonTableExpressionNode): void;
    protected abstract visitCommonTableExpressionName(node: CommonTableExpressionNameNode): void;
    protected abstract visitHaving(node: HavingNode): void;
    protected abstract visitCreateSchema(node: CreateSchemaNode): void;
    protected abstract visitDropSchema(node: DropSchemaNode): void;
    protected abstract visitAlterTable(node: AlterTableNode): void;
    protected abstract visitDropColumn(node: DropColumnNode): void;
    protected abstract visitRenameColumn(node: RenameColumnNode): void;
    protected abstract visitAlterColumn(node: AlterColumnNode): void;
    protected abstract visitModifyColumn(node: ModifyColumnNode): void;
    protected abstract visitAddConstraint(node: AddConstraintNode): void;
    protected abstract visitDropConstraint(node: DropConstraintNode): void;
    protected abstract visitForeignKeyConstraint(node: ForeignKeyConstraintNode): void;
    protected abstract visitDataType(node: DataTypeNode): void;
    protected abstract visitSelectAll(node: SelectAllNode): void;
    protected abstract visitIdentifier(node: IdentifierNode): void;
    protected abstract visitSchemableIdentifier(node: SchemableIdentifierNode): void;
    protected abstract visitValue(node: ValueNode): void;
    protected abstract visitPrimitiveValueList(node: PrimitiveValueListNode): void;
    protected abstract visitOperator(node: OperatorNode): void;
    protected abstract visitCreateView(node: CreateViewNode): void;
    protected abstract visitDropView(node: DropViewNode): void;
    protected abstract visitGenerated(node: GeneratedNode): void;
    protected abstract visitDefaultValue(node: DefaultValueNode): void;
    protected abstract visitOn(node: OnNode): void;
    protected abstract visitValues(node: ValuesNode): void;
    protected abstract visitSelectModifier(node: SelectModifierNode): void;
    protected abstract visitCreateType(node: CreateTypeNode): void;
    protected abstract visitDropType(node: DropTypeNode): void;
    protected abstract visitExplain(node: ExplainNode): void;
    protected abstract visitDefaultInsertValue(node: DefaultInsertValueNode): void;
    protected abstract visitAggregateFunction(node: AggregateFunctionNode): void;
    protected abstract visitOver(node: OverNode): void;
    protected abstract visitPartitionBy(node: PartitionByNode): void;
    protected abstract visitPartitionByItem(node: PartitionByItemNode): void;
    protected abstract visitSetOperation(node: SetOperationNode): void;
    protected abstract visitBinaryOperation(node: BinaryOperationNode): void;
    protected abstract visitUnaryOperation(node: UnaryOperationNode): void;
    protected abstract visitUsing(node: UsingNode): void;
    protected abstract visitFunction(node: FunctionNode): void;
    protected abstract visitCase(node: CaseNode): void;
    protected abstract visitWhen(node: WhenNode): void;
    protected abstract visitJSONReference(node: JSONReferenceNode): void;
    protected abstract visitJSONPath(node: JSONPathNode): void;
    protected abstract visitJSONPathLeg(node: JSONPathLegNode): void;
    protected abstract visitJSONOperatorChain(node: JSONOperatorChainNode): void;
    protected abstract visitTuple(node: TupleNode): void;
    protected abstract visitMergeQuery(node: MergeQueryNode): void;
    protected abstract visitMatched(node: MatchedNode): void;
    protected abstract visitAddIndex(node: AddIndexNode): void;
    protected abstract visitCast(node: CastNode): void;
    protected abstract visitFetch(node: FetchNode): void;
    protected abstract visitTop(node: TopNode): void;
    protected abstract visitOutput(node: OutputNode): void;
}

declare class DefaultQueryCompiler extends OperationNodeVisitor implements QueryCompiler {
    #private;
    protected get numParameters(): number;
    compileQuery(node: RootOperationNode): CompiledQuery;
    protected getSql(): string;
    protected visitSelectQuery(node: SelectQueryNode): void;
    protected visitFrom(node: FromNode): void;
    protected visitSelection(node: SelectionNode): void;
    protected visitColumn(node: ColumnNode): void;
    protected compileDistinctOn(expressions: ReadonlyArray<OperationNode>): void;
    protected compileList(nodes: ReadonlyArray<OperationNode>, separator?: string): void;
    protected visitWhere(node: WhereNode): void;
    protected visitHaving(node: HavingNode): void;
    protected visitInsertQuery(node: InsertQueryNode): void;
    protected visitValues(node: ValuesNode): void;
    protected visitDeleteQuery(node: DeleteQueryNode): void;
    protected visitReturning(node: ReturningNode): void;
    protected visitAlias(node: AliasNode): void;
    protected visitReference(node: ReferenceNode): void;
    protected visitSelectAll(_: SelectAllNode): void;
    protected visitIdentifier(node: IdentifierNode): void;
    protected compileUnwrappedIdentifier(node: IdentifierNode): void;
    protected visitAnd(node: AndNode): void;
    protected visitOr(node: OrNode): void;
    protected visitValue(node: ValueNode): void;
    protected visitValueList(node: ValueListNode): void;
    protected visitTuple(node: TupleNode): void;
    protected visitPrimitiveValueList(node: PrimitiveValueListNode): void;
    protected visitParens(node: ParensNode): void;
    protected visitJoin(node: JoinNode): void;
    protected visitOn(node: OnNode): void;
    protected visitRaw(node: RawNode): void;
    protected visitOperator(node: OperatorNode): void;
    protected visitTable(node: TableNode): void;
    protected visitSchemableIdentifier(node: SchemableIdentifierNode): void;
    protected visitCreateTable(node: CreateTableNode): void;
    protected visitColumnDefinition(node: ColumnDefinitionNode): void;
    protected getAutoIncrement(): string;
    protected visitReferences(node: ReferencesNode): void;
    protected visitDropTable(node: DropTableNode): void;
    protected visitDataType(node: DataTypeNode): void;
    protected visitOrderBy(node: OrderByNode): void;
    protected visitOrderByItem(node: OrderByItemNode): void;
    protected visitGroupBy(node: GroupByNode): void;
    protected visitGroupByItem(node: GroupByItemNode): void;
    protected visitUpdateQuery(node: UpdateQueryNode): void;
    protected visitColumnUpdate(node: ColumnUpdateNode): void;
    protected visitLimit(node: LimitNode): void;
    protected visitOffset(node: OffsetNode): void;
    protected visitOnConflict(node: OnConflictNode): void;
    protected visitOnDuplicateKey(node: OnDuplicateKeyNode): void;
    protected visitCreateIndex(node: CreateIndexNode): void;
    protected visitDropIndex(node: DropIndexNode): void;
    protected visitCreateSchema(node: CreateSchemaNode): void;
    protected visitDropSchema(node: DropSchemaNode): void;
    protected visitPrimaryKeyConstraint(node: PrimaryKeyConstraintNode): void;
    protected visitUniqueConstraint(node: UniqueConstraintNode): void;
    protected visitCheckConstraint(node: CheckConstraintNode): void;
    protected visitForeignKeyConstraint(node: ForeignKeyConstraintNode): void;
    protected visitList(node: ListNode): void;
    protected visitWith(node: WithNode): void;
    protected visitCommonTableExpression(node: CommonTableExpressionNode): void;
    protected visitCommonTableExpressionName(node: CommonTableExpressionNameNode): void;
    protected visitAlterTable(node: AlterTableNode): void;
    protected visitAddColumn(node: AddColumnNode): void;
    protected visitRenameColumn(node: RenameColumnNode): void;
    protected visitDropColumn(node: DropColumnNode): void;
    protected visitAlterColumn(node: AlterColumnNode): void;
    protected visitModifyColumn(node: ModifyColumnNode): void;
    protected visitAddConstraint(node: AddConstraintNode): void;
    protected visitDropConstraint(node: DropConstraintNode): void;
    protected visitSetOperation(node: SetOperationNode): void;
    protected visitCreateView(node: CreateViewNode): void;
    protected visitDropView(node: DropViewNode): void;
    protected visitGenerated(node: GeneratedNode): void;
    protected visitDefaultValue(node: DefaultValueNode): void;
    protected visitSelectModifier(node: SelectModifierNode): void;
    protected visitCreateType(node: CreateTypeNode): void;
    protected visitDropType(node: DropTypeNode): void;
    protected visitExplain(node: ExplainNode): void;
    protected visitDefaultInsertValue(_: DefaultInsertValueNode): void;
    protected visitAggregateFunction(node: AggregateFunctionNode): void;
    protected visitOver(node: OverNode): void;
    protected visitPartitionBy(node: PartitionByNode): void;
    protected visitPartitionByItem(node: PartitionByItemNode): void;
    protected visitBinaryOperation(node: BinaryOperationNode): void;
    protected visitUnaryOperation(node: UnaryOperationNode): void;
    protected isMinusOperator(node: OperationNode): node is OperatorNode;
    protected visitUsing(node: UsingNode): void;
    protected visitFunction(node: FunctionNode): void;
    protected visitCase(node: CaseNode): void;
    protected visitWhen(node: WhenNode): void;
    protected visitJSONReference(node: JSONReferenceNode): void;
    protected visitJSONPath(node: JSONPathNode): void;
    protected visitJSONPathLeg(node: JSONPathLegNode): void;
    protected visitJSONOperatorChain(node: JSONOperatorChainNode): void;
    protected visitMergeQuery(node: MergeQueryNode): void;
    protected visitMatched(node: MatchedNode): void;
    protected visitAddIndex(node: AddIndexNode): void;
    protected visitCast(node: CastNode): void;
    protected visitFetch(node: FetchNode): void;
    protected visitOutput(node: OutputNode): void;
    protected visitTop(node: TopNode): void;
    protected append(str: string): void;
    protected appendValue(parameter: unknown): void;
    protected getLeftIdentifierWrapper(): string;
    protected getRightIdentifierWrapper(): string;
    protected getCurrentParameterPlaceholder(): string;
    protected getLeftExplainOptionsWrapper(): string;
    protected getExplainOptionAssignment(): string;
    protected getExplainOptionsDelimiter(): string;
    protected getRightExplainOptionsWrapper(): string;
    protected sanitizeIdentifier(identifier: string): string;
    protected addParameter(parameter: unknown): void;
    protected appendImmediateValue(value: unknown): void;
    protected sortSelectModifiers(arr: SelectModifierNode[]): ReadonlyArray<SelectModifierNode>;
    protected compileColumnAlterations(columnAlterations: readonly AlterTableColumnAlterationNode[]): void;
    /**
     * controls whether the dialect adds a "type" keyword before a column's new data
     * type in an ALTER TABLE statement.
     */
    protected announcesNewColumnDataType(): boolean;
}

declare class DefaultConnectionProvider implements ConnectionProvider {
    #private;
    constructor(driver: Driver);
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
}

declare class SingleConnectionProvider implements ConnectionProvider {
    #private;
    constructor(connection: DatabaseConnection);
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
}

/**
 * A driver that does absolutely nothing.
 *
 * You can use this to create Kysely instances solely for building queries
 *
 * ### Examples
 *
 * This example creates a Kysely instance for building postgres queries:
 *
 * ```ts
 * const db = new Kysely<Database>({
 *   dialect: {
 *     createAdapter() {
 *       return new PostgresAdapter()
 *     },
 *     createDriver() {
 *       return new DummyDriver()
 *     },
 *     createIntrospector(db: Kysely<any>) {
 *       return new PostgresIntrospector(db)
 *     },
 *     createQueryCompiler() {
 *       return new PostgresQueryCompiler()
 *     },
 *   },
 * })
 * ```
 *
 * You can use it to build a query and compile it to SQL but trying to
 * execute the query will throw an error.
 *
 * ```ts
 * const { sql } = db.selectFrom('person').selectAll().compile()
 * console.log(sql) // select * from "person"
 * ```
 */
declare class DummyDriver implements Driver {
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}

/**
 * A basic implementation of `DialectAdapter` with sensible default values.
 * 3rd party dialects can extend this instead of implementing the `DialectAdapter`
 * interface from scratch. That way all new settings will get default values when
 * they are added and there will be less breaking changes.
 */
declare abstract class DialectAdapterBase implements DialectAdapter {
    /**
     * Whether or not this dialect supports `if not exists` in creation of tables/schemas/views/etc.
     *
     * If this is false, Kysely's internal migrations tables and schemas are created
     * without `if not exists` in migrations. This is not a problem if the dialect
     * supports transactional DDL.
     */
    get supportsCreateIfNotExists(): boolean;
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    get supportsOutput(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MigrationLockOptions.lockTable}
     * created by Kysely can be used instead. You can access it through the `options` object.
     * The lock table has two columns `id` and `is_locked` and there's only one row in the table
     * whose id is {@link MigrationLockOptions.lockRowId}. `is_locked` is an integer. Kysely
     * takes care of creating the lock table and inserting the one single row to it before this
     * method is executed. If the dialect supports schemas and the user has specified a custom
     * schema in their migration settings, the options object also contains the schema name in
     * {@link MigrationLockOptions.lockTableSchema}.
     *
     * Here's an example of how you might implement this method for a dialect that doesn't
     * have explicit locks but supports `FOR UPDATE` row locks and transactional DDL:
     *
     * ```ts
     * {
     *   async acquireMigrationLock(db, options): Promise<void> {
     *     const queryDb = options.lockTableSchema
     *       ? db.withSchema(options.lockTableSchema)
     *       : db
     *
     *     // Since our imaginary dialect supports transactional DDL and has
     *     // row locks, we can simply take a row lock here and it will guarantee
     *     // all subsequent calls to this method from other transactions will
     *     // wait until this transaction finishes.
     *     await queryDb
     *       .selectFrom(options.lockTable)
     *       .selectAll()
     *       .where('id', '=', options.lockRowId)
     *       .forUpdate()
     *       .execute()
     *   }
     * }
     * ```
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    abstract acquireMigrationLock(db: Kysely<any>, options: MigrationLockOptions): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    abstract releaseMigrationLock(db: Kysely<any>, options: MigrationLockOptions): Promise<void>;
}

/**
 * Config for the SQLite dialect.
 */
interface SqliteDialectConfig {
    /**
     * An sqlite Database instance or a function that returns one.
     *
     * If a function is provided, it's called once when the first query is executed.
     *
     * https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#new-databasepath-options
     */
    database: SqliteDatabase | (() => Promise<SqliteDatabase>);
    /**
     * Called once when the first query is executed.
     *
     * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
     */
    onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}
/**
 * This interface is the subset of better-sqlite3 driver's `Database` class that
 * kysely needs.
 *
 * We don't use the type from `better-sqlite3` here to not have a dependency to it.
 *
 * https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#new-databasepath-options
 */
interface SqliteDatabase {
    close(): void;
    prepare(sql: string): SqliteStatement;
}
interface SqliteStatement {
    readonly reader: boolean;
    all(parameters: ReadonlyArray<unknown>): unknown[];
    run(parameters: ReadonlyArray<unknown>): {
        changes: number | bigint;
        lastInsertRowid: number | bigint;
    };
    iterate(parameters: ReadonlyArray<unknown>): IterableIterator<unknown>;
}

/**
 * SQLite dialect that uses the [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) library.
 *
 * The constructor takes an instance of {@link SqliteDialectConfig}.
 *
 * ```ts
 * import Database from 'better-sqlite3'
 *
 * new SqliteDialect({
 *   database: new Database('db.sqlite')
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `database`
 * can be a function:
 *
 * ```ts
 * import Database from 'better-sqlite3'
 *
 * new SqliteDialect({
 *   database: async () => new Database('db.sqlite')
 * })
 * ```
 */
declare class SqliteDialect implements Dialect {
    #private;
    constructor(config: SqliteDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare class SqliteDriver implements Driver {
    #private;
    constructor(config: SqliteDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}

declare class PostgresQueryCompiler extends DefaultQueryCompiler {
    protected sanitizeIdentifier(identifier: string): string;
}

declare class PostgresIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get tables and views metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class PostgresAdapter extends DialectAdapterBase {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MigrationLockOptions.lockTable}
     * created by Kysely can be used instead. You can access it through the `options` object.
     * The lock table has two columns `id` and `is_locked` and there's only one row in the table
     * whose id is {@link MigrationLockOptions.lockRowId}. `is_locked` is an integer. Kysely
     * takes care of creating the lock table and inserting the one single row to it before this
     * method is executed. If the dialect supports schemas and the user has specified a custom
     * schema in their migration settings, the options object also contains the schema name in
     * {@link MigrationLockOptions.lockTableSchema}.
     *
     * Here's an example of how you might implement this method for a dialect that doesn't
     * have explicit locks but supports `FOR UPDATE` row locks and transactional DDL:
     *
     * ```ts
     * {
     *   async acquireMigrationLock(db, options): Promise<void> {
     *     const queryDb = options.lockTableSchema
     *       ? db.withSchema(options.lockTableSchema)
     *       : db
     *
     *     // Since our imaginary dialect supports transactional DDL and has
     *     // row locks, we can simply take a row lock here and it will guarantee
     *     // all subsequent calls to this method from other transactions will
     *     // wait until this transaction finishes.
     *     await queryDb
     *       .selectFrom(options.lockTable)
     *       .selectAll()
     *       .where('id', '=', options.lockRowId)
     *       .forUpdate()
     *       .execute()
     *   }
     * }
     * ```
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>, _opt: MigrationLockOptions): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(_db: Kysely<any>, _opt: MigrationLockOptions): Promise<void>;
}

/**
 * Config for the MySQL dialect.
 *
 * https://github.com/sidorares/node-mysql2#using-connection-pools
 */
interface MysqlDialectConfig {
    /**
     * A mysql2 Pool instance or a function that returns one.
     *
     * If a function is provided, it's called once when the first query is executed.
     *
     * https://github.com/sidorares/node-mysql2#using-connection-pools
     */
    pool: MysqlPool | (() => Promise<MysqlPool>);
    /**
     * Called once for each created connection.
     */
    onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}
/**
 * This interface is the subset of mysql2 driver's `Pool` class that
 * kysely needs.
 *
 * We don't use the type from `mysql2` here to not have a dependency to it.
 *
 * https://github.com/sidorares/node-mysql2#using-connection-pools
 */
interface MysqlPool {
    getConnection(callback: (error: unknown, connection: MysqlPoolConnection) => void): void;
    end(callback: (error: unknown) => void): void;
}
interface MysqlPoolConnection {
    query(sql: string, parameters: ReadonlyArray<unknown>): {
        stream: <T>(options: MysqlStreamOptions) => MysqlStream<T>;
    };
    query(sql: string, parameters: ReadonlyArray<unknown>, callback: (error: unknown, result: MysqlQueryResult) => void): void;
    release(): void;
}
interface MysqlStreamOptions {
    highWaterMark?: number;
    objectMode?: boolean;
}
interface MysqlStream<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}
interface MysqlOkPacket {
    affectedRows: number;
    changedRows: number;
    insertId: number;
}
type MysqlQueryResult = MysqlOkPacket | Record<string, unknown>[];

/**
 * MySQL dialect that uses the [mysql2](https://github.com/sidorares/node-mysql2#readme) library.
 *
 * The constructor takes an instance of {@link MysqlDialectConfig}.
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: async () => createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
declare class MysqlDialect implements Dialect {
    #private;
    constructor(config: MysqlDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare const PRIVATE_RELEASE_METHOD$2: unique symbol;
declare class MysqlDriver implements Driver {
    #private;
    constructor(configOrPool: MysqlDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: MysqlConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
declare class MysqlConnection implements DatabaseConnection {
    #private;
    constructor(rawConnection: MysqlPoolConnection);
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    streamQuery<O>(compiledQuery: CompiledQuery, _chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
    [PRIVATE_RELEASE_METHOD$2](): void;
}

declare class MysqlQueryCompiler extends DefaultQueryCompiler {
    protected getCurrentParameterPlaceholder(): string;
    protected getLeftExplainOptionsWrapper(): string;
    protected getExplainOptionAssignment(): string;
    protected getExplainOptionsDelimiter(): string;
    protected getRightExplainOptionsWrapper(): string;
    protected getLeftIdentifierWrapper(): string;
    protected getRightIdentifierWrapper(): string;
    protected sanitizeIdentifier(identifier: string): string;
    protected visitCreateIndex(node: CreateIndexNode): void;
}

declare class MysqlIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get tables and views metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class MysqlAdapter extends DialectAdapterBase {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MigrationLockOptions.lockTable}
     * created by Kysely can be used instead. You can access it through the `options` object.
     * The lock table has two columns `id` and `is_locked` and there's only one row in the table
     * whose id is {@link MigrationLockOptions.lockRowId}. `is_locked` is an integer. Kysely
     * takes care of creating the lock table and inserting the one single row to it before this
     * method is executed. If the dialect supports schemas and the user has specified a custom
     * schema in their migration settings, the options object also contains the schema name in
     * {@link MigrationLockOptions.lockTableSchema}.
     *
     * Here's an example of how you might implement this method for a dialect that doesn't
     * have explicit locks but supports `FOR UPDATE` row locks and transactional DDL:
     *
     * ```ts
     * {
     *   async acquireMigrationLock(db, options): Promise<void> {
     *     const queryDb = options.lockTableSchema
     *       ? db.withSchema(options.lockTableSchema)
     *       : db
     *
     *     // Since our imaginary dialect supports transactional DDL and has
     *     // row locks, we can simply take a row lock here and it will guarantee
     *     // all subsequent calls to this method from other transactions will
     *     // wait until this transaction finishes.
     *     await queryDb
     *       .selectFrom(options.lockTable)
     *       .selectAll()
     *       .where('id', '=', options.lockRowId)
     *       .forUpdate()
     *       .execute()
     *   }
     * }
     * ```
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>, _opt: MigrationLockOptions): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(db: Kysely<any>, _opt: MigrationLockOptions): Promise<void>;
}

/**
 * Config for the PostgreSQL dialect.
 */
interface PostgresDialectConfig {
    /**
     * A postgres Pool instance or a function that returns one.
     *
     * If a function is provided, it's called once when the first query is executed.
     *
     * https://node-postgres.com/apis/pool
     */
    pool: PostgresPool | (() => Promise<PostgresPool>);
    /**
     * https://github.com/brianc/node-postgres/tree/master/packages/pg-cursor
     * ```ts
     * import Cursor from 'pg-cursor'
     * // or
     * import * as Cursor from 'pg-cursor'
     *
     * new PostgresDialect({
     *  cursor: Cursor
     * })
     * ```
     */
    cursor?: PostgresCursorConstructor;
    /**
     * Called once for each created connection.
     */
    onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}
/**
 * This interface is the subset of pg driver's `Pool` class that
 * kysely needs.
 *
 * We don't use the type from `pg` here to not have a dependency to it.
 *
 * https://node-postgres.com/apis/pool
 */
interface PostgresPool {
    connect(): Promise<PostgresPoolClient>;
    end(): Promise<void>;
}
interface PostgresPoolClient {
    query<R>(sql: string, parameters: ReadonlyArray<unknown>): Promise<PostgresQueryResult<R>>;
    query<R>(cursor: PostgresCursor<R>): PostgresCursor<R>;
    release(): void;
}
interface PostgresCursor<T> {
    read(rowsCount: number): Promise<T[]>;
    close(): Promise<void>;
}
type PostgresCursorConstructor = new <T>(sql: string, parameters: unknown[]) => PostgresCursor<T>;
interface PostgresQueryResult<R> {
    command: 'UPDATE' | 'DELETE' | 'INSERT' | 'SELECT' | 'MERGE';
    rowCount: number;
    rows: R[];
}
interface PostgresStream<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

declare const PRIVATE_RELEASE_METHOD$1: unique symbol;
declare class PostgresDriver implements Driver {
    #private;
    constructor(config: PostgresDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: PostgresConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
interface PostgresConnectionOptions {
    cursor: PostgresCursorConstructor | null;
}
declare class PostgresConnection implements DatabaseConnection {
    #private;
    constructor(client: PostgresPoolClient, options: PostgresConnectionOptions);
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    streamQuery<O>(compiledQuery: CompiledQuery, chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
    [PRIVATE_RELEASE_METHOD$1](): void;
}

/**
 * PostgreSQL dialect that uses the [pg](https://node-postgres.com/) library.
 *
 * The constructor takes an instance of {@link PostgresDialectConfig}.
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: async () => new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
declare class PostgresDialect implements Dialect {
    #private;
    constructor(config: PostgresDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare class SqliteQueryCompiler extends DefaultQueryCompiler {
    protected getCurrentParameterPlaceholder(): string;
    protected getLeftExplainOptionsWrapper(): string;
    protected getRightExplainOptionsWrapper(): string;
    protected getLeftIdentifierWrapper(): string;
    protected getRightIdentifierWrapper(): string;
    protected getAutoIncrement(): string;
    protected sanitizeIdentifier(identifier: string): string;
    protected visitDefaultInsertValue(_: DefaultInsertValueNode): void;
}

declare class SqliteIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get tables and views metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class SqliteAdapter extends DialectAdapterBase {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MigrationLockOptions.lockTable}
     * created by Kysely can be used instead. You can access it through the `options` object.
     * The lock table has two columns `id` and `is_locked` and there's only one row in the table
     * whose id is {@link MigrationLockOptions.lockRowId}. `is_locked` is an integer. Kysely
     * takes care of creating the lock table and inserting the one single row to it before this
     * method is executed. If the dialect supports schemas and the user has specified a custom
     * schema in their migration settings, the options object also contains the schema name in
     * {@link MigrationLockOptions.lockTableSchema}.
     *
     * Here's an example of how you might implement this method for a dialect that doesn't
     * have explicit locks but supports `FOR UPDATE` row locks and transactional DDL:
     *
     * ```ts
     * {
     *   async acquireMigrationLock(db, options): Promise<void> {
     *     const queryDb = options.lockTableSchema
     *       ? db.withSchema(options.lockTableSchema)
     *       : db
     *
     *     // Since our imaginary dialect supports transactional DDL and has
     *     // row locks, we can simply take a row lock here and it will guarantee
     *     // all subsequent calls to this method from other transactions will
     *     // wait until this transaction finishes.
     *     await queryDb
     *       .selectFrom(options.lockTable)
     *       .selectAll()
     *       .where('id', '=', options.lockRowId)
     *       .forUpdate()
     *       .execute()
     *   }
     * }
     * ```
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(_db: Kysely<any>, _opt: MigrationLockOptions): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(_db: Kysely<any>, _opt: MigrationLockOptions): Promise<void>;
}

declare class MssqlAdapter extends DialectAdapterBase {
    /**
     * Whether or not this dialect supports `if not exists` in creation of tables/schemas/views/etc.
     *
     * If this is false, Kysely's internal migrations tables and schemas are created
     * without `if not exists` in migrations. This is not a problem if the dialect
     * supports transactional DDL.
     */
    get supportsCreateIfNotExists(): boolean;
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    get supportsOutput(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MigrationLockOptions.lockTable}
     * created by Kysely can be used instead. You can access it through the `options` object.
     * The lock table has two columns `id` and `is_locked` and there's only one row in the table
     * whose id is {@link MigrationLockOptions.lockRowId}. `is_locked` is an integer. Kysely
     * takes care of creating the lock table and inserting the one single row to it before this
     * method is executed. If the dialect supports schemas and the user has specified a custom
     * schema in their migration settings, the options object also contains the schema name in
     * {@link MigrationLockOptions.lockTableSchema}.
     *
     * Here's an example of how you might implement this method for a dialect that doesn't
     * have explicit locks but supports `FOR UPDATE` row locks and transactional DDL:
     *
     * ```ts
     * {
     *   async acquireMigrationLock(db, options): Promise<void> {
     *     const queryDb = options.lockTableSchema
     *       ? db.withSchema(options.lockTableSchema)
     *       : db
     *
     *     // Since our imaginary dialect supports transactional DDL and has
     *     // row locks, we can simply take a row lock here and it will guarantee
     *     // all subsequent calls to this method from other transactions will
     *     // wait until this transaction finishes.
     *     await queryDb
     *       .selectFrom(options.lockTable)
     *       .selectAll()
     *       .where('id', '=', options.lockRowId)
     *       .forUpdate()
     *       .execute()
     *   }
     * }
     * ```
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(): Promise<void>;
}

interface MssqlDialectConfig {
    /**
     * This dialect uses the `tarn` package to manage the connection pool to your
     * database. To use it as a peer dependency and not bundle it with Kysely's code,
     * you need to pass the `tarn` package itself. You also need to pass some pool options
     * (excluding `create`, `destroy` and `validate` functions which are controlled by this dialect),
     * `min` & `max` connections at the very least.
     *
     * Example:
     *
     * ```ts
     * import * as Tarn from 'tarn'
     *
     * const dialect = new MssqlDialect({
     *   // ...
     *   tarn: {
     *     ...Tarn,
     *     options: {
     *       // ...
     *       min: 0,
     *       max: 10,
     *     },
     *   },
     * })
     * ```
     */
    tarn: Tarn;
    /**
     * This dialect uses the `tedious` package to communicate with your MS SQL Server
     * database. To use it as a peer dependency and not bundle it with Kysely's code,
     * you need to pass the `tedious` package itself. You also need to pass a factory
     * function that creates new `tedious` `Connection` instances on demand.
     *
     * Example:
     *
     * ```ts
     * import * as Tedious from 'tedious'
     *
     * const dialect = new MssqlDialect({
     *   // ...
     *   tedious: {
     *     ...Tedious,
     *     connectionFactory: () => new Tedious.Connection({ ... }),
     *   },
     * })
     * ```
     */
    tedious: Tedious;
}
interface Tedious {
    connectionFactory: () => TediousConnection | Promise<TediousConnection>;
    ISOLATION_LEVEL: TediousIsolationLevel;
    Request: typeof TediousRequest;
    TYPES: TediousTypes;
}
type TediousIsolationLevel = Record<'NO_CHANGE' | 'READ_UNCOMMITTED' | 'READ_COMMITTED' | 'REPEATABLE_READ' | 'SERIALIZABLE' | 'SNAPSHOT', number>;
type TediousTypes = Record<'BigInt' | 'Binary' | 'Bit' | 'Char' | 'Date' | 'DateTime' | 'DateTime2' | 'DateTimeOffset' | 'Decimal' | 'Float' | 'Image' | 'Int' | 'Money' | 'NChar' | 'NText' | 'Null' | 'Numeric' | 'NVarChar' | 'Real' | 'SmallDateTime' | 'SmallInt' | 'SmallMoney' | 'Text' | 'Time' | 'TinyInt' | 'TVP' | 'UDT' | 'UniqueIdentifier' | 'VarBinary' | 'VarChar' | 'Xml', {
    name: string;
    type: string;
}>;
interface TediousType {
    name: string;
    type: string;
}
interface TediousConnection {
    beginTransaction(callback: (error?: Error) => void, transactionId?: string | undefined, isolationLevel?: number | undefined): void;
    cancel(): void;
    close(): void;
    commitTransaction(callback: (error?: Error) => void): void;
    connect(callback: (error?: Error) => void): void;
    execSql(request: TediousRequest): void;
    reset(callback: (error?: Error) => void): void;
    rollbackTransaction(callback: (error?: Error) => void): void;
    once(event: 'end', listener: () => void): void;
}
declare class TediousRequest {
    constructor(sql: string, callback: (error: Error, rowCount: number, rows: any[]) => void);
    addParameter(name: string, type: TediousType, value: any, options?: {
        length?: number | 'max' | undefined;
        precision?: number | undefined;
        scale?: number | undefined;
    }): void;
    off(event: 'row', listener: (...args: any[]) => void): void;
    on(event: 'row', listener: (columns: TediousColumnValue[]) => void): void;
    once(event: 'requestCompleted', listener: (...args: any[]) => void): void;
}
interface TediousColumnValue {
    metadata: {
        colName: string;
    };
    value: any;
}
interface Tarn {
    /**
     * Tarn.js' pool options, excluding `create`, `destroy` and `validate` functions,
     * which must be implemented by this dialect.
     */
    options: Omit<TarnPoolOptions<any>, 'create' | 'destroy' | 'validate'>;
    /**
     * Tarn.js' Pool class.
     *
     * Example:
     *
     * ```ts
     * import { Pool } from 'tarn'
     *
     * const dialect = new MssqlDialect({
     *   // ...
     *   tarn: {
     *     // ...
     *     Pool,
     *   },
     * })
     * ```
     */
    Pool: typeof TarnPool;
}
declare class TarnPool<R> {
    constructor(opt: TarnPoolOptions<R>);
    acquire(): TarnPendingRequest<R>;
    destroy(): any;
    release(resource: R): void;
}
interface TarnPoolOptions<R> {
    acquireTimeoutMillis?: number;
    create(cb: (err: Error | null, resource: R) => void): any | (() => Promise<R>);
    createRetryIntervalMillis?: number;
    createTimeoutMillis?: number;
    destroy(resource: R): any;
    destroyTimeoutMillis?: number;
    idleTimeoutMillis?: number;
    log?(msg: string): any;
    max: number;
    min: number;
    propagateCreateError?: boolean;
    reapIntervalMillis?: number;
    validate(resource: R): boolean;
}
interface TarnPendingRequest<R> {
    promise: Promise<R>;
    resolve: (resource: R) => void;
    reject: (err: Error) => void;
}

/**
 * MS SQL Server dialect that uses the [tedious](https://tediousjs.github.io/tedious)
 * library.
 *
 * The constructor takes an instance of {@link MssqlDialectConfig}.
 *
 * ```ts
 * import * as Tedious from 'tedious'
 * import * as Tarn from 'tarn'
 *
 * const dialect = new MssqlDialect({
 *   tarn: {
 *     ...Tarn,
 *     options: {
 *       min: 0,
 *       max: 10,
 *     },
 *   },
 *   tedious: {
 *     ...Tedious,
 *     connectionFactory: () => new Tedious.Connection({
 *       authentication: {
 *         options: {
 *           password: 'password',
 *           userName: 'username',
 *         },
 *         type: 'default',
 *       },
 *       options: {
 *         database: 'some_db',
 *         port: 1433,
 *         trustServerCertificate: true,
 *       },
 *       server: 'localhost',
 *     }),
 *   },
 * })
 * ```
 */
declare class MssqlDialect implements Dialect {
    #private;
    constructor(config: MssqlDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare const PRIVATE_RELEASE_METHOD: unique symbol;
declare const PRIVATE_DESTROY_METHOD: unique symbol;
declare class MssqlDriver implements Driver {
    #private;
    constructor(config: MssqlDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: MssqlConnection, settings: TransactionSettings): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: MssqlConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: MssqlConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: MssqlConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
declare class MssqlConnection implements DatabaseConnection {
    #private;
    constructor(connection: TediousConnection, tedious: Tedious);
    beginTransaction(settings: TransactionSettings): Promise<void>;
    commitTransaction(): Promise<void>;
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    rollbackTransaction(): Promise<void>;
    streamQuery<O>(compiledQuery: CompiledQuery, chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
    validate(): Promise<boolean>;
    [PRIVATE_RELEASE_METHOD](): Promise<void>;
    [PRIVATE_DESTROY_METHOD](): Promise<void>;
}

declare class MssqlIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get tables and views metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class MssqlQueryCompiler extends DefaultQueryCompiler {
    protected getCurrentParameterPlaceholder(): string;
    protected visitOffset(node: OffsetNode): void;
    protected compileColumnAlterations(columnAlterations: readonly AlterTableColumnAlterationNode[]): void;
    protected visitAddColumn(node: AddColumnNode): void;
    protected visitDropColumn(node: DropColumnNode): void;
    protected visitMergeQuery(node: MergeQueryNode): void;
    protected announcesNewColumnDataType(): boolean;
}

declare const DEFAULT_MIGRATION_TABLE = "kysely_migration";
declare const DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
declare const DEFAULT_ALLOW_UNORDERED_MIGRATIONS = false;
declare const MIGRATION_LOCK_ID = "migration_lock";
declare const NO_MIGRATIONS: NoMigrations;
interface Migration {
    up(db: Kysely<any>): Promise<void>;
    /**
     * An optional down method.
     *
     * If you don't provide a down method, the migration is skipped when
     * migrating down.
     */
    down?(db: Kysely<any>): Promise<void>;
}
/**
 * A class for running migrations.
 *
 * ### Example
 *
 * This example uses the {@link FileMigrationProvider} that reads migrations
 * files from a single folder. You can easily implement your own
 * {@link MigrationProvider} if you want to provide migrations some
 * other way.
 *
 * ```ts
 * import { promises as fs } from 'fs'
 * import path from 'path'
 *
 * const migrator = new Migrator({
 *   db,
 *   provider: new FileMigrationProvider({
 *     fs,
 *     path,
 *     // Path to the folder that contains all your migrations.
 *     migrationFolder: 'some/path/to/migrations'
 *   })
 * })
 * ```
 */
declare class Migrator {
    #private;
    constructor(props: MigratorProps);
    /**
     * Returns a {@link MigrationInfo} object for each migration.
     *
     * The returned array is sorted by migration name.
     */
    getMigrations(): Promise<ReadonlyArray<MigrationInfo>>;
    /**
     * Runs all migrations that have not yet been run.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed. See the examples below.
     *
     * This method goes through all possible migrations provided by the provider and runs the
     * ones whose names come alphabetically after the last migration that has been run. If the
     * list of executed migrations doesn't match the beginning of the list of possible migrations
     * an error is returned.
     *
     * ### Examples
     *
     * ```ts
     * const db = new Kysely<Database>({
     *   dialect: new PostgresDialect({
     *     host: 'localhost',
     *     database: 'kysely_test',
     *   }),
     * })
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider(
     *     // Path to the folder that contains all your migrations.
     *     'some/path/to/migrations'
     *   )
     * })
     *
     * const { error, results } = await migrator.migrateToLatest()
     *
     * results?.forEach((it) => {
     *   if (it.status === 'Success') {
     *     console.log(`migration "${it.migrationName}" was executed successfully`)
     *   } else if (it.status === 'Error') {
     *     console.error(`failed to execute migration "${it.migrationName}"`)
     *   }
     * })
     *
     * if (error) {
     *   console.error('failed to run `migrateToLatest`')
     *   console.error(error)
     * }
     * ```
     */
    migrateToLatest(): Promise<MigrationResultSet>;
    /**
     * Migrate up/down to a specific migration.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * await migrator.migrateTo('some_migration')
     * ```
     *
     * If you specify the name of the first migration, this method migrates
     * down to the first migration, but doesn't run the `down` method of
     * the first migration. In case you want to migrate all the way down,
     * you can use a special constant `NO_MIGRATIONS`:
     *
     * ```ts
     * await migrator.migrateTo(NO_MIGRATIONS)
     * ```
     */
    migrateTo(targetMigrationName: string | NoMigrations): Promise<MigrationResultSet>;
    /**
     * Migrate one step up.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * await migrator.migrateUp()
     * ```
     */
    migrateUp(): Promise<MigrationResultSet>;
    /**
     * Migrate one step down.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * await migrator.migrateDown()
     * ```
     */
    migrateDown(): Promise<MigrationResultSet>;
}
interface MigratorProps {
    readonly db: Kysely<any>;
    readonly provider: MigrationProvider;
    /**
     * The name of the internal migration table. Defaults to `kysely_migration`.
     *
     * If you do specify this, you need to ALWAYS use the same value. Kysely doesn't
     * support changing the table on the fly. If you run the migrator even once with a
     * table name X and then change the table name to Y, kysely will create a new empty
     * migration table and attempt to run the migrations again, which will obviously
     * fail.
     *
     * If you do specify this, ALWAYS ALWAYS use the same value from the beginning of
     * the project, to the end of time or prepare to manually migrate the migration
     * tables.
     */
    readonly migrationTableName?: string;
    /**
     * The name of the internal migration lock table. Defaults to `kysely_migration_lock`.
     *
     * If you do specify this, you need to ALWAYS use the same value. Kysely doesn't
     * support changing the table on the fly. If you run the migrator even once with a
     * table name X and then change the table name to Y, kysely will create a new empty
     * lock table.
     *
     * If you do specify this, ALWAYS ALWAYS use the same value from the beginning of
     * the project, to the end of time or prepare to manually migrate the migration
     * tables.
     */
    readonly migrationLockTableName?: string;
    /**
     * The schema of the internal migration tables. Defaults to the default schema
     * on dialects that support schemas.
     *
     * If you do specify this, you need to ALWAYS use the same value. Kysely doesn't
     * support changing the schema on the fly. If you run the migrator even once with a
     * schema name X and then change the schema name to Y, kysely will create a new empty
     * migration tables in the new schema and attempt to run the migrations again, which
     * will obviously fail.
     *
     * If you do specify this, ALWAYS ALWAYS use the same value from the beginning of
     * the project, to the end of time or prepare to manually migrate the migration
     * tables.
     *
     * This only works on postgres.
     */
    readonly migrationTableSchema?: string;
    /**
     * Enforces whether or not migrations must be run in alpha-numeric order.
     *
     * When false, migrations must be run in their exact alpha-numeric order.
     * This is checked against the migrations already run in the database
     * (`migrationTableName'). This ensures your migrations are always run in
     * the same order and is the safest option.
     *
     * When true, migrations are still run in alpha-numeric order, but
     * the order is not checked against already-run migrations in the database.
     * Kysely will simply run all migrations that haven't run yet, in alpha-numeric
     * order.
     */
    readonly allowUnorderedMigrations?: boolean;
}
/**
 * All migration methods ({@link Migrator.migrateTo | migrateTo},
 * {@link Migrator.migrateToLatest | migrateToLatest} etc.) never
 * throw but return this object instead.
 */
interface MigrationResultSet {
    /**
     * This is defined if something went wrong.
     *
     * An error may have occurred in one of the migrations in which case the
     * {@link results} list contains an item with `status === 'Error'` to
     * indicate which migration failed.
     *
     * An error may also have occurred before Kysely was able to figure out
     * which migrations should be executed, in which case the {@link results}
     * list is undefined.
     */
    readonly error?: unknown;
    /**
     * {@link MigrationResult} for each individual migration that was supposed
     * to be executed by the operation.
     *
     * If all went well, each result's `status` is `Success`. If some migration
     * failed, the failed migration's result's `status` is `Error` and all
     * results after that one have `status` ´NotExecuted`.
     *
     * This property can be undefined if an error occurred before Kysely was
     * able to figure out which migrations should be executed.
     *
     * If this list is empty, there were no migrations to execute.
     */
    readonly results?: MigrationResult[];
}
type MigrationDirection = 'Up' | 'Down';
interface MigrationResult {
    readonly migrationName: string;
    /**
     * The direction in which this migration was executed.
     */
    readonly direction: MigrationDirection;
    /**
     * The execution status.
     *
     *  - `Success` means the migration was successfully executed. Note that
     *    if any of the later migrations in the {@link MigrationResult.results}
     *    list failed (have status `Error`) AND the dialect supports transactional
     *    DDL, even the successfull migrations were rolled back.
     *
     *  - `Error` means the migration failed. In this case the
     *    {@link MigrationResult.error} contains the error.
     *
     *  - `NotExecuted` means that the migration was supposed to be executed
     *    but wasn't because an earlier migration failed.
     */
    readonly status: 'Success' | 'Error' | 'NotExecuted';
}
interface MigrationProvider {
    /**
     * Returns all migrations, old and new.
     *
     * For example if you have your migrations in a folder as separate files,
     * you can implement this method to return all migration in that folder
     * as {@link Migration} objects.
     *
     * Kysely already has a built-in {@link FileMigrationProvider} for node.js
     * that does exactly that.
     *
     * The keys of the returned object are migration names and values are the
     * migrations. The order of the migrations is determined by the alphabetical
     * order of the migration names. The items in the object don't need to be
     * sorted, they are sorted by Kysely.
     */
    getMigrations(): Promise<Record<string, Migration>>;
}
/**
 * Type for the {@link NO_MIGRATIONS} constant. Never create one of these.
 */
interface NoMigrations {
    readonly __noMigrations__: true;
}
interface MigrationInfo {
    /**
     * Name of the migration.
     */
    name: string;
    /**
     * The actual migration.
     */
    migration: Migration;
    /**
     * When was the migration executed.
     *
     * If this is undefined, the migration hasn't been executed yet.
     */
    executedAt?: Date;
}

/**
 * Reads all migrations from a folder in node.js.
 *
 * ### Examples
 *
 * ```ts
 * import { promises as fs } from 'fs'
 * import path from 'path'
 *
 * new FileMigrationProvider({
 *   fs,
 *   path,
 *   migrationFolder: 'path/to/migrations/folder'
 * })
 * ```
 */
declare class FileMigrationProvider implements MigrationProvider {
    #private;
    constructor(props: FileMigrationProviderProps);
    /**
     * Returns all migrations, old and new.
     *
     * For example if you have your migrations in a folder as separate files,
     * you can implement this method to return all migration in that folder
     * as {@link Migration} objects.
     *
     * Kysely already has a built-in {@link FileMigrationProvider} for node.js
     * that does exactly that.
     *
     * The keys of the returned object are migration names and values are the
     * migrations. The order of the migrations is determined by the alphabetical
     * order of the migration names. The items in the object don't need to be
     * sorted, they are sorted by Kysely.
     */
    getMigrations(): Promise<Record<string, Migration>>;
}
interface FileMigrationProviderFS {
    readdir(path: string): Promise<string[]>;
}
interface FileMigrationProviderPath {
    join(...path: string[]): string;
}
interface FileMigrationProviderProps {
    fs: FileMigrationProviderFS;
    path: FileMigrationProviderPath;
    migrationFolder: string;
}

interface CamelCasePluginOptions {
    /**
     * If true, camelCase is transformed into upper case SNAKE_CASE.
     * For example `fooBar => FOO_BAR` and `FOO_BAR => fooBar`
     *
     * Defaults to false.
     */
    upperCase?: boolean;
    /**
     * If true, an underscore is added before each digit when converting
     * camelCase to snake_case. For example `foo12Bar => foo_12_bar` and
     * `foo_12_bar => foo12Bar`
     *
     * Defaults to false.
     */
    underscoreBeforeDigits?: boolean;
    /**
     * If true, an underscore is added between consecutive upper case
     * letters when converting from camelCase to snake_case. For example
     * `fooBAR => foo_b_a_r` and `foo_b_a_r => fooBAR`.
     *
     * Defaults to false.
     */
    underscoreBetweenUppercaseLetters?: boolean;
    /**
     * If true, nested object's keys will not be converted to camel case.
     *
     * Defaults to false.
     */
    maintainNestedObjectKeys?: boolean;
}
/**
 * A plugin that converts snake_case identifiers in the database into
 * camelCase in the javascript side.
 *
 * For example let's assume we have a table called `person_table`
 * with columns `first_name` and `last_name` in the database. When
 * using `CamelCasePlugin` we would setup Kysely like this:
 *
 * ```ts
 * interface Person {
 *   firstName: string
 *   lastName: string
 * }
 *
 * interface Database {
 *   personTable: Person
 * }
 *
 * const db = new Kysely<Database>({
 *   dialect: new PostgresDialect({
 *     database: 'kysely_test',
 *     host: 'localhost',
 *   }),
 *   plugins: [
 *     new CamelCasePlugin()
 *   ]
 * })
 *
 * const person = await db.selectFrom('personTable')
 *   .where('firstName', '=', 'Arnold')
 *   .select(['firstName', 'lastName'])
 *   .executeTakeFirst()
 *
 * // generated sql:
 * // select first_name, last_name from person_table where first_name = $1
 *
 * if (person) {
 *   console.log(person.firstName)
 * }
 * ```
 *
 * As you can see from the example, __everything__ needs to be defined
 * in camelCase in the typescript code: table names, columns, schemas,
 * __everything__. When using the `CamelCasePlugin` Kysely works as if
 * the database was defined in camelCase.
 *
 * There are various options you can give to the plugin to modify
 * the way identifiers are converted. See {@link CamelCasePluginOptions}.
 * If those options are not enough, you can override this plugin's
 * `snakeCase` and `camelCase` methods to make the conversion exactly
 * the way you like:
 *
 * ```ts
 * class MyCamelCasePlugin extends CamelCasePlugin {
 *   protected override snakeCase(str: string): string {
 *     return mySnakeCase(str)
 *   }
 *
 *   protected override camelCase(str: string): string {
 *     return myCamelCase(str)
 *   }
 * }
 * ```
 */
declare class CamelCasePlugin implements KyselyPlugin {
    #private;
    readonly opt: CamelCasePluginOptions;
    constructor(opt?: CamelCasePluginOptions);
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
    protected mapRow(row: UnknownRow): UnknownRow;
    protected snakeCase(str: string): string;
    protected camelCase(str: string): string;
}

/**
 * Plugin that removes duplicate joins from queries.
 *
 * See [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/deduplicate-joins.md)
 */
declare class DeduplicateJoinsPlugin implements KyselyPlugin {
    #private;
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
}

declare class WithSchemaPlugin implements KyselyPlugin {
    #private;
    constructor(schema: string);
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
}

interface ParseJSONResultsPluginOptions {
    /**
     * When `'in-place'`, arrays' and objects' values are parsed in-place. This is
     * the most time and space efficient option.
     *
     * This can result in runtime errors if some objects/arrays are readonly.
     *
     * When `'create'`, new arrays and objects are created to avoid such errors.
     *
     * Defaults to `'in-place'`.
     */
    objectStrategy?: ObjectStrategy;
}
type ObjectStrategy = 'in-place' | 'create';
/**
 * Parses JSON strings in query results into JSON objects.
 *
 * This plugin can be useful with dialects that don't automatically parse
 * JSON into objects and arrays but return JSON strings instead.
 *
 * ```ts
 * const db = new Kysely<DB>({
 *   ...
 *   plugins: [new ParseJSONResultsPlugin()]
 * })
 * ```
 */
declare class ParseJSONResultsPlugin implements KyselyPlugin {
    #private;
    readonly opt: ParseJSONResultsPluginOptions;
    constructor(opt?: ParseJSONResultsPluginOptions);
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
}

/**
 * Transforms an operation node tree into another one.
 *
 * Kysely queries are expressed internally as a tree of objects (operation nodes).
 * `OperationNodeTransformer` takes such a tree as its input and returns a
 * transformed deep copy of it. By default the `OperationNodeTransformer`
 * does nothing. You need to override one or more methods to make it do
 * something.
 *
 * There's a method for each node type. For example if you'd like to convert
 * each identifier (table name, column name, alias etc.) from camelCase to
 * snake_case, you'd do something like this:
 *
 * ```ts
 * class CamelCaseTransformer extends OperationNodeTransformer {
 *   transformIdentifier(node: IdentifierNode): IdentifierNode {
 *     node = super.transformIdentifier(node),
 *
 *     return {
 *       ...node,
 *       name: snakeCase(node.name),
 *     }
 *   }
 * }
 *
 * const transformer = new CamelCaseTransformer()
 * const tree = transformer.transformNode(tree)
 * ```
 */
declare class OperationNodeTransformer {
    #private;
    protected readonly nodeStack: OperationNode[];
    transformNode<T extends OperationNode | undefined>(node: T): T;
    protected transformNodeImpl<T extends OperationNode>(node: T): T;
    protected transformNodeList<T extends ReadonlyArray<OperationNode> | undefined>(list: T): T;
    protected transformSelectQuery(node: SelectQueryNode): SelectQueryNode;
    protected transformSelection(node: SelectionNode): SelectionNode;
    protected transformColumn(node: ColumnNode): ColumnNode;
    protected transformAlias(node: AliasNode): AliasNode;
    protected transformTable(node: TableNode): TableNode;
    protected transformFrom(node: FromNode): FromNode;
    protected transformReference(node: ReferenceNode): ReferenceNode;
    protected transformAnd(node: AndNode): AndNode;
    protected transformOr(node: OrNode): OrNode;
    protected transformValueList(node: ValueListNode): ValueListNode;
    protected transformParens(node: ParensNode): ParensNode;
    protected transformJoin(node: JoinNode): JoinNode;
    protected transformRaw(node: RawNode): RawNode;
    protected transformWhere(node: WhereNode): WhereNode;
    protected transformInsertQuery(node: InsertQueryNode): InsertQueryNode;
    protected transformValues(node: ValuesNode): ValuesNode;
    protected transformDeleteQuery(node: DeleteQueryNode): DeleteQueryNode;
    protected transformReturning(node: ReturningNode): ReturningNode;
    protected transformCreateTable(node: CreateTableNode): CreateTableNode;
    protected transformColumnDefinition(node: ColumnDefinitionNode): ColumnDefinitionNode;
    protected transformAddColumn(node: AddColumnNode): AddColumnNode;
    protected transformDropTable(node: DropTableNode): DropTableNode;
    protected transformOrderBy(node: OrderByNode): OrderByNode;
    protected transformOrderByItem(node: OrderByItemNode): OrderByItemNode;
    protected transformGroupBy(node: GroupByNode): GroupByNode;
    protected transformGroupByItem(node: GroupByItemNode): GroupByItemNode;
    protected transformUpdateQuery(node: UpdateQueryNode): UpdateQueryNode;
    protected transformColumnUpdate(node: ColumnUpdateNode): ColumnUpdateNode;
    protected transformLimit(node: LimitNode): LimitNode;
    protected transformOffset(node: OffsetNode): OffsetNode;
    protected transformOnConflict(node: OnConflictNode): OnConflictNode;
    protected transformOnDuplicateKey(node: OnDuplicateKeyNode): OnDuplicateKeyNode;
    protected transformCreateIndex(node: CreateIndexNode): CreateIndexNode;
    protected transformList(node: ListNode): ListNode;
    protected transformDropIndex(node: DropIndexNode): DropIndexNode;
    protected transformPrimaryKeyConstraint(node: PrimaryKeyConstraintNode): PrimaryKeyConstraintNode;
    protected transformUniqueConstraint(node: UniqueConstraintNode): UniqueConstraintNode;
    protected transformForeignKeyConstraint(node: ForeignKeyConstraintNode): ForeignKeyConstraintNode;
    protected transformSetOperation(node: SetOperationNode): SetOperationNode;
    protected transformReferences(node: ReferencesNode): ReferencesNode;
    protected transformCheckConstraint(node: CheckConstraintNode): CheckConstraintNode;
    protected transformWith(node: WithNode): WithNode;
    protected transformCommonTableExpression(node: CommonTableExpressionNode): CommonTableExpressionNode;
    protected transformCommonTableExpressionName(node: CommonTableExpressionNameNode): CommonTableExpressionNameNode;
    protected transformHaving(node: HavingNode): HavingNode;
    protected transformCreateSchema(node: CreateSchemaNode): CreateSchemaNode;
    protected transformDropSchema(node: DropSchemaNode): DropSchemaNode;
    protected transformAlterTable(node: AlterTableNode): AlterTableNode;
    protected transformDropColumn(node: DropColumnNode): DropColumnNode;
    protected transformRenameColumn(node: RenameColumnNode): RenameColumnNode;
    protected transformAlterColumn(node: AlterColumnNode): AlterColumnNode;
    protected transformModifyColumn(node: ModifyColumnNode): ModifyColumnNode;
    protected transformAddConstraint(node: AddConstraintNode): AddConstraintNode;
    protected transformDropConstraint(node: DropConstraintNode): DropConstraintNode;
    protected transformCreateView(node: CreateViewNode): CreateViewNode;
    protected transformDropView(node: DropViewNode): DropViewNode;
    protected transformGenerated(node: GeneratedNode): GeneratedNode;
    protected transformDefaultValue(node: DefaultValueNode): DefaultValueNode;
    protected transformOn(node: OnNode): OnNode;
    protected transformSelectModifier(node: SelectModifierNode): SelectModifierNode;
    protected transformCreateType(node: CreateTypeNode): CreateTypeNode;
    protected transformDropType(node: DropTypeNode): DropTypeNode;
    protected transformExplain(node: ExplainNode): ExplainNode;
    protected transformSchemableIdentifier(node: SchemableIdentifierNode): SchemableIdentifierNode;
    protected transformAggregateFunction(node: AggregateFunctionNode): AggregateFunctionNode;
    protected transformOver(node: OverNode): OverNode;
    protected transformPartitionBy(node: PartitionByNode): PartitionByNode;
    protected transformPartitionByItem(node: PartitionByItemNode): PartitionByItemNode;
    protected transformBinaryOperation(node: BinaryOperationNode): BinaryOperationNode;
    protected transformUnaryOperation(node: UnaryOperationNode): UnaryOperationNode;
    protected transformUsing(node: UsingNode): UsingNode;
    protected transformFunction(node: FunctionNode): FunctionNode;
    protected transformCase(node: CaseNode): CaseNode;
    protected transformWhen(node: WhenNode): WhenNode;
    protected transformJSONReference(node: JSONReferenceNode): JSONReferenceNode;
    protected transformJSONPath(node: JSONPathNode): JSONPathNode;
    protected transformJSONPathLeg(node: JSONPathLegNode): JSONPathLegNode;
    protected transformJSONOperatorChain(node: JSONOperatorChainNode): JSONOperatorChainNode;
    protected transformTuple(node: TupleNode): TupleNode;
    protected transformMergeQuery(node: MergeQueryNode): MergeQueryNode;
    protected transformMatched(node: MatchedNode): MatchedNode;
    protected transformAddIndex(node: AddIndexNode): AddIndexNode;
    protected transformCast(node: CastNode): CastNode;
    protected transformFetch(node: FetchNode): FetchNode;
    protected transformTop(node: TopNode): TopNode;
    protected transformOutput(node: OutputNode): OutputNode;
    protected transformDataType(node: DataTypeNode): DataTypeNode;
    protected transformSelectAll(node: SelectAllNode): SelectAllNode;
    protected transformIdentifier(node: IdentifierNode): IdentifierNode;
    protected transformValue(node: ValueNode): ValueNode;
    protected transformPrimitiveValueList(node: PrimitiveValueListNode): PrimitiveValueListNode;
    protected transformOperator(node: OperatorNode): OperatorNode;
    protected transformDefaultInsertValue(node: DefaultInsertValueNode): DefaultInsertValueNode;
}

/**
 * A helper type that allows inferring a select/insert/update/delete query's result
 * type from a query builder or compiled query.
 *
 * ### Examples
 *
 * Infer a query builder's result type:
 *
 * ```ts
 * import { InferResult } from 'kysely'
 *
 * const query = db
 *   .selectFrom('person')
 *   .innerJoin('pet', 'pet.owner_id', 'person.id')
 *   .select(['person.first_name', 'pet.name'])
 *
 * type QueryResult = InferResult<typeof query> // { first_name: string; name: string; }[]
 * ```
 *
 * Infer a compiled query's result type:
 *
 * ```ts
 * import { InferResult } from 'kysely'
 *
 * const compiledQuery = db
 *   .insertInto('person')
 *   .values({
 *     first_name: 'Foo',
 *     last_name: 'Barson',
 *     gender: 'other',
 *     age: 15,
 *   })
 *   .returningAll()
 *   .compile()
 *
 * type QueryResult = InferResult<typeof compiledQuery> // Selectable<Person>[]
 * ```
 */
type InferResult<C extends Compilable<any> | CompiledQuery<any>> = C extends Compilable<infer O> ? ResolveResult<O> : C extends CompiledQuery<infer O> ? ResolveResult<O> : never;
type ResolveResult<O> = O extends InsertResult | UpdateResult | DeleteResult | MergeResult ? O : Simplify<O>[];

/**
 * Use for system-level logging, such as deprecation messages.
 * Logs a message and ensures it won't be logged again.
 */
declare function logOnce(message: string): void;

type ExistsExpression<DB, TB extends keyof DB> = ExpressionOrFactory<DB, TB, any>;

export { AddColumnNode, AddConstraintNode, AddIndexNode, AggregateFunctionNode, AliasNode, AlterColumnNode, AlterTableColumnAlterationNode, AlterTableNode, AndNode, BinaryOperationNode, CamelCasePlugin, type CamelCasePluginOptions, CaseNode, CastNode, CheckConstraintNode, ColumnDefinitionNode, ColumnNode, ColumnUpdateNode, CommonTableExpressionNameNode, CommonTableExpressionNode, Compilable, CompiledQuery, ConnectionProvider, CreateIndexNode, CreateSchemaNode, CreateTableNode, CreateTypeNode, CreateViewNode, DEFAULT_ALLOW_UNORDERED_MIGRATIONS, DEFAULT_MIGRATION_LOCK_TABLE, DEFAULT_MIGRATION_TABLE, DataTypeNode, DatabaseConnection, DatabaseIntrospector, DatabaseMetadata, DatabaseMetadataOptions, DeduplicateJoinsPlugin, DefaultConnectionProvider, DefaultInsertValueNode, DefaultQueryCompiler, DefaultQueryExecutor, DefaultValueNode, DeleteQueryNode, DeleteResult, Dialect, DialectAdapter, DialectAdapterBase, Driver, DropColumnNode, DropConstraintNode, DropIndexNode, DropSchemaNode, DropTableNode, DropTypeNode, DropViewNode, DummyDriver, type ExistsExpression, ExplainNode, ExpressionOrFactory, FetchNode, FileMigrationProvider, type FileMigrationProviderFS, type FileMigrationProviderPath, type FileMigrationProviderProps, ForeignKeyConstraintNode, FromNode, FunctionNode, GeneratedNode, GroupByItemNode, GroupByNode, HavingNode, IdentifierNode, type InferResult, InsertQueryNode, InsertResult, JSONOperatorChainNode, JSONPathLegNode, JSONPathNode, JSONReferenceNode, JoinNode, Kysely, KyselyPlugin, LimitNode, ListNode, MIGRATION_LOCK_ID, MatchedNode, MergeQueryNode, MergeResult, type Migration, type MigrationInfo, MigrationLockOptions, type MigrationProvider, type MigrationResult, type MigrationResultSet, Migrator, type MigratorProps, ModifyColumnNode, MssqlAdapter, MssqlDialect, type MssqlDialectConfig, MssqlDriver, MssqlIntrospector, MssqlQueryCompiler, MysqlAdapter, MysqlDialect, type MysqlDialectConfig, MysqlDriver, MysqlIntrospector, type MysqlOkPacket, type MysqlPool, type MysqlPoolConnection, MysqlQueryCompiler, type MysqlQueryResult, type MysqlStream, type MysqlStreamOptions, NOOP_QUERY_EXECUTOR, NO_MIGRATIONS, type NoMigrations, NoopQueryExecutor, OffsetNode, OnConflictNode, OnDuplicateKeyNode, OnNode, OperationNode, OperationNodeTransformer, OperationNodeVisitor, OperatorNode, OrNode, OrderByItemNode, OrderByNode, OutputNode, OverNode, ParensNode, ParseJSONResultsPlugin, type ParseJSONResultsPluginOptions, PartitionByItemNode, PartitionByNode, PluginTransformQueryArgs, PluginTransformResultArgs, PostgresAdapter, type PostgresCursor, type PostgresCursorConstructor, PostgresDialect, type PostgresDialectConfig, PostgresDriver, PostgresIntrospector, type PostgresPool, type PostgresPoolClient, PostgresQueryCompiler, type PostgresQueryResult, type PostgresStream, PrimaryKeyConstraintNode, PrimitiveValueListNode, QueryCompiler, QueryExecutor, QueryResult, RawBuilder, RawNode, ReferenceNode, ReferencesNode, RenameColumnNode, ReturningNode, RootOperationNode, SchemaMetadata, SchemableIdentifierNode, SelectAllNode, SelectModifierNode, SelectQueryNode, SelectionNode, SetOperationNode, Simplify, SingleConnectionProvider, type Sql, SqliteAdapter, type SqliteDatabase, SqliteDialect, type SqliteDialectConfig, SqliteDriver, SqliteIntrospector, SqliteQueryCompiler, type SqliteStatement, TableMetadata, TableNode, type Tarn, type TarnPendingRequest, TarnPool, type TarnPoolOptions, type Tedious, type TediousColumnValue, type TediousConnection, type TediousIsolationLevel, TediousRequest, type TediousType, type TediousTypes, TopNode, TransactionSettings, TupleNode, UnaryOperationNode, UniqueConstraintNode, UnknownRow, UpdateQueryNode, UpdateResult, UsingNode, ValueListNode, ValueNode, type ValuesItemNode, ValuesNode, WhenNode, WhereNode, WithNode, WithSchemaPlugin, logOnce, sql };
