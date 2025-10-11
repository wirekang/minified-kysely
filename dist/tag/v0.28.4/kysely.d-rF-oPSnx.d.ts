type OperationNodeKind = 'IdentifierNode' | 'SchemableIdentifierNode' | 'RawNode' | 'SelectQueryNode' | 'SelectionNode' | 'ReferenceNode' | 'ColumnNode' | 'TableNode' | 'AliasNode' | 'FromNode' | 'SelectAllNode' | 'AndNode' | 'OrNode' | 'ParensNode' | 'ValueNode' | 'ValueListNode' | 'PrimitiveValueListNode' | 'JoinNode' | 'OperatorNode' | 'WhereNode' | 'InsertQueryNode' | 'DeleteQueryNode' | 'ReturningNode' | 'CreateTableNode' | 'ColumnDefinitionNode' | 'AddColumnNode' | 'DropTableNode' | 'DataTypeNode' | 'OrderByNode' | 'OrderByItemNode' | 'GroupByNode' | 'GroupByItemNode' | 'UpdateQueryNode' | 'ColumnUpdateNode' | 'LimitNode' | 'OffsetNode' | 'OnConflictNode' | 'OnDuplicateKeyNode' | 'CreateIndexNode' | 'DropIndexNode' | 'ListNode' | 'ReferencesNode' | 'PrimaryKeyConstraintNode' | 'UniqueConstraintNode' | 'CheckConstraintNode' | 'ForeignKeyConstraintNode' | 'WithNode' | 'CommonTableExpressionNode' | 'HavingNode' | 'CreateSchemaNode' | 'DropSchemaNode' | 'AlterTableNode' | 'ModifyColumnNode' | 'DropColumnNode' | 'RenameColumnNode' | 'AlterColumnNode' | 'AddConstraintNode' | 'DropConstraintNode' | 'CreateViewNode' | 'RefreshMaterializedViewNode' | 'DropViewNode' | 'GeneratedNode' | 'DefaultValueNode' | 'OnNode' | 'ValuesNode' | 'CommonTableExpressionNameNode' | 'SelectModifierNode' | 'CreateTypeNode' | 'DropTypeNode' | 'ExplainNode' | 'DefaultInsertValueNode' | 'AggregateFunctionNode' | 'OverNode' | 'PartitionByNode' | 'PartitionByItemNode' | 'SetOperationNode' | 'BinaryOperationNode' | 'UnaryOperationNode' | 'UsingNode' | 'FunctionNode' | 'CaseNode' | 'WhenNode' | 'JSONReferenceNode' | 'JSONPathNode' | 'JSONPathLegNode' | 'JSONOperatorChainNode' | 'TupleNode' | 'MergeQueryNode' | 'MatchedNode' | 'AddIndexNode' | 'CastNode' | 'FetchNode' | 'TopNode' | 'OutputNode' | 'OrActionNode' | 'CollateNode' | 'RenameConstraintNode';
interface OperationNode {
    readonly kind: OperationNodeKind;
}

interface IdentifierNode extends OperationNode {
    readonly kind: 'IdentifierNode';
    readonly name: string;
}
/**
 * @internal
 */
declare const IdentifierNode: Readonly<{
    is(node: OperationNode): node is IdentifierNode;
    create(name: string): IdentifierNode;
}>;

interface CheckConstraintNode extends OperationNode {
    readonly kind: 'CheckConstraintNode';
    readonly expression: OperationNode;
    readonly name?: IdentifierNode;
}
/**
 * @internal
 */
declare const CheckConstraintNode: Readonly<{
    is(node: OperationNode): node is CheckConstraintNode;
    create(expression: OperationNode, constraintName?: string): CheckConstraintNode;
}>;

interface ColumnNode extends OperationNode {
    readonly kind: 'ColumnNode';
    readonly column: IdentifierNode;
}
/**
 * @internal
 */
declare const ColumnNode: Readonly<{
    is(node: OperationNode): node is ColumnNode;
    create(column: string): ColumnNode;
}>;

interface DefaultValueNode extends OperationNode {
    readonly kind: 'DefaultValueNode';
    readonly defaultValue: OperationNode;
}
/**
 * @internal
 */
declare const DefaultValueNode: Readonly<{
    is(node: OperationNode): node is DefaultValueNode;
    create(defaultValue: OperationNode): DefaultValueNode;
}>;

type GeneratedNodeParams = Omit<GeneratedNode, 'kind' | 'expression'>;
interface GeneratedNode extends OperationNode {
    readonly kind: 'GeneratedNode';
    readonly byDefault?: boolean;
    readonly always?: boolean;
    readonly identity?: boolean;
    readonly stored?: boolean;
    readonly expression?: OperationNode;
}
/**
 * @internal
 */
declare const GeneratedNode: Readonly<{
    is(node: OperationNode): node is GeneratedNode;
    create(params: GeneratedNodeParams): GeneratedNode;
    createWithExpression(expression: OperationNode): GeneratedNode;
    cloneWith(node: GeneratedNode, params: GeneratedNodeParams): GeneratedNode;
}>;

interface SchemableIdentifierNode extends OperationNode {
    readonly kind: 'SchemableIdentifierNode';
    readonly schema?: IdentifierNode;
    readonly identifier: IdentifierNode;
}
/**
 * @internal
 */
declare const SchemableIdentifierNode: Readonly<{
    is(node: OperationNode): node is SchemableIdentifierNode;
    create(identifier: string): SchemableIdentifierNode;
    createWithSchema(schema: string, identifier: string): SchemableIdentifierNode;
}>;

interface TableNode extends OperationNode {
    readonly kind: 'TableNode';
    readonly table: SchemableIdentifierNode;
}
/**
 * @internal
 */
declare const TableNode: Readonly<{
    is(node: OperationNode): node is TableNode;
    create(table: string): TableNode;
    createWithSchema(schema: string, table: string): TableNode;
}>;

/**
 * The result of an insert query.
 *
 * If the table has an auto incrementing primary key {@link insertId} will hold
 * the generated id on dialects that support it. For example PostgreSQL doesn't
 * return the id by default and {@link insertId} is undefined. On PostgreSQL you
 * need to use {@link ReturningInterface.returning} or {@link ReturningInterface.returningAll}
 * to get out the inserted id.
 *
 * {@link numInsertedOrUpdatedRows} holds the number of (actually) inserted rows.
 * On MySQL, updated rows are counted twice when using `on duplicate key update`.
 *
 * ### Examples
 *
 * ```ts
 * import type { NewPerson } from 'type-editor' // imaginary module
 *
 * async function insertPerson(person: NewPerson) {
 *   const result = await db
 *     .insertInto('person')
 *     .values(person)
 *     .executeTakeFirstOrThrow()
 *
 *   console.log(result.insertId) // relevant on MySQL
 *   console.log(result.numInsertedOrUpdatedRows) // always relevant
 * }
 * ```
 */
declare class InsertResult {
    /**
     * The auto incrementing primary key of the inserted row.
     *
     * This property can be undefined when the query contains an `on conflict`
     * clause that makes the query succeed even when nothing gets inserted.
     *
     * This property is always undefined on dialects like PostgreSQL that
     * don't return the inserted id by default. On those dialects you need
     * to use the {@link ReturningInterface.returning | returning} method.
     */
    readonly insertId: bigint | undefined;
    /**
     * Affected rows count.
     */
    readonly numInsertedOrUpdatedRows: bigint | undefined;
    constructor(insertId: bigint | undefined, numInsertedOrUpdatedRows: bigint | undefined);
}

declare class DeleteResult {
    readonly numDeletedRows: bigint;
    constructor(numDeletedRows: bigint);
}

declare class UpdateResult {
    /**
     * The number of rows the update query updated (even if not changed).
     */
    readonly numUpdatedRows: bigint;
    /**
     * The number of rows the update query changed.
     *
     * This is **optional** and only supported in dialects such as MySQL.
     * You would probably use {@link numUpdatedRows} in most cases.
     */
    readonly numChangedRows?: bigint;
    constructor(numUpdatedRows: bigint, numChangedRows: bigint | undefined);
}

interface KyselyTypeError<E extends string> {
    readonly __kyselyTypeError__: E;
}

declare class MergeResult {
    readonly numChangedRows: bigint | undefined;
    constructor(numChangedRows: bigint | undefined);
}

/**
 * Given a database type and a union of table names in that db, returns
 * a union type with all possible column names.
 *
 * Example:
 *
 * ```ts
 * interface Person {
 *   id: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * interface Movie {
 *   stars: number
 * }
 *
 * interface Database {
 *   person: Person
 *   pet: Pet
 *   movie: Movie
 * }
 *
 * type Columns = AnyColumn<Database, 'person' | 'pet'>
 *
 * // Columns == 'id' | 'name' | 'species'
 * ```
 */
type AnyColumn<DB, TB extends keyof DB> = {
    [T in TB]: keyof DB[T];
}[TB] & string;
/**
 * Extracts a column type.
 */
type ExtractColumnType<DB, TB extends keyof DB, C> = {
    [T in TB]: C extends keyof DB[T] ? DB[T][C] : never;
}[TB];
/**
 * Given a database type and a union of table names in that db, returns
 * a union type with all possible `table`.`column` combinations.
 *
 * Example:
 *
 * ```ts
 * interface Person {
 *   id: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * interface Movie {
 *   stars: number
 * }
 *
 * interface Database {
 *   person: Person
 *   pet: Pet
 *   movie: Movie
 * }
 *
 * type Columns = AnyColumnWithTable<Database, 'person' | 'pet'>
 *
 * // Columns == 'person.id' | 'pet.name' | 'pet.species'
 * ```
 */
type AnyColumnWithTable<DB, TB extends keyof DB> = {
    [T in TB]: `${T & string}.${keyof DB[T] & string}`;
}[TB];
/**
 * Just like {@link AnyColumn} but with a ` as <string>` suffix.
 */
type AnyAliasedColumn<DB, TB extends keyof DB> = `${AnyColumn<DB, TB>} as ${string}`;
/**
 * Just like {@link AnyColumnWithTable} but with a ` as <string>` suffix.
 */
type AnyAliasedColumnWithTable<DB, TB extends keyof DB> = `${AnyColumnWithTable<DB, TB>} as ${string}`;
/**
 * Extracts the item type of an array.
 */
type ArrayItemType<T> = T extends ReadonlyArray<infer I> ? I : never;
type SimplifySingleResult<O> = O extends InsertResult ? O : O extends DeleteResult ? O : O extends UpdateResult ? O : O extends MergeResult ? O : Simplify<O> | undefined;
type SimplifyResult<O> = O extends InsertResult ? O : O extends DeleteResult ? O : O extends UpdateResult ? O : O extends MergeResult ? O : Simplify<O>;
type Simplify<T> = DrainOuterGeneric<{
    [K in keyof T]: T[K];
} & {}>;
/**
 * Represents a database row whose column names and their types are unknown.
 */
type UnknownRow = Record<string, unknown>;
/**
 * Makes all properties of object type `T` nullable.
 */
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
/**
 * Evaluates to `true` if `T` is `never`.
 */
type IsNever<T> = [T] extends [never] ? true : false;
/**
 * Evaluates to `true` if the types `T` and `U` are equal.
 */
type Equals<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false;
type NarrowPartial<O, T> = DrainOuterGeneric<T extends object ? {
    [K in keyof O & string]: K extends keyof T ? T[K] extends NotNull$1 ? Exclude<O[K], null> : T[K] extends O[K] ? T[K] : KyselyTypeError<`$narrowType() call failed: passed type does not exist in '${K}'s type union`> : O[K];
} : never>;
/**
 * A type constant for marking a column as not null. Can be used with `$narrowPartial`.
 *
 * Example:
 *
 * ```ts
 * import type { NotNull } from 'kysely'
 *
 * await db.selectFrom('person')
 *   .where('nullable_column', 'is not', null)
 *   .selectAll()
 *   .$narrowType<{ nullable_column: NotNull }>()
 *   .executeTakeFirstOrThrow()
 * ```
 */
type NotNull$1 = {
    readonly __notNull__: unique symbol;
};
type SqlBool = boolean | 0 | 1;
/**
 * Utility to reduce depth of TypeScript's internal type instantiation stack.
 *
 * Example:
 *
 * ```ts
 * type A<T> = { item: T }
 *
 * type Test<T> = A<
 *   A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<T>>>>>>>>>>>>>>>>>>>>>>>>
 * >
 *
 * // type Error = Test<number> // Type instantiation is excessively deep and possibly infinite.ts (2589)
 * ```
 *
 * To fix this, we can use `DrainOuterGeneric`:
 *
 * ```ts
 * type A<T> = DrainOuterGeneric<{ item: T }>
 *
 * type Test<T> = A<
 *  A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<A<T>>>>>>>>>>>>>>>>>>>>>>>>
 * >
 *
 * type Ok = Test<number> // Ok
 * ```
 */
type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never;
type ShallowRecord<K extends keyof any, T> = DrainOuterGeneric<{
    [P in K]: T;
}>;
/**
 * Dehydrates any root properties of an object that are not valid JSON types.
 *
 * For now, we catch anything in {@link StringsWhenDataTypeNotAvailable} and convert it to `string`.
 */
type ShallowDehydrateObject<O> = {
    [K in keyof O]: ShallowDehydrateValue<O[K]>;
};
/**
 * Dehydrates a value when it is not a valid JSON type.
 *
 * For now, we catch anything in {@link StringsWhenDataTypeNotAvailable} and convert it to `string`,
 * and anything in {@link NumbersWhenDataTypeNotAvailable} and convert it to `number`.
 */
type ShallowDehydrateValue<T> = T extends null | undefined ? T : T extends (infer U)[] | null | undefined ? Array<ShallowDehydrateValue<U>> | Extract<T, null | undefined> : Exclude<T, StringsWhenDataTypeNotAvailable | NumbersWhenDataTypeNotAvailable> | ([Extract<T, NumbersWhenDataTypeNotAvailable>] extends [never] ? never : number) | ([Extract<T, StringsWhenDataTypeNotAvailable>] extends [never] ? never : string);
type StringsWhenDataTypeNotAvailable = Date | Buffer | ArrayBuffer;
type NumbersWhenDataTypeNotAvailable = bigint | NumericString;
type NumericString = `${number}`;

declare const ON_MODIFY_FOREIGN_ACTIONS: readonly ["no action", "restrict", "cascade", "set null", "set default"];
type OnModifyForeignAction = ArrayItemType<typeof ON_MODIFY_FOREIGN_ACTIONS>;
interface ReferencesNode extends OperationNode {
    readonly kind: 'ReferencesNode';
    readonly table: TableNode;
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly onDelete?: OnModifyForeignAction;
    readonly onUpdate?: OnModifyForeignAction;
}
/**
 * @internal
 */
declare const ReferencesNode: Readonly<{
    is(node: OperationNode): node is ReferencesNode;
    create(table: TableNode, columns: ReadonlyArray<ColumnNode>): ReferencesNode;
    cloneWithOnDelete(references: ReferencesNode, onDelete: OnModifyForeignAction): ReferencesNode;
    cloneWithOnUpdate(references: ReferencesNode, onUpdate: OnModifyForeignAction): ReferencesNode;
}>;

type ColumnDefinitionNodeProps = Omit<Partial<ColumnDefinitionNode>, 'kind' | 'dataType'>;
interface ColumnDefinitionNode extends OperationNode {
    readonly kind: 'ColumnDefinitionNode';
    readonly column: ColumnNode;
    readonly dataType: OperationNode;
    readonly references?: ReferencesNode;
    readonly primaryKey?: boolean;
    readonly autoIncrement?: boolean;
    readonly unique?: boolean;
    readonly notNull?: boolean;
    readonly defaultTo?: DefaultValueNode;
    readonly check?: CheckConstraintNode;
    readonly generated?: GeneratedNode;
    readonly unsigned?: boolean;
    readonly frontModifiers?: ReadonlyArray<OperationNode>;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
    readonly nullsNotDistinct?: boolean;
    readonly identity?: boolean;
    readonly ifNotExists?: boolean;
}
/**
 * @internal
 */
declare const ColumnDefinitionNode: Readonly<{
    is(node: OperationNode): node is ColumnDefinitionNode;
    create(column: string, dataType: OperationNode): ColumnDefinitionNode;
    cloneWithFrontModifier(node: ColumnDefinitionNode, modifier: OperationNode): ColumnDefinitionNode;
    cloneWithEndModifier(node: ColumnDefinitionNode, modifier: OperationNode): ColumnDefinitionNode;
    cloneWith(node: ColumnDefinitionNode, props: ColumnDefinitionNodeProps): ColumnDefinitionNode;
}>;

interface AddColumnNode extends OperationNode {
    readonly kind: 'AddColumnNode';
    readonly column: ColumnDefinitionNode;
}
/**
 * @internal
 */
declare const AddColumnNode: Readonly<{
    is(node: OperationNode): node is AddColumnNode;
    create(column: ColumnDefinitionNode): AddColumnNode;
}>;

interface DropColumnNode extends OperationNode {
    readonly kind: 'DropColumnNode';
    readonly column: ColumnNode;
}
/**
 * @internal
 */
declare const DropColumnNode: Readonly<{
    is(node: OperationNode): node is DropColumnNode;
    create(column: string): DropColumnNode;
}>;

interface RenameColumnNode extends OperationNode {
    readonly kind: 'RenameColumnNode';
    readonly column: ColumnNode;
    readonly renameTo: ColumnNode;
}
/**
 * @internal
 */
declare const RenameColumnNode: Readonly<{
    is(node: OperationNode): node is RenameColumnNode;
    create(column: string, newColumn: string): RenameColumnNode;
}>;

interface RawNode extends OperationNode {
    readonly kind: 'RawNode';
    readonly sqlFragments: ReadonlyArray<string>;
    readonly parameters: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const RawNode: Readonly<{
    is(node: OperationNode): node is RawNode;
    create(sqlFragments: ReadonlyArray<string>, parameters: ReadonlyArray<OperationNode>): RawNode;
    createWithSql(sql: string): RawNode;
    createWithChild(child: OperationNode): RawNode;
    createWithChildren(children: ReadonlyArray<OperationNode>): RawNode;
}>;

type AlterColumnNodeProps = Omit<AlterColumnNode, 'kind' | 'column'>;
interface AlterColumnNode extends OperationNode {
    readonly kind: 'AlterColumnNode';
    readonly column: ColumnNode;
    readonly dataType?: OperationNode;
    readonly dataTypeExpression?: RawNode;
    readonly setDefault?: OperationNode;
    readonly dropDefault?: true;
    readonly setNotNull?: true;
    readonly dropNotNull?: true;
}
/**
 * @internal
 */
declare const AlterColumnNode: Readonly<{
    is(node: OperationNode): node is AlterColumnNode;
    create<T extends keyof AlterColumnNodeProps>(column: string, prop: T, value: Required<AlterColumnNodeProps>[T]): AlterColumnNode;
}>;

type ForeignKeyConstraintNodeProps = Omit<ForeignKeyConstraintNode, 'kind' | 'columns' | 'references'>;
interface ForeignKeyConstraintNode extends OperationNode {
    readonly kind: 'ForeignKeyConstraintNode';
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly references: ReferencesNode;
    readonly onDelete?: OnModifyForeignAction;
    readonly onUpdate?: OnModifyForeignAction;
    readonly name?: IdentifierNode;
    readonly deferrable?: boolean;
    readonly initiallyDeferred?: boolean;
}
/**
 * @internal
 */
declare const ForeignKeyConstraintNode: Readonly<{
    is(node: OperationNode): node is ForeignKeyConstraintNode;
    create(sourceColumns: ReadonlyArray<ColumnNode>, targetTable: TableNode, targetColumns: ReadonlyArray<ColumnNode>, constraintName?: string): ForeignKeyConstraintNode;
    cloneWith(node: ForeignKeyConstraintNode, props: ForeignKeyConstraintNodeProps): Readonly<{
        name?: IdentifierNode;
        onDelete?: OnModifyForeignAction;
        onUpdate?: OnModifyForeignAction;
        deferrable?: boolean;
        initiallyDeferred?: boolean;
        kind: "ForeignKeyConstraintNode";
        columns: ReadonlyArray<ColumnNode>;
        references: ReferencesNode;
    }>;
}>;

type PrimaryKeyConstraintNodeProps = Omit<Partial<PrimaryKeyConstraintNode>, 'kind'>;
interface PrimaryKeyConstraintNode extends OperationNode {
    readonly kind: 'PrimaryKeyConstraintNode';
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly name?: IdentifierNode;
    readonly deferrable?: boolean;
    readonly initiallyDeferred?: boolean;
}
/**
 * @internal
 */
declare const PrimaryKeyConstraintNode: Readonly<{
    is(node: OperationNode): node is PrimaryKeyConstraintNode;
    create(columns: string[], constraintName?: string): PrimaryKeyConstraintNode;
    cloneWith(node: PrimaryKeyConstraintNode, props: PrimaryKeyConstraintNodeProps): PrimaryKeyConstraintNode;
}>;
/**
 * Backwards compatibility for a typo in the codebase.
 *
 * @deprecated Use {@link PrimaryKeyConstraintNode} instead.
 */
declare const PrimaryConstraintNode: Readonly<{
    is(node: OperationNode): node is PrimaryKeyConstraintNode;
    create(columns: string[], constraintName?: string): PrimaryKeyConstraintNode;
    cloneWith(node: PrimaryKeyConstraintNode, props: PrimaryKeyConstraintNodeProps): PrimaryKeyConstraintNode;
}>;

type UniqueConstraintNodeProps = Omit<Partial<UniqueConstraintNode>, 'kind'>;
interface UniqueConstraintNode extends OperationNode {
    readonly kind: 'UniqueConstraintNode';
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly name?: IdentifierNode;
    readonly nullsNotDistinct?: boolean;
    readonly deferrable?: boolean;
    readonly initiallyDeferred?: boolean;
}
/**
 * @internal
 */
declare const UniqueConstraintNode: Readonly<{
    is(node: OperationNode): node is UniqueConstraintNode;
    create(columns: string[], constraintName?: string, nullsNotDistinct?: boolean): UniqueConstraintNode;
    cloneWith(node: UniqueConstraintNode, props: UniqueConstraintNodeProps): UniqueConstraintNode;
}>;

type ConstraintNode = PrimaryKeyConstraintNode | UniqueConstraintNode | CheckConstraintNode | ForeignKeyConstraintNode;

interface AddConstraintNode extends OperationNode {
    readonly kind: 'AddConstraintNode';
    readonly constraint: ConstraintNode;
}
/**
 * @internal
 */
declare const AddConstraintNode: Readonly<{
    is(node: OperationNode): node is AddConstraintNode;
    create(constraint: ConstraintNode): AddConstraintNode;
}>;

type DropConstraintNodeProps = Omit<DropConstraintNode, 'kind' | 'constraintName'>;
interface DropConstraintNode extends OperationNode {
    readonly kind: 'DropConstraintNode';
    readonly constraintName: IdentifierNode;
    readonly ifExists?: boolean;
    readonly modifier?: 'cascade' | 'restrict';
}
/**
 * @internal
 */
declare const DropConstraintNode: Readonly<{
    is(node: OperationNode): node is DropConstraintNode;
    create(constraintName: string): DropConstraintNode;
    cloneWith(dropConstraint: DropConstraintNode, props: DropConstraintNodeProps): DropConstraintNode;
}>;

interface ModifyColumnNode extends OperationNode {
    readonly kind: 'ModifyColumnNode';
    readonly column: ColumnDefinitionNode;
}
/**
 * @internal
 */
declare const ModifyColumnNode: Readonly<{
    is(node: OperationNode): node is ModifyColumnNode;
    create(column: ColumnDefinitionNode): ModifyColumnNode;
}>;

type DropIndexNodeProps = Omit<DropIndexNode, 'kind' | 'name'>;
interface DropIndexNode extends OperationNode {
    readonly kind: 'DropIndexNode';
    readonly name: SchemableIdentifierNode;
    readonly table?: TableNode;
    readonly ifExists?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropIndexNode: Readonly<{
    is(node: OperationNode): node is DropIndexNode;
    create(name: string, params?: DropIndexNodeProps): DropIndexNode;
    cloneWith(dropIndex: DropIndexNode, props: DropIndexNodeProps): DropIndexNode;
}>;

type AddIndexNodeProps = Omit<AddIndexNode, 'kind' | 'name'>;
interface AddIndexNode extends OperationNode {
    readonly kind: 'AddIndexNode';
    readonly name: IdentifierNode;
    readonly columns?: OperationNode[];
    readonly unique?: boolean;
    readonly using?: RawNode;
    readonly ifNotExists?: boolean;
}
/**
 * @internal
 */
declare const AddIndexNode: Readonly<{
    is(node: OperationNode): node is AddIndexNode;
    create(name: string): AddIndexNode;
    cloneWith(node: AddIndexNode, props: AddIndexNodeProps): AddIndexNode;
    cloneWithColumns(node: AddIndexNode, columns: OperationNode[]): AddIndexNode;
}>;

interface RenameConstraintNode extends OperationNode {
    readonly kind: 'RenameConstraintNode';
    readonly oldName: IdentifierNode;
    readonly newName: IdentifierNode;
}
/**
 * @internal
 */
declare const RenameConstraintNode: Readonly<{
    is(node: OperationNode): node is RenameConstraintNode;
    create(oldName: string, newName: string): RenameConstraintNode;
}>;

type AlterTableNodeTableProps = Pick<AlterTableNode, 'renameTo' | 'setSchema' | 'addConstraint' | 'dropConstraint' | 'addIndex' | 'dropIndex' | 'renameConstraint'>;
type AlterTableColumnAlterationNode = RenameColumnNode | AddColumnNode | DropColumnNode | AlterColumnNode | ModifyColumnNode;
interface AlterTableNode extends OperationNode {
    readonly kind: 'AlterTableNode';
    readonly table: TableNode;
    readonly renameTo?: TableNode;
    readonly setSchema?: IdentifierNode;
    readonly columnAlterations?: ReadonlyArray<AlterTableColumnAlterationNode>;
    readonly addConstraint?: AddConstraintNode;
    readonly dropConstraint?: DropConstraintNode;
    readonly renameConstraint?: RenameConstraintNode;
    readonly addIndex?: AddIndexNode;
    readonly dropIndex?: DropIndexNode;
}
/**
 * @internal
 */
declare const AlterTableNode: Readonly<{
    is(node: OperationNode): node is AlterTableNode;
    create(table: TableNode): AlterTableNode;
    cloneWithTableProps(node: AlterTableNode, props: AlterTableNodeTableProps): AlterTableNode;
    cloneWithColumnAlteration(node: AlterTableNode, columnAlteration: AlterTableColumnAlterationNode): AlterTableNode;
}>;

interface WhereNode extends OperationNode {
    readonly kind: 'WhereNode';
    readonly where: OperationNode;
}
/**
 * @internal
 */
declare const WhereNode: Readonly<{
    is(node: OperationNode): node is WhereNode;
    create(filter: OperationNode): WhereNode;
    cloneWithOperation(whereNode: WhereNode, operator: "And" | "Or", operation: OperationNode): WhereNode;
}>;

type CreateIndexNodeProps = Omit<CreateIndexNode, 'kind' | 'name'>;
type IndexType = 'btree' | 'hash' | 'gist' | 'gin';
interface CreateIndexNode extends OperationNode {
    readonly kind: 'CreateIndexNode';
    readonly name: IdentifierNode;
    readonly table?: TableNode;
    readonly columns?: OperationNode[];
    readonly unique?: boolean;
    readonly using?: RawNode;
    readonly ifNotExists?: boolean;
    readonly where?: WhereNode;
    readonly nullsNotDistinct?: boolean;
}
/**
 * @internal
 */
declare const CreateIndexNode: Readonly<{
    is(node: OperationNode): node is CreateIndexNode;
    create(name: string): CreateIndexNode;
    cloneWith(node: CreateIndexNode, props: CreateIndexNodeProps): CreateIndexNode;
    cloneWithColumns(node: CreateIndexNode, columns: OperationNode[]): CreateIndexNode;
}>;

type CreateSchemaNodeParams = Omit<Partial<CreateSchemaNode>, 'kind' | 'schema'>;
interface CreateSchemaNode extends OperationNode {
    readonly kind: 'CreateSchemaNode';
    readonly schema: IdentifierNode;
    readonly ifNotExists?: boolean;
}
/**
 * @internal
 */
declare const CreateSchemaNode: Readonly<{
    is(node: OperationNode): node is CreateSchemaNode;
    create(schema: string, params?: CreateSchemaNodeParams): CreateSchemaNode;
    cloneWith(createSchema: CreateSchemaNode, params: CreateSchemaNodeParams): CreateSchemaNode;
}>;

declare const ON_COMMIT_ACTIONS: string[];
type OnCommitAction = ArrayItemType<typeof ON_COMMIT_ACTIONS>;
type CreateTableNodeParams = Omit<CreateTableNode, 'kind' | 'table' | 'columns' | 'constraints' | 'frontModifiers' | 'endModifiers'>;
interface CreateTableNode extends OperationNode {
    readonly kind: 'CreateTableNode';
    readonly table: TableNode;
    readonly columns: ReadonlyArray<ColumnDefinitionNode>;
    readonly constraints?: ReadonlyArray<ConstraintNode>;
    readonly temporary?: boolean;
    readonly ifNotExists?: boolean;
    readonly onCommit?: OnCommitAction;
    readonly frontModifiers?: ReadonlyArray<OperationNode>;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
    readonly selectQuery?: OperationNode;
}
/**
 * @internal
 */
declare const CreateTableNode: Readonly<{
    is(node: OperationNode): node is CreateTableNode;
    create(table: TableNode): CreateTableNode;
    cloneWithColumn(createTable: CreateTableNode, column: ColumnDefinitionNode): CreateTableNode;
    cloneWithConstraint(createTable: CreateTableNode, constraint: ConstraintNode): CreateTableNode;
    cloneWithFrontModifier(createTable: CreateTableNode, modifier: OperationNode): CreateTableNode;
    cloneWithEndModifier(createTable: CreateTableNode, modifier: OperationNode): CreateTableNode;
    cloneWith(createTable: CreateTableNode, params: CreateTableNodeParams): CreateTableNode;
}>;

interface ValueListNode extends OperationNode {
    readonly kind: 'ValueListNode';
    readonly values: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const ValueListNode: Readonly<{
    is(node: OperationNode): node is ValueListNode;
    create(values: ReadonlyArray<OperationNode>): ValueListNode;
}>;

type CreateTypeNodeParams = Omit<Partial<CreateTypeNode>, 'kind'>;
interface CreateTypeNode extends OperationNode {
    readonly kind: 'CreateTypeNode';
    readonly name: SchemableIdentifierNode;
    readonly enum?: ValueListNode;
}
/**
 * @internal
 */
declare const CreateTypeNode: Readonly<{
    is(node: OperationNode): node is CreateTypeNode;
    create(name: SchemableIdentifierNode): CreateTypeNode;
    cloneWithEnum(createType: CreateTypeNode, values: readonly string[]): CreateTypeNode;
}>;

interface FromNode extends OperationNode {
    readonly kind: 'FromNode';
    readonly froms: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const FromNode: Readonly<{
    is(node: OperationNode): node is FromNode;
    create(froms: ReadonlyArray<OperationNode>): FromNode;
    cloneWithFroms(from: FromNode, froms: ReadonlyArray<OperationNode>): FromNode;
}>;

interface GroupByItemNode extends OperationNode {
    readonly kind: 'GroupByItemNode';
    readonly groupBy: OperationNode;
}
/**
 * @internal
 */
declare const GroupByItemNode: Readonly<{
    is(node: OperationNode): node is GroupByItemNode;
    create(groupBy: OperationNode): GroupByItemNode;
}>;

interface GroupByNode extends OperationNode {
    readonly kind: 'GroupByNode';
    readonly items: ReadonlyArray<GroupByItemNode>;
}
/**
 * @internal
 */
declare const GroupByNode: Readonly<{
    is(node: OperationNode): node is GroupByNode;
    create(items: ReadonlyArray<GroupByItemNode>): GroupByNode;
    cloneWithItems(groupBy: GroupByNode, items: ReadonlyArray<GroupByItemNode>): GroupByNode;
}>;

interface HavingNode extends OperationNode {
    readonly kind: 'HavingNode';
    readonly having: OperationNode;
}
/**
 * @internal
 */
declare const HavingNode: Readonly<{
    is(node: OperationNode): node is HavingNode;
    create(filter: OperationNode): HavingNode;
    cloneWithOperation(havingNode: HavingNode, operator: "And" | "Or", operation: OperationNode): HavingNode;
}>;

interface OnNode extends OperationNode {
    readonly kind: 'OnNode';
    readonly on: OperationNode;
}
/**
 * @internal
 */
declare const OnNode: Readonly<{
    is(node: OperationNode): node is OnNode;
    create(filter: OperationNode): OnNode;
    cloneWithOperation(onNode: OnNode, operator: "And" | "Or", operation: OperationNode): OnNode;
}>;

type JoinType = 'InnerJoin' | 'LeftJoin' | 'RightJoin' | 'FullJoin' | 'CrossJoin' | 'LateralInnerJoin' | 'LateralLeftJoin' | 'LateralCrossJoin' | 'Using' | 'OuterApply' | 'CrossApply';
interface JoinNode extends OperationNode {
    readonly kind: 'JoinNode';
    readonly joinType: JoinType;
    readonly table: OperationNode;
    readonly on?: OnNode;
}
/**
 * @internal
 */
declare const JoinNode: Readonly<{
    is(node: OperationNode): node is JoinNode;
    create(joinType: JoinType, table: OperationNode): JoinNode;
    createWithOn(joinType: JoinType, table: OperationNode, on: OperationNode): JoinNode;
    cloneWithOn(joinNode: JoinNode, operation: OperationNode): JoinNode;
}>;

interface LimitNode extends OperationNode {
    readonly kind: 'LimitNode';
    readonly limit: OperationNode;
}
/**
 * @internal
 */
declare const LimitNode: Readonly<{
    is(node: OperationNode): node is LimitNode;
    create(limit: OperationNode): LimitNode;
}>;

interface OffsetNode extends OperationNode {
    readonly kind: 'OffsetNode';
    readonly offset: OperationNode;
}
/**
 * @internal
 */
declare const OffsetNode: Readonly<{
    is(node: OperationNode): node is OffsetNode;
    create(offset: OperationNode): OffsetNode;
}>;

interface CollateNode extends OperationNode {
    readonly kind: 'CollateNode';
    readonly collation: IdentifierNode;
}
/**
 * @internal
 */
declare const CollateNode: {
    is(node: OperationNode): node is CollateNode;
    create(collation: string): CollateNode;
};

type OrderByItemNodeProps = Omit<OrderByItemNode, 'kind' | 'orderBy'>;
interface OrderByItemNode extends OperationNode {
    readonly kind: 'OrderByItemNode';
    readonly orderBy: OperationNode;
    readonly direction?: OperationNode;
    readonly nulls?: 'first' | 'last';
    readonly collation?: CollateNode;
}
/**
 * @internal
 */
declare const OrderByItemNode: Readonly<{
    is(node: OperationNode): node is OrderByItemNode;
    create(orderBy: OperationNode, direction?: OperationNode): OrderByItemNode;
    cloneWith(node: OrderByItemNode, props: OrderByItemNodeProps): OrderByItemNode;
}>;

interface OrderByNode extends OperationNode {
    readonly kind: 'OrderByNode';
    readonly items: ReadonlyArray<OrderByItemNode>;
}
/**
 * @internal
 */
declare const OrderByNode: Readonly<{
    is(node: OperationNode): node is OrderByNode;
    create(items: ReadonlyArray<OrderByItemNode>): OrderByNode;
    cloneWithItems(orderBy: OrderByNode, items: ReadonlyArray<OrderByItemNode>): OrderByNode;
}>;

interface AliasNode extends OperationNode {
    readonly kind: 'AliasNode';
    readonly node: OperationNode;
    readonly alias: OperationNode;
}
/**
 * @internal
 */
declare const AliasNode: Readonly<{
    is(node: OperationNode): node is AliasNode;
    create(node: OperationNode, alias: OperationNode): AliasNode;
}>;

interface SelectAllNode extends OperationNode {
    readonly kind: 'SelectAllNode';
}
/**
 * @internal
 */
declare const SelectAllNode: Readonly<{
    is(node: OperationNode): node is SelectAllNode;
    create(): SelectAllNode;
}>;

interface ReferenceNode extends OperationNode {
    readonly kind: 'ReferenceNode';
    readonly column: ColumnNode | SelectAllNode;
    readonly table?: TableNode;
}
/**
 * @internal
 */
declare const ReferenceNode: Readonly<{
    is(node: OperationNode): node is ReferenceNode;
    create(column: ColumnNode, table?: TableNode): ReferenceNode;
    createSelectAll(table: TableNode): ReferenceNode;
}>;

type SimpleReferenceExpressionNode = ColumnNode | ReferenceNode;

type SelectionNodeChild = SimpleReferenceExpressionNode | AliasNode | SelectAllNode;
interface SelectionNode extends OperationNode {
    readonly kind: 'SelectionNode';
    readonly selection: SelectionNodeChild;
}
/**
 * @internal
 */
declare const SelectionNode: Readonly<{
    is(node: OperationNode): node is SelectionNode;
    create(selection: SelectionNodeChild): SelectionNode;
    createSelectAll(): SelectionNode;
    createSelectAllFromTable(table: TableNode): SelectionNode;
}>;

interface CommonTableExpressionNameNode extends OperationNode {
    readonly kind: 'CommonTableExpressionNameNode';
    readonly table: TableNode;
    readonly columns?: ReadonlyArray<ColumnNode>;
}
/**
 * @internal
 */
declare const CommonTableExpressionNameNode: Readonly<{
    is(node: OperationNode): node is CommonTableExpressionNameNode;
    create(tableName: string, columnNames?: ReadonlyArray<string>): CommonTableExpressionNameNode;
}>;

type CommonTableExpressionNodeProps = Pick<CommonTableExpressionNode, 'materialized'>;
interface CommonTableExpressionNode extends OperationNode {
    readonly kind: 'CommonTableExpressionNode';
    readonly name: CommonTableExpressionNameNode;
    readonly materialized?: boolean;
    readonly expression: OperationNode;
}
/**
 * @internal
 */
declare const CommonTableExpressionNode: Readonly<{
    is(node: OperationNode): node is CommonTableExpressionNode;
    create(name: CommonTableExpressionNameNode, expression: OperationNode): CommonTableExpressionNode;
    cloneWith(node: CommonTableExpressionNode, props: CommonTableExpressionNodeProps): CommonTableExpressionNode;
}>;

type WithNodeParams = Omit<WithNode, 'kind' | 'expressions'>;
interface WithNode extends OperationNode {
    readonly kind: 'WithNode';
    readonly expressions: ReadonlyArray<CommonTableExpressionNode>;
    readonly recursive?: boolean;
}
/**
 * @internal
 */
declare const WithNode: Readonly<{
    is(node: OperationNode): node is WithNode;
    create(expression: CommonTableExpressionNode, params?: WithNodeParams): WithNode;
    cloneWithExpression(withNode: WithNode, expression: CommonTableExpressionNode): WithNode;
}>;

type SelectModifier = 'ForUpdate' | 'ForNoKeyUpdate' | 'ForShare' | 'ForKeyShare' | 'NoWait' | 'SkipLocked' | 'Distinct';
interface SelectModifierNode extends OperationNode {
    readonly kind: 'SelectModifierNode';
    readonly modifier?: SelectModifier;
    readonly rawModifier?: OperationNode;
    readonly of?: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const SelectModifierNode: Readonly<{
    is(node: OperationNode): node is SelectModifierNode;
    create(modifier: SelectModifier, of?: ReadonlyArray<OperationNode>): SelectModifierNode;
    createWithExpression(modifier: OperationNode): SelectModifierNode;
}>;

interface OperationNodeSource {
    toOperationNode(): OperationNode;
}
declare function isOperationNodeSource(obj: unknown): obj is OperationNodeSource;

/**
 * `Expression` represents an arbitrary SQL expression with a type.
 *
 * Most Kysely methods accept instances of `Expression` and most classes like `SelectQueryBuilder`
 * and the return value of the {@link sql} template tag implement it.
 *
 * ### Examples
 *
 * ```ts
 * import { type Expression, sql } from 'kysely'
 *
 * const exp1: Expression<string> = sql<string>`CONCAT('hello', ' ', 'world')`
 * const exp2: Expression<{ first_name: string }> = db.selectFrom('person').select('first_name')
 * ```
 *
 * You can implement the `Expression` interface to create your own type-safe utilities for Kysely.
 */
interface Expression<T> extends OperationNodeSource {
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ### Examples
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): T | undefined;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): OperationNode;
}
/**
 * An expression with an `as` method.
 */
interface AliasableExpression<T> extends Expression<T> {
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` at the end of the expression,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     // `eb.fn<string>` returns an AliasableExpression<string>
     *     eb.fn<string>('concat', ['first_name', eb.val(' '), 'last_name']).as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   concat("first_name", $1, "last_name") as "full_name"
     * from
     *   "person"
     * ```
     *
     * You can also pass in a raw SQL snippet (or any expression) but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: A): AliasedExpression<T, A>;
    as<A extends string>(alias: Expression<any>): AliasedExpression<T, A>;
}
/**
 * A type that holds an expression and an alias for it.
 *
 * `AliasedExpression<T, A>` can be used in places where, in addition to the value type `T`, you
 * also need a name `A` for that value. For example anything you can pass into the `select` method
 * needs to implement an `AliasedExpression<T, A>`. `A` becomes the name of the selected expression
 * in the result and `T` becomes its type.
 *
 * ### Examples
 *
 * ```ts
 * import {
 *   AliasNode,
 *   type AliasedExpression,
 *   type Expression,
 *   IdentifierNode
 * } from 'kysely'
 *
 * class SomeAliasedExpression<T, A extends string> implements AliasedExpression<T, A> {
 *   #expression: Expression<T>
 *   #alias: A
 *
 *   constructor(expression: Expression<T>, alias: A) {
 *     this.#expression = expression
 *     this.#alias = alias
 *   }
 *
 *   get expression(): Expression<T> {
 *     return this.#expression
 *   }
 *
 *   get alias(): A {
 *     return this.#alias
 *   }
 *
 *   toOperationNode(): AliasNode {
 *     return AliasNode.create(
 *       this.#expression.toOperationNode(),
 *       IdentifierNode.create(this.#alias)
 *     )
 *   }
 * }
 * ```
 */
interface AliasedExpression<T, A extends string> extends OperationNodeSource {
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<T>;
    /**
     * Returns the alias.
     */
    get alias(): A | Expression<unknown>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
declare function isExpression(obj: unknown): obj is Expression<any>;
declare function isAliasedExpression(obj: unknown): obj is AliasedExpression<any, any>;

type ExplainFormat = 'text' | 'xml' | 'json' | 'yaml' | 'traditional' | 'tree';
interface Explainable {
    /**
     * Executes query with `explain` statement before the main query.
     *
     * ```ts
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json select * from `person` where `gender` = ?
     * ```
     *
     * You can also execute `explain analyze` statements.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json', sql`analyze`)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * explain (analyze, format json) select * from "person" where "gender" = $1
     * ```
     */
    explain<O extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<O[]>;
}

interface ExplainNode extends OperationNode {
    readonly kind: 'ExplainNode';
    readonly format?: ExplainFormat;
    readonly options?: OperationNode;
}
/**
 * @internal
 */
declare const ExplainNode: Readonly<{
    is(node: OperationNode): node is ExplainNode;
    create(format?: ExplainFormat, options?: OperationNode): ExplainNode;
}>;

type SetOperator = 'union' | 'intersect' | 'except';
interface SetOperationNode extends OperationNode {
    kind: 'SetOperationNode';
    operator: SetOperator;
    expression: OperationNode;
    all: boolean;
}
/**
 * @internal
 */
declare const SetOperationNode: Readonly<{
    is(node: OperationNode): node is SetOperationNode;
    create(operator: SetOperator, expression: OperationNode, all: boolean): SetOperationNode;
}>;

interface ValueNode extends OperationNode {
    readonly kind: 'ValueNode';
    readonly value: unknown;
    readonly immediate?: boolean;
}
/**
 * @internal
 */
declare const ValueNode: Readonly<{
    is(node: OperationNode): node is ValueNode;
    create(value: unknown): ValueNode;
    createImmediate(value: unknown): ValueNode;
}>;

type FetchModifier = 'only' | 'with ties';
interface FetchNode extends OperationNode {
    readonly kind: 'FetchNode';
    readonly rowCount: ValueNode;
    readonly modifier: FetchModifier;
}
/**
 * @internal
 */
declare const FetchNode: {
    is(node: OperationNode): node is FetchNode;
    create(rowCount: number | bigint, modifier: FetchModifier): FetchNode;
};

type TopModifier = 'percent' | 'with ties' | 'percent with ties';
interface TopNode extends OperationNode {
    readonly kind: 'TopNode';
    readonly expression: number | bigint;
    readonly modifiers?: TopModifier;
}
/**
 * @internal
 */
declare const TopNode: Readonly<{
    is(node: OperationNode): node is TopNode;
    create(expression: number | bigint, modifiers?: TopModifier): TopNode;
}>;

interface SelectQueryNode extends OperationNode {
    readonly kind: 'SelectQueryNode';
    readonly from?: FromNode;
    readonly selections?: ReadonlyArray<SelectionNode>;
    readonly distinctOn?: ReadonlyArray<OperationNode>;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly groupBy?: GroupByNode;
    readonly orderBy?: OrderByNode;
    readonly where?: WhereNode;
    readonly frontModifiers?: ReadonlyArray<SelectModifierNode>;
    readonly endModifiers?: ReadonlyArray<SelectModifierNode>;
    readonly limit?: LimitNode;
    readonly offset?: OffsetNode;
    readonly with?: WithNode;
    readonly having?: HavingNode;
    readonly explain?: ExplainNode;
    readonly setOperations?: ReadonlyArray<SetOperationNode>;
    readonly fetch?: FetchNode;
    readonly top?: TopNode;
}
/**
 * @internal
 */
declare const SelectQueryNode: Readonly<{
    is(node: OperationNode): node is SelectQueryNode;
    create(withNode?: WithNode): SelectQueryNode;
    createFrom(fromItems: ReadonlyArray<OperationNode>, withNode?: WithNode): SelectQueryNode;
    cloneWithSelections(select: SelectQueryNode, selections: ReadonlyArray<SelectionNode>): SelectQueryNode;
    cloneWithDistinctOn(select: SelectQueryNode, expressions: ReadonlyArray<OperationNode>): SelectQueryNode;
    cloneWithFrontModifier(select: SelectQueryNode, modifier: SelectModifierNode): SelectQueryNode;
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithOrderByItems: (node: SelectQueryNode, items: ReadonlyArray<OrderByItemNode>) => SelectQueryNode;
    cloneWithGroupByItems(selectNode: SelectQueryNode, items: ReadonlyArray<GroupByItemNode>): SelectQueryNode;
    cloneWithLimit(selectNode: SelectQueryNode, limit: LimitNode): SelectQueryNode;
    cloneWithOffset(selectNode: SelectQueryNode, offset: OffsetNode): SelectQueryNode;
    cloneWithFetch(selectNode: SelectQueryNode, fetch: FetchNode): SelectQueryNode;
    cloneWithHaving(selectNode: SelectQueryNode, operation: OperationNode): SelectQueryNode;
    cloneWithSetOperations(selectNode: SelectQueryNode, setOperations: ReadonlyArray<SetOperationNode>): SelectQueryNode;
    cloneWithoutSelections(select: SelectQueryNode): SelectQueryNode;
    cloneWithoutLimit(select: SelectQueryNode): SelectQueryNode;
    cloneWithoutOffset(select: SelectQueryNode): SelectQueryNode;
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithoutOrderBy: (node: SelectQueryNode) => SelectQueryNode;
    cloneWithoutGroupBy(select: SelectQueryNode): SelectQueryNode;
}>;

type CreateViewNodeParams = Omit<Partial<CreateViewNode>, 'kind' | 'name'>;
interface CreateViewNode extends OperationNode {
    readonly kind: 'CreateViewNode';
    readonly name: SchemableIdentifierNode;
    readonly temporary?: boolean;
    readonly materialized?: boolean;
    readonly orReplace?: boolean;
    readonly ifNotExists?: boolean;
    readonly columns?: ReadonlyArray<ColumnNode>;
    readonly as?: SelectQueryNode | RawNode;
}
/**
 * @internal
 */
declare const CreateViewNode: Readonly<{
    is(node: OperationNode): node is CreateViewNode;
    create(name: string): CreateViewNode;
    cloneWith(createView: CreateViewNode, params: CreateViewNodeParams): CreateViewNode;
}>;

type DropSchemaNodeParams = Omit<Partial<DropSchemaNode>, 'kind' | 'schema'>;
interface DropSchemaNode extends OperationNode {
    readonly kind: 'DropSchemaNode';
    readonly schema: IdentifierNode;
    readonly ifExists?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropSchemaNode: Readonly<{
    is(node: OperationNode): node is DropSchemaNode;
    create(schema: string, params?: DropSchemaNodeParams): DropSchemaNode;
    cloneWith(dropSchema: DropSchemaNode, params: DropSchemaNodeParams): DropSchemaNode;
}>;

type DropTablexNodeParams = Omit<Partial<DropTableNode>, 'kind' | 'table'>;
interface DropTableNode extends OperationNode {
    readonly kind: 'DropTableNode';
    readonly table: TableNode;
    readonly ifExists?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropTableNode: Readonly<{
    is(node: OperationNode): node is DropTableNode;
    create(table: TableNode, params?: DropTablexNodeParams): DropTableNode;
    cloneWith(dropIndex: DropTableNode, params: DropTablexNodeParams): DropTableNode;
}>;

type DropTypeNodeParams = Omit<Partial<DropTypeNode>, 'kind' | 'name'>;
interface DropTypeNode extends OperationNode {
    readonly kind: 'DropTypeNode';
    readonly name: SchemableIdentifierNode;
    readonly ifExists?: boolean;
}
/**
 * @internal
 */
declare const DropTypeNode: Readonly<{
    is(node: OperationNode): node is DropTypeNode;
    create(name: SchemableIdentifierNode): DropTypeNode;
    cloneWith(dropType: DropTypeNode, params: DropTypeNodeParams): DropTypeNode;
}>;

type DropViewNodeParams = Omit<Partial<DropViewNode>, 'kind' | 'name'>;
interface DropViewNode extends OperationNode {
    readonly kind: 'DropViewNode';
    readonly name: SchemableIdentifierNode;
    readonly ifExists?: boolean;
    readonly materialized?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropViewNode: Readonly<{
    is(node: OperationNode): node is DropViewNode;
    create(name: string): DropViewNode;
    cloneWith(dropView: DropViewNode, params: DropViewNodeParams): DropViewNode;
}>;

interface OutputNode extends OperationNode {
    readonly kind: 'OutputNode';
    readonly selections: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const OutputNode: Readonly<{
    is(node: OperationNode): node is OutputNode;
    create(selections: ReadonlyArray<OperationNode>): OutputNode;
    cloneWithSelections(output: OutputNode, selections: ReadonlyArray<OperationNode>): OutputNode;
}>;

interface ReturningNode extends OperationNode {
    readonly kind: 'ReturningNode';
    readonly selections: ReadonlyArray<SelectionNode>;
}
/**
 * @internal
 */
declare const ReturningNode: Readonly<{
    is(node: OperationNode): node is ReturningNode;
    create(selections: ReadonlyArray<SelectionNode>): ReturningNode;
    cloneWithSelections(returning: ReturningNode, selections: ReadonlyArray<SelectionNode>): ReturningNode;
}>;

interface WhenNode extends OperationNode {
    readonly kind: 'WhenNode';
    readonly condition: OperationNode;
    readonly result?: OperationNode;
}
/**
 * @internal
 */
declare const WhenNode: Readonly<{
    is(node: OperationNode): node is WhenNode;
    create(condition: OperationNode): WhenNode;
    cloneWithResult(whenNode: WhenNode, result: OperationNode): WhenNode;
}>;

interface MergeQueryNode extends OperationNode {
    readonly kind: 'MergeQueryNode';
    readonly into: TableNode | AliasNode;
    readonly using?: JoinNode;
    readonly whens?: ReadonlyArray<WhenNode>;
    readonly with?: WithNode;
    readonly top?: TopNode;
    readonly returning?: ReturningNode;
    readonly output?: OutputNode;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const MergeQueryNode: Readonly<{
    is(node: OperationNode): node is MergeQueryNode;
    create(into: TableNode | AliasNode, withNode?: WithNode): MergeQueryNode;
    cloneWithUsing(mergeNode: MergeQueryNode, using: JoinNode): MergeQueryNode;
    cloneWithWhen(mergeNode: MergeQueryNode, when: WhenNode): MergeQueryNode;
    cloneWithThen(mergeNode: MergeQueryNode, then: OperationNode): MergeQueryNode;
}>;

interface ColumnUpdateNode extends OperationNode {
    readonly kind: 'ColumnUpdateNode';
    readonly column: OperationNode;
    readonly value: OperationNode;
}
/**
 * @internal
 */
declare const ColumnUpdateNode: Readonly<{
    is(node: OperationNode): node is ColumnUpdateNode;
    create(column: OperationNode, value: OperationNode): ColumnUpdateNode;
}>;

type OnConflictNodeProps = Omit<OnConflictNode, 'kind' | 'indexWhere' | 'updateWhere'>;
interface OnConflictNode extends OperationNode {
    readonly kind: 'OnConflictNode';
    readonly columns?: ReadonlyArray<ColumnNode>;
    readonly constraint?: IdentifierNode;
    readonly indexExpression?: OperationNode;
    readonly indexWhere?: WhereNode;
    readonly updates?: ReadonlyArray<ColumnUpdateNode>;
    readonly updateWhere?: WhereNode;
    readonly doNothing?: boolean;
}
/**
 * @internal
 */
declare const OnConflictNode: Readonly<{
    is(node: OperationNode): node is OnConflictNode;
    create(): OnConflictNode;
    cloneWith(node: OnConflictNode, props: OnConflictNodeProps): OnConflictNode;
    cloneWithIndexWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithIndexOrWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithUpdateWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithUpdateOrWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithoutIndexWhere(node: OnConflictNode): OnConflictNode;
    cloneWithoutUpdateWhere(node: OnConflictNode): OnConflictNode;
}>;

type OnDuplicateKeyNodeProps = Omit<OnDuplicateKeyNode, 'kind'>;
interface OnDuplicateKeyNode extends OperationNode {
    readonly kind: 'OnDuplicateKeyNode';
    readonly updates: ReadonlyArray<ColumnUpdateNode>;
}
/**
 * @internal
 */
declare const OnDuplicateKeyNode: Readonly<{
    is(node: OperationNode): node is OnDuplicateKeyNode;
    create(updates: ReadonlyArray<ColumnUpdateNode>): OnDuplicateKeyNode;
}>;

interface OrActionNode extends OperationNode {
    readonly kind: 'OrActionNode';
    readonly action: string;
}
/**
 * @internal
 */
declare const OrActionNode: Readonly<{
    is(node: OperationNode): node is OrActionNode;
    create(action: string): OrActionNode;
}>;

type InsertQueryNodeProps = Omit<InsertQueryNode, 'kind' | 'into'>;
interface InsertQueryNode extends OperationNode {
    readonly kind: 'InsertQueryNode';
    readonly into?: TableNode;
    readonly columns?: ReadonlyArray<ColumnNode>;
    readonly values?: OperationNode;
    readonly returning?: ReturningNode;
    readonly onConflict?: OnConflictNode;
    readonly onDuplicateKey?: OnDuplicateKeyNode;
    readonly with?: WithNode;
    /** @deprecated use {@link orAction} instead. */
    readonly ignore?: boolean;
    readonly orAction?: OrActionNode;
    readonly replace?: boolean;
    readonly explain?: ExplainNode;
    readonly defaultValues?: boolean;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
    readonly top?: TopNode;
    readonly output?: OutputNode;
}
/**
 * @internal
 */
declare const InsertQueryNode: Readonly<{
    is(node: OperationNode): node is InsertQueryNode;
    create(into: TableNode, withNode?: WithNode, replace?: boolean): InsertQueryNode;
    createWithoutInto(): InsertQueryNode;
    cloneWith(insertQuery: InsertQueryNode, props: InsertQueryNodeProps): InsertQueryNode;
}>;

interface UpdateQueryNode extends OperationNode {
    readonly kind: 'UpdateQueryNode';
    readonly table?: OperationNode;
    readonly from?: FromNode;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly where?: WhereNode;
    readonly updates?: ReadonlyArray<ColumnUpdateNode>;
    readonly returning?: ReturningNode;
    readonly with?: WithNode;
    readonly explain?: ExplainNode;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
    readonly limit?: LimitNode;
    readonly top?: TopNode;
    readonly output?: OutputNode;
    readonly orderBy?: OrderByNode;
}
/**
 * @internal
 */
declare const UpdateQueryNode: Readonly<{
    is(node: OperationNode): node is UpdateQueryNode;
    create(tables: ReadonlyArray<OperationNode>, withNode?: WithNode): UpdateQueryNode;
    createWithoutTable(): UpdateQueryNode;
    cloneWithFromItems(updateQuery: UpdateQueryNode, fromItems: ReadonlyArray<OperationNode>): UpdateQueryNode;
    cloneWithUpdates(updateQuery: UpdateQueryNode, updates: ReadonlyArray<ColumnUpdateNode>): UpdateQueryNode;
    cloneWithLimit(updateQuery: UpdateQueryNode, limit: LimitNode): UpdateQueryNode;
}>;

interface UsingNode extends OperationNode {
    readonly kind: 'UsingNode';
    readonly tables: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const UsingNode: Readonly<{
    is(node: OperationNode): node is UsingNode;
    create(tables: ReadonlyArray<OperationNode>): UsingNode;
    cloneWithTables(using: UsingNode, tables: ReadonlyArray<OperationNode>): UsingNode;
}>;

interface DeleteQueryNode extends OperationNode {
    readonly kind: 'DeleteQueryNode';
    readonly from: FromNode;
    readonly using?: UsingNode;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly where?: WhereNode;
    readonly returning?: ReturningNode;
    readonly with?: WithNode;
    readonly orderBy?: OrderByNode;
    readonly limit?: LimitNode;
    readonly explain?: ExplainNode;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
    readonly top?: TopNode;
    readonly output?: OutputNode;
}
/**
 * @internal
 */
declare const DeleteQueryNode: Readonly<{
    is(node: OperationNode): node is DeleteQueryNode;
    create(fromItems: OperationNode[], withNode?: WithNode): DeleteQueryNode;
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithOrderByItems: (node: DeleteQueryNode, items: ReadonlyArray<OrderByItemNode>) => DeleteQueryNode;
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithoutOrderBy: (node: DeleteQueryNode) => DeleteQueryNode;
    cloneWithLimit(deleteNode: DeleteQueryNode, limit: LimitNode): DeleteQueryNode;
    cloneWithoutLimit(deleteNode: DeleteQueryNode): DeleteQueryNode;
    cloneWithUsing(deleteNode: DeleteQueryNode, tables: OperationNode[]): DeleteQueryNode;
}>;

type HasJoins = {
    joins?: ReadonlyArray<JoinNode>;
};
type HasWhere = {
    where?: WhereNode;
};
type HasReturning = {
    returning?: ReturningNode;
};
type HasExplain = {
    explain?: ExplainNode;
};
type HasTop = {
    top?: TopNode;
};
type HasOutput = {
    output?: OutputNode;
};
type HasEndModifiers = {
    endModifiers?: ReadonlyArray<OperationNode>;
};
type HasOrderBy = {
    orderBy?: OrderByNode;
};
type QueryNode = SelectQueryNode | InsertQueryNode | UpdateQueryNode | DeleteQueryNode | MergeQueryNode;
/**
 * @internal
 */
declare const QueryNode: Readonly<{
    is(node: OperationNode): node is QueryNode;
    cloneWithEndModifier<T extends HasEndModifiers>(node: T, modifier: OperationNode): T;
    cloneWithWhere<T extends HasWhere>(node: T, operation: OperationNode): T;
    cloneWithJoin<T extends HasJoins>(node: T, join: JoinNode): T;
    cloneWithReturning<T extends HasReturning>(node: T, selections: ReadonlyArray<SelectionNode>): T;
    cloneWithoutReturning<T extends HasReturning>(node: T): T;
    cloneWithoutWhere<T extends HasWhere>(node: T): T;
    cloneWithExplain<T extends HasExplain>(node: T, format: ExplainFormat | undefined, options: Expression<any> | undefined): T;
    cloneWithTop<T extends HasTop>(node: T, top: TopNode): T;
    cloneWithOutput<T extends HasOutput>(node: T, selections: ReadonlyArray<SelectionNode>): T;
    cloneWithOrderByItems<T extends HasOrderBy>(node: T, items: ReadonlyArray<OrderByItemNode>): T;
    cloneWithoutOrderBy<T extends HasOrderBy>(node: T): T;
}>;

type RefreshMaterializedViewNodeParams = Omit<Partial<RefreshMaterializedViewNode>, 'kind' | 'name'>;
interface RefreshMaterializedViewNode extends OperationNode {
    readonly kind: 'RefreshMaterializedViewNode';
    readonly name: SchemableIdentifierNode;
    readonly concurrently?: boolean;
    readonly withNoData?: boolean;
}
/**
 * @internal
 */
declare const RefreshMaterializedViewNode: Readonly<{
    is(node: OperationNode): node is RefreshMaterializedViewNode;
    create(name: string): RefreshMaterializedViewNode;
    cloneWith(createView: RefreshMaterializedViewNode, params: RefreshMaterializedViewNodeParams): RefreshMaterializedViewNode;
}>;

interface QueryId {
    readonly queryId: string;
}
declare function createQueryId(): QueryId;

interface CompiledQuery<O = unknown> {
    readonly query: RootOperationNode;
    readonly queryId: QueryId;
    readonly sql: string;
    readonly parameters: ReadonlyArray<unknown>;
}
declare const CompiledQuery: Readonly<{
    raw(sql: string, parameters?: unknown[]): CompiledQuery;
}>;

type RootOperationNode = QueryNode | CreateTableNode | CreateIndexNode | CreateSchemaNode | CreateViewNode | RefreshMaterializedViewNode | DropTableNode | DropIndexNode | DropSchemaNode | DropViewNode | AlterTableNode | RawNode | CreateTypeNode | DropTypeNode | MergeQueryNode;
/**
 * a `QueryCompiler` compiles a query expressed as a tree of `OperationNodes` into SQL.
 */
interface QueryCompiler {
    compileQuery(node: RootOperationNode, queryId: QueryId): CompiledQuery;
}

/**
 * A single connection to the database engine.
 *
 * These are created by an instance of {@link Driver}.
 */
interface DatabaseConnection {
    executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>>;
    streamQuery<R>(compiledQuery: CompiledQuery, chunkSize?: number): AsyncIterableIterator<QueryResult<R>>;
}
interface QueryResult<O> {
    /**
     * This is defined for insert, update, delete and merge queries and contains
     * the number of rows the query inserted/updated/deleted.
     */
    readonly numAffectedRows?: bigint;
    /**
     * This is defined for update queries and contains the number of rows
     * the query changed.
     *
     * This is **optional** and only provided in dialects such as MySQL.
     * You would probably use {@link numAffectedRows} in most cases.
     */
    readonly numChangedRows?: bigint;
    /**
     * This is defined for insert queries on dialects that return
     * the auto incrementing primary key from an insert.
     */
    readonly insertId?: bigint;
    /**
     * The rows returned by the query. This is always defined and is
     * empty if the query returned no rows.
     */
    readonly rows: O[];
}

/**
 * A Driver creates and releases {@link DatabaseConnection | database connections}
 * and is also responsible for connection pooling (if the dialect supports pooling).
 */
interface Driver {
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
     * Establishses a new savepoint within a transaction.
     */
    savepoint?(connection: DatabaseConnection, savepointName: string, compileQuery: QueryCompiler['compileQuery']): Promise<void>;
    /**
     * Rolls back to a savepoint within a transaction.
     */
    rollbackToSavepoint?(connection: DatabaseConnection, savepointName: string, compileQuery: QueryCompiler['compileQuery']): Promise<void>;
    /**
     * Releases a savepoint within a transaction.
     */
    releaseSavepoint?(connection: DatabaseConnection, savepointName: string, compileQuery: QueryCompiler['compileQuery']): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: DatabaseConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
interface TransactionSettings {
    readonly accessMode?: AccessMode;
    readonly isolationLevel?: IsolationLevel;
}
declare const TRANSACTION_ACCESS_MODES: readonly ["read only", "read write"];
type AccessMode = ArrayItemType<typeof TRANSACTION_ACCESS_MODES>;
declare const TRANSACTION_ISOLATION_LEVELS: readonly ["read uncommitted", "read committed", "repeatable read", "serializable", "snapshot"];
type IsolationLevel = ArrayItemType<typeof TRANSACTION_ISOLATION_LEVELS>;
declare function validateTransactionSettings(settings: TransactionSettings): void;

/**
 * An interface for getting the database metadata (names of the tables and columns etc.)
 */
interface DatabaseIntrospector {
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
interface DatabaseMetadataOptions {
    /**
     * If this is true, the metadata contains the internal kysely tables
     * such as the migration tables.
     */
    withInternalKyselyTables: boolean;
}
interface SchemaMetadata {
    readonly name: string;
}
interface DatabaseMetadata {
    /**
     * The tables and views found in the database.
     * The propery isView can be used to tell them apart.
     */
    readonly tables: TableMetadata[];
}
interface TableMetadata {
    readonly name: string;
    readonly isView: boolean;
    readonly columns: ColumnMetadata[];
    readonly schema?: string;
}
interface ColumnMetadata {
    readonly name: string;
    /**
     * The data type of the column as reported by the database.
     *
     * NOTE: This value is whatever the database engine returns and it will be
     *       different on different dialects even if you run the same migrations.
     *       For example `integer` datatype in a migration will produce `int4`
     *       on PostgreSQL, `INTEGER` on SQLite and `int` on MySQL.
     */
    readonly dataType: string;
    /**
     * The schema this column's data type was created in.
     */
    readonly dataTypeSchema?: string;
    readonly isAutoIncrementing: boolean;
    readonly isNullable: boolean;
    readonly hasDefaultValue: boolean;
    readonly comment?: string;
}

/**
 * A `DialectAdapter` encapsulates all differences between dialects outside
 * of `Driver` and `QueryCompiler`.
 *
 * For example, some databases support transactional DDL and therefore we want
 * to run migrations inside a transaction, while other databases don't support
 * it. For that there's a `supportsTransactionalDdl` boolean in this interface.
 */
interface DialectAdapter {
    /**
     * Whether or not this dialect supports `if not exists` in creation of tables/schemas/views/etc.
     *
     * If this is false, Kysely's internal migrations tables and schemas are created
     * without `if not exists` in migrations. This is not a problem if the dialect
     * supports transactional DDL.
     */
    readonly supportsCreateIfNotExists: boolean;
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    readonly supportsTransactionalDdl: boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    readonly supportsReturning: boolean;
    /**
     * Whether or not this dialect supports the `output` clause in inserts
     * updates and deletes.
     */
    readonly supportsOutput?: boolean;
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
     * import { DialectAdapterBase, type MigrationLockOptions, Kysely } from 'kysely'
     *
     * export class MyAdapter extends DialectAdapterBase {
     *   override async acquireMigrationLock(
     *     db: Kysely<any>,
     *     options: MigrationLockOptions
     *   ): Promise<void> {
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
     *
     *   override async releaseMigrationLock() {
     *     // noop
     *   }
     * }
     * ```
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>, options: MigrationLockOptions): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(db: Kysely<any>, options: MigrationLockOptions): Promise<void>;
}
interface MigrationLockOptions {
    /**
     * The name of the migration lock table.
     */
    readonly lockTable: string;
    /**
     * The id of the only row in the migration lock table.
     */
    readonly lockRowId: string;
    /**
     * The schema in which the migration lock table lives. This is only
     * defined if the user has specified a custom schema in the migration
     * settings.
     */
    readonly lockTableSchema?: string;
}

/**
 * A Dialect is the glue between Kysely and the underlying database engine.
 *
 * See the built-in {@link PostgresDialect} as an example of a dialect.
 * Users can implement their own dialects and use them by passing it
 * in the {@link KyselyConfig.dialect} property.
 */
interface Dialect {
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

interface ConnectionProvider {
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
}

interface KyselyPlugin {
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
     * import type {
     *   KyselyPlugin,
     *   QueryResult,
     *   RootOperationNode,
     *   UnknownRow
     * } from 'kysely'
     *
     * interface MyData {
     *   // ...
     * }
     * const data = new WeakMap<any, MyData>()
     *
     * const plugin = {
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     const something: MyData = {}
     *
     *     // ...
     *
     *     data.set(args.queryId, something)
     *
     *     // ...
     *
     *     return args.node
     *   },
     *
     *   async transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>> {
     *     // ...
     *
     *     const something = data.get(args.queryId)
     *
     *     // ...
     *
     *     return args.result
     *   }
     * } satisfies KyselyPlugin
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
interface PluginTransformQueryArgs {
    readonly queryId: QueryId;
    readonly node: RootOperationNode;
}
interface PluginTransformResultArgs {
    readonly queryId: QueryId;
    readonly result: QueryResult<UnknownRow>;
}

/**
 * This interface abstracts away the details of how to compile a query into SQL
 * and execute it. Instead of passing around all those details, {@link SelectQueryBuilder}
 * and other classes that execute queries can just pass around and instance of
 * `QueryExecutor`.
 */
interface QueryExecutor extends ConnectionProvider {
    /**
     * Returns the adapter for the current dialect.
     */
    get adapter(): DialectAdapter;
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
    compileQuery<R = unknown>(node: RootOperationNode, queryId: QueryId): CompiledQuery<R>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method.
     */
    executeQuery<R>(compiledQuery: CompiledQuery<R>): Promise<QueryResult<R>>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method. Results are streamead instead of loaded
     * at once.
     */
    stream<R>(compiledQuery: CompiledQuery<R>, 
    /**
     * How many rows should be pulled from the database at once. Supported
     * only by the postgres driver.
     */
    chunkSize: number): AsyncIterableIterator<QueryResult<R>>;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    withConnectionProvider(connectionProvider: ConnectionProvider): QueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    withPlugin(plugin: KyselyPlugin): QueryExecutor;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    withPlugins(plugin: ReadonlyArray<KyselyPlugin>): QueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    withPluginAtFront(plugin: KyselyPlugin): QueryExecutor;
    /**
     * Returns a copy of this executor without any plugins.
     */
    withoutPlugins(): QueryExecutor;
}

interface Compilable<O = unknown> {
    compile(): CompiledQuery<O>;
}
declare function isCompilable(value: unknown): value is Compilable;

type DefaultValueExpression = unknown | Expression<unknown>;

declare class ColumnDefinitionBuilder implements OperationNodeSource {
    #private;
    constructor(node: ColumnDefinitionNode);
    /**
     * Adds `auto_increment` or `autoincrement` to the column definition
     * depending on the dialect.
     *
     * Some dialects like PostgreSQL don't support this. On PostgreSQL
     * you can use the `serial` or `bigserial` data type instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key auto_increment
     * )
     * ```
     */
    autoIncrement(): ColumnDefinitionBuilder;
    /**
     * Makes the column an identity column.
     *
     * This only works on some dialects like MS SQL Server (MSSQL).
     *
     * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.identity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer identity primary key
     * )
     * ```
     */
    identity(): ColumnDefinitionBuilder;
    /**
     * Makes the column the primary key.
     *
     * If you want to specify a composite primary key use the
     * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key
     * )
     */
    primaryKey(): ColumnDefinitionBuilder;
    /**
     * Adds a foreign key constraint for the column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id")
     * )
     * ```
     */
    references(ref: string): ColumnDefinitionBuilder;
    /**
     * Adds an `on delete` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on delete cascade
     * )
     * ```
     */
    onDelete(onDelete: OnModifyForeignAction): ColumnDefinitionBuilder;
    /**
     * Adds an `on update` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onUpdate('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on update cascade
     * )
     * ```
     */
    onUpdate(onUpdate: OnModifyForeignAction): ColumnDefinitionBuilder;
    /**
     * Adds a unique constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `email` varchar(255) unique
     * )
     * ```
     */
    unique(): ColumnDefinitionBuilder;
    /**
     * Adds a `not null` constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `first_name` varchar(255) not null
     * )
     * ```
     */
    notNull(): ColumnDefinitionBuilder;
    /**
     * Adds a `unsigned` modifier for the column.
     *
     * This only works on some dialects like MySQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('age', 'integer', col => col.unsigned())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `age` integer unsigned
     * )
     * ```
     */
    unsigned(): ColumnDefinitionBuilder;
    /**
     * Adds a default value constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer default 4
     * )
     * ```
     *
     * Values passed to `defaultTo` are interpreted as value literals by default. You can define
     * an arbitrary SQL expression using the {@link sql} template tag:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'created_at',
     *     'timestamp',
     *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `created_at` timestamp default CURRENT_TIMESTAMP
     * )
     * ```
     */
    defaultTo(value: DefaultValueExpression): ColumnDefinitionBuilder;
    /**
     * Adds a check constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) =>
     *     col.check(sql`number_of_legs < 5`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer check (number_of_legs < 5)
     * )
     * ```
     */
    check(expression: Expression<any>): ColumnDefinitionBuilder;
    /**
     * Makes the column a generated column using a `generated always as` statement.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)',
     *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
     * )
     * ```
     */
    generatedAlwaysAs(expression: Expression<any>): ColumnDefinitionBuilder;
    /**
     * Adds the `generated always as identity` specifier.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated always as identity primary key
     * )
     * ```
     */
    generatedAlwaysAsIdentity(): ColumnDefinitionBuilder;
    /**
     * Adds the `generated by default as identity` specifier on supported dialects.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated by default as identity primary key
     * )
     * ```
     */
    generatedByDefaultAsIdentity(): ColumnDefinitionBuilder;
    /**
     * Makes a generated column stored instead of virtual. This method can only
     * be used with {@link generatedAlwaysAs}
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)', (col) => col
     *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *     .stored()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
     * )
     * ```
     */
    stored(): ColumnDefinitionBuilder;
    /**
     * This can be used to add any additional SQL right after the column's data type.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'first_name',
     *     'varchar(36)',
     *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(36) collate utf8mb4_general_ci not null
     * )
     * ```
     */
    modifyFront(modifier: Expression<any>): ColumnDefinitionBuilder;
    /**
     * Adds `nulls not distinct` specifier.
     * Should be used with `unique` constraint.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(30) unique nulls not distinct
     * )
     * ```
     */
    nullsNotDistinct(): ColumnDefinitionBuilder;
    /**
     * Adds `if not exists` specifier. This only works for PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * alter table "person" add column if not exists "email" varchar(255) unique
     * ```
     */
    ifNotExists(): ColumnDefinitionBuilder;
    /**
     * This can be used to add any additional SQL to the end of the column definition.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'age',
     *     'integer',
     *     col => col.unsigned()
     *       .notNull()
     *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
     * )
     * ```
     */
    modifyEnd(modifier: Expression<any>): ColumnDefinitionBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): ColumnDefinitionNode;
}
type ColumnDefinitionBuilderCallback = (builder: ColumnDefinitionBuilder) => ColumnDefinitionBuilder;

declare const SIMPLE_COLUMN_DATA_TYPES: readonly ["varchar", "char", "text", "integer", "int2", "int4", "int8", "smallint", "bigint", "boolean", "real", "double precision", "float4", "float8", "decimal", "numeric", "binary", "bytea", "date", "datetime", "time", "timetz", "timestamp", "timestamptz", "serial", "bigserial", "uuid", "json", "jsonb", "blob", "varbinary", "int4range", "int4multirange", "int8range", "int8multirange", "numrange", "nummultirange", "tsrange", "tsmultirange", "tstzrange", "tstzmultirange", "daterange", "datemultirange"];
type SimpleColumnDataType = (typeof SIMPLE_COLUMN_DATA_TYPES)[number];
type ColumnDataType = SimpleColumnDataType | `varchar(${number})` | `char(${number})` | `decimal(${number}, ${number})` | `numeric(${number}, ${number})` | `binary(${number})` | `datetime(${number})` | `time(${number})` | `timetz(${number})` | `timestamp(${number})` | `timestamptz(${number})` | `varbinary(${number})`;
type DataTypeParams = Omit<DataTypeNode, 'kind' | 'dataType'>;
interface DataTypeNode extends OperationNode {
    readonly kind: 'DataTypeNode';
    readonly dataType: ColumnDataType;
}
/**
 * @internal
 */
declare const DataTypeNode: Readonly<{
    is(node: OperationNode): node is DataTypeNode;
    create(dataType: ColumnDataType): DataTypeNode;
}>;
declare function isColumnDataType(dataType: string): dataType is ColumnDataType;

type DataTypeExpression = ColumnDataType | Expression<any>;

interface ForeignKeyConstraintBuilderInterface<R> {
    onDelete(onDelete: OnModifyForeignAction): R;
    onUpdate(onUpdate: OnModifyForeignAction): R;
    deferrable(): R;
    notDeferrable(): R;
    initiallyDeferred(): R;
    initiallyImmediate(): R;
}
declare class ForeignKeyConstraintBuilder implements ForeignKeyConstraintBuilderInterface<ForeignKeyConstraintBuilder>, OperationNodeSource {
    #private;
    constructor(node: ForeignKeyConstraintNode);
    onDelete(onDelete: OnModifyForeignAction): ForeignKeyConstraintBuilder;
    onUpdate(onUpdate: OnModifyForeignAction): ForeignKeyConstraintBuilder;
    deferrable(): ForeignKeyConstraintBuilder;
    notDeferrable(): ForeignKeyConstraintBuilder;
    initiallyDeferred(): ForeignKeyConstraintBuilder;
    initiallyImmediate(): ForeignKeyConstraintBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): ForeignKeyConstraintNode;
}
type ForeignKeyConstraintBuilderCallback = (builder: ForeignKeyConstraintBuilder) => ForeignKeyConstraintBuilder;

declare class AlterColumnBuilder {
    #private;
    constructor(column: string);
    setDataType(dataType: DataTypeExpression): AlteredColumnBuilder;
    setDefault(value: DefaultValueExpression): AlteredColumnBuilder;
    dropDefault(): AlteredColumnBuilder;
    setNotNull(): AlteredColumnBuilder;
    dropNotNull(): AlteredColumnBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
}
/**
 * Allows us to force consumers to do exactly one alteration to a column.
 *
 * One cannot do no alterations:
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .execute() // Property 'execute' does not exist on type 'AlteredColumnBuilder'.
 * ```
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .alterColumn('age', (ac) => ac) // Type 'AlterColumnBuilder' is not assignable to type 'AlteredColumnBuilder'.
 * //  .execute()
 * ```
 *
 * One cannot do multiple alterations:
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .alterColumn('age', (ac) => ac.dropNotNull().setNotNull()) // Property 'setNotNull' does not exist on type 'AlteredColumnBuilder'.
 * //  .execute()
 * ```
 *
 * Which would now throw a compilation error, instead of a runtime error.
 */
declare class AlteredColumnBuilder implements OperationNodeSource {
    #private;
    constructor(alterColumnNode: AlterColumnNode);
    toOperationNode(): AlterColumnNode;
}
type AlterColumnBuilderCallback = (builder: AlterColumnBuilder) => AlteredColumnBuilder;

declare class AlterTableExecutor implements OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableExecutorProps);
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableExecutorProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: AlterTableNode;
}

declare class AlterTableAddForeignKeyConstraintBuilder implements ForeignKeyConstraintBuilderInterface<AlterTableAddForeignKeyConstraintBuilder>, OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableAddForeignKeyConstraintBuilderProps);
    onDelete(onDelete: OnModifyForeignAction): AlterTableAddForeignKeyConstraintBuilder;
    onUpdate(onUpdate: OnModifyForeignAction): AlterTableAddForeignKeyConstraintBuilder;
    deferrable(): AlterTableAddForeignKeyConstraintBuilder;
    notDeferrable(): AlterTableAddForeignKeyConstraintBuilder;
    initiallyDeferred(): AlterTableAddForeignKeyConstraintBuilder;
    initiallyImmediate(): AlterTableAddForeignKeyConstraintBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableAddForeignKeyConstraintBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: AlterTableNode;
    readonly constraintBuilder: ForeignKeyConstraintBuilder;
}

declare class AlterTableDropConstraintBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableDropConstraintBuilderProps);
    ifExists(): AlterTableDropConstraintBuilder;
    cascade(): AlterTableDropConstraintBuilder;
    restrict(): AlterTableDropConstraintBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableDropConstraintBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: AlterTableNode;
}

interface SelectQueryBuilderExpression<O> extends AliasableExpression<O> {
    get isSelectQueryBuilder(): true;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): SelectQueryNode;
}

declare const COMPARISON_OPERATORS: readonly ["=", "==", "!=", "<>", ">", ">=", "<", "<=", "in", "not in", "is", "is not", "like", "not like", "match", "ilike", "not ilike", "@>", "<@", "^@", "&&", "?", "?&", "?|", "!<", "!>", "<=>", "!~", "~", "~*", "!~*", "@@", "@@@", "!!", "<->", "regexp", "is distinct from", "is not distinct from"];
declare const ARITHMETIC_OPERATORS: readonly ["+", "-", "*", "/", "%", "^", "&", "|", "#", "<<", ">>"];
declare const JSON_OPERATORS: readonly ["->", "->>"];
declare const BINARY_OPERATORS: readonly ["=", "==", "!=", "<>", ">", ">=", "<", "<=", "in", "not in", "is", "is not", "like", "not like", "match", "ilike", "not ilike", "@>", "<@", "^@", "&&", "?", "?&", "?|", "!<", "!>", "<=>", "!~", "~", "~*", "!~*", "@@", "@@@", "!!", "<->", "regexp", "is distinct from", "is not distinct from", "+", "-", "*", "/", "%", "^", "&", "|", "#", "<<", ">>", "&&", "||"];
declare const UNARY_FILTER_OPERATORS: readonly ["exists", "not exists"];
declare const UNARY_OPERATORS: readonly ["not", "-", "exists", "not exists"];
declare const OPERATORS: readonly ["=", "==", "!=", "<>", ">", ">=", "<", "<=", "in", "not in", "is", "is not", "like", "not like", "match", "ilike", "not ilike", "@>", "<@", "^@", "&&", "?", "?&", "?|", "!<", "!>", "<=>", "!~", "~", "~*", "!~*", "@@", "@@@", "!!", "<->", "regexp", "is distinct from", "is not distinct from", "+", "-", "*", "/", "%", "^", "&", "|", "#", "<<", ">>", "&&", "||", "->", "->>", "not", "-", "exists", "not exists", "between", "between symmetric"];
type ComparisonOperator = (typeof COMPARISON_OPERATORS)[number];
type ArithmeticOperator = (typeof ARITHMETIC_OPERATORS)[number];
type JSONOperator = (typeof JSON_OPERATORS)[number];
type JSONOperatorWith$ = JSONOperator | `${JSONOperator}$`;
type BinaryOperator = (typeof BINARY_OPERATORS)[number];
type UnaryOperator = (typeof UNARY_OPERATORS)[number];
type UnaryFilterOperator = (typeof UNARY_FILTER_OPERATORS)[number];
type Operator = (typeof OPERATORS)[number];
interface OperatorNode extends OperationNode {
    readonly kind: 'OperatorNode';
    readonly operator: Operator;
}
/**
 * @internal
 */
declare const OperatorNode: Readonly<{
    is(node: OperationNode): node is OperatorNode;
    create(operator: Operator): OperatorNode;
}>;
declare function isOperator(op: unknown): op is Operator;
declare function isBinaryOperator(op: unknown): op is BinaryOperator;
declare function isComparisonOperator(op: unknown): op is ComparisonOperator;
declare function isArithmeticOperator(op: unknown): op is ArithmeticOperator;
declare function isJSONOperator(op: unknown): op is JSONOperator;

type ValueExpression<DB, TB extends keyof DB, V> = V | ExpressionOrFactory<DB, TB, V>;
type ValueExpressionOrList<DB, TB extends keyof DB, V> = ValueExpression<DB, TB, V> | ReadonlyArray<ValueExpression<DB, TB, V>>;
type ExtractTypeFromValueExpression<VE> = VE extends SelectQueryBuilderExpression<Record<string, infer SV>> ? SV : VE extends Expression<infer V> ? V : VE;

/**
 * This type can be used to specify a different type for
 * select, insert and update operations.
 *
 * Also see the {@link Generated} type.
 *
 * ### Examples
 *
 * The next example defines a number column that is optional
 * in inserts and updates. All columns are always optional
 * in updates so therefore we don't need to specify `undefined`
 * for the update type. The type below is useful for all kinds of
 * database generated columns like identifiers. The `Generated`
 * type is actually just a shortcut for the type in this example:
 *
 * ```ts
 * type GeneratedNumber = ColumnType<number, number | undefined, number>
 * ```
 *
 * The above example makes the column optional in inserts
 * and updates, but you can still choose to provide the
 * column. If you want to prevent insertion/update you
 * can se the type as `never`:
 *
 * ```ts
 * type ReadonlyNumber = ColumnType<number, never, never>
 * ```
 *
 * Here's one more example where the type is different
 * for each different operation:
 *
 * ```ts
 * type UnupdateableDate = ColumnType<Date, string, never>
 * ```
 */
type ColumnType<SelectType, InsertType = SelectType, UpdateType = SelectType> = {
    readonly __select__: SelectType;
    readonly __insert__: InsertType;
    readonly __update__: UpdateType;
};
/**
 * A shortcut for defining database-generated columns. The type
 * is the same for all selects, inserts and updates but the
 * column is optional for inserts and updates.
 *
 * The update type is `S` instead of `S | undefined` because updates are always
 * optional --> no need to specify optionality.
 * ```
 */
type Generated<S> = ColumnType<S, S | undefined, S>;
/**
 * A shortcut for defining columns that are only database-generated
 * (like postgres GENERATED ALWAYS AS IDENTITY). No insert/update
 * is allowed.
 */
type GeneratedAlways<S> = ColumnType<S, never, never>;
/**
 * A shortcut for defining JSON columns, which are by default inserted/updated
 * as stringified JSON strings.
 */
type JSONColumnType<SelectType extends object | null, InsertType = string, UpdateType = string> = ColumnType<SelectType, InsertType, UpdateType>;
/**
 * Evaluates to `K` if `T` can be `null` or `undefined`.
 */
type IfNullable<T, K> = undefined extends T ? K : null extends T ? K : never;
/**
 * Evaluates to `K` if `T` can't be `null` or `undefined`.
 */
type IfNotNullable<T, K> = undefined extends T ? never : null extends T ? never : T extends never ? never : K;
/**
 * Evaluates to `K` if `T` isn't `never`.
 */
type IfNotNever<T, K> = T extends never ? never : K;
type SelectType<T> = T extends ColumnType<infer S, any, any> ? S : T;
type InsertType<T> = T extends ColumnType<any, infer I, any> ? I : T;
type UpdateType<T> = T extends ColumnType<any, any, infer U> ? U : T;
/**
 * Keys of `R` whose `InsertType` values can be `null` or `undefined`.
 */
type NullableInsertKeys<R> = {
    [K in keyof R]: IfNullable<InsertType<R[K]>, K>;
}[keyof R];
/**
 * Keys of `R` whose `InsertType` values can't be `null` or `undefined`.
 */
type NonNullableInsertKeys<R> = {
    [K in keyof R]: IfNotNullable<InsertType<R[K]>, K>;
}[keyof R];
/**
 * Keys of `R` whose `SelectType` values are not `never`
 */
type NonNeverSelectKeys<R> = {
    [K in keyof R]: IfNotNever<SelectType<R[K]>, K>;
}[keyof R];
/**
 * Keys of `R` whose `UpdateType` values are not `never`
 */
type UpdateKeys<R> = {
    [K in keyof R]: IfNotNever<UpdateType<R[K]>, K>;
}[keyof R];
/**
 * Given a table interface, extracts the select type from all
 * {@link ColumnType} types.
 *
 * ### Examples
 *
 * ```ts
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   modified_at: ColumnType<Date, string, never>
 * }
 *
 * type Person = Selectable<PersonTable>
 * // {
 * //   id: number,
 * //   first_name: string
 * //   modified_at: Date
 * // }
 * ```
 */
type Selectable<R> = DrainOuterGeneric<{
    [K in NonNeverSelectKeys<R>]: SelectType<R[K]>;
}>;
/**
 * Given a table interface, extracts the insert type from all
 * {@link ColumnType} types.
 *
 * ### Examples
 *
 * ```ts
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   modified_at: ColumnType<Date, string, never>
 * }
 *
 * type InsertablePerson = Insertable<PersonTable>
 * // {
 * //   id?: number,
 * //   first_name: string
 * //   modified_at: string
 * // }
 * ```
 */
type Insertable<R> = DrainOuterGeneric<{
    [K in NonNullableInsertKeys<R>]: InsertType<R[K]>;
} & {
    [K in NullableInsertKeys<R>]?: InsertType<R[K]>;
}>;
/**
 * Given a table interface, extracts the update type from all
 * {@link ColumnType} types.
 *
 * ### Examples
 *
 * ```ts
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   modified_at: ColumnType<Date, string, never>
 * }
 *
 * type UpdateablePerson = Updateable<PersonTable>
 * // {
 * //   id?: number,
 * //   first_name?: string
 * // }
 * ```
 */
type Updateable<R> = DrainOuterGeneric<{
    [K in UpdateKeys<R>]?: UpdateType<R[K]>;
}>;

type OperandValueExpression<DB, TB extends keyof DB, RE> = ValueExpression<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
type OperandValueExpressionOrList<DB, TB extends keyof DB, RE> = ValueExpressionOrList<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE> | null>;
type BinaryOperatorExpression = BinaryOperator | Expression<unknown>;
type ComparisonOperatorExpression = ComparisonOperator | Expression<unknown>;
type FilterObject<DB, TB extends keyof DB> = {
    [R in StringReference<DB, TB>]?: ValueExpressionOrList<DB, TB, SelectType<ExtractTypeFromStringReference<DB, TB, R>>>;
};

declare class JoinBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: JoinBuilderProps);
    /**
     * Just like {@link WhereInterface.where} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.where} for documentation and examples.
     */
    on<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): JoinBuilder<DB, TB>;
    on(expression: ExpressionOrFactory<DB, TB, SqlBool>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */
    onRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Adds `on true`.
     */
    onTrue(): JoinBuilder<DB, TB>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): JoinNode;
}
interface JoinBuilderProps {
    readonly joinNode: JoinNode;
}

declare class DynamicTableBuilder<T extends string> {
    #private;
    get table(): T;
    constructor(table: T);
    as<A extends string>(alias: A): AliasedDynamicTableBuilder<T, A>;
}
declare class AliasedDynamicTableBuilder<T extends string, A extends string> implements OperationNodeSource {
    #private;
    get table(): T;
    get alias(): A;
    constructor(table: T, alias: A);
    toOperationNode(): AliasNode;
}

type TableExpression<DB, TB extends keyof DB> = AnyAliasedTable<DB> | AnyTable<DB> | AliasedExpressionOrFactory<DB, TB> | AliasedDynamicTableBuilder<any, any>;
type TableExpressionOrList<DB, TB extends keyof DB> = TableExpression<DB, TB> | ReadonlyArray<TableExpression<DB, TB>>;
type SimpleTableReference<DB> = AnyAliasedTable<DB> | AnyTable<DB>;
type AnyAliasedTable<DB> = `${AnyTable<DB>} as ${string}`;
type AnyTable<DB> = keyof DB & string;
type From<DB, TE> = DrainOuterGeneric<{
    [C in keyof DB | ExtractAliasFromTableExpression<DB, TE>]: C extends ExtractAliasFromTableExpression<DB, TE> ? ExtractRowTypeFromTableExpression<DB, TE, C> : C extends keyof DB ? DB[C] : never;
}>;
type FromTables<DB, TB extends keyof DB, TE> = DrainOuterGeneric<TB | ExtractAliasFromTableExpression<DB, TE>>;
type ExtractTableAlias<DB, TE> = TE extends `${string} as ${infer TA}` ? TA extends keyof DB ? TA : never : TE extends keyof DB ? TE : never;
type ExtractAliasFromTableExpression<DB, TE> = TE extends string ? TE extends `${string} as ${infer TA}` ? TA : TE extends keyof DB ? TE : never : TE extends AliasedExpression<any, infer QA> ? QA : TE extends (qb: any) => AliasedExpression<any, infer QA> ? QA : TE extends AliasedDynamicTableBuilder<any, infer DA> ? DA : never;
type ExtractRowTypeFromTableExpression<DB, TE, A extends keyof any> = TE extends `${infer T} as ${infer TA}` ? TA extends A ? T extends keyof DB ? DB[T] : never : never : TE extends A ? TE extends keyof DB ? DB[TE] : never : TE extends AliasedExpression<infer O, infer QA> ? QA extends A ? O : never : TE extends (qb: any) => AliasedExpression<infer O, infer QA> ? QA extends A ? O : never : TE extends AliasedDynamicTableBuilder<infer T, infer DA> ? DA extends A ? T extends keyof DB ? DB[T] : never : never : never;

type JoinReferenceExpression<DB, TB extends keyof DB, TE> = DrainOuterGeneric<AnyJoinColumn<DB, TB, TE> | AnyJoinColumnWithTable<DB, TB, TE>>;
type JoinCallbackExpression<DB, TB extends keyof DB, TE> = (join: JoinBuilder<From<DB, TE>, FromTables<DB, TB, TE>>) => JoinBuilder<any, any>;
type AnyJoinColumn<DB, TB extends keyof DB, TE> = AnyColumn<From<DB, TE>, FromTables<DB, TB, TE>>;
type AnyJoinColumnWithTable<DB, TB extends keyof DB, TE> = AnyColumnWithTable<From<DB, TE>, FromTables<DB, TB, TE>>;

declare class DynamicReferenceBuilder<R extends string = never> implements OperationNodeSource {
    #private;
    get dynamicReference(): string;
    /**
     * @private
     *
     * This needs to be here just so that the typings work. Without this
     * the generated .d.ts file contains no reference to the type param R
     * which causes this type to be equal to DynamicReferenceBuilder with
     * any R.
     */
    protected get refType(): R;
    constructor(reference: string);
    toOperationNode(): SimpleReferenceExpressionNode;
}

type SelectExpression<DB, TB extends keyof DB> = AnyAliasedColumnWithTable<DB, TB> | AnyAliasedColumn<DB, TB> | AnyColumnWithTable<DB, TB> | AnyColumn<DB, TB> | DynamicReferenceBuilder<any> | AliasedExpressionOrFactory<DB, TB>;
type SelectCallback<DB, TB extends keyof DB> = (eb: ExpressionBuilder<DB, TB>) => ReadonlyArray<SelectExpression<DB, TB>>;
/**
 * Turns a SelectExpression or a union of them into a selection object.
 */
type Selection<DB, TB extends keyof DB, SE> = [DB] extends [unknown] ? {
    [E in FlattenSelectExpression<SE> as ExtractAliasFromSelectExpression<E>]: SelectType<ExtractTypeFromSelectExpression<DB, TB, E>>;
} : {};
/**
 * Turns a SelectCallback into a selection object.
 */
type CallbackSelection<DB, TB extends keyof DB, CB> = CB extends (eb: any) => ReadonlyArray<infer SE> ? Selection<DB, TB, SE> : never;
type SelectArg<DB, TB extends keyof DB, SE extends SelectExpression<DB, TB>> = SE | ReadonlyArray<SE> | ((eb: ExpressionBuilder<DB, TB>) => ReadonlyArray<SE>);
type FlattenSelectExpression<SE> = SE extends DynamicReferenceBuilder<infer RA> ? {
    [R in RA]: DynamicReferenceBuilder<R>;
}[RA] : SE;
type ExtractAliasFromSelectExpression<SE> = SE extends string ? ExtractAliasFromStringSelectExpression<SE> : SE extends AliasedExpression<any, infer EA> ? EA : SE extends (qb: any) => AliasedExpression<any, infer EA> ? EA : SE extends DynamicReferenceBuilder<infer RA> ? ExtractAliasFromStringSelectExpression<RA> : never;
type ExtractAliasFromStringSelectExpression<SE extends string> = SE extends `${string}.${string}.${string} as ${infer A}` ? A : SE extends `${string}.${string} as ${infer A}` ? A : SE extends `${string} as ${infer A}` ? A : SE extends `${string}.${string}.${infer C}` ? C : SE extends `${string}.${infer C}` ? C : SE;
type ExtractTypeFromSelectExpression<DB, TB extends keyof DB, SE> = SE extends string ? ExtractTypeFromStringSelectExpression<DB, TB, SE> : SE extends AliasedSelectQueryBuilder<infer O, any> ? O[keyof O] | null : SE extends (eb: any) => AliasedSelectQueryBuilder<infer O, any> ? O[keyof O] | null : SE extends AliasedExpression<infer O, any> ? O : SE extends (eb: any) => AliasedExpression<infer O, any> ? O : SE extends DynamicReferenceBuilder<infer RA> ? ExtractTypeFromStringSelectExpression<DB, TB, RA> | undefined : never;
type ExtractTypeFromStringSelectExpression<DB, TB extends keyof DB, SE extends string> = SE extends `${infer SC}.${infer T}.${infer C} as ${string}` ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : SE extends `${infer T}.${infer C} as ${string}` ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : SE extends `${infer C} as ${string}` ? C extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, C> : never : SE extends `${infer SC}.${infer T}.${infer C}` ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : SE extends `${infer T}.${infer C}` ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : SE extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, SE> : never;
type AllSelection<DB, TB extends keyof DB> = DrainOuterGeneric<{
    [C in AnyColumn<DB, TB>]: {
        [T in TB]: SelectType<C extends keyof DB[T] ? DB[T][C] : never>;
    }[TB];
}>;

type Collation = 'nocase' | 'binary' | 'rtrim' | (string & {});

declare class OrderByItemBuilder implements OperationNodeSource {
    #private;
    constructor(props: OrderByItemBuilderProps);
    /**
     * Adds `desc` to the `order by` item.
     *
     * See {@link asc} for the opposite.
     */
    desc(): OrderByItemBuilder;
    /**
     * Adds `asc` to the `order by` item.
     *
     * See {@link desc} for the opposite.
     */
    asc(): OrderByItemBuilder;
    /**
     * Adds `nulls last` to the `order by` item.
     *
     * This is only supported by some dialects like PostgreSQL and SQLite.
     *
     * See {@link nullsFirst} for the opposite.
     */
    nullsLast(): OrderByItemBuilder;
    /**
     * Adds `nulls first` to the `order by` item.
     *
     * This is only supported by some dialects like PostgreSQL and SQLite.
     *
     * See {@link nullsLast} for the opposite.
     */
    nullsFirst(): OrderByItemBuilder;
    /**
     * Adds `collate <collationName>` to the `order by` item.
     */
    collate(collation: Collation): OrderByItemBuilder;
    toOperationNode(): OrderByItemNode;
}
interface OrderByItemBuilderProps {
    readonly node: OrderByItemNode;
}

type OrderByExpression<DB, TB extends keyof DB, O> = StringReference<DB, TB> | (keyof O & string) | ExpressionOrFactory<DB, TB, any> | DynamicReferenceBuilder<any>;
type OrderByModifiers = OrderByDirection | OrderByModifiersCallbackExpression;
type OrderByDirection = 'asc' | 'desc';
type OrderByModifiersCallbackExpression = (builder: OrderByItemBuilder) => OrderByItemBuilder;
/**
 * @deprecated performance reasons, use {@link OrderByExpression} instead.
 */
type DirectedOrderByStringReference<DB, TB extends keyof DB, O> = `${StringReference<DB, TB> | (keyof O & string)} ${OrderByDirection}`;
/**
 * @deprecated replaced with {@link OrderByModifiers}
 */
type OrderByDirectionExpression = OrderByDirection | Expression<any>;

type GroupByExpression<DB, TB extends keyof DB, O> = ReferenceExpression<DB, TB> | (keyof O & string);
type GroupByArg<DB, TB extends keyof DB, O> = GroupByExpression<DB, TB, O> | ReadonlyArray<GroupByExpression<DB, TB, O>> | ((eb: ExpressionBuilder<DB, TB>) => ReadonlyArray<GroupByExpression<DB, TB, O>>);

interface WhereInterface<DB, TB extends keyof DB> {
    /**
     * Adds a `where` expression to the query.
     *
     * Calling this method multiple times will combine the expressions using `and`.
     *
     * Also see {@link whereRef}
     *
     * ### Examples
     *
     * <!-- siteExample("where", "Simple where clause", 10) -->
     *
     * `where` method calls are combined with `AND`:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('first_name', '=', 'Jennifer')
     *   .where('age', '>', 40)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and "age" > $2
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * sql`your operator`
     * ```
     *
     * <!-- siteExample("where", "Where in", 20) -->
     *
     * Find multiple items using a list of identifiers:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', 'in', [1, 2, 3])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Object filter", 30) -->
     *
     * You can use the `and` function to create a simple equality
     * filter using an object
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: eb.ref('first_name')
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = "first_name"
     * )
     * ```
     *
     * <!-- siteExample("where", "OR where", 40) -->
     *
     * To combine conditions using `OR`, you can use the expression builder.
     * There are two ways to create `OR` expressions. Both are shown in this
     * example:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   // 1. Using the `or` method on the expression builder:
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   // 2. Chaining expressions using the `or` method on the
     *   // created expressions:
     *   .where((eb) =>
     *     eb('last_name', '=', 'Aniston').or('last_name', '=', 'Stallone')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   ("first_name" = $1 or "first_name" = $2)
     *   and
     *   ("last_name" = $3 or "last_name" = $4)
     * )
     * ```
     *
     * <!-- siteExample("where", "Conditional where calls", 50) -->
     *
     * You can add expressions conditionally like this:
     *
     * ```ts
     * import { Expression, SqlBool } from 'kysely'
     *
     * const firstName: string | undefined = 'Jennifer'
     * const lastName: string | undefined = 'Aniston'
     * const under18 = true
     * const over60 = true
     *
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * if (under18 || over60) {
     *   // Conditional OR expressions can be added like this.
     *   query = query.where((eb) => {
     *     const ors: Expression<SqlBool>[] = []
     *
     *     if (under18) {
     *       ors.push(eb('age', '<', 18))
     *     }
     *
     *     if (over60) {
     *       ors.push(eb('age', '>', 60))
     *     }
     *
     *     return eb.or(ors)
     *   })
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * Both the first and third argument can also be arbitrary expressions like
     * subqueries. An expression can defined by passing a function and calling
     * the methods of the {@link ExpressionBuilder} passed to the callback:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be expressions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Complex where clause", 60) -->
     *
     * For complex `where` expressions you can pass in a single callback and
     * use the `ExpressionBuilder` to build your expression:
     *
     * ```ts
     * const firstName = 'Jennifer'
     * const maxAge = 60
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, or, and, not, exists, selectFrom }) => and([
     *     or([
     *       eb('first_name', '=', firstName),
     *       eb('age', '<', maxAge)
     *     ]),
     *     not(exists(
     *       selectFrom('pet')
     *         .select('pet.id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   (
     *     "first_name" = $1
     *     or "age" < $2
     *   )
     *   and not exists (
     *     select "pet"."id" from "pet" where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql<string>`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const columnFromUserInput: string = 'id'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .where(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): WhereInterface<DB, TB>;
    where<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): WhereInterface<DB, TB>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((eb) => eb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): WhereInterface<DB, TB>;
    /**
     * Clears all where expressions from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .where('id','=',42)
     *   .clearWhere()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearWhere(): WhereInterface<DB, TB>;
}

type NoResultErrorConstructor = new (node: QueryNode) => Error;
declare class NoResultError extends Error {
    /**
     * The operation node tree of the query that was executed.
     */
    readonly node: QueryNode;
    constructor(node: QueryNode);
}
declare function isNoResultErrorConstructor(fn: NoResultErrorConstructor | ((node: QueryNode) => Error)): fn is NoResultErrorConstructor;

interface HavingInterface<DB, TB extends keyof DB> {
    /**
     * Just like {@link WhereInterface.where | where} but adds a `having` statement
     * instead of a `where` statement.
     */
    having<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): HavingInterface<DB, TB>;
    having<E>(expression: E): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereRef | whereRef} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): HavingInterface<DB, TB>;
}

type SetOperandExpression<DB, O> = Expression<O> | ReadonlyArray<Expression<O>> | ((eb: ExpressionBuilder<DB, never>) => Expression<O> | ReadonlyArray<Expression<O>>);

interface Streamable<O> {
    /**
     * Executes the query and streams the rows.
     *
     * The optional argument `chunkSize` defines how many rows to fetch from the database
     * at a time. It only affects some dialects like PostgreSQL that support it.
     *
     * ### Examples
     *
     * ```ts
     * const stream = db
     *   .selectFrom('person')
     *   .select(['first_name', 'last_name'])
     *   .where('gender', '=', 'other')
     *   .stream()
     *
     * for await (const person of stream) {
     *   console.log(person.first_name)
     *
     *   if (person.last_name === 'Something') {
     *     // Breaking or returning before the stream has ended will release
     *     // the database connection and invalidate the stream.
     *     break
     *   }
     * }
     * ```
     */
    stream(chunkSize?: number): AsyncIterableIterator<O>;
}

interface AndNode extends OperationNode {
    readonly kind: 'AndNode';
    readonly left: OperationNode;
    readonly right: OperationNode;
}
/**
 * @internal
 */
declare const AndNode: Readonly<{
    is(node: OperationNode): node is AndNode;
    create(left: OperationNode, right: OperationNode): AndNode;
}>;

interface OrNode extends OperationNode {
    readonly kind: 'OrNode';
    readonly left: OperationNode;
    readonly right: OperationNode;
}
/**
 * @internal
 */
declare const OrNode: Readonly<{
    is(node: OperationNode): node is OrNode;
    create(left: OperationNode, right: OperationNode): OrNode;
}>;

interface ParensNode extends OperationNode {
    readonly kind: 'ParensNode';
    readonly node: OperationNode;
}
/**
 * @internal
 */
declare const ParensNode: Readonly<{
    is(node: OperationNode): node is ParensNode;
    create(node: OperationNode): ParensNode;
}>;

declare class ExpressionWrapper<DB, TB extends keyof DB, T> implements AliasableExpression<T> {
    #private;
    constructor(node: OperationNode);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ### Examples
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): T | undefined;
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb('first_name', '=', 'Jennifer').as('is_jennifer')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `is_jennifer: SqlBool` field exists in the result type.
     * console.log(result.is_jennifer)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" = $1 as "is_jennifer"
     * from "person"
     * ```
     */
    as<A extends string>(alias: A): AliasedExpression<T, A>;
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` at the end of the expression,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     // `eb.fn<string>` returns an AliasableExpression<string>
     *     eb.fn<string>('concat', ['first_name', eb.val(' '), 'last_name']).as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   concat("first_name", $1, "last_name") as "full_name"
     * from
     *   "person"
     * ```
     *
     * You can also pass in a raw SQL snippet (or any expression) but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: Expression<unknown>): AliasedExpression<T, A>;
    /**
     * Combines `this` and another expression using `OR`.
     *
     * Also see {@link ExpressionBuilder.or}
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where(eb => eb('first_name', '=', 'Jennifer')
     *     .or('first_name', '=', 'Arnold')
     *     .or('first_name', '=', 'Sylvester')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   or "first_name" = $2
     *   or "first_name" = $3
     * )
     * ```
     *
     * You can also pass any expression as the only argument to
     * this method:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where(eb => eb('first_name', '=', 'Jennifer')
     *     .or(eb('first_name', '=', 'Sylvester').and('last_name', '=', 'Stallone'))
     *     .or(eb.exists(
     *       eb.selectFrom('pet')
     *         .select('id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   or ("first_name" = $2 and "last_name" = $3)
     *   or exists (
     *     select "id"
     *     from "pet"
     *     where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     */
    or<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): T extends SqlBool ? OrWrapper<DB, TB, SqlBool> : KyselyTypeError<'or() method can only be called on boolean expressions'>;
    or<E extends OperandExpression<SqlBool>>(expression: E): T extends SqlBool ? OrWrapper<DB, TB, SqlBool> : KyselyTypeError<'or() method can only be called on boolean expressions'>;
    /**
     * Combines `this` and another expression using `AND`.
     *
     * Also see {@link ExpressionBuilder.and}
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where(eb => eb('first_name', '=', 'Jennifer')
     *     .and('last_name', '=', 'Aniston')
     *     .and('age', '>', 40)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = $2
     *   and "age" > $3
     * )
     * ```
     *
     * You can also pass any expression as the only argument to
     * this method:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where(eb => eb('first_name', '=', 'Jennifer')
     *     .and(eb('first_name', '=', 'Sylvester').or('last_name', '=', 'Stallone'))
     *     .and(eb.exists(
     *       eb.selectFrom('pet')
     *         .select('id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and ("first_name" = $2 or "last_name" = $3)
     *   and exists (
     *     select "id"
     *     from "pet"
     *     where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     */
    and<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): T extends SqlBool ? AndWrapper<DB, TB, SqlBool> : KyselyTypeError<'and() method can only be called on boolean expressions'>;
    and<E extends OperandExpression<SqlBool>>(expression: E): T extends SqlBool ? AndWrapper<DB, TB, SqlBool> : KyselyTypeError<'and() method can only be called on boolean expressions'>;
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `ExpressionWrapper` with a new output type.
     */
    $castTo<C>(): ExpressionWrapper<DB, TB, C>;
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull(): ExpressionWrapper<DB, TB, Exclude<T, null>>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): OperationNode;
}
declare class AliasedExpressionWrapper<T, A extends string> implements AliasedExpression<T, A> {
    #private;
    constructor(expr: Expression<T>, alias: A | Expression<unknown>);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<T>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A | Expression<unknown>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
declare class OrWrapper<DB, TB extends keyof DB, T extends SqlBool> implements AliasableExpression<T> {
    #private;
    constructor(node: OrNode);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ### Examples
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): T | undefined;
    /**
     * Returns an aliased version of the expression.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(eb =>
     *     eb('first_name', '=', 'Jennifer')
     *       .or('first_name', '=', 'Sylvester')
     *       .as('is_jennifer_or_sylvester')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `is_jennifer_or_sylvester: SqlBool` field exists in the result type.
     * console.log(result.is_jennifer_or_sylvester)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" = $1 or "first_name" = $2 as "is_jennifer_or_sylvester"
     * from "person"
     * ```
     */
    as<A extends string>(alias: A): AliasedExpression<T, A>;
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` at the end of the expression,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     // `eb.fn<string>` returns an AliasableExpression<string>
     *     eb.fn<string>('concat', ['first_name', eb.val(' '), 'last_name']).as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   concat("first_name", $1, "last_name") as "full_name"
     * from
     *   "person"
     * ```
     *
     * You can also pass in a raw SQL snippet (or any expression) but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: Expression<unknown>): AliasedExpression<T, A>;
    /**
     * Combines `this` and another expression using `OR`.
     *
     * See {@link ExpressionWrapper.or} for examples.
     */
    or<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): OrWrapper<DB, TB, T>;
    or<E extends OperandExpression<SqlBool>>(expression: E): OrWrapper<DB, TB, T>;
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `OrWrapper` with a new output type.
     */
    $castTo<C extends SqlBool>(): OrWrapper<DB, TB, C>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): ParensNode;
}
declare class AndWrapper<DB, TB extends keyof DB, T extends SqlBool> implements AliasableExpression<T> {
    #private;
    constructor(node: AndNode);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ### Examples
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): T | undefined;
    /**
     * Returns an aliased version of the expression.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(eb =>
     *     eb('first_name', '=', 'Jennifer')
     *       .and('last_name', '=', 'Aniston')
     *       .as('is_jennifer_aniston')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `is_jennifer_aniston: SqlBool` field exists in the result type.
     * console.log(result.is_jennifer_aniston)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" = $1 and "first_name" = $2 as "is_jennifer_aniston"
     * from "person"
     * ```
     */
    as<A extends string>(alias: A): AliasedExpression<T, A>;
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` at the end of the expression,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     // `eb.fn<string>` returns an AliasableExpression<string>
     *     eb.fn<string>('concat', ['first_name', eb.val(' '), 'last_name']).as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   concat("first_name", $1, "last_name") as "full_name"
     * from
     *   "person"
     * ```
     *
     * You can also pass in a raw SQL snippet (or any expression) but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: Expression<unknown>): AliasedExpression<T, A>;
    /**
     * Combines `this` and another expression using `AND`.
     *
     * See {@link ExpressionWrapper.and} for examples.
     */
    and<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): AndWrapper<DB, TB, T>;
    and<E extends OperandExpression<SqlBool>>(expression: E): AndWrapper<DB, TB, T>;
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AndWrapper` with a new output type.
     */
    $castTo<C extends SqlBool>(): AndWrapper<DB, TB, C>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): ParensNode;
}

interface OrderByInterface<DB, TB extends keyof DB, O> {
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. Meaning, additional `orderBy` calls append to
     * the existing order by clause.
     *
     * `orderBy` is supported in select queries on all dialects. In MySQL, you can
     * also use `orderBy` in update and delete queries.
     *
     * In a single call you can add a single column/expression or multiple columns/expressions.
     *
     * Single column/expression calls can have 1-2 arguments. The first argument is
     * the expression to order by, while the second optional argument is the direction
     * (`asc` or `desc`), a callback that accepts and returns an {@link OrderByItemBuilder}
     * or an expression.
     *
     * See {@link clearOrderBy} to remove the `order by` clause from a query.
     *
     * ### Examples
     *
     * Single column/expression per call:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('person.first_name as fn')
     *   .orderBy('id')
     *   .orderBy('fn', 'desc')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "id", "fn" desc
     * ```
     *
     * Building advanced modifiers:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('person.first_name as fn')
     *   .orderBy('id', (ob) => ob.desc().nullsFirst())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "id" desc nulls first
     * ```
     *
     * The order by expression can also be a raw sql expression or a subquery
     * in addition to column references:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy((eb) => eb.selectFrom('pet')
     *     .select('pet.name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *   )
     *   .orderBy(
     *     sql<string>`concat(first_name, last_name) asc`
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * order by
     *   ( select "pet"."name"
     *     from "pet"
     *     where "pet"."owner_id" = "person"."id"
     *     limit $1
     *   ) asc,
     *   concat(first_name, last_name) asc
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "fn"
     * ```
     */
    orderBy<OE extends OrderByExpression<DB, TB, O>>(expr: OE, modifiers?: OrderByModifiers): OrderByInterface<DB, TB, O>;
    /**
     * @deprecated It does ~2-2.6x more compile-time instantiations compared to multiple chained `orderBy(expr, modifiers?)` calls (in `order by` clauses with reasonable item counts), and has broken autocompletion.
     */
    orderBy<OE extends OrderByExpression<DB, TB, O> | DirectedOrderByStringReference<DB, TB, O>>(exprs: ReadonlyArray<OE>): OrderByInterface<DB, TB, O>;
    /**
     * @deprecated It does ~2.9x more compile-time instantiations compared to a `orderBy(expr, direction)` call.
     */
    orderBy<OE extends DirectedOrderByStringReference<DB, TB, O>>(expr: OE): OrderByInterface<DB, TB, O>;
    /**
     * @deprecated Use `orderBy(expr, (ob) => ...)` instead.
     */
    orderBy<OE extends OrderByExpression<DB, TB, O>>(expr: OE, modifiers: Expression<any>): OrderByInterface<DB, TB, O>;
    /**
     * Clears the `order by` clause from the query.
     *
     * See {@link orderBy} for adding an `order by` clause or item to a query.
     *
     * ### Examples
     *
     * ```ts
     * const query = db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy('id', 'desc')
     *
     * const results = await query
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy(): OrderByInterface<DB, TB, O>;
}

interface SelectQueryBuilder<DB, TB extends keyof DB, O> extends WhereInterface<DB, TB>, HavingInterface<DB, TB>, OrderByInterface<DB, TB, O>, SelectQueryBuilderExpression<O>, Compilable<O>, Explainable, Streamable<O> {
    /**
     * Adds a `where` expression to the query.
     *
     * Calling this method multiple times will combine the expressions using `and`.
     *
     * Also see {@link whereRef}
     *
     * ### Examples
     *
     * <!-- siteExample("where", "Simple where clause", 10) -->
     *
     * `where` method calls are combined with `AND`:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('first_name', '=', 'Jennifer')
     *   .where('age', '>', 40)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and "age" > $2
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * sql`your operator`
     * ```
     *
     * <!-- siteExample("where", "Where in", 20) -->
     *
     * Find multiple items using a list of identifiers:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', 'in', [1, 2, 3])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Object filter", 30) -->
     *
     * You can use the `and` function to create a simple equality
     * filter using an object
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: eb.ref('first_name')
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = "first_name"
     * )
     * ```
     *
     * <!-- siteExample("where", "OR where", 40) -->
     *
     * To combine conditions using `OR`, you can use the expression builder.
     * There are two ways to create `OR` expressions. Both are shown in this
     * example:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   // 1. Using the `or` method on the expression builder:
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   // 2. Chaining expressions using the `or` method on the
     *   // created expressions:
     *   .where((eb) =>
     *     eb('last_name', '=', 'Aniston').or('last_name', '=', 'Stallone')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   ("first_name" = $1 or "first_name" = $2)
     *   and
     *   ("last_name" = $3 or "last_name" = $4)
     * )
     * ```
     *
     * <!-- siteExample("where", "Conditional where calls", 50) -->
     *
     * You can add expressions conditionally like this:
     *
     * ```ts
     * import { Expression, SqlBool } from 'kysely'
     *
     * const firstName: string | undefined = 'Jennifer'
     * const lastName: string | undefined = 'Aniston'
     * const under18 = true
     * const over60 = true
     *
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * if (under18 || over60) {
     *   // Conditional OR expressions can be added like this.
     *   query = query.where((eb) => {
     *     const ors: Expression<SqlBool>[] = []
     *
     *     if (under18) {
     *       ors.push(eb('age', '<', 18))
     *     }
     *
     *     if (over60) {
     *       ors.push(eb('age', '>', 60))
     *     }
     *
     *     return eb.or(ors)
     *   })
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * Both the first and third argument can also be arbitrary expressions like
     * subqueries. An expression can defined by passing a function and calling
     * the methods of the {@link ExpressionBuilder} passed to the callback:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be expressions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Complex where clause", 60) -->
     *
     * For complex `where` expressions you can pass in a single callback and
     * use the `ExpressionBuilder` to build your expression:
     *
     * ```ts
     * const firstName = 'Jennifer'
     * const maxAge = 60
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, or, and, not, exists, selectFrom }) => and([
     *     or([
     *       eb('first_name', '=', firstName),
     *       eb('age', '<', maxAge)
     *     ]),
     *     not(exists(
     *       selectFrom('pet')
     *         .select('pet.id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   (
     *     "first_name" = $1
     *     or "age" < $2
     *   )
     *   and not exists (
     *     select "pet"."id" from "pet" where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql<string>`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const columnFromUserInput: string = 'id'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .where(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): SelectQueryBuilder<DB, TB, O>;
    where<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((eb) => eb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.where | where} but adds a `having` statement
     * instead of a `where` statement.
     */
    having<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): SelectQueryBuilder<DB, TB, O>;
    having<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.whereRef | whereRef} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a select statement to the query.
     *
     * When a column (or any expression) is selected, Kysely adds its type to the return
     * type of the query. Kysely is smart enough to parse the selection names and types
     * from aliased columns, subqueries, raw expressions etc.
     *
     * Kysely only allows you to select columns and expressions that exist and would
     * produce valid SQL. However, Kysely is not perfect and there may be cases where
     * the type inference doesn't work and you need to override it. You can always
     * use the {@link Kysely.dynamic | dynamic} module and the {@link sql} tag
     * to override the types.
     *
     * Select calls are additive. Calling `select('id').select('first_name')` is the
     * same as calling `select(['id', 'first_name'])`.
     *
     * To select all columns of the query or specific tables see the
     * {@link selectAll} method.
     *
     * See the {@link $if} method if you are looking for a way to add selections
     * based on a runtime condition.
     *
     * ### Examples
     *
     * <!-- siteExample("select", "A single column", 10) -->
     *
     * Select a single column:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select('id')
     *   .where('first_name', '=', 'Arnold')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id" from "person" where "first_name" = $1
     * ```
     *
     * <!-- siteExample("select", "Column with a table", 20) -->
     *
     * Select a single column and specify a table:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom(['person', 'pet'])
     *   .select('person.id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id" from "person", "pet"
     * ```
     *
     * <!-- siteExample("select", "Multiple columns", 30) -->
     *
     * Select multiple columns:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select(['person.id', 'first_name'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "first_name" from "person"
     * ```
     *
     * <!-- siteExample("select", "Aliases", 40) -->
     *
     * You can give an alias for selections and tables by appending `as the_alias` to the name:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person as p')
     *   .select([
     *     'first_name as fn',
     *     'p.last_name as ln'
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "first_name" as "fn",
     *   "p"."last_name" as "ln"
     * from "person" as "p"
     * ```
     *
     * <!-- siteExample("select", "Complex selections", 50) -->
     *
     * You can select arbitrary expression including subqueries and raw sql snippets.
     * When you do that, you need to give a name for the selections using the `as` method:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db.selectFrom('person')
     *   .select(({ eb, selectFrom, or, val, lit }) => [
     *     // Select a correlated subquery
     *     selectFrom('pet')
     *       .whereRef('person.id', '=', 'pet.owner_id')
     *       .select('pet.name')
     *       .orderBy('pet.name')
     *       .limit(1)
     *       .as('first_pet_name'),
     *
     *     // Build and select an expression using
     *     // the expression builder
     *     or([
     *       eb('first_name', '=', 'Jennifer'),
     *       eb('first_name', '=', 'Arnold')
     *     ]).as('is_jennifer_or_arnold'),
     *
     *     // Select a raw sql expression
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *
     *     // Select a static string value
     *     val('Some value').as('string_value'),
     *
     *     // Select a literal value
     *     lit(42).as('literal_value'),
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   (
     *     select "pet"."name"
     *     from "pet"
     *     where "person"."id" = "pet"."owner_id"
     *     order by "pet"."name"
     *     limit $1
     *   ) as "pet_name",
     *   ("first_name" = $2 or "first_name" = $3) as "jennifer_or_arnold",
     *   concat(first_name, ' ', last_name) as "full_name",
     *   $4 as "string_value",
     *   42 as "literal_value"
     * from "person"
     * ```
     *
     * In case you use the {@link sql} tag you need to specify the type of the expression
     * (in this example `string`).
     *
     *  <!-- siteExample("select", "Not null", 51) -->
     *
     * Sometimes you can be sure something's not null, but Kysely isn't able to infer
     * it. For example calling `where('last_name', 'is not', null)` doesn't make
     * `last_name` not null in the result type, but unless you have other where statements
     * you can be sure it's never null.
     *
     * Kysely has a couple of helpers for dealing with these cases: `$notNull()` and `$narrowType`.
     * Both are used in the following example:
     *
     * ```ts
     * import { NotNull } from 'kysely'
     * import { jsonObjectFrom } from 'kysely/helpers/postgres'
     *
     * const persons = db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     'last_name',
     *      // Let's assume we know the person has at least one
     *      // pet. We can use the `.$notNull()` method to make
     *      // the expression not null. You could just as well
     *      // add `pet` to the `$narrowType` call below.
     *      jsonObjectFrom(
     *        eb.selectFrom('pet')
     *          .selectAll()
     *          .limit(1)
     *          .whereRef('person.id', '=', 'pet.owner_id')
     *      ).$notNull().as('pet')
     *   ])
     *   .where('last_name', 'is not', null)
     *   // $narrowType can be used to narrow the output type.
     *   // The special `NotNull` type can be used to make a
     *   // selection not null. You could add `pet: NotNull`
     *   // here and omit the `$notNull()` call on it.
     *   // Use whichever way you prefer.
     *   .$narrowType<{ last_name: NotNull }>()
     *   .execute()
     * ```
     *
     * All the examples above assume you know the column names at compile time.
     * While it's better to build your code like that (that way you also know
     * the types) sometimes it's not possible or you just prefer to write more
     * dynamic code.
     * <br><br>
     * In this example, we use the `dynamic` module's methods to add selections
     * dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput: string = 'first_name';
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
     *
     * const people = await db
     *   .selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput),
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | null | undefined = people[0].last_name
     * const firstName: string | undefined = people[0].first_name
     * const birthDate: Date | null | undefined = people[0].birthdate
     *
     * // The result type also contains the compile time selection `id`.
     * people[0].id
     * ```
     */
    select<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): SelectQueryBuilder<DB, TB, O & Selection<DB, TB, SE>>;
    select<CB extends SelectCallback<DB, TB>>(callback: CB): SelectQueryBuilder<DB, TB, O & CallbackSelection<DB, TB, CB>>;
    select<SE extends SelectExpression<DB, TB>>(selection: SE): SelectQueryBuilder<DB, TB, O & Selection<DB, TB, SE>>;
    /**
     * Adds `distinct on` expressions to the select clause.
     *
     * ### Examples
     *
     * <!-- siteExample("select", "Distinct on", 80) -->
     *
     * ```ts
     * const persons = await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .where('pet.name', '=', 'Doggo')
     *   .distinctOn('person.id')
     *   .selectAll('person')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select distinct on ("person"."id") "person".*
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * where "pet"."name" = $1
     * ```
     */
    distinctOn<RE extends ReferenceExpression<DB, TB>>(selections: ReadonlyArray<RE>): SelectQueryBuilder<DB, TB, O>;
    distinctOn<RE extends ReferenceExpression<DB, TB>>(selection: RE): SelectQueryBuilder<DB, TB, O>;
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `select` keyword.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.selectFrom('person')
     *   .modifyFront(sql`sql_no_cache`)
     *   .select('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select sql_no_cache `first_name`
     * from `person`
     * ```
     */
    modifyFront(modifier: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link forUpdate}, {@link forShare}, {@link forKeyShare}, {@link forNoKeyUpdate}
     * {@link skipLocked} and  {@link noWait}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.selectFrom('person')
     *   .select('first_name')
     *   .modifyEnd(sql`for update`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * for update
     * ```
     */
    modifyEnd(modifier: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Makes the selection distinct.
     *
     * ### Examples
     *
     * <!-- siteExample("select", "Distinct", 70) -->
     *
     * ```ts
     * const persons = await db.selectFrom('person')
     *   .select('first_name')
     *   .distinct()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select distinct "first_name" from "person"
     * ```
     */
    distinct(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for update` modifier to a select query on supported databases.
     */
    forUpdate(of?: TableOrList<TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for share` modifier to a select query on supported databases.
     */
    forShare(of?: TableOrList<TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for key share` modifier to a select query on supported databases.
     */
    forKeyShare(of?: TableOrList<TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for no key update` modifier to a select query on supported databases.
     */
    forNoKeyUpdate(of?: TableOrList<TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `skip locked` modifier to a select query on supported databases.
     */
    skipLocked(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `nowait` modifier to a select query on supported databases.
     */
    noWait(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `select *` or `select table.*` clause to the query.
     *
     * ### Examples
     *
     * <!-- siteExample("select", "All columns", 90) -->
     *
     * The `selectAll` method generates `SELECT *`:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     *
     * <!-- siteExample("select", "All columns of a table", 100) -->
     *
     * Select all columns of a table:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".* from "person"
     * ```
     *
     * Select all columns of multiple tables:
     *
     * ```ts
     * const personsPets = await db
     *   .selectFrom(['person', 'pet'])
     *   .selectAll(['person', 'pet'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, "pet".* from "person", "pet"
     * ```
     */
    selectAll<T extends TB>(table: ReadonlyArray<T>): SelectQueryBuilder<DB, TB, O & AllSelection<DB, T>>;
    selectAll<T extends TB>(table: T): SelectQueryBuilder<DB, TB, O & Selectable<DB[T]>>;
    selectAll(): SelectQueryBuilder<DB, TB, O & AllSelection<DB, TB>>;
    /**
     * Joins another table to the query using an `inner join`.
     *
     * ### Examples
     *
     * <!-- siteExample("join", "Simple inner join", 10) -->
     *
     * Simple `inner join`s can be done by providing a table name and two columns to join:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   // `select` needs to come after the call to `innerJoin` so
     *   // that you can select from the joined table.
     *   .select(['person.id', 'pet.name as pet_name'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "pet"."name" as "pet_name"
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * ```
     *
     * <!-- siteExample("join", "Aliased inner join", 20) -->
     *
     * You can give an alias for the joined table like this:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet as p', 'p.owner_id', 'person.id')
     *   .where('p.name', '=', 'Doggo')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet" as "p"
     * on "p"."owner_id" = "person"."id"
     * where "p".name" = $1
     * ```
     *
     * <!-- siteExample("join", "Complex join", 30) -->
     *
     * You can provide a function as the second argument to get a join
     * builder for creating more complex joins. The join builder has a
     * bunch of `on*` methods for building the `on` clause of the join.
     * There's basically an equivalent for every `where` method
     * (`on`, `onRef` etc.).
     *
     * You can do all the same things with the
     * `on` method that you can with the corresponding `where` method (like [OR expressions for example](https://kysely.dev/docs/examples/WHERE/or-where)).
     * See the `where` method documentation for more examples.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     'pet',
     *     (join) => join
     *       .onRef('pet.owner_id', '=', 'person.id')
     *       .on('pet.name', '=', 'Doggo')
     *       .on((eb) => eb.or([
     *         eb('person.age', '>', 18),
     *         eb('person.age', '<', 100)
     *       ]))
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * and "pet"."name" = $1
     * and (
     *   "person"."age" > $2
     *   OR "person"."age" < $3
     * )
     * ```
     *
     * <!-- siteExample("join", "Subquery join", 40) -->
     *
     * You can join a subquery by providing two callbacks:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .innerJoin(
     *     (eb) => eb
     *       .selectFrom('pet')
     *       .select(['owner_id as owner', 'name'])
     *       .where('name', '=', 'Doggo')
     *       .as('doggos'),
     *     (join) => join
     *       .onRef('doggos.owner', '=', 'person.id'),
     *   )
     *   .selectAll('doggos')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "doggos".*
     * from "person"
     * inner join (
     *   select "owner_id" as "owner", "name"
     *   from "pet"
     *   where "name" = $1
     * ) as "doggos"
     * on "doggos"."owner" = "person"."id"
     * ```
     */
    innerJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    innerJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a `left join` instead of an `inner join`.
     */
    leftJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    leftJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a `right join` instead of an `inner join`.
     */
    rightJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithRightJoin<DB, TB, O, TE>;
    rightJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithRightJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a `full join` instead of an `inner join`.
     *
     * This is only supported by some dialects like PostgreSQL, MS SQL Server and SQLite.
     */
    fullJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithFullJoin<DB, TB, O, TE>;
    fullJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithFullJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a `cross join` instead of an `inner join`.
     */
    crossJoin<TE extends TableExpression<DB, TB>>(table: TE): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a lateral join instead of an inner join.
     *
     * This is only supported by some dialects like PostgreSQL and MySQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoinLateral(
     *     (eb) =>
     *       eb.selectFrom('pet')
     *         .select('name')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *         .as('p'),
     *     (join) => join.onTrue()
     *   )
     *   .select(['first_name', 'p.name'])
     *   .orderBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name", "p"."name"
     * from "person"
     * inner join lateral (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     * ) as "p" on true
     * order by "first_name"
     * ```
     */
    innerJoinLateral<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    innerJoinLateral<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a `left join lateral` instead of an `inner join`.
     *
     * This is only supported by some dialects like PostgreSQL and MySQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .leftJoinLateral(
     *     (eb) =>
     *       eb.selectFrom('pet')
     *         .select('name')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *         .as('p'),
     *     (join) => join.onTrue()
     *   )
     *   .select(['first_name', 'p.name'])
     *   .orderBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name", "p"."name"
     * from "person"
     * left join lateral (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     * ) as "p" on true
     * order by "first_name"
     * ```
     */
    leftJoinLateral<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    leftJoinLateral<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a `cross join lateral` instead of an `inner join`.
     *
     * This is only supported by some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .crossJoinLateral(
     *     (eb) =>
     *       eb.selectFrom('pet')
     *         .select('name')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *         .as('p')
     *   )
     *   .select(['first_name', 'p.name'])
     *   .orderBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name", "p"."name"
     * from "person"
     * cross join lateral (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     * ) as "p"
     * order by "first_name"
     * ```
     */
    crossJoinLateral<TE extends TableExpression<DB, TB>>(table: TE): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Joins another table to the query using a `cross apply`.
     *
     * This is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .crossApply(
     *     (eb) =>
     *       eb.selectFrom('pet')
     *         .select('name')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *         .as('p')
     *   )
     *   .select(['first_name', 'p.name'])
     *   .orderBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * select "person"."first_name", "p"."name"
     * from "person"
     * cross apply (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     * ) as "p"
     * order by "first_name"
     * ```
     */
    crossApply<TE extends TableExpression<DB, TB>>(table: TE): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link crossApply} but adds an `outer apply` instead of a `cross apply`.
     *
     * This is only supported by some dialects like MS SQL Server.
     */
    outerApply<TE extends TableExpression<DB, TB>>(table: TE): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Adds a `group by` clause to the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     sql<string>`max(id)`.as('max_id')
     *   ])
     *   .groupBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", max(id)
     * from "person"
     * group by "first_name"
     * ```
     *
     * `groupBy` also accepts an array:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     sql<string>`max(id)`.as('max_id')
     *   ])
     *   .groupBy([
     *     'first_name',
     *     'last_name'
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", "last_name", max(id)
     * from "person"
     * group by "first_name", "last_name"
     * ```
     *
     * The group by expressions can also be subqueries or
     * raw sql expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     sql<string>`max(id)`.as('max_id')
     *   ])
     *   .groupBy([
     *     sql<string>`concat(first_name, last_name)`,
     *     (qb) => qb.selectFrom('pet').select('id').limit(1)
     *   ])
     *   .execute()
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(groupBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('first_name')
     *     .groupBy(ref(groupBy))
     *     .execute()
     * }
     *
     * someQuery('first_name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * group by "first_name"
     * ```
     */
    groupBy<GE extends GroupByArg<DB, TB, O>>(groupBy: GE): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. Meaning, additional `orderBy` calls append to
     * the existing order by clause.
     *
     * `orderBy` is supported in select queries on all dialects. In MySQL, you can
     * also use `orderBy` in update and delete queries.
     *
     * In a single call you can add a single column/expression or multiple columns/expressions.
     *
     * Single column/expression calls can have 1-2 arguments. The first argument is
     * the expression to order by, while the second optional argument is the direction
     * (`asc` or `desc`), a callback that accepts and returns an {@link OrderByItemBuilder}
     * or an expression.
     *
     * See {@link clearOrderBy} to remove the `order by` clause from a query.
     *
     * ### Examples
     *
     * Single column/expression per call:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('person.first_name as fn')
     *   .orderBy('id')
     *   .orderBy('fn', 'desc')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "id", "fn" desc
     * ```
     *
     * Building advanced modifiers:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('person.first_name as fn')
     *   .orderBy('id', (ob) => ob.desc().nullsFirst())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "id" desc nulls first
     * ```
     *
     * The order by expression can also be a raw sql expression or a subquery
     * in addition to column references:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy((eb) => eb.selectFrom('pet')
     *     .select('pet.name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *   )
     *   .orderBy(
     *     sql<string>`concat(first_name, last_name) asc`
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * order by
     *   ( select "pet"."name"
     *     from "pet"
     *     where "pet"."owner_id" = "person"."id"
     *     limit $1
     *   ) asc,
     *   concat(first_name, last_name) asc
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "fn"
     * ```
     */
    orderBy<OE extends OrderByExpression<DB, TB, O>>(expr: OE, modifiers?: OrderByModifiers): SelectQueryBuilder<DB, TB, O>;
    /**
     * @deprecated It does ~2-2.5x more compile-time instantiations than multiple `orderBy(expr, modifiers?)` calls, and has broken autocompletion.
     */
    orderBy<OE extends OrderByExpression<DB, TB, O> | DirectedOrderByStringReference<DB, TB, O>>(exprs: ReadonlyArray<OE>): SelectQueryBuilder<DB, TB, O>;
    /**
     * @deprecated Use orderBy(expr, direction) instead.
     */
    orderBy<OE extends DirectedOrderByStringReference<DB, TB, O>>(expr: OE): SelectQueryBuilder<DB, TB, O>;
    /**
     * @deprecated Use `orderBy(expr, (ob) => ...)` instead.
     */
    orderBy<OE extends OrderByExpression<DB, TB, O>>(expr: OE, modifiers: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a limit clause to the query.
     *
     * Passing a `null` value is only supported by some dialects like PostgreSQL,
     * and will result in a no-op limit clause.
     *
     * ### Examples
     *
     * Select the first 10 rows of the result:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .limit(10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" from "person" limit $1
     * ```
     *
     * Select rows from index 10 to index 19 of the result:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .limit(10)
     *   .offset(10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" from "person" limit $1 offset $2
     * ```
     */
    limit(limit: ValueExpression<DB, TB, number | bigint | null>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds an `offset` clause to the query.
     *
     * ### Examples
     *
     * Select rows from index 10 to index 19 of the result:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .limit(10)
     *   .offset(10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" from "person" limit $1 offset $2
     * ```
     */
    offset(offset: ValueExpression<DB, TB, number | bigint>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `fetch` clause to the query.
     *
     * This clause is only supported by some dialects like PostgreSQL or MS SQL Server.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .orderBy('first_name')
     *   .offset(0)
     *   .fetch(10)
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * order by "first_name"
     * offset 0 rows
     * fetch next 10 rows only
     * ```
     */
    fetch(rowCount: number | bigint, modifier?: FetchModifier): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `top` clause to the query.
     *
     * This clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Select 10 biggest ages:
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('age')
     *   .top(10)
     *   .orderBy('age desc')
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * select top(10) "age" from "person" order by "age" desc
     * ```
     *
     * Select 10% first rows:
     *
     * ```ts
     * await db
     *  .selectFrom('person')
     *  .selectAll()
     *  .top(10, 'percent')
     *  .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * select top(10) percent * from "person"
     * ```
     */
    top(expression: number | bigint, modifiers?: TopModifier): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `union`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .union(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * union
     * select "id", "name"
     * from "pet"
     * order by "name"
     * ```
     *
     * You can provide a callback to get an expression builder.
     * In the following example, this allows us to wrap the query in parentheses:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .union((eb) => eb.parens(
     *     eb.selectFrom('pet').select(['id', 'name'])
     *   ))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * union
     * (
     *   select "id", "name"
     *   from "pet"
     * )
     * order by "name"
     * ```
     */
    union<E extends SetOperandExpression<DB, O>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `union all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .unionAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * union all
     * select "id", "name"
     * from "pet"
     * order by "name"
     * ```
     *
     * You can provide a callback to get an expression builder.
     * In the following example, this allows us to wrap the query in parentheses:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .unionAll((eb) => eb.parens(
     *     eb.selectFrom('pet').select(['id', 'name'])
     *   ))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * union all
     * (
     *   select "id", "name"
     *   from "pet"
     * )
     * order by "name"
     * ```
     */
    unionAll<E extends SetOperandExpression<DB, O>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `intersect`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersect(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * intersect
     * select "id", "name"
     * from "pet"
     * order by "name"
     * ```
     *
     * You can provide a callback to get an expression builder.
     * In the following example, this allows us to wrap the query in parentheses:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersect((eb) => eb.parens(
     *     eb.selectFrom('pet').select(['id', 'name'])
     *   ))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * intersect
     * (
     *   select "id", "name"
     *   from "pet"
     * )
     * order by "name"
     * ```
     */
    intersect<E extends SetOperandExpression<DB, O>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `intersect all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersectAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * intersect all
     * select "id", "name"
     * from "pet"
     * order by "name"
     * ```
     *
     * You can provide a callback to get an expression builder.
     * In the following example, this allows us to wrap the query in parentheses:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersectAll((eb) => eb.parens(
     *     eb.selectFrom('pet').select(['id', 'name'])
     *   ))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * intersect all
     * (
     *   select "id", "name"
     *   from "pet"
     * )
     * order by "name"
     * ```
     */
    intersectAll<E extends SetOperandExpression<DB, O>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `except`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .except(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * except
     * select "id", "name"
     * from "pet"
     * order by "name"
     * ```
     *
     * You can provide a callback to get an expression builder.
     * In the following example, this allows us to wrap the query in parentheses:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .except((eb) => eb.parens(
     *     eb.selectFrom('pet').select(['id', 'name'])
     *   ))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * except
     * (
     *   select "id", "name"
     *   from "pet"
     * )
     * order by "name"
     * ```
     */
    except<E extends SetOperandExpression<DB, O>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `except all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .exceptAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * except all
     * select "id", "name"
     * from "pet"
     * order by "name"
     * ```
     *
     * You can provide a callback to get an expression builder.
     * In the following example, this allows us to wrap the query in parentheses:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .exceptAll((eb) => eb.parens(
     *     eb.selectFrom('pet').select(['id', 'name'])
     *   ))
     *   .orderBy('name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id", "first_name" as "name"
     * from "person"
     * except all
     * (
     *   select "id", "name"
     *   from "pet"
     * )
     * order by "name"
     * ```
     */
    exceptAll<E extends SetOperandExpression<DB, O>>(expression: E): SelectQueryBuilder<DB, TB, O>;
    /**
     * Gives an alias for the query. This method is only useful for sub queries.
     *
     * ### Examples
     *
     * ```ts
     * const pets = await db.selectFrom('pet')
     *   .selectAll('pet')
     *   .select(
     *     (qb) => qb.selectFrom('person')
     *       .select('first_name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .as('owner_first_name')
     *   )
     *   .execute()
     *
     * pets[0].owner_first_name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "pet".*, (
     *   select "first_name"
     *   from "person"
     *   where "pet"."owner_id" = "person"."id"
     * ) as "owner_first_name"
     * from "pet"
     * ```
     */
    as<A extends string>(alias: A): AliasedSelectQueryBuilder<O, A>;
    /**
     * Clears all select clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(['id', 'first_name'])
     *   .clearSelect()
     *   .select(['id', 'gender'])
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select "id", "gender" from "person"
     * ```
     */
    clearSelect(): SelectQueryBuilder<DB, TB, {}>;
    /**
     * Clears all where expressions from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .where('id','=',42)
     *   .clearWhere()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearWhere(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Clears limit clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .selectAll()
     *   .limit(10)
     *   .clearLimit()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearLimit(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Clears offset clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .selectAll()
     *   .limit(10)
     *   .offset(20)
     *   .clearOffset()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person" limit 10
     * ```
     */
    clearOffset(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Clears all `order by` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .selectAll()
     *   .orderBy('id')
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Clears `group by` clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .selectAll()
     *   .groupBy('id')
     *   .clearGroupBy()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearGroupBy(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.selectFrom('person')
     *   .selectAll()
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * NOTE: This method has an impact on TypeScript performance and it should only be used
     * when necessary. Remember that you can call most methods like `where` conditionally
     * like this:
     *
     * ```ts
     * async function getPeople(firstName?: string, lastName?: string) {
     *   let query = db.selectFrom('person').selectAll()
     *
     *   if (firstName) {
     *     query = query.where('first_name', '=', firstName)
     *   }
     *
     *   if (lastName) {
     *     query = query.where('last_name', '=', lastName)
     *   }
     *
     *   return await query.execute()
     * }
     * ```
     *
     * This method is mainly useful with optional selects. Any `select` or `selectAll`
     * method called inside the callback add optional fields to the result type. This is
     * because we can't know if those selections were actually made before running the code.
     *
     * Also see [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0005-conditional-selects.md)
     *
     * ### Examples
     *
     * ```ts
     * async function getPerson(id: number, withLastName: boolean) {
     *   return await db
     *     .selectFrom('person')
     *     .select(['id', 'first_name'])
     *     .$if(withLastName, (qb) => qb.select('last_name'))
     *     .where('id', '=', id)
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `getPerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     *
     * You can also call any other methods inside the callback:
     *
     * ```ts
     * async function getPeople(firstName?: string, petCountLimit?: number) {
     *   return await db.selectFrom('person')
     *     .select('person.id')
     *     .$if(firstName != null, (qb) => qb.where('first_name', '=', firstName!))
     *     .$if(petCountLimit != null, (qb) => qb
     *       .innerJoin('pet', 'pet.owner_id', 'person.id')
     *       .having((eb) => eb.fn.count('pet.id'), '>', petCountLimit!)
     *       .groupBy('person.id')
     *     )
     *     .execute()
     * }
     * ```
     */
    $if<O2>(condition: boolean, func: (qb: this) => SelectQueryBuilder<any, any, O & O2>): SelectQueryBuilder<DB, TB, O & Partial<Omit<O2, keyof O>>>;
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `SelectQueryBuilder` with a new output type.
     */
    $castTo<C>(): SelectQueryBuilder<DB, TB, C>;
    /**
     * Changes the output type from an object to a tuple.
     *
     * This doesn't affect the generated SQL in any way. This function is
     * just a necessary evil when you need to convert a query's output
     * record type to a tuple type. Typescript doesn't currently offer
     * tools to do this automatically (without insane hackery).
     *
     * The returned object can no longer be executed. It can only be used
     * as a subquery.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, refTuple, selectFrom }) => eb(
     *     refTuple('first_name', 'last_name'),
     *     'in',
     *     selectFrom('pet')
     *       .select(['name', 'species'])
     *       .where('pet.species', '!=', 'cat')
     *       .$asTuple('name', 'species')
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select
     *   "person".*
     * from
     *   "person"
     * where
     *   ("first_name", "last_name")
     *   in
     *   (
     *     select "name", "species"
     *     from "pet"
     *     where "pet"."species" != $1
     *   )
     * ```
     */
    $asTuple<K1 extends keyof O, K2 extends Exclude<keyof O, K1>>(key1: K1, key2: K2): keyof O extends K1 | K2 ? ExpressionWrapper<DB, TB, [O[K1], O[K2]]> : KyselyTypeError<'$asTuple() call failed: All selected columns must be provided as arguments'>;
    $asTuple<K1 extends keyof O, K2 extends Exclude<keyof O, K1>, K3 extends Exclude<keyof O, K1 | K2>>(key1: K1, key2: K2, key3: K3): keyof O extends K1 | K2 | K3 ? ExpressionWrapper<DB, TB, [O[K1], O[K2], O[K3]]> : KyselyTypeError<'$asTuple() call failed: All selected columns must be provided as arguments'>;
    $asTuple<K1 extends keyof O, K2 extends Exclude<keyof O, K1>, K3 extends Exclude<keyof O, K1 | K2>, K4 extends Exclude<keyof O, K1 | K2 | K3>>(key1: K1, key2: K2, key3: K3, key4: K4): keyof O extends K1 | K2 | K3 | K4 ? ExpressionWrapper<DB, TB, [O[K1], O[K2], O[K3], O[K4]]> : KyselyTypeError<'$asTuple() call failed: All selected columns must be provided as arguments'>;
    $asTuple<K1 extends keyof O, K2 extends Exclude<keyof O, K1>, K3 extends Exclude<keyof O, K1 | K2>, K4 extends Exclude<keyof O, K1 | K2 | K3>, K5 extends Exclude<keyof O, K1 | K2 | K3 | K4>>(key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): keyof O extends K1 | K2 | K3 | K4 | K5 ? ExpressionWrapper<DB, TB, [O[K1], O[K2], O[K3], O[K4], O[K5]]> : KyselyTypeError<'$asTuple() call failed: All selected columns must be provided as arguments'>;
    /**
     * Plucks the value type of the output record.
     *
     * In SQL, any record type that only has one column can be used as a scalar.
     * For example a query like this works:
     *
     * ```sql
     * select
     *   id,
     *   first_name
     * from
     *   person as p
     * where
     *   -- This is ok since the query only selects one row
     *   -- and one column.
     *  (select name from pet where pet.owner_id = p.id limit 1) = 'Doggo'
     * ```
     *
     * In many cases Kysely handles this automatically and picks the correct
     * scalar type instead of the record type, but sometimes you need to give
     * Kysely a hint.
     *
     * One such case are custom helper functions that take `Expression<T>`
     * instances as inputs:
     *
     * ```ts
     * import type { Expression } from 'kysely'
     *
     * function doStuff(expr: Expression<string>) {
     *   // ...
     * }
     *
     * // Error! This is not ok because the expression type is
     * // `{ first_name: string }` instead of `string`.
     * // doStuff(db.selectFrom('person').select('first_name'))
     *
     * // Ok! This is ok since we've plucked the `string` type of the
     * // only column in the output type.
     * doStuff(db.selectFrom('person').select('first_name').$asScalar())
     * ```
     *
     * This function has absolutely no effect on the generated SQL. It's
     * purely a type-level helper.
     *
     * This method returns an `ExpressionWrapper` instead of a `SelectQueryBuilder`
     * since the return value should only be used as a part of an expression
     * and never executed as the main query.
     */
    $asScalar<K extends keyof O = keyof O>(): ExpressionWrapper<DB, TB, O[K]>;
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where}, {@link having}
     * or {@link JoinQueryBuilder.on}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.selectFrom('person')
     *   .where('nullable_column', 'is not', null)
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.selectFrom('person')
     *   .where('nullable_column', 'is not', null)
     *   .selectAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     *
     * Giving the explicit narrowed type (`string` in the example above) works fine for
     * simple types. If the type is complex, for example a JSON column or a subquery,
     * you can use the special `NotNull` type to make the column not null.
     *
     * ```ts
     * import { NotNull } from 'kysely'
     *
     * const person = await db.selectFrom('person')
     *   .where('nullable_column', 'is not', null)
     *   .selectAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType<T>(): SelectQueryBuilder<DB, TB, NarrowPartial<O, T>>;
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .with('first_and_last', (qb) => qb
     *     .selectFrom('person')
     *     .select(['first_name', 'last_name'])
     *     .$assertType<{ first_name: string, last_name: string | null }>()
     *   )
     *   .with('age', (qb) => qb
     *     .selectFrom('person')
     *     .select('age')
     *     .$assertType<{ age: number | null }>()
     *   )
     *   .selectFrom(['first_and_last', 'age'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType<T extends O>(): O extends T ? SelectQueryBuilder<DB, TB, T> : KyselyTypeError<`$assertType() call failed: The type passed in is not equal to the output type of the query.`>;
    /**
     * Returns a copy of this SelectQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): SelectQueryBuilder<DB, TB, O>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): SelectQueryNode;
    compile(): CompiledQuery<Simplify<O>>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<Simplify<O>[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SimplifySingleResult<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor | ((node: QueryNode) => Error)): Promise<Simplify<O>>;
    /**
     * Executes the query and streams the rows.
     *
     * The optional argument `chunkSize` defines how many rows to fetch from the database
     * at a time. It only affects some dialects like PostgreSQL that support it.
     *
     * ### Examples
     *
     * ```ts
     * const stream = db
     *   .selectFrom('person')
     *   .select(['first_name', 'last_name'])
     *   .where('gender', '=', 'other')
     *   .stream()
     *
     * for await (const person of stream) {
     *   console.log(person.first_name)
     *
     *   if (person.last_name === 'Something') {
     *     // Breaking or returning before the stream has ended will release
     *     // the database connection and invalidate the stream.
     *     break
     *   }
     * }
     * ```
     */
    stream(chunkSize?: number): AsyncIterableIterator<O>;
    /**
     * Executes query with `explain` statement before the main query.
     *
     * ```ts
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json select * from `person` where `gender` = ?
     * ```
     *
     * You can also execute `explain analyze` statements.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json', sql`analyze`)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * explain (analyze, format json) select * from "person" where "gender" = $1
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
declare function createSelectQueryBuilder<DB, TB extends keyof DB, O>(props: SelectQueryBuilderProps): SelectQueryBuilder<DB, TB, O>;
interface SelectQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: SelectQueryNode;
    readonly executor: QueryExecutor;
}
interface AliasedSelectQueryBuilder<O = undefined, A extends string = never> extends AliasedExpression<O, A> {
    get isAliasedSelectQueryBuilder(): true;
}
type SelectQueryBuilderWithInnerJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? InnerJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? SelectQueryBuilder<DB, TB | TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$2<DB, TB, O, QA, QO> : never;
type InnerJoinedBuilder$2<DB, TB extends keyof DB, O, A extends string, R> = A extends keyof DB ? SelectQueryBuilder<InnerJoinedDB$2<DB, A, R>, TB | A, O> : SelectQueryBuilder<DB & ShallowRecord<A, R>, TB | A, O>;
type InnerJoinedDB$2<DB, A extends string, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never;
}>;
type SelectQueryBuilderWithLeftJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? LeftJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? LeftJoinedBuilder$2<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$2<DB, TB, O, QA, QO> : never;
type LeftJoinedBuilder$2<DB, TB extends keyof DB, O, A extends keyof any, R> = A extends keyof DB ? SelectQueryBuilder<LeftJoinedDB$2<DB, A, R>, TB | A, O> : SelectQueryBuilder<DB & ShallowRecord<A, Nullable<R>>, TB | A, O>;
type LeftJoinedDB$2<DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends keyof DB ? DB[C] : never;
}>;
type SelectQueryBuilderWithRightJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? RightJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? RightJoinedBuilder$2<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$2<DB, TB, O, QA, QO> : never;
type RightJoinedBuilder$2<DB, TB extends keyof DB, O, A extends keyof any, R> = SelectQueryBuilder<RightJoinedDB$2<DB, TB, A, R>, TB | A, O>;
type RightJoinedDB$2<DB, TB extends keyof DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? R : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
}>;
type SelectQueryBuilderWithFullJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? OuterJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? OuterJoinedBuilder$2<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$2<DB, TB, O, QA, QO> : never;
type OuterJoinedBuilder$2<DB, TB extends keyof DB, O, A extends keyof any, R> = SelectQueryBuilder<OuterJoinedBuilderDB$2<DB, TB, A, R>, TB | A, O>;
type OuterJoinedBuilderDB$2<DB, TB extends keyof DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
}>;
type TableOrList<TB extends keyof any> = (TB & string) | ReadonlyArray<TB & string>;

type ExtractTypeFromCoalesce1<DB, TB extends keyof DB, R1> = ExtractTypeFromReferenceExpression<DB, TB, R1>;
type ExtractTypeFromCoalesce2<DB, TB extends keyof DB, R1, R2> = ExtractTypeFromCoalesceValues2<ExtractTypeFromReferenceExpression<DB, TB, R1>, ExtractTypeFromReferenceExpression<DB, TB, R2>>;
type ExtractTypeFromCoalesceValues2<V1, V2> = null extends V1 ? null extends V2 ? V1 | V2 : NotNull<V1 | V2> : NotNull<V1>;
type ExtractTypeFromCoalesce3<DB, TB extends keyof DB, R1, R2, R3> = ExtractTypeFromCoalesceValues3<ExtractTypeFromReferenceExpression<DB, TB, R1>, ExtractTypeFromReferenceExpression<DB, TB, R2>, ExtractTypeFromReferenceExpression<DB, TB, R3>>;
type ExtractTypeFromCoalesceValues3<V1, V2, V3> = null extends V1 ? null extends V2 ? null extends V3 ? V1 | V2 | V3 : NotNull<V1 | V2 | V3> : NotNull<V1 | V2> : NotNull<V1>;
type ExtractTypeFromCoalesce4<DB, TB extends keyof DB, R1, R2, R3, R4> = ExtractTypeFromCoalesceValues4<ExtractTypeFromReferenceExpression<DB, TB, R1>, ExtractTypeFromReferenceExpression<DB, TB, R2>, ExtractTypeFromReferenceExpression<DB, TB, R3>, ExtractTypeFromReferenceExpression<DB, TB, R4>>;
type ExtractTypeFromCoalesceValues4<V1, V2, V3, V4> = null extends V1 ? null extends V2 ? null extends V3 ? null extends V4 ? V1 | V2 | V3 | V4 : NotNull<V1 | V2 | V3 | V4> : NotNull<V1 | V2 | V3> : NotNull<V1 | V2> : NotNull<V1>;
type ExtractTypeFromCoalesce5<DB, TB extends keyof DB, R1, R2, R3, R4, R5> = ExtractTypeFromCoalesceValues5<ExtractTypeFromReferenceExpression<DB, TB, R1>, ExtractTypeFromReferenceExpression<DB, TB, R2>, ExtractTypeFromReferenceExpression<DB, TB, R3>, ExtractTypeFromReferenceExpression<DB, TB, R4>, ExtractTypeFromReferenceExpression<DB, TB, R5>>;
type ExtractTypeFromCoalesceValues5<V1, V2, V3, V4, V5> = null extends V1 ? null extends V2 ? null extends V3 ? null extends V4 ? null extends V5 ? V1 | V2 | V3 | V4 | V5 : NotNull<V1 | V2 | V3 | V4 | V5> : NotNull<V1 | V2 | V3 | V4> : NotNull<V1 | V2 | V3> : NotNull<V1 | V2> : NotNull<V1>;
type NotNull<T> = Exclude<T, null>;

interface PartitionByItemNode extends OperationNode {
    readonly kind: 'PartitionByItemNode';
    readonly partitionBy: SimpleReferenceExpressionNode;
}
/**
 * @internal
 */
declare const PartitionByItemNode: Readonly<{
    is(node: OperationNode): node is PartitionByItemNode;
    create(partitionBy: SimpleReferenceExpressionNode): PartitionByItemNode;
}>;

interface PartitionByNode extends OperationNode {
    readonly kind: 'PartitionByNode';
    readonly items: ReadonlyArray<PartitionByItemNode>;
}
/**
 * @internal
 */
declare const PartitionByNode: Readonly<{
    is(node: OperationNode): node is PartitionByNode;
    create(items: ReadonlyArray<PartitionByItemNode>): PartitionByNode;
    cloneWithItems(partitionBy: PartitionByNode, items: ReadonlyArray<PartitionByItemNode>): PartitionByNode;
}>;

interface OverNode extends OperationNode {
    readonly kind: 'OverNode';
    readonly orderBy?: OrderByNode;
    readonly partitionBy?: PartitionByNode;
}
/**
 * @internal
 */
declare const OverNode: Readonly<{
    is(node: OperationNode): node is OverNode;
    create(): OverNode;
    cloneWithOrderByItems(overNode: OverNode, items: ReadonlyArray<OrderByItemNode>): OverNode;
    cloneWithPartitionByItems(overNode: OverNode, items: ReadonlyArray<PartitionByItemNode>): OverNode;
}>;

interface AggregateFunctionNode extends OperationNode {
    readonly kind: 'AggregateFunctionNode';
    readonly func: string;
    readonly aggregated: readonly OperationNode[];
    readonly distinct?: boolean;
    readonly orderBy?: OrderByNode;
    readonly withinGroup?: OrderByNode;
    readonly filter?: WhereNode;
    readonly over?: OverNode;
}
/**
 * @internal
 */
declare const AggregateFunctionNode: Readonly<{
    is(node: OperationNode): node is AggregateFunctionNode;
    create(aggregateFunction: string, aggregated?: readonly OperationNode[]): AggregateFunctionNode;
    cloneWithDistinct(aggregateFunctionNode: AggregateFunctionNode): AggregateFunctionNode;
    cloneWithOrderBy(aggregateFunctionNode: AggregateFunctionNode, orderItems: ReadonlyArray<OrderByItemNode>, withinGroup?: boolean): AggregateFunctionNode;
    cloneWithFilter(aggregateFunctionNode: AggregateFunctionNode, filter: OperationNode): AggregateFunctionNode;
    cloneWithOrFilter(aggregateFunctionNode: AggregateFunctionNode, filter: OperationNode): AggregateFunctionNode;
    cloneWithOver(aggregateFunctionNode: AggregateFunctionNode, over?: OverNode): AggregateFunctionNode;
}>;

type PartitionByExpression<DB, TB extends keyof DB> = StringReference<DB, TB> | DynamicReferenceBuilder<any>;

declare class OverBuilder<DB, TB extends keyof DB> implements OrderByInterface<DB, TB, {}>, OperationNodeSource {
    #private;
    constructor(props: OverBuilderProps);
    /**
     * Adds an `order by` clause or item inside the `over` function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
     * from "person"
     * ```
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers?: OrderByModifiers): OverBuilder<DB, TB>;
    /**
     * @deprecated It does ~2-2.6x more compile-time instantiations compared to multiple chained `orderBy(expr, modifiers?)` calls (in `order by` clauses with reasonable item counts), and has broken autocompletion.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}> | DirectedOrderByStringReference<DB, TB, {}>>(exprs: ReadonlyArray<OE>): OverBuilder<DB, TB>;
    /**
     * @deprecated It does ~2.9x more compile-time instantiations compared to a `orderBy(expr, direction)` call.
     */
    orderBy<OE extends DirectedOrderByStringReference<DB, TB, {}>>(expr: OE): OverBuilder<DB, TB>;
    /**
     * @deprecated Use `orderBy(expr, (ob) => ...)` instead.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers: Expression<any>): OverBuilder<DB, TB>;
    /**
     * Clears the `order by` clause from the query.
     *
     * See {@link orderBy} for adding an `order by` clause or item to a query.
     *
     * ### Examples
     *
     * ```ts
     * const query = db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy('id', 'desc')
     *
     * const results = await query
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy(): OverBuilder<DB, TB>;
    /**
     * Adds partition by clause item/s inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy(['last_name', 'first_name'])
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name", "first_name") as "average_age"
     * from "person"
     * ```
     */
    partitionBy(partitionBy: ReadonlyArray<PartitionByExpression<DB, TB>>): OverBuilder<DB, TB>;
    partitionBy<PE extends PartitionByExpression<DB, TB>>(partitionBy: PE): OverBuilder<DB, TB>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): OverNode;
}
interface OverBuilderProps {
    readonly overNode: OverNode;
}

declare class AggregateFunctionBuilder<DB, TB extends keyof DB, O = unknown> implements OrderByInterface<DB, TB, {}>, AliasableExpression<O> {
    #private;
    constructor(props: AggregateFunctionBuilderProps);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ### Examples
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): O | undefined;
    /**
     * Returns an aliased version of the function.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.count<number>('id').as('person_count')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `person_count: number` field exists in the result type.
     * console.log(result.person_count)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "person_count"
     * from "person"
     * ```
     */
    as<A extends string>(alias: A): AliasedAggregateFunctionBuilder<DB, TB, O, A>;
    /**
     * Adds a `distinct` clause inside the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(distinct "first_name") as "first_name_count"
     * from "person"
     * ```
     */
    distinct(): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds an `order by` clause inside the aggregate function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) =>
     *     eb.fn.jsonAgg('pet').orderBy('pet.name').as('person_pets')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select json_agg("pet" order by "pet"."name") as "person_pets"
     * from "person"
     * inner join "pet" ON "pet"."owner_id" = "person"."id"
     * ```
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers?: OrderByModifiers): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * @deprecated It does ~2-2.6x more compile-time instantiations compared to multiple chained `orderBy(expr, modifiers?)` calls (in `order by` clauses with reasonable item counts), and has broken autocompletion.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}> | DirectedOrderByStringReference<DB, TB, {}>>(exprs: ReadonlyArray<OE>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * @deprecated It does ~2.9x more compile-time instantiations compared to a `orderBy(expr, direction)` call.
     */
    orderBy<OE extends DirectedOrderByStringReference<DB, TB, {}>>(expr: OE): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * @deprecated Use `orderBy(expr, (ob) => ...)` instead.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers: Expression<any>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Clears the `order by` clause from the query.
     *
     * See {@link orderBy} for adding an `order by` clause or item to a query.
     *
     * ### Examples
     *
     * ```ts
     * const query = db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy('id', 'desc')
     *
     * const results = await query
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy(): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `withing group` clause with a nested `order by` clause after the function.
     *
     * This is only supported by some dialects like PostgreSQL or MS SQL Server.
     *
     * ### Examples
     *
     * Most frequent person name:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .agg<string>('mode')
     *       .withinGroupOrderBy('person.first_name')
     *       .as('most_frequent_name')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select mode() within group (order by "person"."first_name") as "most_frequent_name"
     * from "person"
     * ```
     */
    withinGroupOrderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers?: OrderByModifiers): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * @deprecated It does ~2-2.6x more compile-time instantiations compared to multiple chained `withinGroupOrderBy(expr, modifiers?)` calls (in `order by` clauses with reasonable item counts), and has broken autocompletion.
     */
    withinGroupOrderBy<OE extends OrderByExpression<DB, TB, {}> | DirectedOrderByStringReference<DB, TB, {}>>(exprs: ReadonlyArray<OE>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * @deprecated It does ~2.9x more compile-time instantiations compared to a `withinGroupOrderBy(expr, direction)` call.
     */
    withinGroupOrderBy<OE extends DirectedOrderByStringReference<DB, TB, {}>>(expr: OE): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * @deprecated Use `withinGroupOrderBy(expr, (ob) => ...)` instead.
     */
    withinGroupOrderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers: Expression<any>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `filter` clause with a nested `where` clause after the function.
     *
     * Similar to {@link WhereInterface}'s `where` method.
     *
     * Also see {@link filterWhereRef}.
     *
     * ### Examples
     *
     * Count by gender:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhere('gender', '=', 'female')
     *       .as('female_count'),
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhere('gender', '=', 'male')
     *       .as('male_count'),
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhere('gender', '=', 'other')
     *       .as('other_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "gender" = $1) as "female_count",
     *   count("id") filter(where "gender" = $2) as "male_count",
     *   count("id") filter(where "gender" = $3) as "other_count"
     * from "person"
     * ```
     */
    filterWhere<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): AggregateFunctionBuilder<DB, TB, O>;
    filterWhere<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `filter` clause with a nested `where` clause after the function, where
     * both sides of the operator are references to columns.
     *
     * Similar to {@link WhereInterface}'s `whereRef` method.
     *
     * ### Examples
     *
     * Count people with same first and last names versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhereRef('first_name', '=', 'last_name')
     *       .as('repeat_name_count'),
     *     eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */
    filterWhereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds an `over` clause (window functions) after the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over() as "average_age"
     * from "person"
     * ```
     *
     * Also supports passing a callback that returns an over builder,
     * allowing to add partition by and sort by clauses inside over.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
     * from "person"
     * ```
     */
    over(over?: OverBuilderCallback<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    /**
     * Casts the expression to the given type.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AggregateFunctionBuilder` with a new output type.
     */
    $castTo<C>(): AggregateFunctionBuilder<DB, TB, C>;
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull(): AggregateFunctionBuilder<DB, TB, Exclude<O, null>>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): AggregateFunctionNode;
}
/**
 * {@link AggregateFunctionBuilder} with an alias. The result of calling {@link AggregateFunctionBuilder.as}.
 */
declare class AliasedAggregateFunctionBuilder<DB, TB extends keyof DB, O = unknown, A extends string = never> implements AliasedExpression<O, A> {
    #private;
    constructor(aggregateFunctionBuilder: AggregateFunctionBuilder<DB, TB, O>, alias: A);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<O>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
interface AggregateFunctionBuilderProps {
    aggregateFunctionNode: AggregateFunctionNode;
}
type OverBuilderCallback<DB, TB extends keyof DB> = (builder: OverBuilder<DB, TB>) => OverBuilder<any, any>;

/**
 * Helpers for type safe SQL function calls.
 *
 * You can always use the {@link sql} tag to call functions and build arbitrary
 * expressions. This module simply has shortcuts for most common function calls.
 *
 * ### Examples
 *
 * <!-- siteExample("select", "Function calls", 60) -->
 *
 * This example shows how to create function calls. These examples also work in any
 * other place (`where` calls, updates, inserts etc.). The only difference is that you
 * leave out the alias (the `as` call) if you use these in any other place than `select`.
 *
 * ```ts
 * import { sql } from 'kysely'
 *
 * const result = await db.selectFrom('person')
 *   .innerJoin('pet', 'pet.owner_id', 'person.id')
 *   .select(({ fn, val, ref }) => [
 *     'person.id',
 *
 *     // The `fn` module contains the most common
 *     // functions.
 *     fn.count<number>('pet.id').as('pet_count'),
 *
 *     // You can call any function by calling `fn`
 *     // directly. The arguments are treated as column
 *     // references by default. If you want  to pass in
 *     // values, use the `val` function.
 *     fn<string>('concat', [
 *       val('Ms. '),
 *       'first_name',
 *       val(' '),
 *       'last_name'
 *     ]).as('full_name_with_title'),
 *
 *     // You can call any aggregate function using the
 *     // `fn.agg` function.
 *     fn.agg<string[]>('array_agg', ['pet.name']).as('pet_names'),
 *
 *     // And once again, you can use the `sql`
 *     // template tag. The template tag substitutions
 *     // are treated as values by default. If you want
 *     // to reference columns, you can use the `ref`
 *     // function.
 *     sql<string>`concat(
 *       ${ref('first_name')},
 *       ' ',
 *       ${ref('last_name')}
 *     )`.as('full_name')
 *   ])
 *   .groupBy('person.id')
 *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
 *   .execute()
 * ```
 *
 * The generated SQL (PostgreSQL):
 *
 * ```sql
 * select
 *   "person"."id",
 *   count("pet"."id") as "pet_count",
 *   concat($1, "first_name", $2, "last_name") as "full_name_with_title",
 *   array_agg("pet"."name") as "pet_names",
 *   concat("first_name", ' ', "last_name") as "full_name"
 * from "person"
 * inner join "pet" on "pet"."owner_id" = "person"."id"
 * group by "person"."id"
 * having count("pet"."id") > $3
 * ```
 */
interface FunctionModule<DB, TB extends keyof DB> {
    /**
     * Creates a function call.
     *
     * To create an aggregate function call, use {@link FunctionModule.agg}.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .selectAll('person')
     *   .where(db.fn('upper', ['first_name']), '=', 'JENNIFER')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where upper("first_name") = $1
     * ```
     *
     * If you prefer readability over type-safety, you can always use raw `sql`:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.selectFrom('person')
     *   .selectAll('person')
     *   .where(sql<string>`upper(first_name)`, '=', 'JENNIFER')
     *   .execute()
     * ```
     */
    <O, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(name: string, args?: ReadonlyArray<RE>): ExpressionWrapper<DB, TB, O>;
    /**
     * Creates an aggregate function call.
     *
     * This is a specialized version of the `fn` method, that returns an {@link AggregateFunctionBuilder}
     * instance. A builder that allows you to chain additional methods such as `distinct`,
     * `filterWhere` and `over`.
     *
     * See {@link avg}, {@link count}, {@link countAll}, {@link max}, {@link min}, {@link sum}
     * shortcuts of common aggregate functions.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(({ fn }) => [
     *     fn.agg<number>('rank').over().as('rank'),
     *     fn.agg<string>('group_concat', ['first_name']).distinct().as('first_names')
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select rank() over() as "rank",
     *   group_concat(distinct "first_name") as "first_names"
     * from "person"
     * ```
     */
    agg<O, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(name: string, args?: ReadonlyArray<RE>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `avg` function for the column or expression given as the argument.
     *
     * This sql function calculates the average value for a given column.
     *
     * For additional functionality such as distinct, filtering and window functions,
     * refer to {@link AggregateFunctionBuilder}. An instance of this builder is
     * returned when calling this function.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.avg('price').as('avg_price'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("price") as "avg_price" from "toy"
     * ```
     *
     * If this function is used in a `select` statement, the type of the selected
     * expression will be `number | string` by default. This is because Kysely can't know the
     * type the db driver outputs. Sometimes the output can be larger than the largest
     * JavaScript number and a string is returned instead. Most drivers allow you
     * to configure the output type of large numbers and Kysely can't know if you've
     * done so.
     *
     * You can specify the output type of the expression by providing the type as
     * the first type argument:
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.avg<number>('price').as('avg_price'))
     *   .execute()
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a {@link coalesce}
     * function.
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.avg<number | null>('price').as('avg_price'))
     *   .execute()
     * ```
     */
    avg<O extends number | string | null = number | string, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(expr: RE): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `coalesce` function for given arguments.
     *
     * This sql function returns the first non-null value from left to right, commonly
     * used to provide a default scalar for nullable columns or functions.
     *
     * If this function is used in a `select` statement, the type of the selected
     * expression is inferred in the same manner that the sql function computes.
     * A union of arguments' types - if a non-nullable argument exists, it stops
     * there (ignoring any further arguments' types) and exludes null from the final
     * union type.
     *
     * `(string | null, number | null)` is inferred as `string | number | null`.
     *
     * `(string | null, number, Date | null)` is inferred as `string | number`.
     *
     * `(number, string | null)` is inferred as `number`.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.selectFrom('person')
     *   .select((eb) => eb.fn.coalesce('nullable_column', sql.lit('<unknown>')).as('column'))
     *   .where('first_name', '=', 'Jessie')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select coalesce("nullable_column", '<unknown>') as "column" from "person" where "first_name" = $1
     * ```
     *
     * You can combine this function with other helpers in this module:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select((eb) => eb.fn.coalesce(eb.fn.avg<number | null>('age'), eb.lit(0)).as('avg_age'))
     *   .where('first_name', '=', 'Jennifer')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select coalesce(avg("age"), 0) as "avg_age" from "person" where "first_name" = $1
     * ```
     */
    coalesce<V1 extends ReferenceExpression<DB, TB>>(v1: V1): ExpressionWrapper<DB, TB, ExtractTypeFromCoalesce1<DB, TB, V1>>;
    coalesce<V1 extends ReferenceExpression<DB, TB>, V2 extends ReferenceExpression<DB, TB>>(v1: V1, v2: V2): ExpressionWrapper<DB, TB, ExtractTypeFromCoalesce2<DB, TB, V1, V2>>;
    coalesce<V1 extends ReferenceExpression<DB, TB>, V2 extends ReferenceExpression<DB, TB>, V3 extends ReferenceExpression<DB, TB>>(v1: V1, v2: V2, v3: V3): ExpressionWrapper<DB, TB, ExtractTypeFromCoalesce3<DB, TB, V1, V2, V3>>;
    coalesce<V1 extends ReferenceExpression<DB, TB>, V2 extends ReferenceExpression<DB, TB>, V3 extends ReferenceExpression<DB, TB>, V4 extends ReferenceExpression<DB, TB>>(v1: V1, v2: V2, v3: V3, v4: V4): ExpressionWrapper<DB, TB, ExtractTypeFromCoalesce4<DB, TB, V1, V2, V3, V4>>;
    coalesce<V1 extends ReferenceExpression<DB, TB>, V2 extends ReferenceExpression<DB, TB>, V3 extends ReferenceExpression<DB, TB>, V4 extends ReferenceExpression<DB, TB>, V5 extends ReferenceExpression<DB, TB>>(v1: V1, v2: V2, v3: V3, v4: V4, v5: V5): ExpressionWrapper<DB, TB, ExtractTypeFromCoalesce5<DB, TB, V1, V2, V3, V4, V5>>;
    /**
     * Calls the `count` function for the column or expression given as the argument.
     *
     * When called with a column as argument, this sql function counts the number of rows where there
     * is a non-null value in that column.
     *
     * For counting all rows nulls included (`count(*)`), see {@link countAll}.
     *
     * For additional functionality such as distinct, filtering and window functions,
     * refer to {@link AggregateFunctionBuilder}. An instance of this builder is
     * returned when calling this function.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.count('id').as('num_toys'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "num_toys" from "toy"
     * ```
     *
     * If this function is used in a `select` statement, the type of the selected
     * expression will be `number | string | bigint` by default. This is because
     * Kysely can't know the type the db driver outputs. Sometimes the output can
     * be larger than the largest JavaScript number and a string is returned instead.
     * Most drivers allow you to configure the output type of large numbers and Kysely
     * can't know if you've done so.
     *
     * You can specify the output type of the expression by providing
     * the type as the first type argument:
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.count<number>('id').as('num_toys'))
     *   .execute()
     * ```
     */
    count<O extends number | string | bigint, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(expr: RE): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `count` function with `*` or `table.*` as argument.
     *
     * When called with `*` as argument, this sql function counts the number of rows,
     * nulls included.
     *
     * For counting rows with non-null values in a given column (`count(column)`),
     * see {@link count}.
     *
     * For additional functionality such as filtering and window functions, refer
     * to {@link AggregateFunctionBuilder}. An instance of this builder is returned
     * when calling this function.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.countAll().as('num_toys'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(*) as "num_toys" from "toy"
     * ```
     *
     * If this is used in a `select` statement, the type of the selected expression
     * will be `number | string | bigint` by default. This is because Kysely
     * can't know the type the db driver outputs. Sometimes the output can be larger
     * than the largest JavaScript number and a string is returned instead. Most
     * drivers allow you to configure the output type of large numbers and Kysely
     * can't know if you've done so.
     *
     * You can specify the output type of the expression by providing
     * the type as the first type argument:
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.countAll<number>().as('num_toys'))
     *   .execute()
     * ```
     *
     * Some databases, such as PostgreSQL, support scoping the function to a specific
     * table:
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .innerJoin('pet', 'pet.id', 'toy.pet_id')
     *   .select((eb) => eb.fn.countAll('toy').as('num_toys'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("toy".*) as "num_toys"
     * from "toy" inner join "pet" on "pet"."id" = "toy"."pet_id"
     * ```
     */
    countAll<O extends number | string | bigint, T extends TB = TB>(table: T): AggregateFunctionBuilder<DB, TB, O>;
    countAll<O extends number | string | bigint>(): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `max` function for the column or expression given as the argument.
     *
     * This sql function calculates the maximum value for a given column.
     *
     * For additional functionality such as distinct, filtering and window functions,
     * refer to {@link AggregateFunctionBuilder}. An instance of this builder is
     * returned when calling this function.
     *
     * If this function is used in a `select` statement, the type of the selected
     * expression will be the referenced column's type. This is because the result
     * is within the column's value range.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.max('price').as('max_price'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select max("price") as "max_price" from "toy"
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a {@link coalesce}
     * function.
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.max<number | null>('price').as('max_price'))
     *   .execute()
     * ```
     */
    max<O extends number | string | Date | bigint | null = never, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(expr: RE): AggregateFunctionBuilder<DB, TB, IsNever<O> extends true ? ExtractTypeFromReferenceExpression<DB, TB, RE, number | string | Date | bigint> : O>;
    /**
     * Calls the `min` function for the column or expression given as the argument.
     *
     * This sql function calculates the minimum value for a given column.
     *
     * For additional functionality such as distinct, filtering and window functions,
     * refer to {@link AggregateFunctionBuilder}. An instance of this builder is
     * returned when calling this function.
     *
     * If this function is used in a `select` statement, the type of the selected
     * expression will be the referenced column's type. This is because the result
     * is within the column's value range.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.min('price').as('min_price'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select min("price") as "min_price" from "toy"
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a {@link coalesce}
     * function.
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.min<number | null>('price').as('min_price'))
     *   .execute()
     * ```
     */
    min<O extends number | string | Date | bigint | null = never, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(expr: RE): AggregateFunctionBuilder<DB, TB, IsNever<O> extends true ? ExtractTypeFromReferenceExpression<DB, TB, RE, number | string | Date | bigint> : O>;
    /**
     * Calls the `sum` function for the column or expression given as the argument.
     *
     * This sql function sums the values of a given column.
     *
     * For additional functionality such as distinct, filtering and window functions,
     * refer to {@link AggregateFunctionBuilder}. An instance of this builder is
     * returned when calling this function.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.sum('price').as('total_price'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select sum("price") as "total_price" from "toy"
     * ```
     *
     * If this function is used in a `select` statement, the type of the selected
     * expression will be `number | string` by default. This is because Kysely can't know the
     * type the db driver outputs. Sometimes the output can be larger than the largest
     * JavaScript number and a string is returned instead. Most drivers allow you
     * to configure the output type of large numbers and Kysely can't know if you've
     * done so.
     *
     * You can specify the output type of the expression by providing the type as
     * the first type argument:
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.sum<number>('price').as('total_price'))
     *   .execute()
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a {@link coalesce}
     * function.
     *
     * ```ts
     * await db.selectFrom('toy')
     *   .select((eb) => eb.fn.sum<number | null>('price').as('total_price'))
     *   .execute()
     * ```
     */
    sum<O extends number | string | bigint | null = number | string | bigint, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(expr: RE): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `any` function for the column or expression given as the argument.
     *
     * The argument must be a subquery or evaluate to an array.
     *
     * ### Examples
     *
     * In the following example, `nicknames` is assumed to be a column of type `string[]`:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb(
     *     eb.val('Jen'), '=', eb.fn.any('person.nicknames')
     *   ))
     *   .execute()
     * ```
     *
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "person".*
     * from
     *   "person"
     * where
     *  $1 = any("person"."nicknames")
     * ```
     */
    any<RE extends StringReference<DB, TB>>(expr: RE): Exclude<ExtractTypeFromReferenceExpression<DB, TB, RE>, null> extends ReadonlyArray<infer I> ? ExpressionWrapper<DB, TB, I> : KyselyTypeError<'any(expr) call failed: expr must be an array'>;
    any<T>(subquery: SelectQueryBuilderExpression<Record<string, T>>): ExpressionWrapper<DB, TB, T>;
    any<T>(expr: Expression<ReadonlyArray<T>>): ExpressionWrapper<DB, TB, T>;
    /**
     * Creates a `json_agg` function call.
     *
     * This is only supported by some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * You can use it on table expressions:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => ['first_name', eb.fn.jsonAgg('pet').as('pets')])
     *   .groupBy('person.first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", json_agg("pet") as "pets"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."first_name"
     * ```
     *
     * or on columns:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => [
     *     'first_name',
     *     eb.fn.jsonAgg('pet.name').as('pet_names'),
     *   ])
     *   .groupBy('person.first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", json_agg("pet"."name") AS "pet_names"
     * from "person"
     * inner join "pet" ON "pet"."owner_id" = "person"."id"
     * group by "person"."first_name"
     * ```
     */
    jsonAgg<T extends (TB & string) | Expression<unknown>>(table: T): AggregateFunctionBuilder<DB, TB, T extends TB ? Simplify<ShallowDehydrateObject<Selectable<DB[T]>>>[] : T extends Expression<infer O> ? Simplify<ShallowDehydrateObject<O>>[] : never>;
    jsonAgg<RE extends StringReference<DB, TB>>(column: RE): AggregateFunctionBuilder<DB, TB, ShallowDehydrateValue<SelectType<ExtractTypeFromStringReference<DB, TB, RE>>>[] | null>;
    /**
     * Creates a to_json function call.
     *
     * This function is only available on PostgreSQL.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => ['first_name', eb.fn.toJson('pet').as('pet')])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", to_json("pet") as "pet"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * ```
     */
    toJson<T extends (TB & string) | Expression<unknown>>(table: T): ExpressionWrapper<DB, TB, T extends TB ? Simplify<ShallowDehydrateObject<Selectable<DB[T]>>> : T extends Expression<infer O> ? Simplify<ShallowDehydrateObject<O>> : never>;
}
declare function createFunctionModule<DB, TB extends keyof DB>(): FunctionModule<DB, TB>;

interface CaseNode extends OperationNode {
    readonly kind: 'CaseNode';
    readonly value?: OperationNode;
    readonly when?: ReadonlyArray<WhenNode>;
    readonly else?: OperationNode;
    readonly isStatement?: boolean;
}
/**
 * @internal
 */
declare const CaseNode: Readonly<{
    is(node: OperationNode): node is CaseNode;
    create(value?: OperationNode): CaseNode;
    cloneWithWhen(caseNode: CaseNode, when: WhenNode): CaseNode;
    cloneWithThen(caseNode: CaseNode, then: OperationNode): CaseNode;
    cloneWith(caseNode: CaseNode, props: Partial<Pick<CaseNode, "else" | "isStatement">>): CaseNode;
}>;

declare class CaseBuilder<DB, TB extends keyof DB, W = unknown, O = never> implements Whenable<DB, TB, W, O> {
    #private;
    constructor(props: CaseBuilderProps);
    /**
     * Adds a `when` clause to the case statement.
     *
     * A `when` call must be followed by a {@link CaseThenBuilder.then} call.
     */
    when<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: unknown extends W ? RE : KyselyTypeError<'when(lhs, op, rhs) is not supported when using case(value)'>, op: ComparisonOperatorExpression, rhs: VE): CaseThenBuilder<DB, TB, W, O>;
    when(expression: Expression<W>): CaseThenBuilder<DB, TB, W, O>;
    when(value: unknown extends W ? KyselyTypeError<'when(value) is only supported when using case(value)'> : W): CaseThenBuilder<DB, TB, W, O>;
}
interface CaseBuilderProps {
    readonly node: CaseNode;
}
declare class CaseThenBuilder<DB, TB extends keyof DB, W, O> {
    #private;
    constructor(props: CaseBuilderProps);
    /**
     * Adds a `then` clause to the `case` statement.
     *
     * A `then` call can be followed by {@link Whenable.when}, {@link CaseWhenBuilder.else},
     * {@link CaseWhenBuilder.end} or {@link CaseWhenBuilder.endCase} call.
     */
    then<E extends Expression<unknown>>(expression: E): CaseWhenBuilder<DB, TB, W, O | ExtractTypeFromValueExpression<E>>;
    then<V>(value: V): CaseWhenBuilder<DB, TB, W, O | V>;
}
declare class CaseWhenBuilder<DB, TB extends keyof DB, W, O> implements Whenable<DB, TB, W, O>, Endable<DB, TB, O | null> {
    #private;
    constructor(props: CaseBuilderProps);
    /**
     * Adds a `when` clause to the case statement.
     *
     * A `when` call must be followed by a {@link CaseThenBuilder.then} call.
     */
    when<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: unknown extends W ? RE : KyselyTypeError<'when(lhs, op, rhs) is not supported when using case(value)'>, op: ComparisonOperatorExpression, rhs: VE): CaseThenBuilder<DB, TB, W, O>;
    when(expression: Expression<W>): CaseThenBuilder<DB, TB, W, O>;
    when(value: unknown extends W ? KyselyTypeError<'when(value) is only supported when using case(value)'> : W): CaseThenBuilder<DB, TB, W, O>;
    /**
     * Adds an `else` clause to the `case` statement.
     *
     * An `else` call must be followed by an {@link Endable.end} or {@link Endable.endCase} call.
     */
    else<E extends Expression<unknown>>(expression: E): CaseEndBuilder<DB, TB, O | ExtractTypeFromValueExpression<E>>;
    else<V>(value: V): CaseEndBuilder<DB, TB, O | V>;
    /**
     * Adds an `end` keyword to the case operator.
     *
     * `case` operators can only be used as part of a query.
     * For a `case` statement used as part of a stored program, use {@link endCase} instead.
     */
    end(): ExpressionWrapper<DB, TB, O | null>;
    /**
     * Adds `end case` keywords to the case statement.
     *
     * `case` statements can only be used for flow control in stored programs.
     * For a `case` operator used as part of a query, use {@link end} instead.
     */
    endCase(): ExpressionWrapper<DB, TB, O | null>;
}
declare class CaseEndBuilder<DB, TB extends keyof DB, O> implements Endable<DB, TB, O> {
    #private;
    constructor(props: CaseBuilderProps);
    /**
     * Adds an `end` keyword to the case operator.
     *
     * `case` operators can only be used as part of a query.
     * For a `case` statement used as part of a stored program, use {@link endCase} instead.
     */
    end(): ExpressionWrapper<DB, TB, O>;
    /**
     * Adds `end case` keywords to the case statement.
     *
     * `case` statements can only be used for flow control in stored programs.
     * For a `case` operator used as part of a query, use {@link end} instead.
     */
    endCase(): ExpressionWrapper<DB, TB, O>;
}
interface Whenable<DB, TB extends keyof DB, W, O> {
    /**
     * Adds a `when` clause to the case statement.
     *
     * A `when` call must be followed by a {@link CaseThenBuilder.then} call.
     */
    when<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: unknown extends W ? RE : KyselyTypeError<'when(lhs, op, rhs) is not supported when using case(value)'>, op: ComparisonOperatorExpression, rhs: VE): CaseThenBuilder<DB, TB, W, O>;
    when(expression: Expression<W>): CaseThenBuilder<DB, TB, W, O>;
    when(value: unknown extends W ? KyselyTypeError<'when(value) is only supported when using case(value)'> : W): CaseThenBuilder<DB, TB, W, O>;
}
interface Endable<DB, TB extends keyof DB, O> {
    /**
     * Adds an `end` keyword to the case operator.
     *
     * `case` operators can only be used as part of a query.
     * For a `case` statement used as part of a stored program, use {@link endCase} instead.
     */
    end(): ExpressionWrapper<DB, TB, O>;
    /**
     * Adds `end case` keywords to the case statement.
     *
     * `case` statements can only be used for flow control in stored programs.
     * For a `case` operator used as part of a query, use {@link end} instead.
     */
    endCase(): ExpressionWrapper<DB, TB, O>;
}

type JSONPathLegType = 'Member' | 'ArrayLocation';
interface JSONPathLegNode extends OperationNode {
    readonly kind: 'JSONPathLegNode';
    readonly type: JSONPathLegType;
    readonly value: string | number;
}
/**
 * @internal
 */
declare const JSONPathLegNode: Readonly<{
    is(node: OperationNode): node is JSONPathLegNode;
    create(type: JSONPathLegType, value: string | number): JSONPathLegNode;
}>;

interface JSONPathNode extends OperationNode {
    readonly kind: 'JSONPathNode';
    readonly inOperator?: OperatorNode;
    readonly pathLegs: ReadonlyArray<JSONPathLegNode>;
}
/**
 * @internal
 */
declare const JSONPathNode: Readonly<{
    is(node: OperationNode): node is JSONPathNode;
    create(inOperator?: OperatorNode): JSONPathNode;
    cloneWithLeg(jsonPathNode: JSONPathNode, pathLeg: JSONPathLegNode): JSONPathNode;
}>;

interface JSONOperatorChainNode extends OperationNode {
    readonly kind: 'JSONOperatorChainNode';
    readonly operator: OperatorNode;
    readonly values: readonly ValueNode[];
}
/**
 * @internal
 */
declare const JSONOperatorChainNode: Readonly<{
    is(node: OperationNode): node is JSONOperatorChainNode;
    create(operator: OperatorNode): JSONOperatorChainNode;
    cloneWithValue(node: JSONOperatorChainNode, value: ValueNode): JSONOperatorChainNode;
}>;

interface JSONReferenceNode extends OperationNode {
    readonly kind: 'JSONReferenceNode';
    readonly reference: ReferenceNode;
    readonly traversal: JSONPathNode | JSONOperatorChainNode;
}
/**
 * @internal
 */
declare const JSONReferenceNode: Readonly<{
    is(node: OperationNode): node is JSONReferenceNode;
    create(reference: ReferenceNode, traversal: JSONPathNode | JSONOperatorChainNode): JSONReferenceNode;
    cloneWithTraversal(node: JSONReferenceNode, traversal: JSONPathNode | JSONOperatorChainNode): JSONReferenceNode;
}>;

declare class JSONPathBuilder<S, O = S> {
    #private;
    constructor(node: JSONReferenceNode | JSONPathNode);
    /**
     * Access an element of a JSON array in a specific location.
     *
     * Since there's no guarantee an element exists in the given array location, the
     * resulting type is always nullable. If you're sure the element exists, you
     * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
     *
     * See also {@link key} to access properties of JSON objects.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(eb =>
     *     eb.ref('nicknames', '->').at(0).as('primary_nickname')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "nicknames"->0 as "primary_nickname" from "person"
     *```
     *
     * Combined with {@link key}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('experience', '->').at(0).key('role').as('first_role')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "experience"->0->'role' as "first_role" from "person"
     * ```
     *
     * You can use `'last'` to access the last element of the array in MySQL:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `nicknames`->'$[last]' as `last_nickname` from `person`
     * ```
     *
     * Or `'#-1'` in SQLite:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
     * ```
     */
    at<I extends any[] extends O ? number | 'last' | `#-${number}` : never, O2 = null | NonNullable<NonNullable<O>[keyof NonNullable<O> & number]>>(index: `${I}` extends `${any}.${any}` | `#--${any}` ? never : I): TraversedJSONPathBuilder<S, O2>;
    /**
     * Access a property of a JSON object.
     *
     * If a field is optional, the resulting type will be nullable.
     *
     * See also {@link at} to access elements of JSON arrays.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('address', '->').key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "address"->'city' as "city" from "person"
     * ```
     *
     * Going deeper:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `profile`->'$.website.url' as `website_url` from `person`
     * ```
     *
     * Combined with {@link at}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "profile"->'addresses'->0->'city' as "city" from "person"
     * ```
     */
    key<K extends any[] extends O ? never : O extends object ? keyof NonNullable<O> & string : never, O2 = undefined extends O ? null | NonNullable<NonNullable<O>[K]> : null extends O ? null | NonNullable<NonNullable<O>[K]> : string extends keyof NonNullable<O> ? null | NonNullable<NonNullable<O>[K]> : NonNullable<O>[K]>(key: K): TraversedJSONPathBuilder<S, O2>;
}
declare class TraversedJSONPathBuilder<S, O> extends JSONPathBuilder<S, O> implements AliasableExpression<O> {
    #private;
    constructor(node: JSONReferenceNode | JSONPathNode);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ### Examples
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): O | undefined;
    /**
     * Returns an aliased version of the expression.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(eb =>
     *     eb('first_name', '=', 'Jennifer').as('is_jennifer')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `is_jennifer: SqlBool` field exists in the result type.
     * console.log(result.is_jennifer)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" = $1 as "is_jennifer"
     * from "person"
     * ```
     */
    as<A extends string>(alias: A): AliasedExpression<O, A>;
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` at the end of the expression,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     // `eb.fn<string>` returns an AliasableExpression<string>
     *     eb.fn<string>('concat', ['first_name', eb.val(' '), 'last_name']).as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   concat("first_name", $1, "last_name") as "full_name"
     * from
     *   "person"
     * ```
     *
     * You can also pass in a raw SQL snippet (or any expression) but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: Expression<unknown>): AliasedExpression<O, A>;
    /**
     * Change the output type of the json path.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `JSONPathBuilder` with a new output type.
     */
    $castTo<O2>(): TraversedJSONPathBuilder<S, O2>;
    $notNull(): TraversedJSONPathBuilder<S, Exclude<O, null>>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): OperationNode;
}
declare class AliasedJSONPathBuilder<O, A extends string> implements AliasedExpression<O, A> {
    #private;
    constructor(jsonPath: TraversedJSONPathBuilder<any, O>, alias: A | Expression<unknown>);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<O>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A | Expression<unknown>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}

type RefTuple2<DB, TB extends keyof DB, R1, R2> = DrainOuterGeneric<[
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>
]>;
type RefTuple3<DB, TB extends keyof DB, R1, R2, R3> = DrainOuterGeneric<[
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
    ExtractTypeFromReferenceExpression<DB, TB, R3>
]>;
type RefTuple4<DB, TB extends keyof DB, R1, R2, R3, R4> = DrainOuterGeneric<[
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
    ExtractTypeFromReferenceExpression<DB, TB, R3>,
    ExtractTypeFromReferenceExpression<DB, TB, R4>
]>;
type RefTuple5<DB, TB extends keyof DB, R1, R2, R3, R4, R5> = DrainOuterGeneric<[
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
    ExtractTypeFromReferenceExpression<DB, TB, R3>,
    ExtractTypeFromReferenceExpression<DB, TB, R4>,
    ExtractTypeFromReferenceExpression<DB, TB, R5>
]>;
type ValTuple2<V1, V2> = DrainOuterGeneric<[
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>
]>;
type ValTuple3<V1, V2, V3> = DrainOuterGeneric<[
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>,
    ExtractTypeFromValueExpression<V3>
]>;
type ValTuple4<V1, V2, V3, V4> = DrainOuterGeneric<[
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>,
    ExtractTypeFromValueExpression<V3>,
    ExtractTypeFromValueExpression<V4>
]>;
type ValTuple5<V1, V2, V3, V4, V5> = DrainOuterGeneric<[
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>,
    ExtractTypeFromValueExpression<V3>,
    ExtractTypeFromValueExpression<V4>,
    ExtractTypeFromValueExpression<V5>
]>;

type SelectFrom<DB, TB extends keyof DB, TE extends TableExpressionOrList<DB, TB>> = [TE] extends [keyof DB] ? SelectQueryBuilder<DB, TB | ExtractTableAlias<DB, TE>, {}> : [
    TE
] extends [`${infer T} as ${infer A}`] ? T extends keyof DB ? SelectQueryBuilder<DB & ShallowRecord<A, DB[T]>, TB | A, {}> : never : TE extends ReadonlyArray<infer T> ? SelectQueryBuilder<From<DB, T>, FromTables<DB, TB, T>, {}> : SelectQueryBuilder<From<DB, TE>, FromTables<DB, TB, TE>, {}>;

interface ExpressionBuilder<DB, TB extends keyof DB> {
    /**
     * Creates a binary expression.
     *
     * This function returns an {@link Expression} and can be used pretty much anywhere.
     * See the examples for a couple of possible use cases.
     *
     * ### Examples
     *
     * A simple comparison:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb('first_name', '=', 'Jennifer'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where "first_name" = $1
     * ```
     *
     * By default the third argument is interpreted as a value. To pass in
     * a column reference, you can use {@link ref}:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb('first_name', '=', eb.ref('last_name')))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where "first_name" = "last_name"
     * ```
     *
     * In the following example `eb` is used to increment an integer column:
     *
     * ```ts
     * await db.updateTable('person')
     *   .set((eb) => ({
     *     age: eb('age', '+', 1)
     *   }))
     *   .where('id', '=', 3)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person"
     * set "age" = "age" + $1
     * where "id" = $2
     * ```
     *
     * As always, expressions can be nested. Both the first and the third argument
     * can be any expression:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb(
     *     eb.fn<string>('lower', ['first_name']),
     *     'in',
     *     eb.selectFrom('pet')
     *       .select('pet.name')
     *       .where('pet.species', '=', 'cat')
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where lower("first_name") in (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."species" = $1
     * )
     * ```
     */
    <RE extends ReferenceExpression<DB, TB>, OP extends BinaryOperatorExpression, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: OP, rhs: VE): ExpressionWrapper<DB, TB, OP extends ComparisonOperator ? SqlBool : ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    /**
     * Returns a copy of `this` expression builder, for destructuring purposes.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .where(({ eb, exists, selectFrom }) =>
     *     eb('first_name', '=', 'Jennifer').and(exists(
     *       selectFrom('pet').whereRef('owner_id', '=', 'person.id').select('pet.id')
     *     ))
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and exists (
     *   select "pet.id" from "pet" where "owner_id" = "person.id"
     * )
     * ```
     */
    get eb(): ExpressionBuilder<DB, TB>;
    /**
     * Returns a {@link FunctionModule} that can be used to write type safe function
     * calls.
     *
     * The difference between this and {@link Kysely.fn} is that this one is more
     * type safe. You can only refer to columns visible to the part of the query
     * you are building. {@link Kysely.fn} allows you to refer to columns in any
     * table of the database even if it doesn't produce valid SQL.
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => [
     *     'person.id',
     *     eb.fn.count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "pet_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     */
    get fn(): FunctionModule<DB, TB>;
    /**
     * Creates a subquery.
     *
     * The query builder returned by this method is typed in a way that you can refer to
     * all tables of the parent query in addition to the subquery's tables.
     *
     * This method accepts all the same inputs as {@link QueryCreator.selectFrom}.
     *
     * ### Examples
     *
     * This example shows that you can refer to both `pet.owner_id` and `person.id`
     * columns from the subquery. This is needed to be able to create correlated
     * subqueries:
     *
     * ```ts
     * const result = await db.selectFrom('pet')
     *   .select((eb) => [
     *     'pet.name',
     *     eb.selectFrom('person')
     *       .whereRef('person.id', '=', 'pet.owner_id')
     *       .select('person.first_name')
     *       .as('owner_name')
     *   ])
     *   .execute()
     *
     * console.log(result[0]?.owner_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "pet"."name",
     *   ( select "person"."first_name"
     *     from "person"
     *     where "person"."id" = "pet"."owner_id"
     *   ) as "owner_name"
     * from "pet"
     * ```
     *
     * You can use a normal query in place of `(qb) => qb.selectFrom(...)` but in
     * that case Kysely typings wouldn't allow you to reference `pet.owner_id`
     * because `pet` is not joined to that query.
     */
    selectFrom<TE extends TableExpressionOrList<DB, TB>>(from: TE): SelectFrom<DB, TB, TE>;
    /**
     * Creates a `case` statement/operator.
     *
     * ### Examples
     *
     * Kitchen sink example with 2 flavors of `case` operator:
     *
     * ```ts
     * const { title, name } = await db
     *   .selectFrom('person')
     *   .where('id', '=', 123)
     *   .select((eb) => [
     *     eb.fn.coalesce('last_name', 'first_name').as('name'),
     *     eb
     *       .case()
     *       .when('gender', '=', 'male')
     *       .then('Mr.')
     *       .when('gender', '=', 'female')
     *       .then(
     *         eb
     *           .case('marital_status')
     *           .when('single')
     *           .then('Ms.')
     *           .else('Mrs.')
     *           .end()
     *       )
     *       .end()
     *       .as('title'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   coalesce("last_name", "first_name") as "name",
     *   case
     *     when "gender" = $1 then $2
     *     when "gender" = $3 then
     *       case "marital_status"
     *         when $4 then $5
     *         else $6
     *       end
     *   end as "title"
     * from "person"
     * where "id" = $7
     * ```
     */
    case(): CaseBuilder<DB, TB>;
    case<C extends SimpleReferenceExpression<DB, TB>>(column: C): CaseBuilder<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, C>>;
    case<E extends Expression<any>>(expression: E): CaseBuilder<DB, TB, ExtractTypeFromValueExpression<E>>;
    /**
     * This method can be used to reference columns within the query's context. For
     * a non-type-safe version of this method see {@link sql}'s version.
     *
     * Additionally, this method can be used to reference nested JSON properties or
     * array elements. See {@link JSONPathBuilder} for more information. For regular
     * JSON path expressions you can use {@link jsonPath}.
     *
     * ### Examples
     *
     * By default the third argument of binary expressions is a value.
     * This function can be used to pass in a column reference instead:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', eb.ref('last_name')),
     *     eb('first_name', '=', eb.ref('middle_name'))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where "first_name" = "last_name" or "first_name" = "middle_name"
     * ```
     *
     * In the next example we use the `ref` method to reference columns of the virtual
     * table `excluded` in a type-safe way to create an upsert operation:
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({
     *     id: 3,
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet(({ ref }) => ({
     *       first_name: ref('excluded.first_name'),
     *       last_name: ref('excluded.last_name'),
     *       gender: ref('excluded.gender'),
     *     }))
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("id", "first_name", "last_name", "gender")
     * values ($1, $2, $3, $4)
     * on conflict ("id") do update set
     *   "first_name" = "excluded"."first_name",
     *   "last_name" = "excluded"."last_name",
     *   "gender" = "excluded"."gender"
     * ```
     *
     * In the next example we use `ref` in a raw sql expression. Unless you want
     * to be as type-safe as possible, this is probably overkill:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.updateTable('pet')
     *   .set((eb) => ({
     *     name: sql<string>`concat(${eb.ref('pet.name')}, ${' the animal'})`
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "pet" set "name" = concat("pet"."name", $1)
     * ```
     *
     * In the next example we use `ref` to reference a nested JSON property:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .where(({ eb, ref }) => eb(
     *     ref('profile', '->').key('addresses').at(0).key('city'),
     *     '=',
     *     'San Diego'
     *   ))
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "profile"->'addresses'->0->'city' = $1
     * ```
     *
     * You can also compile to a JSON path expression by using the `->$`or `->>$` operator:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .select(({ ref }) =>
     *     ref('profile', '->$')
     *       .key('addresses')
     *       .at('last')
     *       .key('city')
     *       .as('current_city')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `profile`->'$.addresses[last].city' as `current_city` from `person`
     * ```
     */
    ref<RE extends StringReference<DB, TB>>(reference: RE): ExpressionWrapper<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    ref<RE extends StringReference<DB, TB>>(reference: RE, op: JSONOperatorWith$): JSONPathBuilder<ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    /**
     * Creates a JSON path expression with provided column as root document (the $).
     *
     * For a JSON reference expression, see {@link ref}.
     *
     * ### Examples
     *
     * ```ts
     * await db.updateTable('person')
     *   .set('profile', (eb) => eb.fn('json_set', [
     *     'profile',
     *     eb.jsonPath<'profile'>().key('addresses').at('last').key('city'),
     *     eb.val('San Diego')
     *   ]))
     *   .where('id', '=', 3)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person`
     * set `profile` = json_set(`profile`, '$.addresses[last].city', $1)
     * where `id` = $2
     * ```
     */
    jsonPath<$ extends StringReference<DB, TB> = never>(): IsNever<$> extends true ? KyselyTypeError<"You must provide a column reference as this method's $ generic"> : JSONPathBuilder<ExtractTypeFromReferenceExpression<DB, TB, $>>;
    /**
     * Creates a table reference.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     * import type { Pet } from 'type-editor' // imaginary module
     *
     * const result = await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select(eb => [
     *     'person.id',
     *     sql<Pet[]>`jsonb_agg(${eb.table('pet')})`.as('pets')
     *   ])
     *   .groupBy('person.id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", jsonb_agg("pet") as "pets"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * ```
     *
     * If you need a column reference, use {@link ref}.
     */
    table<T extends TB & string>(table: T): ExpressionWrapper<DB, TB, Selectable<DB[T]>>;
    /**
     * Returns a value expression.
     *
     * This can be used to pass in a value where a reference is taken by default.
     *
     * This function returns an {@link Expression} and can be used pretty much anywhere.
     *
     * ### Examples
     *
     * Binary expressions take a reference by default as the first argument. `val` could
     * be used to pass in a value instead:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb(
     *     eb.val('cat'),
     *     '=',
     *     eb.fn.any(
     *       eb.selectFrom('pet')
     *         .select('species')
     *         .whereRef('owner_id', '=', 'person.id')
     *     )
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where $1 = any(
     *   select "species"
     *   from "pet"
     *   where "owner_id" = "person"."id"
     * )
     * ```
     */
    val<VE>(value: VE): ExpressionWrapper<DB, TB, ExtractTypeFromValueExpression<VE>>;
    /**
     * Creates a tuple expression.
     *
     * This creates a tuple using column references by default. See {@link tuple}
     * if you need to create value tuples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, refTuple, tuple }) => eb(
     *     refTuple('first_name', 'last_name'),
     *     'in',
     *     [
     *       tuple('Jennifer', 'Aniston'),
     *       tuple('Sylvester', 'Stallone')
     *     ]
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "person".*
     * from
     *   "person"
     * where
     *   ("first_name", "last_name")
     *   in
     *   (
     *     ($1, $2),
     *     ($3, $4)
     *   )
     * ```
     *
     * In the next example a reference tuple is compared to a subquery. Note that
     * in this case you need to use the {@link @SelectQueryBuilder.$asTuple | $asTuple}
     * function:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, refTuple, selectFrom }) => eb(
     *     refTuple('first_name', 'last_name'),
     *     'in',
     *     selectFrom('pet')
     *       .select(['name', 'species'])
     *       .where('species', '!=', 'cat')
     *       .$asTuple('name', 'species')
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "person".*
     * from
     *   "person"
     * where
     *   ("first_name", "last_name")
     *   in
     *   (
     *     select "name", "species"
     *     from "pet"
     *     where "species" != $1
     *   )
     * ```
     */
    refTuple<R1 extends ReferenceExpression<DB, TB>, R2 extends ReferenceExpression<DB, TB>>(value1: R1, value2: R2): ExpressionWrapper<DB, TB, RefTuple2<DB, TB, R1, R2>>;
    refTuple<R1 extends ReferenceExpression<DB, TB>, R2 extends ReferenceExpression<DB, TB>, R3 extends ReferenceExpression<DB, TB>>(value1: R1, value2: R2, value3: R3): ExpressionWrapper<DB, TB, RefTuple3<DB, TB, R1, R2, R3>>;
    refTuple<R1 extends ReferenceExpression<DB, TB>, R2 extends ReferenceExpression<DB, TB>, R3 extends ReferenceExpression<DB, TB>, R4 extends ReferenceExpression<DB, TB>>(value1: R1, value2: R2, value3: R3, value4: R4): ExpressionWrapper<DB, TB, RefTuple4<DB, TB, R1, R2, R3, R4>>;
    refTuple<R1 extends ReferenceExpression<DB, TB>, R2 extends ReferenceExpression<DB, TB>, R3 extends ReferenceExpression<DB, TB>, R4 extends ReferenceExpression<DB, TB>, R5 extends ReferenceExpression<DB, TB>>(value1: R1, value2: R2, value3: R3, value4: R4, value5: R5): ExpressionWrapper<DB, TB, RefTuple5<DB, TB, R1, R2, R3, R4, R5>>;
    /**
     * Creates a value tuple expression.
     *
     * This creates a tuple using values by default. See {@link refTuple} if you need to create
     * tuples using column references.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, refTuple, tuple }) => eb(
     *     refTuple('first_name', 'last_name'),
     *     'in',
     *     [
     *       tuple('Jennifer', 'Aniston'),
     *       tuple('Sylvester', 'Stallone')
     *     ]
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "person".*
     * from
     *   "person"
     * where
     *   ("first_name", "last_name")
     *   in
     *   (
     *     ($1, $2),
     *     ($3, $4)
     *   )
     * ```
     */
    tuple<V1, V2>(value1: V1, value2: V2): ExpressionWrapper<DB, TB, ValTuple2<V1, V2>>;
    tuple<V1, V2, V3>(value1: V1, value2: V2, value3: V3): ExpressionWrapper<DB, TB, ValTuple3<V1, V2, V3>>;
    tuple<V1, V2, V3, V4>(value1: V1, value2: V2, value3: V3, value4: V4): ExpressionWrapper<DB, TB, ValTuple4<V1, V2, V3, V4>>;
    tuple<V1, V2, V3, V4, V5>(value1: V1, value2: V2, value3: V3, value4: V4, value5: V5): ExpressionWrapper<DB, TB, ValTuple5<V1, V2, V3, V4, V5>>;
    /**
     * Returns a literal value expression.
     *
     * Just like `val` but creates a literal value that gets merged in the SQL.
     * To prevent SQL injections, only `boolean`, `number` and `null` values
     * are accepted. If you need `string` or other literals, use `sql.lit` instead.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .select((eb) => eb.lit(1).as('one'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select 1 as "one" from "person"
     * ```
     */
    lit<VE extends number | boolean | null>(literal: VE): ExpressionWrapper<DB, TB, VE>;
    /**
     * Creates an unary expression.
     *
     * This function returns an {@link Expression} and can be used pretty much anywhere.
     * See the examples for a couple of possible use cases.
     *
     * @see {@link not}, {@link exists} and {@link neg}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .select((eb) => [
     *     'first_name',
     *     eb.unary('-', 'age').as('negative_age')
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", -"age"
     * from "person"
     * ```
     */
    unary<RE extends ReferenceExpression<DB, TB>>(op: UnaryOperator, expr: RE): ExpressionWrapper<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    /**
     * Creates a `not` operation.
     *
     * A shortcut for `unary('not', expr)`.
     *
     * @see {@link unary}
     */
    not<RE extends ReferenceExpression<DB, TB>>(expr: RE): ExpressionWrapper<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    /**
     * Creates an `exists` operation.
     *
     * A shortcut for `unary('exists', expr)`.
     *
     * @see {@link unary}
     */
    exists<RE extends ReferenceExpression<DB, TB>>(expr: RE): ExpressionWrapper<DB, TB, SqlBool>;
    /**
     * Creates a negation operation.
     *
     * A shortcut for `unary('-', expr)`.
     *
     * @see {@link unary}
     */
    neg<RE extends ReferenceExpression<DB, TB>>(expr: RE): ExpressionWrapper<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    /**
     * Creates a `between` expression.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.between('age', 40, 60))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "age" between $1 and $2
     * ```
     */
    between<RE extends ReferenceExpression<DB, TB>, SE extends OperandValueExpression<DB, TB, RE>, EE extends OperandValueExpression<DB, TB, RE>>(expr: RE, start: SE, end: EE): ExpressionWrapper<DB, TB, SqlBool>;
    /**
     * Creates a `between symmetric` expression.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.betweenSymmetric('age', 40, 60))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "age" between symmetric $1 and $2
     * ```
     */
    betweenSymmetric<RE extends ReferenceExpression<DB, TB>, SE extends OperandValueExpression<DB, TB, RE>, EE extends OperandValueExpression<DB, TB, RE>>(expr: RE, start: SE, end: EE): ExpressionWrapper<DB, TB, SqlBool>;
    /**
     * Combines two or more expressions using the logical `and` operator.
     *
     * An empty array produces a `true` expression.
     *
     * This function returns an {@link Expression} and can be used pretty much anywhere.
     * See the examples for a couple of possible use cases.
     *
     * ### Examples
     *
     * In this example we use `and` to create a `WHERE expr1 AND expr2 AND expr3`
     * statement:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb.and([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Arnold'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "first_name" = $2
     *   and "first_name" = $3
     * )
     * ```
     *
     * Optionally you can use the simpler object notation if you only need
     * equality comparisons:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = $2
     * )
     * ```
     */
    and<E extends OperandExpression<SqlBool>>(exprs: ReadonlyArray<E>): ExpressionWrapper<DB, TB, SqlBool>;
    and<E extends Readonly<FilterObject<DB, TB>>>(exprs: E): ExpressionWrapper<DB, TB, SqlBool>;
    /**
     * Combines two or more expressions using the logical `or` operator.
     *
     * An empty array produces a `false` expression.
     *
     * This function returns an {@link Expression} and can be used pretty much anywhere.
     * See the examples for a couple of possible use cases.
     *
     * ### Examples
     *
     * In this example we use `or` to create a `WHERE expr1 OR expr2 OR expr3`
     * statement:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Arnold'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   "first_name" = $1
     *   or "first_name" = $2
     *   or "first_name" = $3
     * )
     * ```
     *
     * Optionally you can use the simpler object notation if you only need
     * equality comparisons:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb.or({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   "first_name" = $1
     *   or "last_name" = $2
     * )
     * ```
     */
    or<E extends OperandExpression<SqlBool>>(exprs: ReadonlyArray<E>): ExpressionWrapper<DB, TB, SqlBool>;
    or<E extends Readonly<FilterObject<DB, TB>>>(exprs: E): ExpressionWrapper<DB, TB, SqlBool>;
    /**
     * Wraps the expression in parentheses.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb(eb.parens('age', '+', 1), '/', 100), '<', 0.1)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where ("age" + $1) / $2 < $3
     * ```
     *
     * You can also pass in any expression as the only argument:
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .selectAll('person')
     *   .where((eb) => eb.parens(
     *     eb('age', '=', 1).or('age', '=', 2)
     *   ).and(
     *     eb('first_name', '=', 'Jennifer').or('first_name', '=', 'Arnold')
     *   ))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where ("age" = $1 or "age" = $2) and ("first_name" = $3 or "first_name" = $4)
     * ```
     */
    parens<RE extends ReferenceExpression<DB, TB>, OP extends BinaryOperatorExpression, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: OP, rhs: VE): ExpressionWrapper<DB, TB, OP extends ComparisonOperator ? SqlBool : ExtractTypeFromReferenceExpression<DB, TB, RE>>;
    parens<T>(expr: Expression<T>): ExpressionWrapper<DB, TB, T>;
    /**
     * Creates a `cast(expr as dataType)` expression.
     *
     * Since Kysely can't know the mapping between JavaScript and database types,
     * you need to provide both explicitly.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectFrom('person')
     *   .select((eb) => [
     *     'id',
     *     'first_name',
     *     eb.cast<number>('age', 'integer').as('age')
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select cast("age" as integer) as "age"
     * from "person"
     * ```
     */
    cast<T, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(expr: RE, dataType: DataTypeExpression): ExpressionWrapper<DB, TB, T>;
    /**
     * See {@link QueryCreator.withSchema}
     *
     * @deprecated Will be removed in kysely 0.25.0.
     */
    withSchema(schema: string): ExpressionBuilder<DB, TB>;
}
declare function expressionBuilder<DB, TB extends keyof DB>(_: SelectQueryBuilder<DB, TB, any>): ExpressionBuilder<DB, TB>;
declare function expressionBuilder<DB, TB extends keyof DB = never>(): ExpressionBuilder<DB, TB>;

/**
 * Like `Expression<V>` but also accepts a select query with an output
 * type extending `Record<string, V>`. This type is useful because SQL
 * treats records with a single column as single values.
 */
type OperandExpression<V> = Expression<V> | SelectQueryBuilderExpression<Record<string, V>>;
type ExpressionOrFactory<DB, TB extends keyof DB, V> = OperandExpression<V> | OperandExpressionFactory<DB, TB, V>;
type AliasedExpressionOrFactory<DB, TB extends keyof DB> = AliasedExpression<any, any> | AliasedExpressionFactory<DB, TB>;
type OperandExpressionFactory<DB, TB extends keyof DB, V> = (eb: ExpressionBuilder<DB, TB>) => OperandExpression<V>;
type AliasedExpressionFactory<DB, TB extends keyof DB> = (eb: ExpressionBuilder<DB, TB>) => AliasedExpression<any, any>;

type StringReference<DB, TB extends keyof DB> = AnyColumn<DB, TB> | AnyColumnWithTable<DB, TB>;
type SimpleReferenceExpression<DB, TB extends keyof DB> = StringReference<DB, TB> | DynamicReferenceBuilder<any>;
type ReferenceExpression<DB, TB extends keyof DB> = SimpleReferenceExpression<DB, TB> | ExpressionOrFactory<DB, TB, any>;
type ReferenceExpressionOrList<DB, TB extends keyof DB> = ReferenceExpression<DB, TB> | ReadonlyArray<ReferenceExpression<DB, TB>>;
type ExtractTypeFromReferenceExpression<DB, TB extends keyof DB, RE, DV = unknown> = SelectType<ExtractRawTypeFromReferenceExpression<DB, TB, RE, DV>>;
type ExtractRawTypeFromReferenceExpression<DB, TB extends keyof DB, RE, DV = unknown> = RE extends string ? ExtractTypeFromStringReference<DB, TB, RE> : RE extends SelectQueryBuilderExpression<infer O> ? O[keyof O] | null : RE extends (qb: any) => SelectQueryBuilderExpression<infer O> ? O[keyof O] | null : RE extends Expression<infer O> ? O : RE extends (qb: any) => Expression<infer O> ? O : DV;
type ExtractTypeFromStringReference<DB, TB extends keyof DB, RE extends string, DV = unknown> = RE extends `${infer SC}.${infer T}.${infer C}` ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : RE extends `${infer T}.${infer C}` ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : RE extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, RE> : DV;
type OrderedColumnName<C extends string> = C extends `${string} ${infer O}` ? O extends OrderByDirection ? C : never : C;
type ExtractColumnNameFromOrderedColumnName<C extends string> = C extends `${infer CL} ${infer O}` ? O extends OrderByDirection ? CL : never : C;

declare class AlterTableAddIndexBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableAddIndexBuilderProps);
    /**
     * Makes the index unique.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .unique()
     *   .column('email')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_first_name_index` (`email`)
     * ```
     */
    unique(): AlterTableAddIndexBuilder;
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .column('first_name')
     *   .column('age desc')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */
    column<CL extends string>(column: OrderedColumnName<CL>): AlterTableAddIndexBuilder;
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .columns(['first_name', 'age desc'])
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */
    columns<CL extends string>(columns: OrderedColumnName<CL>[]): AlterTableAddIndexBuilder;
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .expression(sql<boolean>`(first_name < 'Sami')`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
     * ```
     */
    expression(expression: Expression<any>): AlterTableAddIndexBuilder;
    /**
     * Specifies the index type.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .column('first_name')
     *   .using('hash')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_index` (`first_name`) using hash
     * ```
     */
    using(indexType: IndexType): AlterTableAddIndexBuilder;
    using(indexType: string): AlterTableAddIndexBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableAddIndexBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: AlterTableNode;
}

declare class UniqueConstraintNodeBuilder implements OperationNodeSource {
    #private;
    constructor(node: UniqueConstraintNode);
    /**
     * Adds `nulls not distinct` to the unique constraint definition
     *
     * Supported by PostgreSQL dialect only
     */
    nullsNotDistinct(): UniqueConstraintNodeBuilder;
    deferrable(): UniqueConstraintNodeBuilder;
    notDeferrable(): UniqueConstraintNodeBuilder;
    initiallyDeferred(): UniqueConstraintNodeBuilder;
    initiallyImmediate(): UniqueConstraintNodeBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): UniqueConstraintNode;
}
type UniqueConstraintNodeBuilderCallback = (builder: UniqueConstraintNodeBuilder) => UniqueConstraintNodeBuilder;

declare class PrimaryKeyConstraintBuilder implements OperationNodeSource {
    #private;
    constructor(node: PrimaryKeyConstraintNode);
    deferrable(): PrimaryKeyConstraintBuilder;
    notDeferrable(): PrimaryKeyConstraintBuilder;
    initiallyDeferred(): PrimaryKeyConstraintBuilder;
    initiallyImmediate(): PrimaryKeyConstraintBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): PrimaryKeyConstraintNode;
}
type PrimaryKeyConstraintBuilderCallback = (builder: PrimaryKeyConstraintBuilder) => PrimaryKeyConstraintBuilder;

declare class CheckConstraintBuilder implements OperationNodeSource {
    #private;
    constructor(node: CheckConstraintNode);
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): CheckConstraintNode;
}
type CheckConstraintBuilderCallback = (builder: CheckConstraintBuilder) => CheckConstraintBuilder;

/**
 * This builder can be used to create a `alter table` query.
 */
declare class AlterTableBuilder implements ColumnAlteringInterface {
    #private;
    constructor(props: AlterTableBuilderProps);
    renameTo(newTableName: string): AlterTableExecutor;
    setSchema(newSchema: string): AlterTableExecutor;
    alterColumn(column: string, alteration: AlterColumnBuilderCallback): AlterTableColumnAlteringBuilder;
    dropColumn(column: string): AlterTableColumnAlteringBuilder;
    renameColumn(column: string, newColumn: string): AlterTableColumnAlteringBuilder;
    /**
     * See {@link CreateTableBuilder.addColumn}
     */
    addColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    /**
     * Creates an `alter table modify column` query. The `modify column` statement
     * is only implemeted by MySQL and oracle AFAIK. On other databases you
     * should use the `alterColumn` method.
     */
    modifyColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    /**
     * See {@link CreateTableBuilder.addUniqueConstraint}
     */
    addUniqueConstraint(constraintName: string, columns: string[], build?: UniqueConstraintNodeBuilderCallback): AlterTableExecutor;
    /**
     * See {@link CreateTableBuilder.addCheckConstraint}
     */
    addCheckConstraint(constraintName: string, checkExpression: Expression<any>, build?: CheckConstraintBuilderCallback): AlterTableExecutor;
    /**
     * See {@link CreateTableBuilder.addForeignKeyConstraint}
     *
     * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
     * the constraint builder and doesn't take a callback as the last argument. This
     * is because you can only add one column per `ALTER TABLE` query.
     */
    addForeignKeyConstraint(constraintName: string, columns: string[], targetTable: string, targetColumns: string[], build?: ForeignKeyConstraintBuilderCallback): AlterTableAddForeignKeyConstraintBuilder;
    /**
     * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
     */
    addPrimaryKeyConstraint(constraintName: string, columns: string[], build?: PrimaryKeyConstraintBuilderCallback): AlterTableExecutor;
    dropConstraint(constraintName: string): AlterTableDropConstraintBuilder;
    renameConstraint(oldName: string, newName: string): AlterTableDropConstraintBuilder;
    /**
     * This can be used to add index to table.
     *
     *  ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .addIndex('person_email_index')
     *   .column('email')
     *   .unique()
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_email_index` (`email`)
     * ```
     */
    addIndex(indexName: string): AlterTableAddIndexBuilder;
    /**
     * This can be used to drop index from table.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .dropIndex('person_email_index')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` drop index `test_first_name_index`
     * ```
     */
    dropIndex(indexName: string): AlterTableExecutor;
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * See {@link CreateTableBuilder.$call}
     */
    $call<T>(func: (qb: this) => T): T;
}
interface AlterTableBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: AlterTableNode;
}
interface ColumnAlteringInterface {
    alterColumn(column: string, alteration: AlterColumnBuilderCallback): ColumnAlteringInterface;
    dropColumn(column: string): ColumnAlteringInterface;
    renameColumn(column: string, newColumn: string): ColumnAlteringInterface;
    /**
     * See {@link CreateTableBuilder.addColumn}
     */
    addColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): ColumnAlteringInterface;
    /**
     * Creates an `alter table modify column` query. The `modify column` statement
     * is only implemeted by MySQL and oracle AFAIK. On other databases you
     * should use the `alterColumn` method.
     */
    modifyColumn(columnName: string, dataType: DataTypeExpression, build: ColumnDefinitionBuilderCallback): ColumnAlteringInterface;
}
declare class AlterTableColumnAlteringBuilder implements ColumnAlteringInterface, OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableColumnAlteringBuilderProps);
    alterColumn(column: string, alteration: AlterColumnBuilderCallback): AlterTableColumnAlteringBuilder;
    dropColumn(column: string): AlterTableColumnAlteringBuilder;
    renameColumn(column: string, newColumn: string): AlterTableColumnAlteringBuilder;
    /**
     * See {@link CreateTableBuilder.addColumn}
     */
    addColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    /**
     * Creates an `alter table modify column` query. The `modify column` statement
     * is only implemeted by MySQL and oracle AFAIK. On other databases you
     * should use the `alterColumn` method.
     */
    modifyColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableColumnAlteringBuilderProps extends AlterTableBuilderProps {
}

declare class CreateIndexBuilder<C = never> implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateIndexBuilderProps);
    /**
     * Adds the "if not exists" modifier.
     *
     * If the index already exists, no error is thrown if this method has been called.
     */
    ifNotExists(): CreateIndexBuilder<C>;
    /**
     * Makes the index unique.
     */
    unique(): CreateIndexBuilder<C>;
    /**
     * Adds `nulls not distinct` specifier to index.
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createIndex('person_first_name_index')
     *  .on('person')
     *  .column('first_name')
     *  .nullsNotDistinct()
     *  .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index"
     * on "test" ("first_name")
     * nulls not distinct;
     * ```
     */
    nullsNotDistinct(): CreateIndexBuilder<C>;
    /**
     * Specifies the table for the index.
     */
    on(table: string): CreateIndexBuilder<C>;
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .column('first_name')
     *         .column('age desc')
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    column<CL extends string>(column: OrderedColumnName<CL>): CreateIndexBuilder<C | ExtractColumnNameFromOrderedColumnName<CL>>;
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .columns(['first_name', 'age desc'])
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    columns<CL extends string>(columns: OrderedColumnName<CL>[]): CreateIndexBuilder<C | ExtractColumnNameFromOrderedColumnName<CL>>;
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
     * ```
     */
    expression(expression: Expression<any>): CreateIndexBuilder<C>;
    /**
     * Specifies the index type.
     */
    using(indexType: IndexType): CreateIndexBuilder<C>;
    using(indexType: string): CreateIndexBuilder<C>;
    /**
     * Adds a where clause to the query. This Effectively turns the index partial.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *    .createIndex('orders_unbilled_index')
     *    .on('orders')
     *    .column('order_nr')
     *    .where(sql.ref('billed'), 'is not', true)
     *    .where('order_nr', 'like', '123%')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "orders_unbilled_index" on "orders" ("order_nr") where "billed" is not true and "order_nr" like '123%'
     * ```
     *
     * Column names specified in {@link column} or {@link columns} are known at compile-time
     * and can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that exist in the table but are not
     * part of the current index. In that case you can refer to them using {@link sql}
     * expressions.
     *
     * Parameters are always sent as literals due to database restrictions.
     */
    where(lhs: C | Expression<any>, op: ComparisonOperatorExpression, rhs: unknown): CreateIndexBuilder<C>;
    where(factory: (qb: ExpressionBuilder<ShallowRecord<string, ShallowRecord<C & string, any>>, string>) => Expression<SqlBool>): CreateIndexBuilder<C>;
    where(expression: Expression<SqlBool>): CreateIndexBuilder<C>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): CreateIndexNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateIndexBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateIndexNode;
}

declare class CreateSchemaBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateSchemaBuilderProps);
    ifNotExists(): CreateSchemaBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): CreateSchemaNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateSchemaBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateSchemaNode;
}

/**
 * This builder can be used to create a `create table` query.
 */
declare class CreateTableBuilder<TB extends string, C extends string = never> implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateTableBuilderProps);
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */
    temporary(): CreateTableBuilder<TB, C>;
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */
    onCommit(onCommit: OnCommitAction): CreateTableBuilder<TB, C>;
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */
    ifNotExists(): CreateTableBuilder<TB, C>;
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   // You can specify any data type using the `sql` tag if the types
     *   // don't include it.
     *   .addColumn('data', sql`any_type_here`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade')
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databases. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.primaryKey())
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk',
     *     ['parent_id'],
     *     'person',
     *     ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey())
     *   .execute()
     * ```
     */
    addColumn<CN extends string>(columnName: CN, dataType: DataTypeExpression, build?: ColumnBuilderCallback): CreateTableBuilder<TB, C | CN>;
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    addPrimaryKeyConstraint(constraintName: string, columns: C[], build?: PrimaryKeyConstraintBuilderCallback): CreateTableBuilder<TB, C>;
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name']
     *   )
     *   .execute()
     * ```
     *
     * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name'],
     *     (cb) => cb.nullsNotDistinct()
     *   )
     *   .execute()
     * ```
     */
    addUniqueConstraint(constraintName: string, columns: C[], build?: UniqueConstraintNodeBuilderCallback): CreateTableBuilder<TB, C>;
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('animal')
     *   .addColumn('number_of_legs', 'integer')
     *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     *   .execute()
     * ```
     */
    addCheckConstraint(constraintName: string, checkExpression: Expression<any>, build?: CheckConstraintBuilderCallback): CreateTableBuilder<TB, C>;
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id'],
     *     'person',
     *     ['id'],
     *   )
     *   .execute()
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id1', 'integer')
     *   .addColumn('owner_id2', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id1', 'owner_id2'],
     *     'person',
     *     ['id1', 'id2'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    addForeignKeyConstraint(constraintName: string, columns: C[], targetTable: string, targetColumns: string[], build?: ForeignKeyConstraintBuilderCallback): CreateTableBuilder<TB, C>;
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */
    modifyFront(modifier: Expression<any>): CreateTableBuilder<TB, C>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */
    modifyEnd(modifier: Expression<any>): CreateTableBuilder<TB, C>;
    /**
     * Allows to create table from `select` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('copy')
     *   .temporary()
     *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create temporary table "copy" as
     * select "first_name", "last_name" from "person"
     * ```
     */
    as(expression: Expression<unknown>): CreateTableBuilder<string, never>;
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('test')
     *   .$call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * This is useful for creating reusable functions that can be called with a builder.
     *
     * ```ts
     * import { type CreateTableBuilder, sql } from 'kysely'
     *
     * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
     *   return ctb
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * await db.schema
     *   .createTable('test')
     *   .$call(addDefaultColumns)
     *   .execute()
     * ```
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): CreateTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateTableBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateTableNode;
}
type ColumnBuilderCallback = (builder: ColumnDefinitionBuilder) => ColumnDefinitionBuilder;

declare class DropIndexBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropIndexBuilderProps);
    /**
     * Specifies the table the index was created for. This is not needed
     * in all dialects.
     */
    on(table: string): DropIndexBuilder;
    ifExists(): DropIndexBuilder;
    cascade(): DropIndexBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): DropIndexNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropIndexBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropIndexNode;
}

declare class DropSchemaBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropSchemaBuilderProps);
    ifExists(): DropSchemaBuilder;
    cascade(): DropSchemaBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): DropSchemaNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropSchemaBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropSchemaNode;
}

declare class DropTableBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropTableBuilderProps);
    ifExists(): DropTableBuilder;
    cascade(): DropTableBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): DropTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropTableBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropTableNode;
}

/**
 * @internal
 * @private
 */
interface QueryExecutorProvider {
    getExecutor(): QueryExecutor;
}

/**
 * An instance of this class can be used to create raw SQL snippets or queries.
 *
 * You shouldn't need to create `RawBuilder` instances directly. Instead you should
 * use the {@link sql} template tag.
 */
interface RawBuilder<O> extends AliasableExpression<O> {
    get isRawBuilder(): true;
    /**
     * Returns an aliased version of the SQL expression.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select concat(first_name, ' ', last_name) as "full_name"
     * from "person"
     * ```
     *
     * You can also pass in a raw SQL snippet but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: A): AliasedRawBuilder<O, A>;
    /**
     * Returns an aliased version of the expression.
     *
     * ### Examples
     *
     * In addition to slapping `as "the_alias"` at the end of the expression,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     // `eb.fn<string>` returns an AliasableExpression<string>
     *     eb.fn<string>('concat', ['first_name', eb.val(' '), 'last_name']).as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   concat("first_name", $1, "last_name") as "full_name"
     * from
     *   "person"
     * ```
     *
     * You can also pass in a raw SQL snippet (or any expression) but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: Expression<any>): AliasedRawBuilder<O, A>;
    /**
     * Change the output type of the raw expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `RawBuilder` with a new output type.
     */
    $castTo<C>(): RawBuilder<C>;
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull(): RawBuilder<Exclude<O, null>>;
    /**
     * Adds a plugin for this SQL snippet.
     */
    withPlugin(plugin: KyselyPlugin): RawBuilder<O>;
    /**
     * Compiles the builder to a `CompiledQuery`.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const compiledQuery = sql`select * from ${sql.table('person')}`.compile(db)
     * console.log(compiledQuery.sql)
     * ```
     */
    compile(executorProvider: QueryExecutorProvider): CompiledQuery<O>;
    /**
     * Executes the raw query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await sql`select * from ${sql.table('person')}`.execute(db)
     * ```
     */
    execute(executorProvider: QueryExecutorProvider): Promise<QueryResult<O>>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * ### Examples
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * import { type Expression, type OperationNode, sql } from 'kysely'
     *
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     *
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): RawNode;
}
interface RawBuilderProps {
    readonly queryId: QueryId;
    readonly rawNode: RawNode;
    readonly plugins?: ReadonlyArray<KyselyPlugin>;
}
declare function createRawBuilder<O>(props: RawBuilderProps): RawBuilder<O>;
/**
 * {@link RawBuilder} with an alias. The result of calling {@link RawBuilder.as}.
 */
interface AliasedRawBuilder<O = unknown, A extends string = never> extends AliasedExpression<O, A> {
    get rawBuilder(): RawBuilder<O>;
}

declare class CreateViewBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateViewBuilderProps);
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary view.
     */
    temporary(): CreateViewBuilder;
    materialized(): CreateViewBuilder;
    /**
     * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
     */
    ifNotExists(): CreateViewBuilder;
    orReplace(): CreateViewBuilder;
    columns(columns: string[]): CreateViewBuilder;
    /**
     * Sets the select query or a `values` statement that creates the view.
     *
     * WARNING!
     * Some dialects don't support parameterized queries in DDL statements and therefore
     * the query or raw {@link sql } expression passed here is interpolated into a single
     * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
     * into the query or raw expression passed to this method!
     */
    as(query: SelectQueryBuilder<any, any, any> | RawBuilder<any>): CreateViewBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): CreateViewNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateViewBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateViewNode;
}

declare class DropViewBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropViewBuilderProps);
    materialized(): DropViewBuilder;
    ifExists(): DropViewBuilder;
    cascade(): DropViewBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): DropViewNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropViewBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropViewNode;
}

declare class CreateTypeBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateTypeBuilderProps);
    toOperationNode(): CreateTypeNode;
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */
    asEnum(values: readonly string[]): CreateTypeBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateTypeBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateTypeNode;
}

declare class DropTypeBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropTypeBuilderProps);
    ifExists(): DropTypeBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): DropTypeNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropTypeBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropTypeNode;
}

declare class RefreshMaterializedViewBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: RefreshMaterializedViewBuilderProps);
    /**
     * Adds the "concurrently" modifier.
     *
     * Use this to refresh the view without locking out concurrent selects on the materialized view.
     *
     * WARNING!
     * This cannot be used with the "with no data" modifier.
     */
    concurrently(): RefreshMaterializedViewBuilder;
    /**
     * Adds the "with data" modifier.
     *
     * If specified (or defaults) the backing query is executed to provide the new data, and the materialized view is left in a scannable state
     */
    withData(): RefreshMaterializedViewBuilder;
    /**
     * Adds the "with no data" modifier.
     *
     * If specified, no new data is generated and the materialized view is left in an unscannable state.
     *
     * WARNING!
     * This cannot be used with the "concurrently" modifier.
     */
    withNoData(): RefreshMaterializedViewBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): RefreshMaterializedViewNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface RefreshMaterializedViewBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: RefreshMaterializedViewNode;
}

/**
 * Provides methods for building database schema.
 */
declare class SchemaModule {
    #private;
    constructor(executor: QueryExecutor);
    /**
     * Create a new table.
     *
     * ### Examples
     *
     * This example creates a new table with columns `id`, `first_name`,
     * `last_name` and `gender`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('first_name', 'varchar', col => col.notNull())
     *   .addColumn('last_name', 'varchar', col => col.notNull())
     *   .addColumn('gender', 'varchar')
     *   .execute()
     * ```
     *
     * This example creates a table with a foreign key. Not all database
     * engines support column-level foreign key constraint definitions.
     * For example if you are using MySQL 5.X see the next example after
     * this one.
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer', col => col
     *     .references('person.id')
     *     .onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * This example adds a foreign key constraint for a columns just
     * like the previous example, but using a table-level statement.
     * On MySQL 5.X you need to define foreign key constraints like
     * this:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
     *     (constraint) => constraint.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    createTable<TB extends string>(table: TB): CreateTableBuilder<TB, never>;
    /**
     * Drop a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropTable('person')
     *   .execute()
     * ```
     */
    dropTable(table: string): DropTableBuilder;
    /**
     * Create a new index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createIndex('person_full_name_unique_index')
     *   .on('person')
     *   .columns(['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    createIndex(indexName: string): CreateIndexBuilder;
    /**
     * Drop an index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropIndex('person_full_name_unique_index')
     *   .execute()
     * ```
     */
    dropIndex(indexName: string): DropIndexBuilder;
    /**
     * Create a new schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createSchema('some_schema')
     *   .execute()
     * ```
     */
    createSchema(schema: string): CreateSchemaBuilder;
    /**
     * Drop a schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropSchema('some_schema')
     *   .execute()
     * ```
     */
    dropSchema(schema: string): DropSchemaBuilder;
    /**
     * Alter a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
     *   .execute()
     * ```
     */
    alterTable(table: string): AlterTableBuilder;
    /**
     * Create a new view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createView('dogs')
     *   .orReplace()
     *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
     *   .execute()
     * ```
     */
    createView(viewName: string): CreateViewBuilder;
    /**
     * Refresh a materialized view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .refreshMaterializedView('my_view')
     *   .concurrently()
     *   .execute()
     * ```
     */
    refreshMaterializedView(viewName: string): RefreshMaterializedViewBuilder;
    /**
     * Drop a view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropView('dogs')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropView(viewName: string): DropViewBuilder;
    /**
     * Create a new type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createType('species')
     *   .asEnum(['dog', 'cat', 'frog'])
     *   .execute()
     * ```
     */
    createType(typeName: string): CreateTypeBuilder;
    /**
     * Drop a type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropType('species')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropType(typeName: string): DropTypeBuilder;
    /**
     * Returns a copy of this schema module with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): SchemaModule;
    /**
     * Returns a copy of this schema module  without any plugins.
     */
    withoutPlugins(): SchemaModule;
    /**
     * See {@link QueryCreator.withSchema}
     */
    withSchema(schema: string): SchemaModule;
}

declare class DynamicModule<DB> {
    /**
     * Creates a dynamic reference to a column that is not know at compile time.
     *
     * Kysely is built in a way that by default you can't refer to tables or columns
     * that are not actually visible in the current query and context. This is all
     * done by TypeScript at compile time, which means that you need to know the
     * columns and tables at compile time. This is not always the case of course.
     *
     * This method is meant to be used in those cases where the column names
     * come from the user input or are not otherwise known at compile time.
     *
     * WARNING! Unlike values, column names are not escaped by the database engine
     * or Kysely and if you pass in unchecked column names using this method, you
     * create an SQL injection vulnerability. Always __always__ validate the user
     * input before passing it to this method.
     *
     * There are couple of examples below for some use cases, but you can pass
     * `ref` to other methods as well. If the types allow you to pass a `ref`
     * value to some place, it should work.
     *
     * ### Examples
     *
     * Filter by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(filterColumn: string, filterValue: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where(ref(filterColumn), '=', filterValue)
     *     .execute()
     * }
     *
     * someQuery('first_name', 'Arnold')
     * someQuery('person.last_name', 'Aniston')
     * ```
     *
     * Order by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * In this example we add selections dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput: PossibleColumns = 'birthdate';
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
     *
     * const [person] = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput),
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | null | undefined = person?.last_name
     * const firstName: string | undefined = person?.first_name
     * const birthDate: Date | null | undefined = person?.birthdate
     *
     * // The result type also contains the compile time selection `id`.
     * person?.id
     * ```
     */
    ref<R extends string = never>(reference: string): DynamicReferenceBuilder<R>;
    /**
     * Creates a table reference to a table that's not fully known at compile time.
     *
     * The type `T` is allowed to be a union of multiple tables.
     *
     * <!-- siteExample("select", "Generic find query", 130) -->
     *
     * A generic type-safe helper function for finding a row by a column value:
     *
     * ```ts
     * import { SelectType } from 'kysely'
     * import { Database } from 'type-editor'
     *
     * async function getRowByColumn<
     *   T extends keyof Database,
     *   C extends keyof Database[T] & string,
     *   V extends SelectType<Database[T][C]>,
     * >(t: T, c: C, v: V) {
     *   // We need to use the dynamic module since the table name
     *   // is not known at compile time.
     *   const { table, ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom(table(t).as('t'))
     *     .selectAll()
     *     .where(ref(c), '=', v)
     *     .orderBy('t.id')
     *     .executeTakeFirstOrThrow()
     * }
     *
     * const person = await getRowByColumn('person', 'first_name', 'Arnold')
     * ```
     */
    table<T extends keyof DB & string>(table: T): DynamicTableBuilder<T>;
}

type InsertObject<DB, TB extends keyof DB> = {
    [C in NonNullableInsertKeys<DB[TB]>]: ValueExpression<DB, TB, InsertType<DB[TB][C]>>;
} & {
    [C in NullableInsertKeys<DB[TB]>]?: ValueExpression<DB, TB, InsertType<DB[TB][C]>> | undefined;
};
type InsertObjectOrList<DB, TB extends keyof DB> = InsertObject<DB, TB> | ReadonlyArray<InsertObject<DB, TB>>;
type InsertObjectOrListFactory<DB, TB extends keyof DB, UT extends keyof DB = never> = (eb: ExpressionBuilder<DB, TB | UT>) => InsertObjectOrList<DB, TB>;
type InsertExpression<DB, TB extends keyof DB, UT extends keyof DB = never> = InsertObjectOrList<DB, TB> | InsertObjectOrListFactory<DB, TB, UT>;

type UpdateObject<DB, TB extends keyof DB, UT extends keyof DB = TB> = DrainOuterGeneric<{
    [C in AnyColumn<DB, UT>]?: {
        [T in UT]: C extends keyof DB[T] ? ValueExpression<DB, TB, UpdateType<DB[T][C]>> | undefined : never;
    }[UT];
}>;
type UpdateObjectFactory<DB, TB extends keyof DB, UT extends keyof DB> = (eb: ExpressionBuilder<DB, TB>) => UpdateObject<DB, TB, UT>;
type UpdateObjectExpression<DB, TB extends keyof DB, UT extends keyof DB = TB> = UpdateObject<DB, TB, UT> | UpdateObjectFactory<DB, TB, UT>;
type ExtractUpdateTypeFromReferenceExpression<DB, TB extends keyof DB, RE, DV = unknown> = UpdateType<ExtractRawTypeFromReferenceExpression<DB, TB, RE, DV>>;

type ReturningRow<DB, TB extends keyof DB, O, SE> = O extends InsertResult | DeleteResult | UpdateResult | MergeResult ? Selection<DB, TB, SE> : O & Selection<DB, TB, SE>;
type ReturningCallbackRow<DB, TB extends keyof DB, O, CB> = O extends InsertResult | DeleteResult | UpdateResult | MergeResult ? CallbackSelection<DB, TB, CB> : O & CallbackSelection<DB, TB, CB>;
type ReturningAllRow<DB, TB extends keyof DB, O> = O extends InsertResult | DeleteResult | UpdateResult | MergeResult ? AllSelection<DB, TB> : O & AllSelection<DB, TB>;

interface ReturningInterface<DB, TB extends keyof DB, O> {
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, last_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning((eb) => [
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     eb.selectFrom('pet').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): ReturningInterface<DB, TB, ReturningRow<DB, TB, O, SE>>;
    returning<CB extends SelectCallback<DB, TB>>(callback: CB): ReturningInterface<DB, TB, ReturningCallbackRow<DB, TB, O, CB>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): ReturningInterface<DB, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` to an insert/update/delete/merge query on databases
     * that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll(): ReturningInterface<DB, TB, Selectable<DB[TB]>>;
}
interface MultiTableReturningInterface<DB, TB extends keyof DB, O> extends ReturningInterface<DB, TB, O> {
    /**
     * Adds a `returning *` or `returning table.*` to an insert/update/delete/merge
     * query on databases that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll<T extends TB>(tables: ReadonlyArray<T>): MultiTableReturningInterface<DB, TB, ReturningAllRow<DB, T, O>>;
    /**
     * Adds a `returning *` to an insert/update/delete/merge query on databases
     * that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll<T extends TB>(table: T): MultiTableReturningInterface<DB, TB, ReturningAllRow<DB, T, O>>;
    returningAll(): ReturningInterface<DB, TB, Selectable<DB[TB]>>;
}

declare class OnConflictBuilder<DB, TB extends keyof DB> implements WhereInterface<DB, TB> {
    #private;
    constructor(props: OnConflictBuilderProps);
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    column(column: AnyColumn<DB, TB>): OnConflictBuilder<DB, TB>;
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    columns(columns: ReadonlyArray<AnyColumn<DB, TB>>): OnConflictBuilder<DB, TB>;
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    constraint(constraintName: string): OnConflictBuilder<DB, TB>;
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */
    expression(expression: Expression<any>): OnConflictBuilder<DB, TB>;
    /**
     * Adds a `where` expression to the query.
     *
     * Calling this method multiple times will combine the expressions using `and`.
     *
     * Also see {@link whereRef}
     *
     * ### Examples
     *
     * <!-- siteExample("where", "Simple where clause", 10) -->
     *
     * `where` method calls are combined with `AND`:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('first_name', '=', 'Jennifer')
     *   .where('age', '>', 40)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and "age" > $2
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * sql`your operator`
     * ```
     *
     * <!-- siteExample("where", "Where in", 20) -->
     *
     * Find multiple items using a list of identifiers:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', 'in', [1, 2, 3])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Object filter", 30) -->
     *
     * You can use the `and` function to create a simple equality
     * filter using an object
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: eb.ref('first_name')
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = "first_name"
     * )
     * ```
     *
     * <!-- siteExample("where", "OR where", 40) -->
     *
     * To combine conditions using `OR`, you can use the expression builder.
     * There are two ways to create `OR` expressions. Both are shown in this
     * example:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   // 1. Using the `or` method on the expression builder:
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   // 2. Chaining expressions using the `or` method on the
     *   // created expressions:
     *   .where((eb) =>
     *     eb('last_name', '=', 'Aniston').or('last_name', '=', 'Stallone')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   ("first_name" = $1 or "first_name" = $2)
     *   and
     *   ("last_name" = $3 or "last_name" = $4)
     * )
     * ```
     *
     * <!-- siteExample("where", "Conditional where calls", 50) -->
     *
     * You can add expressions conditionally like this:
     *
     * ```ts
     * import { Expression, SqlBool } from 'kysely'
     *
     * const firstName: string | undefined = 'Jennifer'
     * const lastName: string | undefined = 'Aniston'
     * const under18 = true
     * const over60 = true
     *
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * if (under18 || over60) {
     *   // Conditional OR expressions can be added like this.
     *   query = query.where((eb) => {
     *     const ors: Expression<SqlBool>[] = []
     *
     *     if (under18) {
     *       ors.push(eb('age', '<', 18))
     *     }
     *
     *     if (over60) {
     *       ors.push(eb('age', '>', 60))
     *     }
     *
     *     return eb.or(ors)
     *   })
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * Both the first and third argument can also be arbitrary expressions like
     * subqueries. An expression can defined by passing a function and calling
     * the methods of the {@link ExpressionBuilder} passed to the callback:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be expressions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Complex where clause", 60) -->
     *
     * For complex `where` expressions you can pass in a single callback and
     * use the `ExpressionBuilder` to build your expression:
     *
     * ```ts
     * const firstName = 'Jennifer'
     * const maxAge = 60
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, or, and, not, exists, selectFrom }) => and([
     *     or([
     *       eb('first_name', '=', firstName),
     *       eb('age', '<', maxAge)
     *     ]),
     *     not(exists(
     *       selectFrom('pet')
     *         .select('pet.id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   (
     *     "first_name" = $1
     *     or "age" < $2
     *   )
     *   and not exists (
     *     select "pet"."id" from "pet" where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql<string>`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const columnFromUserInput: string = 'id'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .where(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): OnConflictBuilder<DB, TB>;
    where<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): OnConflictBuilder<DB, TB>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((eb) => eb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): OnConflictBuilder<DB, TB>;
    /**
     * Clears all where expressions from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .where('id','=',42)
     *   .clearWhere()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearWhere(): OnConflictBuilder<DB, TB>;
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id") do nothing
     * ```
     */
    doNothing(): OnConflictDoNothingBuilder<DB, TB>;
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet({ first_name })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id")
     * do update set "first_name" = $3
     * ```
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function upsertPerson(person: NewPerson): Promise<void> {
     *   await db.insertInto('person')
     *     .values(person)
     *     .onConflict((oc) => oc
     *       .column('id')
     *       .doUpdateSet((eb) => ({
     *         first_name: eb.ref('excluded.first_name'),
     *         last_name: eb.ref('excluded.last_name')
     *       })
     *     )
     *   )
     *   .execute()
     * }
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * values ($1, $2)
     * on conflict ("id")
     * do update set
     *  "first_name" = excluded."first_name",
     *  "last_name" = excluded."last_name"
     * ```
     */
    doUpdateSet(update: UpdateObjectExpression<OnConflictDatabase<DB, TB>, OnConflictTables<TB>, OnConflictTables<TB>>): OnConflictUpdateBuilder<OnConflictDatabase<DB, TB>, OnConflictTables<TB>>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
}
interface OnConflictBuilderProps {
    readonly onConflictNode: OnConflictNode;
}
type OnConflictDatabase<DB, TB extends keyof DB> = {
    [K in keyof DB | 'excluded']: Updateable<K extends keyof DB ? DB[K] : DB[TB]>;
};
type OnConflictTables<TB> = TB | 'excluded';
declare class OnConflictDoNothingBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: OnConflictBuilderProps);
    toOperationNode(): OnConflictNode;
}
declare class OnConflictUpdateBuilder<DB, TB extends keyof DB> implements WhereInterface<DB, TB>, OperationNodeSource {
    #private;
    constructor(props: OnConflictBuilderProps);
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.where} for more info.
     */
    where<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Adds a `where` expression to the query.
     *
     * Calling this method multiple times will combine the expressions using `and`.
     *
     * Also see {@link whereRef}
     *
     * ### Examples
     *
     * <!-- siteExample("where", "Simple where clause", 10) -->
     *
     * `where` method calls are combined with `AND`:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('first_name', '=', 'Jennifer')
     *   .where('age', '>', 40)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and "age" > $2
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * sql`your operator`
     * ```
     *
     * <!-- siteExample("where", "Where in", 20) -->
     *
     * Find multiple items using a list of identifiers:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', 'in', [1, 2, 3])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Object filter", 30) -->
     *
     * You can use the `and` function to create a simple equality
     * filter using an object
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: eb.ref('first_name')
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = "first_name"
     * )
     * ```
     *
     * <!-- siteExample("where", "OR where", 40) -->
     *
     * To combine conditions using `OR`, you can use the expression builder.
     * There are two ways to create `OR` expressions. Both are shown in this
     * example:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   // 1. Using the `or` method on the expression builder:
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   // 2. Chaining expressions using the `or` method on the
     *   // created expressions:
     *   .where((eb) =>
     *     eb('last_name', '=', 'Aniston').or('last_name', '=', 'Stallone')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   ("first_name" = $1 or "first_name" = $2)
     *   and
     *   ("last_name" = $3 or "last_name" = $4)
     * )
     * ```
     *
     * <!-- siteExample("where", "Conditional where calls", 50) -->
     *
     * You can add expressions conditionally like this:
     *
     * ```ts
     * import { Expression, SqlBool } from 'kysely'
     *
     * const firstName: string | undefined = 'Jennifer'
     * const lastName: string | undefined = 'Aniston'
     * const under18 = true
     * const over60 = true
     *
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * if (under18 || over60) {
     *   // Conditional OR expressions can be added like this.
     *   query = query.where((eb) => {
     *     const ors: Expression<SqlBool>[] = []
     *
     *     if (under18) {
     *       ors.push(eb('age', '<', 18))
     *     }
     *
     *     if (over60) {
     *       ors.push(eb('age', '>', 60))
     *     }
     *
     *     return eb.or(ors)
     *   })
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * Both the first and third argument can also be arbitrary expressions like
     * subqueries. An expression can defined by passing a function and calling
     * the methods of the {@link ExpressionBuilder} passed to the callback:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be expressions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Complex where clause", 60) -->
     *
     * For complex `where` expressions you can pass in a single callback and
     * use the `ExpressionBuilder` to build your expression:
     *
     * ```ts
     * const firstName = 'Jennifer'
     * const maxAge = 60
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, or, and, not, exists, selectFrom }) => and([
     *     or([
     *       eb('first_name', '=', firstName),
     *       eb('age', '<', maxAge)
     *     ]),
     *     not(exists(
     *       selectFrom('pet')
     *         .select('pet.id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   (
     *     "first_name" = $1
     *     or "age" < $2
     *   )
     *   and not exists (
     *     select "pet"."id" from "pet" where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql<string>`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const columnFromUserInput: string = 'id'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .where(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Clears all where expressions from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .where('id','=',42)
     *   .clearWhere()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearWhere(): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): OnConflictNode;
}

interface OutputInterface<DB, TB extends keyof DB, O, OP extends OutputPrefix = OutputPrefix> {
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like MS SQL Server (MSSQL), this method can be chained
     * to `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Also see the {@link outputAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .output('inserted.id')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender")
     * output "inserted"."id"
     * values (@1, @2, @3)
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { old_first_name, old_last_name, new_first_name, new_last_name } = await db
     *   .updateTable('person')
     *   .set({ first_name: 'John', last_name: 'Doe' })
     *   .output([
     *     'deleted.first_name as old_first_name',
     *     'deleted.last_name as old_last_name',
     *     'inserted.first_name as new_first_name',
     *     'inserted.last_name as new_last_name',
     *   ])
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = @1, "last_name" = @2
     * output "deleted"."first_name" as "old_first_name",
     *   "deleted"."last_name" as "old_last_name",
     *   "inserted"."first_name" as "new_first_name",
     *   "inserted"."last_name" as "new_last_name"
     * where "created_at" < @3
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { full_name } = await db
     *   .deleteFrom('person')
     *   .output((eb) => sql<string>`concat(${eb.ref('deleted.first_name')}, ' ', ${eb.ref('deleted.last_name')})`.as('full_name'))
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * delete from "person"
     * output concat("deleted"."first_name", ' ', "deleted"."last_name") as "full_name"
     * where "created_at" < @1
     * ```
     *
     * Return the action performed on the row:
     *
     * ```ts
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male'
     *   })
     *   .output([
     *     'inserted.id as inserted_id',
     *     'deleted.id as deleted_id',
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "pet"."owner_id" = "person"."id"
     * when matched then delete
     * when not matched then
     * insert ("first_name", "last_name", "gender")
     * values (@1, @2, @3)
     * output "inserted"."id" as "inserted_id", "deleted"."id" as "deleted_id"
     * ```
     *
     */
    output<OE extends OutputExpression<DB, TB, OP>>(selections: ReadonlyArray<OE>): OutputInterface<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>, OP>;
    output<CB extends OutputCallback<DB, TB, OP>>(callback: CB): OutputInterface<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputCallback<CB>>, OP>;
    output<OE extends OutputExpression<DB, TB, OP>>(selection: OE): OutputInterface<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>, OP>;
    /**
     * Adds an `output {prefix}.*` to an `insert`/`update`/`delete`/`merge` query on databases
     * that support `output` such as MS SQL Server (MSSQL).
     *
     * Also see the {@link output} method.
     */
    outputAll(table: OP): OutputInterface<DB, TB, ReturningAllRow<DB, TB, O>, OP>;
}
type OutputPrefix = 'deleted' | 'inserted';
type OutputDatabase<DB, TB extends keyof DB, OP extends OutputPrefix = OutputPrefix> = {
    [K in OP]: DB[TB];
};
type OutputExpression<DB, TB extends keyof DB, OP extends OutputPrefix = OutputPrefix, ODB = OutputDatabase<DB, TB, OP>, OTB extends keyof ODB = keyof ODB> = AnyAliasedColumnWithTable<ODB, OTB> | AnyColumnWithTable<ODB, OTB> | AliasedExpressionOrFactory<ODB, OTB>;
type OutputCallback<DB, TB extends keyof DB, OP extends OutputPrefix = OutputPrefix> = (eb: ExpressionBuilder<OutputDatabase<DB, TB, OP>, OP>) => ReadonlyArray<OutputExpression<DB, TB, OP>>;
type SelectExpressionFromOutputExpression<OE> = OE extends `${OutputPrefix}.${infer C}` ? C : OE;
type SelectExpressionFromOutputCallback<CB> = CB extends (eb: ExpressionBuilder<any, any>) => ReadonlyArray<infer OE> ? SelectExpressionFromOutputExpression<OE> : never;

declare class InsertQueryBuilder<DB, TB extends keyof DB, O> implements ReturningInterface<DB, TB, O>, OutputInterface<DB, TB, O, 'inserted'>, OperationNodeSource, Compilable<O>, Explainable, Streamable<O> {
    #private;
    constructor(props: InsertQueryBuilderProps);
    /**
     * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to insert. In addition to the column's type, the values can be
     * raw {@link sql} snippets or select queries.
     *
     * You must provide all fields you haven't explicitly marked as nullable
     * or optional using {@link Generated} or {@link ColumnType}.
     *
     * The return value of an `insert` query is an instance of {@link InsertResult}. The
     * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
     * key if the database returned one.
     *
     * On PostgreSQL and some other dialects, you need to call `returning` to get
     * something out of the query.
     *
     * Also see the {@link expression} method for inserting the result of a select
     * query or any other expression.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Single row", 10) -->
     *
     * Insert a single row:
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40
     *   })
     *   .executeTakeFirst()
     *
     * // `insertId` is only available on dialects that
     * // automatically return the id of the inserted row
     * // such as MySQL and SQLite. On PostgreSQL, for example,
     * // you need to add a `returning` clause to the query to
     * // get anything out. See the "returning data" example.
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`first_name`, `last_name`, `age`) values (?, ?, ?)
     * ```
     *
     * <!-- siteExample("insert", "Multiple rows", 20) -->
     *
     * On dialects that support it (for example PostgreSQL) you can insert multiple
     * rows by providing an array. Note that the return value is once again very
     * dialect-specific. Some databases may only return the id of the *last* inserted
     * row and some return nothing at all unless you call `returning`.
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values([{
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   }, {
     *     first_name: 'Arnold',
     *     last_name: 'Schwarzenegger',
     *     age: 70,
     *   }])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values (($1, $2, $3), ($4, $5, $6))
     * ```
     *
     * <!-- siteExample("insert", "Returning data", 30) -->
     *
     * On supported dialects like PostgreSQL you need to chain `returning` to the query to get
     * the inserted row's columns (or any other expression) as the return value. `returning`
     * works just like `select`. Refer to `select` method's examples and documentation for
     * more info.
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   })
     *   .returning(['id', 'first_name as name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values ($1, $2, $3) returning "id", "first_name" as "name"
     * ```
     *
     * <!-- siteExample("insert", "Complex values", 40) -->
     *
     * In addition to primitives, the values can also be arbitrary expressions.
     * You can build the expressions by using a callback and calling the methods
     * on the expression builder passed to it:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const ani = "Ani"
     * const ston = "ston"
     *
     * const result = await db
     *   .insertInto('person')
     *   .values(({ ref, selectFrom, fn }) => ({
     *     first_name: 'Jennifer',
     *     last_name: sql<string>`concat(${ani}, ${ston})`,
     *     middle_name: ref('first_name'),
     *     age: selectFrom('person')
     *       .select(fn.avg<number>('age').as('avg_age')),
     *   }))
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" (
     *   "first_name",
     *   "last_name",
     *   "middle_name",
     *   "age"
     * )
     * values (
     *   $1,
     *   concat($2, $3),
     *   "first_name",
     *   (select avg("age") as "avg_age" from "person")
     * )
     * ```
     *
     * You can also use the callback version of subqueries or raw expressions:
     *
     * ```ts
     * await db.with('jennifer', (db) => db
     *   .selectFrom('person')
     *   .where('first_name', '=', 'Jennifer')
     *   .select(['id', 'first_name', 'gender'])
     *   .limit(1)
     * ).insertInto('pet').values((eb) => ({
     *   owner_id: eb.selectFrom('jennifer').select('id'),
     *   name: eb.selectFrom('jennifer').select('first_name'),
     *   species: 'cat',
     * }))
     * .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * with "jennifer" as (
     *   select "id", "first_name", "gender"
     *   from "person"
     *   where "first_name" = $1
     *   limit $2
     * )
     * insert into "pet" ("owner_id", "name", "species")
     * values (
     *  (select "id" from "jennifer"),
     *  (select "first_name" from "jennifer"),
     *  $3
     * )
     * ```
     */
    values(insert: InsertExpression<DB, TB>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Sets the columns to insert.
     *
     * The {@link values} method sets both the columns and the values and this method
     * is not needed. But if you are using the {@link expression} method, you can use
     * this method to set the columns to insert.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    columns(columns: ReadonlyArray<keyof DB[TB] & string>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Insert an arbitrary expression. For example the result of a select query.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Insert subquery", 50) -->
     *
     * You can create an `INSERT INTO SELECT FROM` query using the `expression` method.
     * This API doesn't follow our WYSIWYG principles and might be a bit difficult to
     * remember. The reasons for this design stem from implementation difficulties.
     *
     * ```ts
     * const result = await db.insertInto('person')
     *   .columns(['first_name', 'last_name', 'age'])
     *   .expression((eb) => eb
     *     .selectFrom('pet')
     *     .select((eb) => [
     *       'pet.name',
     *       eb.val('Petson').as('last_name'),
     *       eb.lit(7).as('age'),
     *     ])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age")
     * select "pet"."name", $1 as "last_name", 7 as "age from "pet"
     * ```
     */
    expression(expression: ExpressionOrFactory<DB, TB, any>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Creates an `insert into "person" default values` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .defaultValues()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" default values
     * ```
     */
    defaultValues(): InsertQueryBuilder<DB, TB, O>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` ("first_name", "last_name", "gender")
     * values (?, ?, ?) -- This is a comment
     * ```
     */
    modifyEnd(modifier: Expression<any>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert ignore into` query.
     *
     * This is only supported by some dialects like MySQL.
     *
     * To avoid a footgun, when invoked with the SQLite dialect, this method will
     * be handled like {@link orIgnore}. See also, {@link orAbort}, {@link orFail},
     * {@link orReplace}, and {@link orRollback}.
     *
     * If you use the ignore modifier, ignorable errors that occur while executing the
     * insert statement are ignored. For example, without ignore, a row that duplicates
     * an existing unique index or primary key value in the table causes a duplicate-key
     * error and the statement is aborted. With ignore, the row is discarded and no error
     * occurs.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .ignore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    ignore(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert or ignore into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * To avoid a footgun, when invoked with the MySQL dialect, this method will
     * be handled like {@link ignore}.
     *
     * See also, {@link orAbort}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orIgnore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
     * ```
     */
    orIgnore(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert or abort into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orAbort()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or abort into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orAbort(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert or fail into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orFail()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or fail into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orFail(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert or replace into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * You can also use {@link Kysely.replaceInto} to achieve the same result.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orReplace()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or replace into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orReplace(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert or rollback into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orReplace}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orRollback()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or rollback into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orRollback(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Insert the first 5 rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(5)
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(5) into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     *
     * Insert the first 50 percent of rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(50, 'percent')
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(50) percent into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     */
    top(expression: number | bigint, modifiers?: 'percent'): InsertQueryBuilder<DB, TB, O>;
    /**
     * Adds an `on conflict` clause to the query.
     *
     * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
     * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * ```
     *
     * You can provide the name of the constraint instead of a column name:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .constraint('pet_name_key')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict on constraint "pet_name_key"
     * do update set "species" = $4
     * ```
     *
     * You can also specify an expression as the conflict target in case
     * the unique index is an expression index:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .expression(sql<string>`lower(name)`)
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict (lower(name))
     * do update set "species" = $4
     * ```
     *
     * You can add a filter for the update statement like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *     .where('excluded.name', '!=', 'Catto')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * where "excluded"."name" != $5
     * ```
     *
     * You can create an `on conflict do nothing` clauses like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name") do nothing
     * ```
     *
     * You can refer to the columns of the virtual `excluded` table
     * in a type-safe way using a callback and the `ref` method of
     * `ExpressionBuilder`:
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("id", "first_name", "last_name", "gender")
     * values ($1, $2, $3, $4)
     * on conflict ("id")
     * do update set
     *  "first_name" = "excluded"."first_name",
     *  "last_name" = "excluded"."last_name"
     * ```
     */
    onConflict(callback: (builder: OnConflictBuilder<DB, TB>) => OnConflictUpdateBuilder<OnConflictDatabase<DB, TB>, OnConflictTables<TB>> | OnConflictDoNothingBuilder<DB, TB>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Adds `on duplicate key update` to the query.
     *
     * If you specify `on duplicate key update`, and a row is inserted that would cause
     * a duplicate value in a unique index or primary key, an update of the old row occurs.
     *
     * This is only implemented by some dialects like MySQL. On most dialects you should
     * use {@link onConflict} instead.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onDuplicateKeyUpdate({ updated_at: new Date().toISOString() })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`id`, `first_name`, `last_name`, `gender`)
     * values (?, ?, ?, ?)
     * on duplicate key update `updated_at` = ?
     * ```
     */
    onDuplicateKeyUpdate(update: UpdateObjectExpression<DB, TB, TB>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, last_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning((eb) => [
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     eb.selectFrom('pet').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    returning<CB extends SelectCallback<DB, TB>>(callback: CB): InsertQueryBuilder<DB, TB, ReturningCallbackRow<DB, TB, O, CB>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` to an insert/update/delete/merge query on databases
     * that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll(): InsertQueryBuilder<DB, TB, Selectable<DB[TB]>>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like MS SQL Server (MSSQL), this method can be chained
     * to `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Also see the {@link outputAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .output('inserted.id')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender")
     * output "inserted"."id"
     * values (@1, @2, @3)
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { old_first_name, old_last_name, new_first_name, new_last_name } = await db
     *   .updateTable('person')
     *   .set({ first_name: 'John', last_name: 'Doe' })
     *   .output([
     *     'deleted.first_name as old_first_name',
     *     'deleted.last_name as old_last_name',
     *     'inserted.first_name as new_first_name',
     *     'inserted.last_name as new_last_name',
     *   ])
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = @1, "last_name" = @2
     * output "deleted"."first_name" as "old_first_name",
     *   "deleted"."last_name" as "old_last_name",
     *   "inserted"."first_name" as "new_first_name",
     *   "inserted"."last_name" as "new_last_name"
     * where "created_at" < @3
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { full_name } = await db
     *   .deleteFrom('person')
     *   .output((eb) => sql<string>`concat(${eb.ref('deleted.first_name')}, ' ', ${eb.ref('deleted.last_name')})`.as('full_name'))
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * delete from "person"
     * output concat("deleted"."first_name", ' ', "deleted"."last_name") as "full_name"
     * where "created_at" < @1
     * ```
     *
     * Return the action performed on the row:
     *
     * ```ts
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male'
     *   })
     *   .output([
     *     'inserted.id as inserted_id',
     *     'deleted.id as deleted_id',
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "pet"."owner_id" = "person"."id"
     * when matched then delete
     * when not matched then
     * insert ("first_name", "last_name", "gender")
     * values (@1, @2, @3)
     * output "inserted"."id" as "inserted_id", "deleted"."id" as "deleted_id"
     * ```
     *
     */
    output<OE extends OutputExpression<DB, TB, 'inserted'>>(selections: readonly OE[]): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>>;
    output<CB extends OutputCallback<DB, TB, 'inserted'>>(callback: CB): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputCallback<CB>>>;
    output<OE extends OutputExpression<DB, TB, 'inserted'>>(selection: OE): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>>;
    /**
     * Adds an `output {prefix}.*` to an `insert`/`update`/`delete`/`merge` query on databases
     * that support `output` such as MS SQL Server (MSSQL).
     *
     * Also see the {@link output} method.
     */
    outputAll(table: 'inserted'): InsertQueryBuilder<DB, TB, ReturningAllRow<DB, TB, O>>;
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({ first_name: 'James', last_name: 'Smith', gender: 'male' })
     *   .returning(['first_name'])
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender") values ($1, $2, $3)
     * ```
     */
    clearReturning(): InsertQueryBuilder<DB, TB, InsertResult>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.insertInto('person')
     *   .values({ first_name: 'John', last_name: 'Doe', gender: 'male' })
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function insertPerson(values: NewPerson, returnLastName: boolean) {
     *   return await db
     *     .insertInto('person')
     *     .values(values)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `insertPerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if<O2>(condition: boolean, func: (qb: this) => InsertQueryBuilder<any, any, O2>): O2 extends InsertResult ? InsertQueryBuilder<DB, TB, InsertResult> : O2 extends O & infer E ? InsertQueryBuilder<DB, TB, O & Partial<E>> : InsertQueryBuilder<DB, TB, Partial<O2>>;
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `InsertQueryBuilder` with a new output type.
     */
    $castTo<C>(): InsertQueryBuilder<DB, TB, C>;
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link values} input
     * when using {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType<T>(): InsertQueryBuilder<DB, TB, NarrowPartial<O, T>>;
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson, NewPet, Species } from 'type-editor' // imaginary module
     *
     * async function insertPersonAndPet(person: NewPerson, pet: Omit<NewPet, 'owner_id'>) {
     *   return await db
     *     .with('new_person', (qb) => qb
     *       .insertInto('person')
     *       .values(person)
     *       .returning('id')
     *       .$assertType<{ id: number }>()
     *     )
     *     .with('new_pet', (qb) => qb
     *       .insertInto('pet')
     *       .values((eb) => ({
     *         owner_id: eb.selectFrom('new_person').select('id'),
     *         ...pet
     *       }))
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['new_person', 'new_pet'])
     *     .selectAll()
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     */
    $assertType<T extends O>(): O extends T ? InsertQueryBuilder<DB, TB, T> : KyselyTypeError<`$assertType() call failed: The type passed in is not equal to the output type of the query.`>;
    /**
     * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): InsertQueryBuilder<DB, TB, O>;
    toOperationNode(): InsertQueryNode;
    compile(): CompiledQuery<O>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<SimplifyResult<O>[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SimplifySingleResult<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor | ((node: QueryNode) => Error)): Promise<SimplifyResult<O>>;
    /**
     * Executes the query and streams the rows.
     *
     * The optional argument `chunkSize` defines how many rows to fetch from the database
     * at a time. It only affects some dialects like PostgreSQL that support it.
     *
     * ### Examples
     *
     * ```ts
     * const stream = db
     *   .selectFrom('person')
     *   .select(['first_name', 'last_name'])
     *   .where('gender', '=', 'other')
     *   .stream()
     *
     * for await (const person of stream) {
     *   console.log(person.first_name)
     *
     *   if (person.last_name === 'Something') {
     *     // Breaking or returning before the stream has ended will release
     *     // the database connection and invalidate the stream.
     *     break
     *   }
     * }
     * ```
     */
    stream(chunkSize?: number): AsyncIterableIterator<O>;
    /**
     * Executes query with `explain` statement before the main query.
     *
     * ```ts
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json select * from `person` where `gender` = ?
     * ```
     *
     * You can also execute `explain analyze` statements.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json', sql`analyze`)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * explain (analyze, format json) select * from "person" where "gender" = $1
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface InsertQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: InsertQueryNode;
    readonly executor: QueryExecutor;
}

declare class UpdateQueryBuilder<DB, UT extends keyof DB, TB extends keyof DB, O> implements WhereInterface<DB, TB>, MultiTableReturningInterface<DB, TB, O>, OutputInterface<DB, TB, O>, OrderByInterface<DB, TB, never>, OperationNodeSource, Compilable<O>, Explainable, Streamable<O> {
    #private;
    constructor(props: UpdateQueryBuilderProps);
    /**
     * Adds a `where` expression to the query.
     *
     * Calling this method multiple times will combine the expressions using `and`.
     *
     * Also see {@link whereRef}
     *
     * ### Examples
     *
     * <!-- siteExample("where", "Simple where clause", 10) -->
     *
     * `where` method calls are combined with `AND`:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('first_name', '=', 'Jennifer')
     *   .where('age', '>', 40)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and "age" > $2
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * sql`your operator`
     * ```
     *
     * <!-- siteExample("where", "Where in", 20) -->
     *
     * Find multiple items using a list of identifiers:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', 'in', [1, 2, 3])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Object filter", 30) -->
     *
     * You can use the `and` function to create a simple equality
     * filter using an object
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: eb.ref('first_name')
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = "first_name"
     * )
     * ```
     *
     * <!-- siteExample("where", "OR where", 40) -->
     *
     * To combine conditions using `OR`, you can use the expression builder.
     * There are two ways to create `OR` expressions. Both are shown in this
     * example:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   // 1. Using the `or` method on the expression builder:
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   // 2. Chaining expressions using the `or` method on the
     *   // created expressions:
     *   .where((eb) =>
     *     eb('last_name', '=', 'Aniston').or('last_name', '=', 'Stallone')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   ("first_name" = $1 or "first_name" = $2)
     *   and
     *   ("last_name" = $3 or "last_name" = $4)
     * )
     * ```
     *
     * <!-- siteExample("where", "Conditional where calls", 50) -->
     *
     * You can add expressions conditionally like this:
     *
     * ```ts
     * import { Expression, SqlBool } from 'kysely'
     *
     * const firstName: string | undefined = 'Jennifer'
     * const lastName: string | undefined = 'Aniston'
     * const under18 = true
     * const over60 = true
     *
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * if (under18 || over60) {
     *   // Conditional OR expressions can be added like this.
     *   query = query.where((eb) => {
     *     const ors: Expression<SqlBool>[] = []
     *
     *     if (under18) {
     *       ors.push(eb('age', '<', 18))
     *     }
     *
     *     if (over60) {
     *       ors.push(eb('age', '>', 60))
     *     }
     *
     *     return eb.or(ors)
     *   })
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * Both the first and third argument can also be arbitrary expressions like
     * subqueries. An expression can defined by passing a function and calling
     * the methods of the {@link ExpressionBuilder} passed to the callback:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be expressions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Complex where clause", 60) -->
     *
     * For complex `where` expressions you can pass in a single callback and
     * use the `ExpressionBuilder` to build your expression:
     *
     * ```ts
     * const firstName = 'Jennifer'
     * const maxAge = 60
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, or, and, not, exists, selectFrom }) => and([
     *     or([
     *       eb('first_name', '=', firstName),
     *       eb('age', '<', maxAge)
     *     ]),
     *     not(exists(
     *       selectFrom('pet')
     *         .select('pet.id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   (
     *     "first_name" = $1
     *     or "age" < $2
     *   )
     *   and not exists (
     *     select "pet"."id" from "pet" where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql<string>`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const columnFromUserInput: string = 'id'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .where(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): UpdateQueryBuilder<DB, UT, TB, O>;
    where<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((eb) => eb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Clears all where expressions from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .where('id','=',42)
     *   .clearWhere()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearWhere(): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Changes an `update` query into a `update top` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Update the first row:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(1)
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(1) "person" set "first_name" = @1 where "age" > @2
     * ```
     *
     * Update the 50% first rows:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(50, 'percent')
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(50) percent "person" set "first_name" = @1 where "age" > @2
     * ```
     */
    top(expression: number | bigint, modifiers?: 'percent'): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds a from clause to the update query.
     *
     * This is supported only on some databases like PostgreSQL.
     *
     * The API is the same as {@link QueryCreator.selectFrom}.
     *
     * ### Examples
     *
     * ```ts
     * db.updateTable('person')
     *   .from('pet')
     *   .set((eb) => ({
     *     first_name: eb.ref('pet.name')
     *   }))
     *   .whereRef('pet.owner_id', '=', 'person.id')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = "pet"."name"
     * from "pet"
     * where "pet"."owner_id" = "person"."id"
     * ```
     */
    from<TE extends TableExpression<DB, TB>>(table: TE): UpdateQueryBuilder<From<DB, TE>, UT, FromTables<DB, TB, TE>, O>;
    from<TE extends TableExpression<DB, TB>>(table: TE[]): UpdateQueryBuilder<From<DB, TE>, UT, FromTables<DB, TB, TE>, O>;
    /**
     * Joins another table to the query using an inner join.
     *
     * ### Examples
     *
     * Simple usage by providing a table name and two columns to join:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   // `select` needs to come after the call to `innerJoin` so
     *   // that you can select from the joined table.
     *   .select(['person.id', 'pet.name'])
     *   .execute()
     *
     * result[0].id
     * result[0].name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "pet"."name"
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * ```
     *
     * You can give an alias for the joined table like this:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet as p', 'p.owner_id', 'person.id')
     *   .where('p.name', '=', 'Doggo')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet" as "p"
     * on "p"."owner_id" = "person"."id"
     * where "p".name" = $1
     * ```
     *
     * You can provide a function as the second argument to get a join
     * builder for creating more complex joins. The join builder has a
     * bunch of `on*` methods for building the `on` clause of the join.
     * There's basically an equivalent for every `where` method
     * (`on`, `onRef`, `onExists` etc.). You can do all the same things
     * with the `on` method that you can with the corresponding `where`
     * method. See the `where` method documentation for more examples.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     'pet',
     *     (join) => join
     *       .onRef('pet.owner_id', '=', 'person.id')
     *       .on('pet.name', '=', 'Doggo')
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * and "pet"."name" = $1
     * ```
     *
     * You can join a subquery by providing a select query (or a callback)
     * as the first argument:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     db.selectFrom('pet')
     *       .select(['owner_id', 'name'])
     *       .where('name', '=', 'Doggo')
     *       .as('doggos'),
     *     'doggos.owner_id',
     *     'person.id',
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join (
     *   select "owner_id", "name"
     *   from "pet"
     *   where "name" = $1
     * ) as "doggos"
     * on "doggos"."owner_id" = "person"."id"
     * ```
     */
    innerJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithInnerJoin<DB, UT, TB, O, TE>;
    innerJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithInnerJoin<DB, UT, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a left join instead of an inner join.
     */
    leftJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithLeftJoin<DB, UT, TB, O, TE>;
    leftJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithLeftJoin<DB, UT, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a right join instead of an inner join.
     */
    rightJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithRightJoin<DB, UT, TB, O, TE>;
    rightJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithRightJoin<DB, UT, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a full join instead of an inner join.
     */
    fullJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithFullJoin<DB, UT, TB, O, TE>;
    fullJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithFullJoin<DB, UT, TB, O, TE>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers?: OrderByModifiers): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     * @deprecated It does ~2-2.6x more compile-time instantiations compared to multiple chained `orderBy(expr, modifiers?)` calls (in `order by` clauses with reasonable item counts), and has broken autocompletion.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}> | DirectedOrderByStringReference<DB, TB, {}>>(exprs: ReadonlyArray<OE>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     * @deprecated It does ~2.9x more compile-time instantiations compared to a `orderBy(expr, direction)` call.
     */
    orderBy<OE extends DirectedOrderByStringReference<DB, TB, {}>>(expr: OE): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     * @deprecated Use `orderBy(expr, (ob) => ...)` instead.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers: Expression<any>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Clears the `order by` clause from the query.
     *
     * See {@link orderBy} for adding an `order by` clause or item to a query.
     *
     * ### Examples
     *
     * ```ts
     * const query = db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy('id', 'desc')
     *
     * const results = await query
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy(): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds a limit clause to the update query for supported databases, such as MySQL.
     *
     * ### Examples
     *
     * Update the first 2 rows in the 'person' table:
     *
     * ```ts
     * await db
     *   .updateTable('person')
     *   .set({ first_name: 'Foo' })
     *   .limit(2)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person` set `first_name` = ? limit ?
     * ```
     */
    limit(limit: ValueExpression<DB, TB, number>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Sets the values to update for an {@link Kysely.updateTable | update} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to update. In addition to the column's type, the values can be
     * any expressions such as raw {@link sql} snippets or select queries.
     *
     * This method also accepts a callback that returns the update object. The
     * callback takes an instance of {@link ExpressionBuilder} as its only argument.
     * The expression builder can be used to create arbitrary update expressions.
     *
     * The return value of an update query is an instance of {@link UpdateResult}.
     * You can use the {@link returning} method on supported databases to get out
     * the updated rows.
     *
     * ### Examples
     *
     * <!-- siteExample("update", "Single row", 10) -->
     *
     * Update a row in `person` table:
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .where('id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person" set "first_name" = $1, "last_name" = $2 where "id" = $3
     * ```
     *
     * <!-- siteExample("update", "Complex values", 20) -->
     *
     * As always, you can provide a callback to the `set` method to get access
     * to an expression builder:
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set((eb) => ({
     *     age: eb('age', '+', 1),
     *     first_name: eb.selectFrom('pet').select('name').limit(1),
     *     last_name: 'updated',
     *   }))
     *   .where('id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person"
     * set
     *   "first_name" = (select "name" from "pet" limit $1),
     *   "age" = "age" + $2,
     *   "last_name" = $3
     * where
     *   "id" = $4
     * ```
     *
     * If you provide two arguments the first one is interpreted as the column
     * (or other target) and the second as the value:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db
     *   .updateTable('person')
     *   .set('first_name', 'Foo')
     *   // As always, both arguments can be arbitrary expressions or
     *   // callbacks that give you access to an expression builder:
     *   .set(sql<string>`address['postalCode']`, (eb) => eb.val('61710'))
     *   .where('id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * On PostgreSQL you can chain `returning` to the query to get
     * the updated rows' columns (or any other expression) as the
     * return value:
     *
     * ```ts
     * const row = await db
     *   .updateTable('person')
     *   .set({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .where('id', '=', 1)
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     *
     * row.id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person" set "first_name" = $1, "last_name" = $2 where "id" = $3 returning "id"
     * ```
     *
     * In addition to primitives, the values can arbitrary expressions including
     * raw `sql` snippets or subqueries:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db
     *   .updateTable('person')
     *   .set(({ selectFrom, ref, fn, eb }) => ({
     *     first_name: selectFrom('person').select('first_name').limit(1),
     *     middle_name: ref('first_name'),
     *     age: eb('age', '+', 1),
     *     last_name: sql<string>`${'Ani'} || ${'ston'}`,
     *   }))
     *   .where('id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person" set
     * "first_name" = (select "first_name" from "person" limit $1),
     * "middle_name" = "first_name",
     * "age" = "age" + $2,
     * "last_name" = $3 || $4
     * where "id" = $5
     * ```
     *
     * <!-- siteExample("update", "MySQL joins", 30) -->
     *
     * MySQL allows you to join tables directly to the "main" table and update
     * rows of all joined tables. This is possible by passing all tables to the
     * `updateTable` method as a list and adding the `ON` conditions as `WHERE`
     * statements. You can then use the `set(column, value)` variant to update
     * columns using table qualified names.
     *
     * The `UpdateQueryBuilder` also has `innerJoin` etc. join methods, but those
     * can only be used as part of a PostgreSQL `update set from join` query.
     * Due to type complexity issues, we unfortunately can't make the same
     * methods work in both cases.
     *
     * ```ts
     * const result = await db
     *   .updateTable(['person', 'pet'])
     *   .set('person.first_name', 'Updated person')
     *   .set('pet.name', 'Updated doggo')
     *   .whereRef('person.id', '=', 'pet.owner_id')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update
     *   `person`,
     *   `pet`
     * set
     *   `person`.`first_name` = ?,
     *   `pet`.`name` = ?
     * where
     *   `person`.`id` = `pet`.`owner_id`
     *   and `person`.`id` = ?
     * ```
     */
    set(update: UpdateObjectExpression<DB, TB, UT>): UpdateQueryBuilder<DB, UT, TB, O>;
    set<RE extends ReferenceExpression<DB, UT>>(key: RE, value: ValueExpression<DB, TB, ExtractUpdateTypeFromReferenceExpression<DB, UT, RE>>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, last_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning((eb) => [
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     eb.selectFrom('pet').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SE>>;
    returning<CB extends SelectCallback<DB, TB>>(callback: CB): UpdateQueryBuilder<DB, UT, TB, ReturningCallbackRow<DB, TB, O, CB>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` or `returning table.*` to an insert/update/delete/merge
     * query on databases that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll<T extends TB>(tables: ReadonlyArray<T>): UpdateQueryBuilder<DB, UT, TB, ReturningAllRow<DB, T, O>>;
    returningAll<T extends TB>(table: T): UpdateQueryBuilder<DB, UT, TB, ReturningAllRow<DB, T, O>>;
    returningAll(): UpdateQueryBuilder<DB, UT, TB, ReturningAllRow<DB, TB, O>>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like MS SQL Server (MSSQL), this method can be chained
     * to `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Also see the {@link outputAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .output('inserted.id')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender")
     * output "inserted"."id"
     * values (@1, @2, @3)
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { old_first_name, old_last_name, new_first_name, new_last_name } = await db
     *   .updateTable('person')
     *   .set({ first_name: 'John', last_name: 'Doe' })
     *   .output([
     *     'deleted.first_name as old_first_name',
     *     'deleted.last_name as old_last_name',
     *     'inserted.first_name as new_first_name',
     *     'inserted.last_name as new_last_name',
     *   ])
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = @1, "last_name" = @2
     * output "deleted"."first_name" as "old_first_name",
     *   "deleted"."last_name" as "old_last_name",
     *   "inserted"."first_name" as "new_first_name",
     *   "inserted"."last_name" as "new_last_name"
     * where "created_at" < @3
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { full_name } = await db
     *   .deleteFrom('person')
     *   .output((eb) => sql<string>`concat(${eb.ref('deleted.first_name')}, ' ', ${eb.ref('deleted.last_name')})`.as('full_name'))
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * delete from "person"
     * output concat("deleted"."first_name", ' ', "deleted"."last_name") as "full_name"
     * where "created_at" < @1
     * ```
     *
     * Return the action performed on the row:
     *
     * ```ts
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male'
     *   })
     *   .output([
     *     'inserted.id as inserted_id',
     *     'deleted.id as deleted_id',
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "pet"."owner_id" = "person"."id"
     * when matched then delete
     * when not matched then
     * insert ("first_name", "last_name", "gender")
     * values (@1, @2, @3)
     * output "inserted"."id" as "inserted_id", "deleted"."id" as "deleted_id"
     * ```
     *
     */
    output<OE extends OutputExpression<DB, UT>>(selections: readonly OE[]): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>>;
    output<CB extends OutputCallback<DB, TB>>(callback: CB): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputCallback<CB>>>;
    output<OE extends OutputExpression<DB, TB>>(selection: OE): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>>;
    /**
     * Adds an `output {prefix}.*` to an `insert`/`update`/`delete`/`merge` query on databases
     * that support `output` such as MS SQL Server (MSSQL).
     *
     * Also see the {@link output} method.
     */
    outputAll(table: OutputPrefix): UpdateQueryBuilder<DB, UT, TB, ReturningAllRow<DB, TB, O>>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.updateTable('person')
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql.raw('-- This is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person`
     * set `age` = 39
     * where `first_name` = "John" -- This is a comment
     * ```
     */
    modifyEnd(modifier: Expression<any>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.updateTable('person')
     *   .returningAll()
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .clearReturning()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * update "person" set "age" = 39 where "first_name" = "John"
     * ```
     */
    clearReturning(): UpdateQueryBuilder<DB, UT, TB, UpdateResult>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * const values = {
     *   first_name: 'John',
     * } satisfies PersonUpdate
     *
     * db.updateTable('person')
     *   .set(values)
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if<O2>(condition: boolean, func: (qb: this) => UpdateQueryBuilder<any, any, any, O2>): O2 extends UpdateResult ? UpdateQueryBuilder<DB, UT, TB, UpdateResult> : O2 extends O & infer E ? UpdateQueryBuilder<DB, UT, TB, O & Partial<E>> : UpdateQueryBuilder<DB, UT, TB, Partial<O2>>;
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `UpdateQueryBuilder` with a new output type.
     */
    $castTo<C>(): UpdateQueryBuilder<DB, UT, TB, C>;
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link set} input
     * when using {@link where} and/or {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ deleted_at: Date; nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType<T>(): UpdateQueryBuilder<DB, UT, TB, NarrowPartial<O, T>>;
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate, PetUpdate, Species } from 'type-editor' // imaginary module
     *
     * const person = {
     *   id: 1,
     *   gender: 'other',
     * } satisfies PersonUpdate
     *
     * const pet = {
     *   name: 'Fluffy',
     * } satisfies PetUpdate
     *
     * const result = await db
     *   .with('updated_person', (qb) => qb
     *     .updateTable('person')
     *     .set(person)
     *     .where('id', '=', person.id)
     *     .returning('first_name')
     *     .$assertType<{ first_name: string }>()
     *   )
     *   .with('updated_pet', (qb) => qb
     *     .updateTable('pet')
     *     .set(pet)
     *     .where('owner_id', '=', person.id)
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['updated_person', 'updated_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType<T extends O>(): O extends T ? UpdateQueryBuilder<DB, UT, TB, T> : KyselyTypeError<`$assertType() call failed: The type passed in is not equal to the output type of the query.`>;
    /**
     * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): UpdateQueryBuilder<DB, UT, TB, O>;
    toOperationNode(): UpdateQueryNode;
    compile(): CompiledQuery<SimplifyResult<O>>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<SimplifyResult<O>[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SimplifySingleResult<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor | ((node: QueryNode) => Error)): Promise<SimplifyResult<O>>;
    /**
     * Executes the query and streams the rows.
     *
     * The optional argument `chunkSize` defines how many rows to fetch from the database
     * at a time. It only affects some dialects like PostgreSQL that support it.
     *
     * ### Examples
     *
     * ```ts
     * const stream = db
     *   .selectFrom('person')
     *   .select(['first_name', 'last_name'])
     *   .where('gender', '=', 'other')
     *   .stream()
     *
     * for await (const person of stream) {
     *   console.log(person.first_name)
     *
     *   if (person.last_name === 'Something') {
     *     // Breaking or returning before the stream has ended will release
     *     // the database connection and invalidate the stream.
     *     break
     *   }
     * }
     * ```
     */
    stream(chunkSize?: number): AsyncIterableIterator<O>;
    /**
     * Executes query with `explain` statement before the main query.
     *
     * ```ts
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json select * from `person` where `gender` = ?
     * ```
     *
     * You can also execute `explain analyze` statements.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json', sql`analyze`)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * explain (analyze, format json) select * from "person" where "gender" = $1
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface UpdateQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: UpdateQueryNode;
    readonly executor: QueryExecutor;
}
type UpdateQueryBuilderWithInnerJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? InnerJoinedBuilder$1<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? UpdateQueryBuilder<DB, UT, TB | TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$1<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$1<DB, UT, TB, O, QA, QO> : never;
type InnerJoinedBuilder$1<DB, UT extends keyof DB, TB extends keyof DB, O, A extends string, R> = A extends keyof DB ? UpdateQueryBuilder<InnerJoinedDB$1<DB, A, R>, UT, TB | A, O> : UpdateQueryBuilder<DB & ShallowRecord<A, R>, UT, TB | A, O>;
type InnerJoinedDB$1<DB, A extends string, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never;
}>;
type UpdateQueryBuilderWithLeftJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? LeftJoinedBuilder$1<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? LeftJoinedBuilder$1<DB, UT, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$1<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$1<DB, UT, TB, O, QA, QO> : never;
type LeftJoinedBuilder$1<DB, UT extends keyof DB, TB extends keyof DB, O, A extends keyof any, R> = A extends keyof DB ? UpdateQueryBuilder<LeftJoinedDB$1<DB, A, R>, UT, TB | A, O> : UpdateQueryBuilder<DB & ShallowRecord<A, Nullable<R>>, UT, TB | A, O>;
type LeftJoinedDB$1<DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends keyof DB ? DB[C] : never;
}>;
type UpdateQueryBuilderWithRightJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? RightJoinedBuilder$1<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? RightJoinedBuilder$1<DB, UT, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$1<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$1<DB, UT, TB, O, QA, QO> : never;
type RightJoinedBuilder$1<DB, UT extends keyof DB, TB extends keyof DB, O, A extends keyof any, R> = UpdateQueryBuilder<RightJoinedDB$1<DB, TB, A, R>, UT, TB | A, O>;
type RightJoinedDB$1<DB, TB extends keyof DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? R : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
}>;
type UpdateQueryBuilderWithFullJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? OuterJoinedBuilder$1<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? OuterJoinedBuilder$1<DB, UT, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$1<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$1<DB, UT, TB, O, QA, QO> : never;
type OuterJoinedBuilder$1<DB, UT extends keyof DB, TB extends keyof DB, O, A extends keyof any, R> = UpdateQueryBuilder<OuterJoinedBuilderDB$1<DB, TB, A, R>, UT, TB | A, O>;
type OuterJoinedBuilderDB$1<DB, TB extends keyof DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
}>;

declare class DeleteQueryBuilder<DB, TB extends keyof DB, O> implements WhereInterface<DB, TB>, MultiTableReturningInterface<DB, TB, O>, OutputInterface<DB, TB, O, 'deleted'>, OrderByInterface<DB, TB, {}>, OperationNodeSource, Compilable<O>, Explainable, Streamable<O> {
    #private;
    constructor(props: DeleteQueryBuilderProps);
    /**
     * Adds a `where` expression to the query.
     *
     * Calling this method multiple times will combine the expressions using `and`.
     *
     * Also see {@link whereRef}
     *
     * ### Examples
     *
     * <!-- siteExample("where", "Simple where clause", 10) -->
     *
     * `where` method calls are combined with `AND`:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('first_name', '=', 'Jennifer')
     *   .where('age', '>', 40)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "first_name" = $1 and "age" > $2
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * sql`your operator`
     * ```
     *
     * <!-- siteExample("where", "Where in", 20) -->
     *
     * Find multiple items using a list of identifiers:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', 'in', [1, 2, 3])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Object filter", 30) -->
     *
     * You can use the `and` function to create a simple equality
     * filter using an object
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((eb) => eb.and({
     *     first_name: 'Jennifer',
     *     last_name: eb.ref('first_name')
     *   }))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   "first_name" = $1
     *   and "last_name" = "first_name"
     * )
     * ```
     *
     * <!-- siteExample("where", "OR where", 40) -->
     *
     * To combine conditions using `OR`, you can use the expression builder.
     * There are two ways to create `OR` expressions. Both are shown in this
     * example:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   // 1. Using the `or` method on the expression builder:
     *   .where((eb) => eb.or([
     *     eb('first_name', '=', 'Jennifer'),
     *     eb('first_name', '=', 'Sylvester')
     *   ]))
     *   // 2. Chaining expressions using the `or` method on the
     *   // created expressions:
     *   .where((eb) =>
     *     eb('last_name', '=', 'Aniston').or('last_name', '=', 'Stallone')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   ("first_name" = $1 or "first_name" = $2)
     *   and
     *   ("last_name" = $3 or "last_name" = $4)
     * )
     * ```
     *
     * <!-- siteExample("where", "Conditional where calls", 50) -->
     *
     * You can add expressions conditionally like this:
     *
     * ```ts
     * import { Expression, SqlBool } from 'kysely'
     *
     * const firstName: string | undefined = 'Jennifer'
     * const lastName: string | undefined = 'Aniston'
     * const under18 = true
     * const over60 = true
     *
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * if (under18 || over60) {
     *   // Conditional OR expressions can be added like this.
     *   query = query.where((eb) => {
     *     const ors: Expression<SqlBool>[] = []
     *
     *     if (under18) {
     *       ors.push(eb('age', '<', 18))
     *     }
     *
     *     if (over60) {
     *       ors.push(eb('age', '>', 60))
     *     }
     *
     *     return eb.or(ors)
     *   })
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * Both the first and third argument can also be arbitrary expressions like
     * subqueries. An expression can defined by passing a function and calling
     * the methods of the {@link ExpressionBuilder} passed to the callback:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be expressions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * <!-- siteExample("where", "Complex where clause", 60) -->
     *
     * For complex `where` expressions you can pass in a single callback and
     * use the `ExpressionBuilder` to build your expression:
     *
     * ```ts
     * const firstName = 'Jennifer'
     * const maxAge = 60
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .where(({ eb, or, and, not, exists, selectFrom }) => and([
     *     or([
     *       eb('first_name', '=', firstName),
     *       eb('age', '<', maxAge)
     *     ]),
     *     not(exists(
     *       selectFrom('pet')
     *         .select('pet.id')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *     ))
     *   ]))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*
     * from "person"
     * where (
     *   (
     *     "first_name" = $1
     *     or "age" < $2
     *   )
     *   and not exists (
     *     select "pet"."id" from "pet" where "pet"."owner_id" = "person"."id"
     *   )
     * )
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql<string>`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const columnFromUserInput: string = 'id'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .where(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>, VE extends OperandValueExpressionOrList<DB, TB, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): DeleteQueryBuilder<DB, TB, O>;
    where<E extends ExpressionOrFactory<DB, TB, SqlBool>>(expression: E): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((eb) => eb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef<LRE extends ReferenceExpression<DB, TB>, RRE extends ReferenceExpression<DB, TB>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Clears all where expressions from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .where('id','=',42)
     *   .clearWhere()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearWhere(): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Changes a `delete from` query into a `delete top from` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Delete the first 5 rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(5)
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(5) from "person" where "age" > @1
     * ```
     *
     * Delete the first 50% of rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(50, 'percent')
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(50) percent from "person" where "age" > @1
     * ```
     */
    top(expression: number | bigint, modifiers?: 'percent'): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds a `using` clause to the query.
     *
     * This clause allows adding additional tables to the query for filtering/returning
     * only. Usually a non-standard syntactic-sugar alternative to a `where` with a sub-query.
     *
     * ### Examples:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .using('person')
     *   .whereRef('pet.owner_id', '=', 'person.id')
     *   .where('person.first_name', '=', 'Bob')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * delete from "pet"
     * using "person"
     * where "pet"."owner_id" = "person"."id"
     *   and "person"."first_name" = $1
     * ```
     *
     * On supported databases such as MySQL, this clause allows using joins, but requires
     * at least one of the tables after the `from` keyword to be also named after
     * the `using` keyword. See also {@link innerJoin}, {@link leftJoin}, {@link rightJoin}
     * and {@link fullJoin}.
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .using('pet')
     *   .leftJoin('person', 'person.id', 'pet.owner_id')
     *   .where('person.first_name', '=', 'Bob')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet`
     * using `pet`
     * left join `person` on `person`.`id` = `pet`.`owner_id`
     * where `person`.`first_name` = ?
     * ```
     *
     * You can also chain multiple invocations of this method, or pass an array to
     * a single invocation to name multiple tables.
     *
     * ```ts
     * await db
     *   .deleteFrom('toy')
     *   .using(['pet', 'person'])
     *   .whereRef('toy.pet_id', '=', 'pet.id')
     *   .whereRef('pet.owner_id', '=', 'person.id')
     *   .where('person.first_name', '=', 'Bob')
     *   .returning('pet.name')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * delete from "toy"
     * using "pet", "person"
     * where "toy"."pet_id" = "pet"."id"
     *   and "pet"."owner_id" = "person"."id"
     *   and "person"."first_name" = $1
     * returning "pet"."name"
     * ```
     */
    using<TE extends TableExpression<DB, keyof DB>>(tables: TE[]): DeleteQueryBuilder<From<DB, TE>, FromTables<DB, TB, TE>, O>;
    using<TE extends TableExpression<DB, keyof DB>>(table: TE): DeleteQueryBuilder<From<DB, TE>, FromTables<DB, TB, TE>, O>;
    /**
     * Joins another table to the query using an inner join.
     *
     * ### Examples
     *
     * Simple usage by providing a table name and two columns to join:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   // `select` needs to come after the call to `innerJoin` so
     *   // that you can select from the joined table.
     *   .select(['person.id', 'pet.name'])
     *   .execute()
     *
     * result[0].id
     * result[0].name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "pet"."name"
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * ```
     *
     * You can give an alias for the joined table like this:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet as p', 'p.owner_id', 'person.id')
     *   .where('p.name', '=', 'Doggo')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet" as "p"
     * on "p"."owner_id" = "person"."id"
     * where "p".name" = $1
     * ```
     *
     * You can provide a function as the second argument to get a join
     * builder for creating more complex joins. The join builder has a
     * bunch of `on*` methods for building the `on` clause of the join.
     * There's basically an equivalent for every `where` method
     * (`on`, `onRef`, `onExists` etc.). You can do all the same things
     * with the `on` method that you can with the corresponding `where`
     * method. See the `where` method documentation for more examples.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     'pet',
     *     (join) => join
     *       .onRef('pet.owner_id', '=', 'person.id')
     *       .on('pet.name', '=', 'Doggo')
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * and "pet"."name" = $1
     * ```
     *
     * You can join a subquery by providing a select query (or a callback)
     * as the first argument:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     db.selectFrom('pet')
     *       .select(['owner_id', 'name'])
     *       .where('name', '=', 'Doggo')
     *       .as('doggos'),
     *     'doggos.owner_id',
     *     'person.id',
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join (
     *   select "owner_id", "name"
     *   from "pet"
     *   where "name" = $1
     * ) as "doggos"
     * on "doggos"."owner_id" = "person"."id"
     * ```
     */
    innerJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    innerJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a left join instead of an inner join.
     */
    leftJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    leftJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a right join instead of an inner join.
     */
    rightJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithRightJoin<DB, TB, O, TE>;
    rightJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithRightJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a full join instead of an inner join.
     */
    fullJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithFullJoin<DB, TB, O, TE>;
    fullJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithFullJoin<DB, TB, O, TE>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, last_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning((eb) => [
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     eb.selectFrom('pet').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    returning<CB extends SelectCallback<DB, TB>>(callback: CB): DeleteQueryBuilder<DB, TB, ReturningCallbackRow<DB, TB, O, CB>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds `returning *` or `returning table.*` clause to the query.
     *
     * ### Examples
     *
     * Return all columns.
     *
     * ```ts
     * const pets = await db
     *   .deleteFrom('pet')
     *   .returningAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL)
     *
     * ```sql
     * delete from "pet" returning *
     * ```
     *
     * Return all columns from all tables
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('toy')
     *   .using(['pet', 'person'])
     *   .whereRef('toy.pet_id', '=', 'pet.id')
     *   .whereRef('pet.owner_id', '=', 'person.id')
     *   .where('person.first_name', '=', 'Zoro')
     *   .returningAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL)
     *
     * ```sql
     * delete from "toy"
     * using "pet", "person"
     * where "toy"."pet_id" = "pet"."id"
     * and "pet"."owner_id" = "person"."id"
     * and "person"."first_name" = $1
     * returning *
     * ```
     *
     * Return all columns from a single table.
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('toy')
     *   .using(['pet', 'person'])
     *   .whereRef('toy.pet_id', '=', 'pet.id')
     *   .whereRef('pet.owner_id', '=', 'person.id')
     *   .where('person.first_name', '=', 'Itachi')
     *   .returningAll('pet')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL)
     *
     * ```sql
     * delete from "toy"
     * using "pet", "person"
     * where "toy"."pet_id" = "pet"."id"
     * and "pet"."owner_id" = "person"."id"
     * and "person"."first_name" = $1
     * returning "pet".*
     * ```
     *
     * Return all columns from multiple tables.
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('toy')
     *   .using(['pet', 'person'])
     *   .whereRef('toy.pet_id', '=', 'pet.id')
     *   .whereRef('pet.owner_id', '=', 'person.id')
     *   .where('person.first_name', '=', 'Luffy')
     *   .returningAll(['toy', 'pet'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL)
     *
     * ```sql
     * delete from "toy"
     * using "pet", "person"
     * where "toy"."pet_id" = "pet"."id"
     * and "pet"."owner_id" = "person"."id"
     * and "person"."first_name" = $1
     * returning "toy".*, "pet".*
     * ```
     */
    returningAll<T extends TB>(tables: ReadonlyArray<T>): DeleteQueryBuilder<DB, TB, ReturningAllRow<DB, T, O>>;
    /**
     * Adds a `returning *` or `returning table.*` to an insert/update/delete/merge
     * query on databases that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll<T extends TB>(table: T): DeleteQueryBuilder<DB, TB, ReturningAllRow<DB, T, O>>;
    returningAll(): DeleteQueryBuilder<DB, TB, ReturningAllRow<DB, TB, O>>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like MS SQL Server (MSSQL), this method can be chained
     * to `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Also see the {@link outputAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .output('inserted.id')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender")
     * output "inserted"."id"
     * values (@1, @2, @3)
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { old_first_name, old_last_name, new_first_name, new_last_name } = await db
     *   .updateTable('person')
     *   .set({ first_name: 'John', last_name: 'Doe' })
     *   .output([
     *     'deleted.first_name as old_first_name',
     *     'deleted.last_name as old_last_name',
     *     'inserted.first_name as new_first_name',
     *     'inserted.last_name as new_last_name',
     *   ])
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = @1, "last_name" = @2
     * output "deleted"."first_name" as "old_first_name",
     *   "deleted"."last_name" as "old_last_name",
     *   "inserted"."first_name" as "new_first_name",
     *   "inserted"."last_name" as "new_last_name"
     * where "created_at" < @3
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { full_name } = await db
     *   .deleteFrom('person')
     *   .output((eb) => sql<string>`concat(${eb.ref('deleted.first_name')}, ' ', ${eb.ref('deleted.last_name')})`.as('full_name'))
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * delete from "person"
     * output concat("deleted"."first_name", ' ', "deleted"."last_name") as "full_name"
     * where "created_at" < @1
     * ```
     *
     * Return the action performed on the row:
     *
     * ```ts
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male'
     *   })
     *   .output([
     *     'inserted.id as inserted_id',
     *     'deleted.id as deleted_id',
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "pet"."owner_id" = "person"."id"
     * when matched then delete
     * when not matched then
     * insert ("first_name", "last_name", "gender")
     * values (@1, @2, @3)
     * output "inserted"."id" as "inserted_id", "deleted"."id" as "deleted_id"
     * ```
     *
     */
    output<OE extends OutputExpression<DB, TB, 'deleted'>>(selections: readonly OE[]): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>>;
    output<CB extends OutputCallback<DB, TB, 'deleted'>>(callback: CB): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputCallback<CB>>>;
    output<OE extends OutputExpression<DB, TB, 'deleted'>>(selection: OE): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SelectExpressionFromOutputExpression<OE>>>;
    /**
     * Adds an `output {prefix}.*` to an `insert`/`update`/`delete`/`merge` query on databases
     * that support `output` such as MS SQL Server (MSSQL).
     *
     * Also see the {@link output} method.
     */
    outputAll(table: 'deleted'): DeleteQueryBuilder<DB, TB, ReturningAllRow<DB, TB, O>>;
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max"
     * ```
     */
    clearReturning(): DeleteQueryBuilder<DB, TB, DeleteResult>;
    /**
     * Clears the `limit` clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .limit(5)
     *   .clearLimit()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max" returning *
     * ```
     */
    clearLimit(): DeleteQueryBuilder<DB, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers?: OrderByModifiers): DeleteQueryBuilder<DB, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     * @deprecated It does ~2-2.6x more compile-time instantiations compared to multiple chained `orderBy(expr, modifiers?)` calls (in `order by` clauses with reasonable item counts), and has broken autocompletion.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}> | DirectedOrderByStringReference<DB, TB, {}>>(exprs: ReadonlyArray<OE>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     * @deprecated It does ~2.9x more compile-time instantiations compared to a `orderBy(expr, direction)` call.
     */
    orderBy<OE extends DirectedOrderByStringReference<DB, TB, {}>>(expr: OE): DeleteQueryBuilder<DB, TB, O>;
    /**
     * @description This is only supported by some dialects like MySQL or SQLite with `SQLITE_ENABLE_UPDATE_DELETE_LIMIT`.
     * @deprecated Use `orderBy(expr, (ob) => ...)` instead.
     */
    orderBy<OE extends OrderByExpression<DB, TB, {}>>(expr: OE, modifiers: Expression<any>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Clears the `order by` clause from the query.
     *
     * See {@link orderBy} for adding an `order by` clause or item to a query.
     *
     * ### Examples
     *
     * ```ts
     * const query = db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy('id', 'desc')
     *
     * const results = await query
     *   .clearOrderBy()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy(): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds a limit clause to the query.
     *
     * A limit clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet` order by `created_at` limit ?
     * ```
     */
    limit(limit: ValueExpression<DB, TB, number>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.deleteFrom('person')
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`
     * where `first_name` = "John" -- This is a comment
     * ```
     */
    modifyEnd(modifier: Expression<any>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.deleteFrom('person')
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function deletePerson(id: number, returnLastName: boolean) {
     *   return await db
     *     .deleteFrom('person')
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `deletePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if<O2>(condition: boolean, func: (qb: this) => DeleteQueryBuilder<any, any, O2>): O2 extends DeleteResult ? DeleteQueryBuilder<DB, TB, DeleteResult> : O2 extends O & infer E ? DeleteQueryBuilder<DB, TB, O & Partial<E>> : DeleteQueryBuilder<DB, TB, Partial<O2>>;
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `DeleteQueryBuilder` with a new output type.
     */
    $castTo<C>(): DeleteQueryBuilder<DB, TB, C>;
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType<T>(): DeleteQueryBuilder<DB, TB, NarrowPartial<O, T>>;
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { Species } from 'type-editor' // imaginary module
     *
     * async function deletePersonAndPets(personId: number) {
     *   return await db
     *     .with('deleted_person', (qb) => qb
     *        .deleteFrom('person')
     *        .where('id', '=', personId)
     *        .returning('first_name')
     *        .$assertType<{ first_name: string }>()
     *     )
     *     .with('deleted_pets', (qb) => qb
     *       .deleteFrom('pet')
     *       .where('owner_id', '=', personId)
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['deleted_person', 'deleted_pets'])
     *     .selectAll()
     *     .execute()
     * }
     * ```
     */
    $assertType<T extends O>(): O extends T ? DeleteQueryBuilder<DB, TB, T> : KyselyTypeError<`$assertType() call failed: The type passed in is not equal to the output type of the query.`>;
    /**
     * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): DeleteQueryBuilder<DB, TB, O>;
    toOperationNode(): DeleteQueryNode;
    compile(): CompiledQuery<SimplifyResult<O>>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<SimplifyResult<O>[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SimplifySingleResult<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor | ((node: QueryNode) => Error)): Promise<SimplifyResult<O>>;
    /**
     * Executes the query and streams the rows.
     *
     * The optional argument `chunkSize` defines how many rows to fetch from the database
     * at a time. It only affects some dialects like PostgreSQL that support it.
     *
     * ### Examples
     *
     * ```ts
     * const stream = db
     *   .selectFrom('person')
     *   .select(['first_name', 'last_name'])
     *   .where('gender', '=', 'other')
     *   .stream()
     *
     * for await (const person of stream) {
     *   console.log(person.first_name)
     *
     *   if (person.last_name === 'Something') {
     *     // Breaking or returning before the stream has ended will release
     *     // the database connection and invalidate the stream.
     *     break
     *   }
     * }
     * ```
     */
    stream(chunkSize?: number): AsyncIterableIterator<O>;
    /**
     * Executes query with `explain` statement before the main query.
     *
     * ```ts
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json select * from `person` where `gender` = ?
     * ```
     *
     * You can also execute `explain analyze` statements.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json', sql`analyze`)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * explain (analyze, format json) select * from "person" where "gender" = $1
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface DeleteQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: DeleteQueryNode;
    readonly executor: QueryExecutor;
}
type DeleteQueryBuilderWithInnerJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? InnerJoinedBuilder<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? DeleteQueryBuilder<DB, TB | TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder<DB, TB, O, QA, QO> : never;
type InnerJoinedBuilder<DB, TB extends keyof DB, O, A extends string, R> = A extends keyof DB ? DeleteQueryBuilder<InnerJoinedDB<DB, A, R>, TB | A, O> : DeleteQueryBuilder<DB & ShallowRecord<A, R>, TB | A, O>;
type InnerJoinedDB<DB, A extends string, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never;
}>;
type DeleteQueryBuilderWithLeftJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? LeftJoinedBuilder<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? LeftJoinedBuilder<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder<DB, TB, O, QA, QO> : never;
type LeftJoinedBuilder<DB, TB extends keyof DB, O, A extends keyof any, R> = A extends keyof DB ? DeleteQueryBuilder<LeftJoinedDB<DB, A, R>, TB | A, O> : DeleteQueryBuilder<DB & ShallowRecord<A, Nullable<R>>, TB | A, O>;
type LeftJoinedDB<DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends keyof DB ? DB[C] : never;
}>;
type DeleteQueryBuilderWithRightJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? RightJoinedBuilder<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? RightJoinedBuilder<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder<DB, TB, O, QA, QO> : never;
type RightJoinedBuilder<DB, TB extends keyof DB, O, A extends keyof any, R> = DeleteQueryBuilder<RightJoinedDB<DB, TB, A, R>, TB | A, O>;
type RightJoinedDB<DB, TB extends keyof DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? R : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
}>;
type DeleteQueryBuilderWithFullJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? OuterJoinedBuilder<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? OuterJoinedBuilder<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder<DB, TB, O, QA, QO> : never;
type OuterJoinedBuilder<DB, TB extends keyof DB, O, A extends keyof any, R> = DeleteQueryBuilder<OuterJoinedBuilderDB<DB, TB, A, R>, TB | A, O>;
type OuterJoinedBuilderDB<DB, TB extends keyof DB, A extends keyof any, R> = DrainOuterGeneric<{
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
}>;

declare class CTEBuilder<N extends string> implements OperationNodeSource {
    #private;
    constructor(props: CTEBuilderProps);
    /**
     * Makes the common table expression materialized.
     */
    materialized(): CTEBuilder<N>;
    /**
     * Makes the common table expression not materialized.
     */
    notMaterialized(): CTEBuilder<N>;
    toOperationNode(): CommonTableExpressionNode;
}
interface CTEBuilderProps {
    readonly node: CommonTableExpressionNode;
}
type CTEBuilderCallback<N extends string> = (cte: <N2 extends string>(name: N2) => CTEBuilder<N2>) => CTEBuilder<N>;

type CommonTableExpression<DB, CN extends string> = (creator: QueryCreator<DB>) => CommonTableExpressionOutput<DB, CN>;
type RecursiveCommonTableExpression<DB, CN extends string> = (creator: QueryCreator<DB & {
    [K in ExtractTableFromCommonTableExpressionName<CN>]: ExtractRowFromCommonTableExpressionName<CN>;
}>) => CommonTableExpressionOutput<DB, CN>;
type QueryCreatorWithCommonTableExpression<DB, CN extends string, CTE> = QueryCreator<DB & {
    [K in ExtractTableFromCommonTableExpressionName<CN>]: ExtractRowFromCommonTableExpression<CTE>;
}>;
type CommonTableExpressionOutput<DB, CN extends string> = Expression<ExtractRowFromCommonTableExpressionName<CN>> | InsertQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>> | UpdateQueryBuilder<DB, any, any, ExtractRowFromCommonTableExpressionName<CN>> | DeleteQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>>;
/**
 * Given a common CommonTableExpression CTE extracts the row type from it.
 *
 * For example a CTE `(db) => db.selectFrom('person').select(['id', 'first_name'])`
 * would result in `Pick<Person, 'id' | 'first_name'>`.
 */
type ExtractRowFromCommonTableExpression<CTE> = CTE extends (creator: QueryCreator<any>) => infer Q ? Q extends Expression<infer QO> ? QO : Q extends InsertQueryBuilder<any, any, infer QO> ? QO : Q extends UpdateQueryBuilder<any, any, any, infer QO> ? QO : Q extends DeleteQueryBuilder<any, any, infer QO> ? QO : never : never;
/**
 * Extracts 'person' from a string like 'person(id, first_name)'.
 */
type ExtractTableFromCommonTableExpressionName<CN extends string> = CN extends `${infer TB}(${string})` ? TB : CN;
/**
 * Parses a string like 'person(id, first_name)' into a type:
 *
 * {
 *   id: any,
 *   first_name: any
 * }
 *
 */
type ExtractRowFromCommonTableExpressionName<CN extends string> = CN extends `${string}(${infer CL})` ? {
    [C in ExtractColumnNamesFromColumnList<CL>]: any;
} : ShallowRecord<string, any>;
/**
 * Parses a string like 'id, first_name' into a type 'id' | 'first_name'
 */
type ExtractColumnNamesFromColumnList<R extends string> = R extends `${infer C}, ${infer RS}` ? C | ExtractColumnNamesFromColumnList<RS> : R;

type DeleteFrom<DB, TE extends TableExpressionOrList<DB, never>> = [
    TE
] extends [keyof DB] ? DeleteQueryBuilder<DB, ExtractTableAlias<DB, TE>, DeleteResult> : [
    TE
] extends [`${infer T} as ${infer A}`] ? T extends keyof DB ? DeleteQueryBuilder<DB & ShallowRecord<A, DB[T]>, A, DeleteResult> : never : TE extends ReadonlyArray<infer T> ? DeleteQueryBuilder<From<DB, T>, FromTables<DB, never, T>, DeleteResult> : DeleteQueryBuilder<From<DB, TE>, FromTables<DB, never, TE>, DeleteResult>;

type UpdateTable<DB, TE extends TableExpressionOrList<DB, never>> = [
    TE
] extends [keyof DB] ? UpdateQueryBuilder<DB, ExtractTableAlias<DB, TE>, ExtractTableAlias<DB, TE>, UpdateResult> : [
    TE
] extends [`${infer T} as ${infer A}`] ? T extends keyof DB ? UpdateQueryBuilder<DB & ShallowRecord<A, DB[T]>, A, A, UpdateResult> : never : TE extends ReadonlyArray<infer T> ? UpdateQueryBuilder<From<DB, T>, FromTables<DB, never, T>, FromTables<DB, never, T>, UpdateResult> : UpdateQueryBuilder<From<DB, TE>, FromTables<DB, never, TE>, FromTables<DB, never, TE>, UpdateResult>;

declare class MergeQueryBuilder<DB, TT extends keyof DB, O> implements MultiTableReturningInterface<DB, TT, O>, OutputInterface<DB, TT, O> {
    #private;
    constructor(props: MergeQueryBuilderProps);
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */
    modifyEnd(modifier: Expression<any>): MergeQueryBuilder<DB, TT, O>;
    /**
     * Changes a `merge into` query to an `merge top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Affect 5 matched rows at most:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(5)
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(5) into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     *
     * Affect 50% of matched rows:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(50, 'percent')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(50) percent into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    top(expression: number | bigint, modifiers?: 'percent'): MergeQueryBuilder<DB, TT, O>;
    /**
     * Adds the `using` clause to the query.
     *
     * This method is similar to {@link SelectQueryBuilder.innerJoin}, so see the
     * documentation for that method for more examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    using<TE extends TableExpression<DB, TT>, K1 extends JoinReferenceExpression<DB, TT, TE>, K2 extends JoinReferenceExpression<DB, TT, TE>>(sourceTable: TE, k1: K1, k2: K2): ExtractWheneableMergeQueryBuilder<DB, TT, TE, O>;
    using<TE extends TableExpression<DB, TT>, FN extends JoinCallbackExpression<DB, TT, TE>>(sourceTable: TE, callback: FN): ExtractWheneableMergeQueryBuilder<DB, TT, TE, O>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, last_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning((eb) => [
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     eb.selectFrom('pet').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     */
    returning<SE extends SelectExpression<DB, TT>>(selections: ReadonlyArray<SE>): MergeQueryBuilder<DB, TT, ReturningRow<DB, TT, O, SE>>;
    returning<CB extends SelectCallback<DB, TT>>(callback: CB): MergeQueryBuilder<DB, TT, ReturningCallbackRow<DB, TT, O, CB>>;
    returning<SE extends SelectExpression<DB, TT>>(selection: SE): MergeQueryBuilder<DB, TT, ReturningRow<DB, TT, O, SE>>;
    /**
     * Adds a `returning *` or `returning table.*` to an insert/update/delete/merge
     * query on databases that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll<T extends TT>(table: T): MergeQueryBuilder<DB, TT, ReturningAllRow<DB, T, O>>;
    returningAll(): MergeQueryBuilder<DB, TT, ReturningAllRow<DB, TT, O>>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like MS SQL Server (MSSQL), this method can be chained
     * to `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Also see the {@link outputAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .output('inserted.id')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender")
     * output "inserted"."id"
     * values (@1, @2, @3)
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { old_first_name, old_last_name, new_first_name, new_last_name } = await db
     *   .updateTable('person')
     *   .set({ first_name: 'John', last_name: 'Doe' })
     *   .output([
     *     'deleted.first_name as old_first_name',
     *     'deleted.last_name as old_last_name',
     *     'inserted.first_name as new_first_name',
     *     'inserted.last_name as new_last_name',
     *   ])
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = @1, "last_name" = @2
     * output "deleted"."first_name" as "old_first_name",
     *   "deleted"."last_name" as "old_last_name",
     *   "inserted"."first_name" as "new_first_name",
     *   "inserted"."last_name" as "new_last_name"
     * where "created_at" < @3
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { full_name } = await db
     *   .deleteFrom('person')
     *   .output((eb) => sql<string>`concat(${eb.ref('deleted.first_name')}, ' ', ${eb.ref('deleted.last_name')})`.as('full_name'))
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * delete from "person"
     * output concat("deleted"."first_name", ' ', "deleted"."last_name") as "full_name"
     * where "created_at" < @1
     * ```
     *
     * Return the action performed on the row:
     *
     * ```ts
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male'
     *   })
     *   .output([
     *     'inserted.id as inserted_id',
     *     'deleted.id as deleted_id',
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "pet"."owner_id" = "person"."id"
     * when matched then delete
     * when not matched then
     * insert ("first_name", "last_name", "gender")
     * values (@1, @2, @3)
     * output "inserted"."id" as "inserted_id", "deleted"."id" as "deleted_id"
     * ```
     *
     */
    output<OE extends OutputExpression<DB, TT>>(selections: readonly OE[]): MergeQueryBuilder<DB, TT, ReturningRow<DB, TT, O, SelectExpressionFromOutputExpression<OE>>>;
    output<CB extends OutputCallback<DB, TT>>(callback: CB): MergeQueryBuilder<DB, TT, ReturningRow<DB, TT, O, SelectExpressionFromOutputCallback<CB>>>;
    output<OE extends OutputExpression<DB, TT>>(selection: OE): MergeQueryBuilder<DB, TT, ReturningRow<DB, TT, O, SelectExpressionFromOutputExpression<OE>>>;
    /**
     * Adds an `output {prefix}.*` to an `insert`/`update`/`delete`/`merge` query on databases
     * that support `output` such as MS SQL Server (MSSQL).
     *
     * Also see the {@link output} method.
     */
    outputAll(table: OutputPrefix): MergeQueryBuilder<DB, TT, ReturningAllRow<DB, TT, O>>;
}
interface MergeQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: MergeQueryNode;
    readonly executor: QueryExecutor;
}
declare class WheneableMergeQueryBuilder<DB, TT extends keyof DB, ST extends keyof DB, O> implements Compilable<O>, MultiTableReturningInterface<DB, TT | ST, O>, OutputInterface<DB, TT, O>, OperationNodeSource {
    #private;
    constructor(props: MergeQueryBuilderProps);
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */
    modifyEnd(modifier: Expression<any>): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * See {@link MergeQueryBuilder.top}.
     */
    top(expression: number | bigint, modifiers?: 'percent'): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Adds a simple `when matched` clause to the query.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * For a simple `when not matched` clause, see {@link whenNotMatched}.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    whenMatched(): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT | ST, O>;
    /**
     * Adds the `when matched` clause to the query with an `and` condition.
     *
     * This method is similar to {@link SelectQueryBuilder.where}, so see the documentation
     * for that method for more examples.
     *
     * For a simple `when matched` clause (without an `and` condition) see {@link whenMatched}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatchedAnd('person.first_name', '=', 'John')
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched and "person"."first_name" = $1 then
     *   delete
     * ```
     */
    whenMatchedAnd<RE extends ReferenceExpression<DB, TT | ST>, VE extends OperandValueExpressionOrList<DB, TT | ST, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT | ST, O>;
    whenMatchedAnd<E extends ExpressionOrFactory<DB, TT | ST, SqlBool>>(expression: E): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT | ST, O>;
    /**
     * Adds the `when matched` clause to the query with an `and` condition. But unlike
     * {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */
    whenMatchedAndRef<LRE extends ReferenceExpression<DB, TT | ST>, RRE extends ReferenceExpression<DB, TT | ST>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT | ST, O>;
    /**
     * Adds a simple `when not matched` clause to the query.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * For a simple `when matched` clause, see {@link whenMatched}.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   insert ("first_name", "last_name") values ($1, $2)
     * ```
     */
    whenNotMatched(): NotMatchedThenableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Adds the `when not matched` clause to the query with an `and` condition.
     *
     * This method is similar to {@link SelectQueryBuilder.where}, so see the documentation
     * for that method for more examples.
     *
     * For a simple `when not matched` clause (without an `and` condition) see {@link whenNotMatched}.
     *
     * Unlike {@link whenMatchedAnd}, you cannot reference columns from the table merged into.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatchedAnd('pet.name', '=', 'Lucky')
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched and "pet"."name" = $1 then
     *   insert ("first_name", "last_name") values ($2, $3)
     * ```
     */
    whenNotMatchedAnd<RE extends ReferenceExpression<DB, ST>, VE extends OperandValueExpressionOrList<DB, ST, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): NotMatchedThenableMergeQueryBuilder<DB, TT, ST, O>;
    whenNotMatchedAnd<E extends ExpressionOrFactory<DB, ST, SqlBool>>(expression: E): NotMatchedThenableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Adds the `when not matched` clause to the query with an `and` condition. But unlike
     * {@link whenNotMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * Unlike {@link whenMatchedAndRef}, you cannot reference columns from the target table.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */
    whenNotMatchedAndRef<LRE extends ReferenceExpression<DB, ST>, RRE extends ReferenceExpression<DB, ST>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): NotMatchedThenableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Adds a simple `when not matched by source` clause to the query.
     *
     * Supported in MS SQL Server.
     *
     * Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySource(): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT, O>;
    /**
     * Adds the `when not matched by source` clause to the query with an `and` condition.
     *
     * Supported in MS SQL Server.
     *
     * Similar to {@link whenNotMatchedAnd}, but returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySourceAnd<RE extends ReferenceExpression<DB, TT>, VE extends OperandValueExpressionOrList<DB, TT, RE>>(lhs: RE, op: ComparisonOperatorExpression, rhs: VE): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT, O>;
    whenNotMatchedBySourceAnd<E extends ExpressionOrFactory<DB, TT, SqlBool>>(expression: E): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT, O>;
    /**
     * Adds the `when not matched by source` clause to the query with an `and` condition.
     *
     * Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
     * the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySourceAndRef<LRE extends ReferenceExpression<DB, TT>, RRE extends ReferenceExpression<DB, TT>>(lhs: LRE, op: ComparisonOperatorExpression, rhs: RRE): MatchedThenableMergeQueryBuilder<DB, TT, ST, TT, O>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, last_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning((eb) => [
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     eb.selectFrom('pet').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     */
    returning<SE extends SelectExpression<DB, TT | ST>>(selections: ReadonlyArray<SE>): WheneableMergeQueryBuilder<DB, TT, ST, ReturningRow<DB, TT | ST, O, SE>>;
    returning<CB extends SelectCallback<DB, TT | ST>>(callback: CB): WheneableMergeQueryBuilder<DB, TT, ST, ReturningCallbackRow<DB, TT | ST, O, CB>>;
    returning<SE extends SelectExpression<DB, TT | ST>>(selection: SE): WheneableMergeQueryBuilder<DB, TT, ST, ReturningRow<DB, TT | ST, O, SE>>;
    /**
     * Adds a `returning *` or `returning table.*` to an insert/update/delete/merge
     * query on databases that support `returning` such as PostgreSQL.
     *
     * Also see the {@link returning} method.
     */
    returningAll<T extends TT | ST>(table: T): WheneableMergeQueryBuilder<DB, TT, ST, ReturningAllRow<DB, T, O>>;
    returningAll(): WheneableMergeQueryBuilder<DB, TT, ST, ReturningAllRow<DB, TT | ST, O>>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like MS SQL Server (MSSQL), this method can be chained
     * to `insert`, `update`, `delete` and `merge` queries to return data.
     *
     * Also see the {@link outputAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .output('inserted.id')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     gender: 'female',
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender")
     * output "inserted"."id"
     * values (@1, @2, @3)
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { old_first_name, old_last_name, new_first_name, new_last_name } = await db
     *   .updateTable('person')
     *   .set({ first_name: 'John', last_name: 'Doe' })
     *   .output([
     *     'deleted.first_name as old_first_name',
     *     'deleted.last_name as old_last_name',
     *     'inserted.first_name as new_first_name',
     *     'inserted.last_name as new_last_name',
     *   ])
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = @1, "last_name" = @2
     * output "deleted"."first_name" as "old_first_name",
     *   "deleted"."last_name" as "old_last_name",
     *   "inserted"."first_name" as "new_first_name",
     *   "inserted"."last_name" as "new_last_name"
     * where "created_at" < @3
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { full_name } = await db
     *   .deleteFrom('person')
     *   .output((eb) => sql<string>`concat(${eb.ref('deleted.first_name')}, ' ', ${eb.ref('deleted.last_name')})`.as('full_name'))
     *   .where('created_at', '<', new Date())
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * delete from "person"
     * output concat("deleted"."first_name", ' ', "deleted"."last_name") as "full_name"
     * where "created_at" < @1
     * ```
     *
     * Return the action performed on the row:
     *
     * ```ts
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male'
     *   })
     *   .output([
     *     'inserted.id as inserted_id',
     *     'deleted.id as deleted_id',
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "pet"."owner_id" = "person"."id"
     * when matched then delete
     * when not matched then
     * insert ("first_name", "last_name", "gender")
     * values (@1, @2, @3)
     * output "inserted"."id" as "inserted_id", "deleted"."id" as "deleted_id"
     * ```
     *
     */
    output<OE extends OutputExpression<DB, TT>>(selections: readonly OE[]): WheneableMergeQueryBuilder<DB, TT, ST, ReturningRow<DB, TT, O, SelectExpressionFromOutputExpression<OE>>>;
    output<CB extends OutputCallback<DB, TT>>(callback: CB): WheneableMergeQueryBuilder<DB, TT, ST, ReturningRow<DB, TT, O, SelectExpressionFromOutputCallback<CB>>>;
    output<OE extends OutputExpression<DB, TT>>(selection: OE): WheneableMergeQueryBuilder<DB, TT, ST, ReturningRow<DB, TT, O, SelectExpressionFromOutputExpression<OE>>>;
    /**
     * Adds an `output {prefix}.*` to an `insert`/`update`/`delete`/`merge` query on databases
     * that support `output` such as MS SQL Server (MSSQL).
     *
     * Also see the {@link output} method.
     */
    outputAll(table: OutputPrefix): WheneableMergeQueryBuilder<DB, TT, ST, ReturningAllRow<DB, TT, O>>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.updateTable('person')
     *   .set({ first_name: 'John' })
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if<O2>(condition: boolean, func: (qb: this) => WheneableMergeQueryBuilder<any, any, any, O2>): O2 extends MergeResult ? WheneableMergeQueryBuilder<DB, TT, ST, MergeResult> : O2 extends O & infer E ? WheneableMergeQueryBuilder<DB, TT, ST, O & Partial<E>> : WheneableMergeQueryBuilder<DB, TT, ST, Partial<O2>>;
    toOperationNode(): MergeQueryNode;
    compile(): CompiledQuery<O>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<SimplifyResult<O>[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SimplifySingleResult<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor | ((node: QueryNode) => Error)): Promise<SimplifyResult<O>>;
}
declare class MatchedThenableMergeQueryBuilder<DB, TT extends keyof DB, ST extends keyof DB, UT extends TT | ST, O> {
    #private;
    constructor(props: MergeQueryBuilderProps);
    /**
     * Performs the `delete` action.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    thenDelete(): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   do nothing
     * ```
     */
    thenDoNothing(): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Perform an `update` operation with a full-fledged {@link UpdateQueryBuilder}.
     * This is handy when multiple `set` invocations are needed.
     *
     * For a shorthand version of this method, see {@link thenUpdateSet}.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenUpdate((ub) => ub
     *     .set(sql`metadata['has_pets']`, 'Y')
     *     .set({
     *       updated_at: new Date().toISOString(),
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   update set metadata['has_pets'] = $1, "updated_at" = $2
     * ```
     */
    thenUpdate<QB extends UpdateQueryBuilder<DB, TT, UT, never>>(set: (ub: QB) => QB): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Performs an `update set` action, similar to {@link UpdateQueryBuilder.set}.
     *
     * For a full-fledged update query builder, see {@link thenUpdate}.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenUpdateSet({
     *     middle_name: 'dog owner',
     *   })
     *   .execute()
     * ```
     *
     * The generate SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   update set "middle_name" = $1
     * ```
     */
    thenUpdateSet<UO extends UpdateObject<DB, UT, TT>>(update: UO): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    thenUpdateSet<U extends UpdateObjectFactory<DB, UT, TT>>(update: U): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    thenUpdateSet<RE extends ReferenceExpression<DB, TT>, VE extends ValueExpression<DB, UT, ExtractUpdateTypeFromReferenceExpression<DB, TT, RE>>>(key: RE, value: VE): WheneableMergeQueryBuilder<DB, TT, ST, O>;
}
declare class NotMatchedThenableMergeQueryBuilder<DB, TT extends keyof DB, ST extends keyof DB, O> {
    #private;
    constructor(props: MergeQueryBuilderProps);
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `insert` action, see {@link thenInsertValues}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   do nothing
     * ```
     */
    thenDoNothing(): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    /**
     * Performs the `insert (...) values` action.
     *
     * This method is similar to {@link InsertQueryBuilder.values}, so see the documentation
     * for that method for more examples.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   insert ("first_name", "last_name") values ($1, $2)
     * ```
     */
    thenInsertValues<I extends InsertObjectOrList<DB, TT>>(insert: I): WheneableMergeQueryBuilder<DB, TT, ST, O>;
    thenInsertValues<IO extends InsertObjectOrListFactory<DB, TT, ST>>(insert: IO): WheneableMergeQueryBuilder<DB, TT, ST, O>;
}
type ExtractWheneableMergeQueryBuilder<DB, TT extends keyof DB, TE extends TableExpression<DB, TT>, O> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? UsingBuilder<DB, TT, A, DB[T], O> : never : TE extends keyof DB ? WheneableMergeQueryBuilder<DB, TT, TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? UsingBuilder<DB, TT, QA, QO, O> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? UsingBuilder<DB, TT, QA, QO, O> : never;
type UsingBuilder<DB, TT extends keyof DB, A extends string, R, O> = A extends keyof DB ? WheneableMergeQueryBuilder<DB, TT, A, O> : WheneableMergeQueryBuilder<DB & ShallowRecord<A, R>, TT, A, O>;

type MergeInto<DB, TE extends SimpleTableReference<DB>> = [TE] extends [
    keyof DB
] ? MergeQueryBuilder<DB, ExtractTableAlias<DB, TE>, MergeResult> : [TE] extends [`${infer T} as ${infer A}`] ? T extends keyof DB ? MergeQueryBuilder<DB & ShallowRecord<A, DB[T]>, A, MergeResult> : never : never;

declare class QueryCreator<DB> {
    #private;
    constructor(props: QueryCreatorProps);
    /**
     * Creates a `select` query builder for the given table or tables.
     *
     * The tables passed to this method are built as the query's `from` clause.
     *
     * ### Examples
     *
     * Create a select query for one table:
     *
     * ```ts
     * db.selectFrom('person').selectAll()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     *
     * Create a select query for one table with an alias:
     *
     * ```ts
     * const persons = await db.selectFrom('person as p')
     *   .select(['p.id', 'first_name'])
     *   .execute()
     *
     * console.log(persons[0].id)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."id", "first_name" from "person" as "p"
     * ```
     *
     * Create a select query from a subquery:
     *
     * ```ts
     * const persons = await db.selectFrom(
     *     (eb) => eb.selectFrom('person').select('person.id as identifier').as('p')
     *   )
     *   .select('p.identifier')
     *   .execute()
     *
     * console.log(persons[0].identifier)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."identifier",
     * from (
     *   select "person"."id" as "identifier" from "person"
     * ) as p
     * ```
     *
     * Create a select query from raw sql:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db
     *   .selectFrom(sql<{ one: number }>`(select 1 as one)`.as('q'))
     *   .select('q.one')
     *   .execute()
     *
     * console.log(items[0].one)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "q"."one",
     * from (
     *   select 1 as one
     * ) as q
     * ```
     *
     * When you use the `sql` tag you need to also provide the result type of the
     * raw snippet / query so that Kysely can figure out what columns are
     * available for the rest of the query.
     *
     * The `selectFrom` method also accepts an array for multiple tables. All
     * the above examples can also be used in an array.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db.selectFrom([
     *     'person as p',
     *     db.selectFrom('pet').select('pet.species').as('a'),
     *     sql<{ one: number }>`(select 1 as one)`.as('q')
     *   ])
     *   .select(['p.id', 'a.species', 'q.one'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p".id, "a"."species", "q"."one"
     * from
     *   "person" as "p",
     *   (select "pet"."species" from "pet") as a,
     *   (select 1 as one) as "q"
     * ```
     */
    selectFrom<TE extends TableExpressionOrList<DB, never>>(from: TE): SelectFrom<DB, never, TE>;
    /**
     * Creates a `select` query builder without a `from` clause.
     *
     * If you want to create a `select from` query, use the `selectFrom` method instead.
     * This one can be used to create a plain `select` statement without a `from` clause.
     *
     * This method accepts the same inputs as {@link SelectQueryBuilder.select}. See its
     * documentation for more examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.selectNoFrom((eb) => [
     *   eb.selectFrom('person')
     *     .select('id')
     *     .where('first_name', '=', 'Jennifer')
     *     .limit(1)
     *     .as('jennifer_id'),
     *   eb.selectFrom('pet')
     *     .select('id')
     *     .where('name', '=', 'Doggo')
     *     .limit(1)
     *     .as('doggo_id')
     * ])
     * .executeTakeFirstOrThrow()
     *
     * console.log(result.jennifer_id)
     * console.log(result.doggo_id)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select (
     *   select "id"
     *   from "person"
     *   where "first_name" = $1
     *   limit $2
     * ) as "jennifer_id", (
     *   select "id"
     *   from "pet"
     *   where "name" = $3
     *   limit $4
     * ) as "doggo_id"
     * ```
     */
    selectNoFrom<SE extends SelectExpression<DB, never>>(selections: ReadonlyArray<SE>): SelectQueryBuilder<DB, never, Selection<DB, never, SE>>;
    selectNoFrom<CB extends SelectCallback<DB, never>>(callback: CB): SelectQueryBuilder<DB, never, CallbackSelection<DB, never, CB>>;
    selectNoFrom<SE extends SelectExpression<DB, never>>(selection: SE): SelectQueryBuilder<DB, never, Selection<DB, never, SE>>;
    /**
     * Creates an insert query.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
     * the {@link ReturningInterface.returning | returning} method for a way to return columns
     * on supported databases like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * Some databases like PostgreSQL support the `returning` method:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     */
    insertInto<T extends keyof DB & string>(table: T): InsertQueryBuilder<DB, T, InsertResult>;
    /**
     * Creates a "replace into" query.
     *
     * This is only supported by some dialects like MySQL or SQLite.
     *
     * Similar to MySQL's {@link InsertQueryBuilder.onDuplicateKeyUpdate} that deletes
     * and inserts values on collision instead of updating existing rows.
     *
     * An alias of SQLite's {@link InsertQueryBuilder.orReplace}.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .replaceInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirstOrThrow()
     *
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * replace into `person` (`first_name`, `last_name`) values (?, ?)
     * ```
     */
    replaceInto<T extends keyof DB & string>(table: T): InsertQueryBuilder<DB, T, InsertResult>;
    /**
     * Creates a delete query.
     *
     * See the {@link DeleteQueryBuilder.where} method for examples on how to specify
     * a where clause for the delete operation.
     *
     * The return value of the query is an instance of {@link DeleteResult}.
     *
     * ### Examples
     *
     * <!-- siteExample("delete", "Single row", 10) -->
     *
     * Delete a single row:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('person')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numDeletedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * delete from "person" where "person"."id" = $1
     * ```
     *
     * Some databases such as MySQL support deleting from multiple tables:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom(['person', 'pet'])
     *   .using('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`, `pet`
     * using `person`
     * inner join `pet` on `pet`.`owner_id` = `person`.`id`
     * where `person`.`id` = ?
     * ```
     */
    deleteFrom<TE extends TableExpressionOrList<DB, never>>(from: TE): DeleteFrom<DB, TE>;
    /**
     * Creates an update query.
     *
     * See the {@link UpdateQueryBuilder.where} method for examples on how to specify
     * a where clause for the update operation.
     *
     * See the {@link UpdateQueryBuilder.set} method for examples on how to
     * specify the updates.
     *
     * The return value of the query is an {@link UpdateResult}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set({ first_name: 'Jennifer' })
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     */
    updateTable<TE extends TableExpressionOrList<DB, never>>(tables: TE): UpdateTable<DB, TE>;
    /**
     * Creates a merge query.
     *
     * The return value of the query is a {@link MergeResult}.
     *
     * See the {@link MergeQueryBuilder.using} method for examples on how to specify
     * the other table.
     *
     * ### Examples
     *
     * <!-- siteExample("merge", "Source row existence", 10) -->
     *
     * Update a target column based on the existence of a source row:
     *
     * ```ts
     * const result = await db
     *   .mergeInto('person as target')
     *   .using('pet as source', 'source.owner_id', 'target.id')
     *   .whenMatchedAnd('target.has_pets', '!=', 'Y')
     *   .thenUpdateSet({ has_pets: 'Y' })
     *   .whenNotMatchedBySourceAnd('target.has_pets', '=', 'Y')
     *   .thenUpdateSet({ has_pets: 'N' })
     *   .executeTakeFirstOrThrow()
     *
     * console.log(result.numChangedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet"
     * on "pet"."owner_id" = "person"."id"
     * when matched and "has_pets" != $1
     * then update set "has_pets" = $2
     * when not matched by source and "has_pets" = $3
     * then update set "has_pets" = $4
     * ```
     *
     * <!-- siteExample("merge", "Temporary changes table", 20) -->
     *
     * Merge new entries from a temporary changes table:
     *
     * ```ts
     * const result = await db
     *   .mergeInto('wine as target')
     *   .using(
     *     'wine_stock_change as source',
     *     'source.wine_name',
     *     'target.name',
     *   )
     *   .whenNotMatchedAnd('source.stock_delta', '>', 0)
     *   .thenInsertValues(({ ref }) => ({
     *     name: ref('source.wine_name'),
     *     stock: ref('source.stock_delta'),
     *   }))
     *   .whenMatchedAnd(
     *     (eb) => eb('target.stock', '+', eb.ref('source.stock_delta')),
     *     '>',
     *     0,
     *   )
     *   .thenUpdateSet('stock', (eb) =>
     *     eb('target.stock', '+', eb.ref('source.stock_delta')),
     *   )
     *   .whenMatched()
     *   .thenDelete()
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "wine" as "target"
     * using "wine_stock_change" as "source"
     * on "source"."wine_name" = "target"."name"
     * when not matched and "source"."stock_delta" > $1
     * then insert ("name", "stock") values ("source"."wine_name", "source"."stock_delta")
     * when matched and "target"."stock" + "source"."stock_delta" > $2
     * then update set "stock" = "target"."stock" + "source"."stock_delta"
     * when matched
     * then delete
     * ```
     */
    mergeInto<TR extends SimpleTableReference<DB>>(targetTable: TR): MergeInto<DB, TR>;
    /**
     * Creates a `with` query (Common Table Expression).
     *
     * ### Examples
     *
     * <!-- siteExample("cte", "Simple selects", 10) -->
     *
     * Common table expressions (CTE) are a great way to modularize complex queries.
     * Essentially they allow you to run multiple separate queries within a
     * single roundtrip to the DB.
     *
     * Since CTEs are a part of the main query, query optimizers inside DB
     * engines are able to optimize the overall query. For example, postgres
     * is able to inline the CTEs inside the using queries if it decides it's
     * faster.
     *
     * ```ts
     * const result = await db
     *   // Create a CTE called `jennifers` that selects all
     *   // persons named 'Jennifer'.
     *   .with('jennifers', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     .select(['id', 'age'])
     *   )
     *   // Select all rows from the `jennifers` CTE and
     *   // further filter it.
     *   .with('adult_jennifers', (db) => db
     *     .selectFrom('jennifers')
     *     .where('age', '>', 18)
     *     .select(['id', 'age'])
     *   )
     *   // Finally select all adult jennifers that are
     *   // also younger than 60.
     *   .selectFrom('adult_jennifers')
     *   .where('age', '<', 60)
     *   .selectAll()
     *   .execute()
     * ```
     *
     * <!-- siteExample("cte", "Inserts, updates and deletions", 20) -->
     *
     * Some databases like postgres also allow you to run other queries than selects
     * in CTEs. On these databases CTEs are extremely powerful:
     *
     * ```ts
     * const result = await db
     *   .with('new_person', (db) => db
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       age: 35,
     *     })
     *     .returning('id')
     *   )
     *   .with('new_pet', (db) => db
     *     .insertInto('pet')
     *     .values({
     *       name: 'Doggo',
     *       species: 'dog',
     *       is_favorite: true,
     *       // Use the id of the person we just inserted.
     *       owner_id: db
     *         .selectFrom('new_person')
     *         .select('id')
     *     })
     *     .returning('id')
     *   )
     *   .selectFrom(['new_person', 'new_pet'])
     *   .select([
     *     'new_person.id as person_id',
     *     'new_pet.id as pet_id'
     *   ])
     *   .execute()
     * ```
     *
     * The CTE name can optionally specify column names in addition to
     * a name. In that case Kysely requires the expression to retun
     * rows with the same columns.
     *
     * ```ts
     * await db
     *   .with('jennifers(id, age)', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     // This is ok since we return columns with the same
     *     // names as specified by `jennifers(id, age)`.
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The first argument can also be a callback. The callback is passed
     * a `CTEBuilder` instance that can be used to configure the CTE:
     *
     * ```ts
     * await db
     *   .with(
     *     (cte) => cte('jennifers').materialized(),
     *     (db) => db
     *       .selectFrom('person')
     *       .where('first_name', '=', 'Jennifer')
     *       .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     */
    with<N extends string, E extends CommonTableExpression<DB, N>>(nameOrBuilder: N | CTEBuilderCallback<N>, expression: E): QueryCreatorWithCommonTableExpression<DB, N, E>;
    /**
     * Creates a recursive `with` query (Common Table Expression).
     *
     * Note that recursiveness is a property of the whole `with` statement.
     * You cannot have recursive and non-recursive CTEs in a same `with` statement.
     * Therefore the recursiveness is determined by the **first** `with` or
     * `withRecusive` call you make.
     *
     * See the {@link with} method for examples and more documentation.
     */
    withRecursive<N extends string, E extends RecursiveCommonTableExpression<DB, N>>(nameOrBuilder: N | CTEBuilderCallback<N>, expression: E): QueryCreatorWithCommonTableExpression<DB, N, E>;
    /**
     * Returns a copy of this query creator instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): QueryCreator<DB>;
    /**
     * Returns a copy of this query creator instance without any plugins.
     */
    withoutPlugins(): QueryCreator<DB>;
    /**
     * Sets the schema to be used for all table references that don't explicitly
     * specify a schema.
     *
     * This only affects the query created through the builder returned from
     * this method and doesn't modify the `db` instance.
     *
     * See [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0007-schemas.md)
     * for a more detailed explanation.
     *
     * ### Examples
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet')
     *   .selectAll()
     *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "mammals"."pet"
     * inner join "public"."person"
     * on "public"."person"."id" = "mammals"."pet"."owner_id"
     * ```
     *
     * `withSchema` is smart enough to not add schema for aliases,
     * common table expressions or other places where the schema
     * doesn't belong to:
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet as p')
     *   .select('p.name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."name" from "mammals"."pet" as "p"
     * ```
     */
    withSchema(schema: string): QueryCreator<DB>;
}
interface QueryCreatorProps {
    readonly executor: QueryExecutor;
    readonly withNode?: WithNode;
}

declare const LOG_LEVELS: readonly ["query", "error"];
type LogLevel = ArrayItemType<typeof LOG_LEVELS>;
interface QueryLogEvent {
    readonly level: 'query';
    readonly isStream?: boolean;
    readonly query: CompiledQuery;
    readonly queryDurationMillis: number;
}
interface ErrorLogEvent {
    readonly level: 'error';
    readonly error: unknown;
    readonly query: CompiledQuery;
    readonly queryDurationMillis: number;
}
type LogEvent = QueryLogEvent | ErrorLogEvent;
type Logger = (event: LogEvent) => void | Promise<void>;
type LogConfig = ReadonlyArray<LogLevel> | Logger;
declare class Log {
    #private;
    constructor(config: LogConfig);
    isLevelEnabled(level: LogLevel): boolean;
    query(getEvent: () => QueryLogEvent): Promise<void>;
    error(getEvent: () => ErrorLogEvent): Promise<void>;
}

type RollbackToSavepoint<S extends string[], SN extends S[number]> = S extends [...infer L, infer R] ? R extends SN ? S : RollbackToSavepoint<L extends string[] ? L : never, SN> : never;
type ReleaseSavepoint<S extends string[], SN extends S[number]> = S extends [...infer L, infer R] ? R extends SN ? L : ReleaseSavepoint<L extends string[] ? L : never, SN> : never;

interface ControlledConnection {
    readonly connection: DatabaseConnection;
    readonly release: () => void;
}

declare global {
    interface AsyncDisposable {
    }
}
/**
 * The main Kysely class.
 *
 * You should create one instance of `Kysely` per database using the {@link Kysely}
 * constructor. Each `Kysely` instance maintains its own connection pool.
 *
 * ### Examples
 *
 * This example assumes your database has a "person" table:
 *
 * ```ts
 * import * as Sqlite from 'better-sqlite3'
 * import { type Generated, Kysely, SqliteDialect } from 'kysely'
 *
 * interface Database {
 *   person: {
 *     id: Generated<number>
 *     first_name: string
 *     last_name: string | null
 *   }
 * }
 *
 * const db = new Kysely<Database>({
 *   dialect: new SqliteDialect({
 *     database: new Sqlite(':memory:'),
 *   })
 * })
 * ```
 *
 * @typeParam DB - The database interface type. Keys of this type must be table names
 *    in the database and values must be interfaces that describe the rows in those
 *    tables. See the examples above.
 */
declare class Kysely<DB> extends QueryCreator<DB> implements QueryExecutorProvider, AsyncDisposable {
    #private;
    constructor(args: KyselyConfig);
    constructor(args: KyselyProps);
    /**
     * Returns the {@link SchemaModule} module for building database schema.
     */
    get schema(): SchemaModule;
    /**
     * Returns a the {@link DynamicModule} module.
     *
     * The {@link DynamicModule} module can be used to bypass strict typing and
     * passing in dynamic values for the queries.
     */
    get dynamic(): DynamicModule<DB>;
    /**
     * Returns a {@link DatabaseIntrospector | database introspector}.
     */
    get introspection(): DatabaseIntrospector;
    /**
     * Creates a `case` statement/operator.
     *
     * See {@link ExpressionBuilder.case} for more information.
     */
    case(): CaseBuilder<DB, keyof DB>;
    case<V>(value: Expression<V>): CaseBuilder<DB, keyof DB, V>;
    /**
     * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
     * calls.
     *
     * ```ts
     * const { count } = db.fn
     *
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'id',
     *     count('pet.id').as('person_count'),
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "person_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     *
     * Why "somewhat" type-safe? Because the function calls are not bound to the
     * current query context. They allow you to reference columns and tables that
     * are not in the current query. E.g. remove the `innerJoin` from the previous
     * query and TypeScript won't even complain.
     *
     * If you want to make the function calls fully type-safe, you can use the
     * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => [
     *     'person.id',
     *     eb.fn.count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
     *   .execute()
     * ```
     */
    get fn(): FunctionModule<DB, keyof DB>;
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws an exception,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * To run a controlled transaction, allowing you to commit and rollback manually,
     * use {@link startTransaction} instead.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Simple transaction", 10) -->
     *
     * This example inserts two rows in a transaction. If an exception is thrown inside
     * the callback passed to the `execute` method,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     *
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    transaction(): TransactionBuilder<DB>;
    /**
     * Creates a {@link ControlledTransactionBuilder} that can be used to run queries inside a controlled transaction.
     *
     * The returned {@link ControlledTransactionBuilder} can be used to configure the transaction.
     * The {@link ControlledTransactionBuilder.execute} method can then be called
     * to start the transaction and return a {@link ControlledTransaction}.
     *
     * A {@link ControlledTransaction} allows you to commit and rollback manually,
     * execute savepoint commands. It extends {@link Transaction} which extends {@link Kysely},
     * so you can run queries inside the transaction. Once the transaction is committed,
     * or rolled back, it can't be used anymore - all queries will throw an error.
     * This is to prevent accidentally running queries outside the transaction - where
     * atomicity is not guaranteed anymore.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Controlled transaction", 11) -->
     *
     * A controlled transaction allows you to commit and rollback manually, execute
     * savepoint commands, and queries in general.
     *
     * In this example we start a transaction, use it to insert two rows and then commit
     * the transaction. If an error is thrown, we catch it and rollback the transaction.
     *
     * ```ts
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   const catto = await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirstOrThrow()
     *
     *   await trx.commit().execute()
     *
     *   // ...
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     * ```
     *
     * <!-- siteExample("transactions", "Controlled transaction /w savepoints", 12) -->
     *
     * A controlled transaction allows you to commit and rollback manually, execute
     * savepoint commands, and queries in general.
     *
     * In this example we start a transaction, insert a person, create a savepoint,
     * try inserting a toy and a pet, and if an error is thrown, we rollback to the
     * savepoint. Eventually we release the savepoint, insert an audit record and
     * commit the transaction. If an error is thrown, we catch it and rollback the
     * transaction.
     *
     * ```ts
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   const jennifer = await trx
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     *   try {
     *     const catto = await trxAfterJennifer
     *       .insertInto('pet')
     *       .values({
     *         owner_id: jennifer.id,
     *         name: 'Catto',
     *         species: 'cat',
     *       })
     *       .returning('id')
     *       .executeTakeFirstOrThrow()
     *
     *     await trxAfterJennifer
     *       .insertInto('toy')
     *       .values({ name: 'Bone', price: 1.99, pet_id: catto.id })
     *       .execute()
     *   } catch (error) {
     *     await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     *   }
     *
     *   await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
     *
     *   await trx.insertInto('audit').values({ action: 'added Jennifer' }).execute()
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     * ```
     */
    startTransaction(): ControlledTransactionBuilder<DB>;
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    connection(): ConnectionBuilder<DB>;
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): Kysely<DB>;
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins(): Kysely<DB>;
    /**
     * @override
     */
    withSchema(schema: string): Kysely<DB>;
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables<T extends Record<string, Record<string, any>>>(): Kysely<DrainOuterGeneric<DB & T>>;
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    destroy(): Promise<void>;
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction(): boolean;
    /**
     * @internal
     * @private
     */
    getExecutor(): QueryExecutor;
    /**
     * Executes a given compiled query or query builder.
     *
     * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
     */
    executeQuery<R>(query: CompiledQuery<R> | Compilable<R>, queryId?: QueryId): Promise<QueryResult<R>>;
    [Symbol.asyncDispose](): Promise<void>;
}
declare class Transaction<DB> extends Kysely<DB> {
    #private;
    constructor(props: KyselyProps);
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction(): true;
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws an exception,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * To run a controlled transaction, allowing you to commit and rollback manually,
     * use {@link startTransaction} instead.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Simple transaction", 10) -->
     *
     * This example inserts two rows in a transaction. If an exception is thrown inside
     * the callback passed to the `execute` method,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     *
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    transaction(): TransactionBuilder<DB>;
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    connection(): ConnectionBuilder<DB>;
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    destroy(): Promise<void>;
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): Transaction<DB>;
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins(): Transaction<DB>;
    /**
     * @override
     */
    withSchema(schema: string): Transaction<DB>;
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables<T extends Record<string, Record<string, any>>>(): Transaction<DrainOuterGeneric<DB & T>>;
}
interface KyselyProps {
    readonly config: KyselyConfig;
    readonly driver: Driver;
    readonly executor: QueryExecutor;
    readonly dialect: Dialect;
}
declare function isKyselyProps(obj: unknown): obj is KyselyProps;
interface KyselyConfig {
    readonly dialect: Dialect;
    readonly plugins?: KyselyPlugin[];
    /**
     * A list of log levels to log or a custom logger function.
     *
     * Currently there's only two levels: `query` and `error`.
     * This will be expanded based on user feedback later.
     *
     * ### Examples
     *
     * Setting up built-in logging for preferred log levels:
     *
     * ```ts
     * import * as Sqlite from 'better-sqlite3'
     * import { Kysely, SqliteDialect } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const db = new Kysely<Database>({
     *   dialect: new SqliteDialect({
     *     database: new Sqlite(':memory:'),
     *   }),
     *   log: ['query', 'error']
     * })
     * ```
     *
     * Setting up custom logging:
     *
     * ```ts
     * import * as Sqlite from 'better-sqlite3'
     * import { Kysely, SqliteDialect } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const db = new Kysely<Database>({
     *   dialect: new SqliteDialect({
     *     database: new Sqlite(':memory:'),
     *   }),
     *   log(event): void {
     *     if (event.level === 'query') {
     *       console.log(event.query.sql)
     *       console.log(event.query.parameters)
     *     }
     *   }
     * })
     * ```
     */
    readonly log?: LogConfig;
}
declare class ConnectionBuilder<DB> {
    #private;
    constructor(props: ConnectionBuilderProps);
    execute<T>(callback: (db: Kysely<DB>) => Promise<T>): Promise<T>;
}
interface ConnectionBuilderProps extends KyselyProps {
}
declare class TransactionBuilder<DB> {
    #private;
    constructor(props: TransactionBuilderProps);
    setAccessMode(accessMode: AccessMode): TransactionBuilder<DB>;
    setIsolationLevel(isolationLevel: IsolationLevel): TransactionBuilder<DB>;
    execute<T>(callback: (trx: Transaction<DB>) => Promise<T>): Promise<T>;
}
interface TransactionBuilderProps extends KyselyProps {
    readonly accessMode?: AccessMode;
    readonly isolationLevel?: IsolationLevel;
}
declare class ControlledTransactionBuilder<DB> {
    #private;
    constructor(props: TransactionBuilderProps);
    setAccessMode(accessMode: AccessMode): ControlledTransactionBuilder<DB>;
    setIsolationLevel(isolationLevel: IsolationLevel): ControlledTransactionBuilder<DB>;
    execute(): Promise<ControlledTransaction<DB>>;
}
declare class ControlledTransaction<DB, S extends string[] = []> extends Transaction<DB> {
    #private;
    constructor(props: ControlledTransactionProps);
    get isCommitted(): boolean;
    get isRolledBack(): boolean;
    /**
     * Commits the transaction.
     *
     * See {@link rollback}.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   await doSomething(trx)
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     *
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    commit(): Command<void>;
    /**
     * Rolls back the transaction.
     *
     * See {@link commit} and {@link rollbackToSavepoint}.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   await doSomething(trx)
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     *
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    rollback(): Command<void>;
    /**
     * Creates a savepoint with a given name.
     *
     * See {@link rollbackToSavepoint} and {@link releaseSavepoint}.
     *
     * For a type-safe experience, you should use the returned instance from now on.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    savepoint<SN extends string>(savepointName: SN extends S ? never : SN): Command<ControlledTransaction<DB, [...S, SN]>>;
    /**
     * Rolls back to a savepoint with a given name.
     *
     * See {@link savepoint} and {@link releaseSavepoint}.
     *
     * You must use the same instance returned by {@link savepoint}, or
     * escape the type-check by using `as any`.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    rollbackToSavepoint<SN extends S[number]>(savepointName: SN): RollbackToSavepoint<S, SN> extends string[] ? Command<ControlledTransaction<DB, RollbackToSavepoint<S, SN>>> : never;
    /**
     * Releases a savepoint with a given name.
     *
     * See {@link savepoint} and {@link rollbackToSavepoint}.
     *
     * You must use the same instance returned by {@link savepoint}, or
     * escape the type-check by using `as any`.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
     *
     * await doSomethingElse(trx)
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * async function doSomethingElse(kysely: Kysely<Database>) {}
     * ```
     */
    releaseSavepoint<SN extends S[number]>(savepointName: SN): ReleaseSavepoint<S, SN> extends string[] ? Command<ControlledTransaction<DB, ReleaseSavepoint<S, SN>>> : never;
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): ControlledTransaction<DB, S>;
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins(): ControlledTransaction<DB, S>;
    /**
     * @override
     */
    withSchema(schema: string): ControlledTransaction<DB, S>;
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables<T extends Record<string, Record<string, any>>>(): ControlledTransaction<DrainOuterGeneric<DB & T>, S>;
}
interface ControlledTransactionProps extends KyselyProps {
    readonly connection: ControlledConnection;
}
declare class Command<T> {
    #private;
    constructor(cb: () => Promise<T>);
    /**
     * Executes the command.
     */
    execute(): Promise<T>;
}

export { CreateSchemaNode as $, AliasNode as A, DropIndexNode as B, CompiledQuery as C, type DialectAdapter as D, PrimaryKeyConstraintNode as E, FromNode as F, GroupByNode as G, UniqueConstraintNode as H, InsertQueryNode as I, JoinNode as J, type KyselyPlugin as K, LimitNode as L, ReferencesNode as M, CheckConstraintNode as N, type OperationNode as O, ParensNode as P, type QueryExecutor as Q, type RawBuilder as R, SelectQueryNode as S, TableNode as T, UpdateQueryNode as U, ValueListNode as V, WhereNode as W, WithNode as X, CommonTableExpressionNode as Y, CommonTableExpressionNameNode as Z, HavingNode as _, type RootOperationNode as a, DeleteResult as a$, DropSchemaNode as a0, AlterTableNode as a1, DropColumnNode as a2, RenameColumnNode as a3, AlterColumnNode as a4, ModifyColumnNode as a5, AddConstraintNode as a6, DropConstraintNode as a7, RenameConstraintNode as a8, ForeignKeyConstraintNode as a9, JSONPathLegNode as aA, JSONOperatorChainNode as aB, MergeQueryNode as aC, AddIndexNode as aD, FetchNode as aE, TopNode as aF, OutputNode as aG, OrActionNode as aH, CollateNode as aI, type AlterTableColumnAlterationNode as aJ, type Driver as aK, Kysely as aL, type MigrationLockOptions as aM, type Dialect as aN, type DatabaseIntrospector as aO, type SchemaMetadata as aP, type DatabaseMetadataOptions as aQ, type TableMetadata as aR, type DatabaseMetadata as aS, type TransactionSettings as aT, type KyselyTypeError as aU, type PluginTransformQueryArgs as aV, type PluginTransformResultArgs as aW, type UnknownRow as aX, type Compilable as aY, InsertResult as aZ, UpdateResult as a_, DataTypeNode as aa, SelectAllNode as ab, IdentifierNode as ac, SchemableIdentifierNode as ad, ValueNode as ae, OperatorNode as af, CreateViewNode as ag, RefreshMaterializedViewNode as ah, DropViewNode as ai, GeneratedNode as aj, DefaultValueNode as ak, OnNode as al, SelectModifierNode as am, CreateTypeNode as an, DropTypeNode as ao, ExplainNode as ap, AggregateFunctionNode as aq, OverNode as ar, PartitionByNode as as, PartitionByItemNode as at, SetOperationNode as au, UsingNode as av, CaseNode as aw, WhenNode as ax, JSONReferenceNode as ay, JSONPathNode as az, type QueryId as b, type AliasedExpression as b$, MergeResult as b0, type Simplify as b1, type ExpressionOrFactory as b2, type ExpressionBuilder as b3, expressionBuilder as b4, type AnyAliasedColumn as b5, type AnyAliasedColumnWithTable as b6, type AnyColumn as b7, type AnyColumnWithTable as b8, type Equals as b9, type JoinCallbackExpression as bA, type InsertObject as bB, type UpdateObject as bC, type OrderByExpression as bD, type OrderByDirectionExpression as bE, type OrderByModifiers as bF, type OrderByDirection as bG, type OrderByModifiersCallbackExpression as bH, type ComparisonOperatorExpression as bI, type OperandValueExpression as bJ, type OperandValueExpressionOrList as bK, type FilterObject as bL, type OperandExpression as bM, type Collation as bN, Transaction as bO, type KyselyProps as bP, isKyselyProps as bQ, type KyselyConfig as bR, ConnectionBuilder as bS, TransactionBuilder as bT, ControlledTransactionBuilder as bU, ControlledTransaction as bV, Command as bW, QueryCreator as bX, type QueryCreatorProps as bY, type Expression as bZ, type AliasableExpression as b_, type SqlBool as ba, type Nullable as bb, type NumbersWhenDataTypeNotAvailable as bc, type NotNull$1 as bd, type NumericString as be, type ShallowDehydrateObject as bf, type ShallowDehydrateValue as bg, type StringsWhenDataTypeNotAvailable as bh, createQueryId as bi, type SelectExpression as bj, type SelectCallback as bk, type SelectArg as bl, type Selection as bm, type CallbackSelection as bn, type ReferenceExpression as bo, type ReferenceExpressionOrList as bp, type SimpleReferenceExpression as bq, type StringReference as br, type ExtractTypeFromStringReference as bs, type ExtractTypeFromReferenceExpression as bt, type ValueExpression as bu, type ValueExpressionOrList as bv, type SimpleTableReference as bw, type TableExpression as bx, type TableExpressionOrList as by, type JoinReferenceExpression as bz, type DatabaseConnection as c, AliasedJSONPathBuilder as c$, isExpression as c0, isAliasedExpression as c1, ExpressionWrapper as c2, AliasedExpressionWrapper as c3, OrWrapper as c4, AndWrapper as c5, type WhereInterface as c6, type ReturningInterface as c7, type MultiTableReturningInterface as c8, type OutputInterface as c9, type DeleteQueryBuilderWithInnerJoin as cA, type DeleteQueryBuilderWithLeftJoin as cB, type DeleteQueryBuilderWithRightJoin as cC, type DeleteQueryBuilderWithFullJoin as cD, type NoResultErrorConstructor as cE, NoResultError as cF, isNoResultErrorConstructor as cG, JoinBuilder as cH, type JoinBuilderProps as cI, type FunctionModule as cJ, createFunctionModule as cK, OnConflictBuilder as cL, type OnConflictBuilderProps as cM, type OnConflictDatabase as cN, type OnConflictTables as cO, OnConflictDoNothingBuilder as cP, OnConflictUpdateBuilder as cQ, AggregateFunctionBuilder as cR, AliasedAggregateFunctionBuilder as cS, type AggregateFunctionBuilderProps as cT, type OverBuilderCallback as cU, CaseBuilder as cV, CaseThenBuilder as cW, CaseWhenBuilder as cX, CaseEndBuilder as cY, JSONPathBuilder as cZ, TraversedJSONPathBuilder as c_, type OutputPrefix as ca, type OutputDatabase as cb, type OutputExpression as cc, type OutputCallback as cd, type SelectExpressionFromOutputExpression as ce, type SelectExpressionFromOutputCallback as cf, type HavingInterface as cg, type OrderByInterface as ch, type SelectQueryBuilder as ci, createSelectQueryBuilder as cj, type SelectQueryBuilderProps as ck, type AliasedSelectQueryBuilder as cl, type SelectQueryBuilderWithInnerJoin as cm, type SelectQueryBuilderWithLeftJoin as cn, type SelectQueryBuilderWithRightJoin as co, type SelectQueryBuilderWithFullJoin as cp, InsertQueryBuilder as cq, type InsertQueryBuilderProps as cr, UpdateQueryBuilder as cs, type UpdateQueryBuilderProps as ct, type UpdateQueryBuilderWithInnerJoin as cu, type UpdateQueryBuilderWithLeftJoin as cv, type UpdateQueryBuilderWithRightJoin as cw, type UpdateQueryBuilderWithFullJoin as cx, DeleteQueryBuilder as cy, type DeleteQueryBuilderProps as cz, type QueryResult as d, type IndexType as d$, MergeQueryBuilder as d0, type MergeQueryBuilderProps as d1, WheneableMergeQueryBuilder as d2, MatchedThenableMergeQueryBuilder as d3, NotMatchedThenableMergeQueryBuilder as d4, type ExtractWheneableMergeQueryBuilder as d5, OrderByItemBuilder as d6, type OrderByItemBuilderProps as d7, type RawBuilderProps as d8, createRawBuilder as d9, AlterTableBuilder as dA, type AlterTableBuilderProps as dB, type ColumnAlteringInterface as dC, AlterTableColumnAlteringBuilder as dD, type AlterTableColumnAlteringBuilderProps as dE, CreateViewBuilder as dF, type CreateViewBuilderProps as dG, RefreshMaterializedViewBuilder as dH, type RefreshMaterializedViewBuilderProps as dI, DropViewBuilder as dJ, type DropViewBuilderProps as dK, AlterColumnBuilder as dL, AlteredColumnBuilder as dM, type AlterColumnBuilderCallback as dN, DynamicModule as dO, TRANSACTION_ACCESS_MODES as dP, type AccessMode as dQ, TRANSACTION_ISOLATION_LEVELS as dR, type IsolationLevel as dS, validateTransactionSettings as dT, type ColumnMetadata as dU, type AddIndexNodeProps as dV, type AlterColumnNodeProps as dW, type AlterTableNodeTableProps as dX, type ColumnDefinitionNodeProps as dY, type ConstraintNode as dZ, type CreateIndexNodeProps as d_, type AliasedRawBuilder as da, type QueryExecutorProvider as db, SchemaModule as dc, CreateTableBuilder as dd, type CreateTableBuilderProps as de, type ColumnBuilderCallback as df, CreateTypeBuilder as dg, type CreateTypeBuilderProps as dh, DropTableBuilder as di, type DropTableBuilderProps as dj, DropTypeBuilder as dk, type DropTypeBuilderProps as dl, CreateIndexBuilder as dm, type CreateIndexBuilderProps as dn, DropIndexBuilder as dp, type DropIndexBuilderProps as dq, CreateSchemaBuilder as dr, type CreateSchemaBuilderProps as ds, DropSchemaBuilder as dt, type DropSchemaBuilderProps as du, ColumnDefinitionBuilder as dv, type ColumnDefinitionBuilderCallback as dw, type ForeignKeyConstraintBuilderInterface as dx, ForeignKeyConstraintBuilder as dy, type ForeignKeyConstraintBuilderCallback as dz, type ConnectionProvider as e, type SelectType as e$, type CreateSchemaNodeParams as e0, ON_COMMIT_ACTIONS as e1, type OnCommitAction as e2, type CreateTableNodeParams as e3, type CreateTypeNodeParams as e4, type CreateViewNodeParams as e5, type RefreshMaterializedViewNodeParams as e6, type ColumnDataType as e7, type DataTypeParams as e8, isColumnDataType as e9, type JSONOperator as eA, type JSONOperatorWith$ as eB, type BinaryOperator as eC, type UnaryOperator as eD, type UnaryFilterOperator as eE, type Operator as eF, isOperator as eG, isBinaryOperator as eH, isComparisonOperator as eI, isArithmeticOperator as eJ, isJSONOperator as eK, type OrderByItemNodeProps as eL, type PrimaryKeyConstraintNodeProps as eM, PrimaryConstraintNode as eN, QueryNode as eO, ON_MODIFY_FOREIGN_ACTIONS as eP, type OnModifyForeignAction as eQ, type SelectModifier as eR, type SetOperator as eS, type SimpleReferenceExpressionNode as eT, type TopModifier as eU, type UniqueConstraintNodeProps as eV, type WithNodeParams as eW, type ColumnType as eX, type Generated as eY, type GeneratedAlways as eZ, type JSONColumnType as e_, type DropConstraintNodeProps as ea, type DropIndexNodeProps as eb, type DropSchemaNodeParams as ec, type DropTablexNodeParams as ed, type DropTypeNodeParams as ee, type DropViewNodeParams as ef, type FetchModifier as eg, type ForeignKeyConstraintNodeProps as eh, type GeneratedNodeParams as ei, type InsertQueryNodeProps as ej, type JoinType as ek, type JSONPathLegType as el, type OnConflictNodeProps as em, type OnDuplicateKeyNodeProps as en, type OperationNodeSource as eo, isOperationNodeSource as ep, type OperationNodeKind as eq, COMPARISON_OPERATORS as er, ARITHMETIC_OPERATORS as es, JSON_OPERATORS as et, BINARY_OPERATORS as eu, UNARY_FILTER_OPERATORS as ev, UNARY_OPERATORS as ew, OPERATORS as ex, type ComparisonOperator as ey, type ArithmeticOperator as ez, type QueryCompiler as f, type InsertType as f0, type UpdateType as f1, type NullableInsertKeys as f2, type NonNullableInsertKeys as f3, type UpdateKeys as f4, type Selectable as f5, type Insertable as f6, type Updateable as f7, isCompilable as f8, type ExplainFormat as f9, type Explainable as fa, type Streamable as fb, LOG_LEVELS as fc, type LogLevel as fd, type QueryLogEvent as fe, type ErrorLogEvent as ff, type LogEvent as fg, type Logger as fh, type LogConfig as fi, Log as fj, type SelectQueryBuilderExpression as fk, SelectionNode as g, ColumnNode as h, ReferenceNode as i, AndNode as j, OrNode as k, RawNode as l, DeleteQueryNode as m, ReturningNode as n, CreateTableNode as o, AddColumnNode as p, ColumnDefinitionNode as q, DropTableNode as r, OrderByNode as s, OrderByItemNode as t, GroupByItemNode as u, ColumnUpdateNode as v, OffsetNode as w, OnConflictNode as x, OnDuplicateKeyNode as y, CreateIndexNode as z };
