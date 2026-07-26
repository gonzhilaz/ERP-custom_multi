
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model MasterUser
 * 
 */
export type MasterUser = $Result.DefaultSelection<Prisma.$MasterUserPayload>
/**
 * Model UserTenantAccess
 * 
 */
export type UserTenantAccess = $Result.DefaultSelection<Prisma.$UserTenantAccessPayload>
/**
 * Model HoldingConsolidatedLedger
 * 
 */
export type HoldingConsolidatedLedger = $Result.DefaultSelection<Prisma.$HoldingConsolidatedLedgerPayload>
/**
 * Model GlobalAuditLog
 * 
 */
export type GlobalAuditLog = $Result.DefaultSelection<Prisma.$GlobalAuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const IndustryType: {
  RETAIL: 'RETAIL',
  PRODUCTION_MANUFACTURING: 'PRODUCTION_MANUFACTURING',
  HOTEL_HOSPITALITY: 'HOTEL_HOSPITALITY',
  RESTAURANT_CATERING: 'RESTAURANT_CATERING',
  VENDOR_SUPPLIER: 'VENDOR_SUPPLIER',
  GOLD_MINING: 'GOLD_MINING',
  OTHER: 'OTHER'
};

export type IndustryType = (typeof IndustryType)[keyof typeof IndustryType]


export const TenantStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  MAINTENANCE: 'MAINTENANCE'
};

export type TenantStatus = (typeof TenantStatus)[keyof typeof TenantStatus]


export const UserSystemRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HOLDING_EXECUTIVE: 'HOLDING_EXECUTIVE',
  TENANT_USER: 'TENANT_USER'
};

export type UserSystemRole = (typeof UserSystemRole)[keyof typeof UserSystemRole]

}

export type IndustryType = $Enums.IndustryType

export const IndustryType: typeof $Enums.IndustryType

export type TenantStatus = $Enums.TenantStatus

export const TenantStatus: typeof $Enums.TenantStatus

export type UserSystemRole = $Enums.UserSystemRole

export const UserSystemRole: typeof $Enums.UserSystemRole

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs>;

  /**
   * `prisma.masterUser`: Exposes CRUD operations for the **MasterUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterUsers
    * const masterUsers = await prisma.masterUser.findMany()
    * ```
    */
  get masterUser(): Prisma.MasterUserDelegate<ExtArgs>;

  /**
   * `prisma.userTenantAccess`: Exposes CRUD operations for the **UserTenantAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTenantAccesses
    * const userTenantAccesses = await prisma.userTenantAccess.findMany()
    * ```
    */
  get userTenantAccess(): Prisma.UserTenantAccessDelegate<ExtArgs>;

  /**
   * `prisma.holdingConsolidatedLedger`: Exposes CRUD operations for the **HoldingConsolidatedLedger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HoldingConsolidatedLedgers
    * const holdingConsolidatedLedgers = await prisma.holdingConsolidatedLedger.findMany()
    * ```
    */
  get holdingConsolidatedLedger(): Prisma.HoldingConsolidatedLedgerDelegate<ExtArgs>;

  /**
   * `prisma.globalAuditLog`: Exposes CRUD operations for the **GlobalAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalAuditLogs
    * const globalAuditLogs = await prisma.globalAuditLog.findMany()
    * ```
    */
  get globalAuditLog(): Prisma.GlobalAuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    MasterUser: 'MasterUser',
    UserTenantAccess: 'UserTenantAccess',
    HoldingConsolidatedLedger: 'HoldingConsolidatedLedger',
    GlobalAuditLog: 'GlobalAuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "tenant" | "masterUser" | "userTenantAccess" | "holdingConsolidatedLedger" | "globalAuditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      MasterUser: {
        payload: Prisma.$MasterUserPayload<ExtArgs>
        fields: Prisma.MasterUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>
          }
          findFirst: {
            args: Prisma.MasterUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>
          }
          findMany: {
            args: Prisma.MasterUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>[]
          }
          create: {
            args: Prisma.MasterUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>
          }
          createMany: {
            args: Prisma.MasterUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>[]
          }
          delete: {
            args: Prisma.MasterUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>
          }
          update: {
            args: Prisma.MasterUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>
          }
          deleteMany: {
            args: Prisma.MasterUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MasterUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterUserPayload>
          }
          aggregate: {
            args: Prisma.MasterUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasterUser>
          }
          groupBy: {
            args: Prisma.MasterUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterUserCountArgs<ExtArgs>
            result: $Utils.Optional<MasterUserCountAggregateOutputType> | number
          }
        }
      }
      UserTenantAccess: {
        payload: Prisma.$UserTenantAccessPayload<ExtArgs>
        fields: Prisma.UserTenantAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserTenantAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserTenantAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>
          }
          findFirst: {
            args: Prisma.UserTenantAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserTenantAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>
          }
          findMany: {
            args: Prisma.UserTenantAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>[]
          }
          create: {
            args: Prisma.UserTenantAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>
          }
          createMany: {
            args: Prisma.UserTenantAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserTenantAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>[]
          }
          delete: {
            args: Prisma.UserTenantAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>
          }
          update: {
            args: Prisma.UserTenantAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>
          }
          deleteMany: {
            args: Prisma.UserTenantAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserTenantAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserTenantAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTenantAccessPayload>
          }
          aggregate: {
            args: Prisma.UserTenantAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserTenantAccess>
          }
          groupBy: {
            args: Prisma.UserTenantAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserTenantAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserTenantAccessCountArgs<ExtArgs>
            result: $Utils.Optional<UserTenantAccessCountAggregateOutputType> | number
          }
        }
      }
      HoldingConsolidatedLedger: {
        payload: Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>
        fields: Prisma.HoldingConsolidatedLedgerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoldingConsolidatedLedgerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoldingConsolidatedLedgerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>
          }
          findFirst: {
            args: Prisma.HoldingConsolidatedLedgerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoldingConsolidatedLedgerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>
          }
          findMany: {
            args: Prisma.HoldingConsolidatedLedgerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>[]
          }
          create: {
            args: Prisma.HoldingConsolidatedLedgerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>
          }
          createMany: {
            args: Prisma.HoldingConsolidatedLedgerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoldingConsolidatedLedgerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>[]
          }
          delete: {
            args: Prisma.HoldingConsolidatedLedgerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>
          }
          update: {
            args: Prisma.HoldingConsolidatedLedgerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>
          }
          deleteMany: {
            args: Prisma.HoldingConsolidatedLedgerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoldingConsolidatedLedgerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HoldingConsolidatedLedgerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingConsolidatedLedgerPayload>
          }
          aggregate: {
            args: Prisma.HoldingConsolidatedLedgerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHoldingConsolidatedLedger>
          }
          groupBy: {
            args: Prisma.HoldingConsolidatedLedgerGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoldingConsolidatedLedgerGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoldingConsolidatedLedgerCountArgs<ExtArgs>
            result: $Utils.Optional<HoldingConsolidatedLedgerCountAggregateOutputType> | number
          }
        }
      }
      GlobalAuditLog: {
        payload: Prisma.$GlobalAuditLogPayload<ExtArgs>
        fields: Prisma.GlobalAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>
          }
          findFirst: {
            args: Prisma.GlobalAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>
          }
          findMany: {
            args: Prisma.GlobalAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>[]
          }
          create: {
            args: Prisma.GlobalAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>
          }
          createMany: {
            args: Prisma.GlobalAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>[]
          }
          delete: {
            args: Prisma.GlobalAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>
          }
          update: {
            args: Prisma.GlobalAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.GlobalAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GlobalAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAuditLogPayload>
          }
          aggregate: {
            args: Prisma.GlobalAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalAuditLog>
          }
          groupBy: {
            args: Prisma.GlobalAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalAuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    userAccesses: number
    consolidatedLogs: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAccesses?: boolean | TenantCountOutputTypeCountUserAccessesArgs
    consolidatedLogs?: boolean | TenantCountOutputTypeCountConsolidatedLogsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUserAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTenantAccessWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountConsolidatedLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingConsolidatedLedgerWhereInput
  }


  /**
   * Count Type MasterUserCountOutputType
   */

  export type MasterUserCountOutputType = {
    tenantAccesses: number
    auditLogs: number
  }

  export type MasterUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenantAccesses?: boolean | MasterUserCountOutputTypeCountTenantAccessesArgs
    auditLogs?: boolean | MasterUserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * MasterUserCountOutputType without action
   */
  export type MasterUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUserCountOutputType
     */
    select?: MasterUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MasterUserCountOutputType without action
   */
  export type MasterUserCountOutputTypeCountTenantAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTenantAccessWhereInput
  }

  /**
   * MasterUserCountOutputType without action
   */
  export type MasterUserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalAuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    industryType: $Enums.IndustryType | null
    dbConnectionUri: string | null
    status: $Enums.TenantStatus | null
    logoUrl: string | null
    address: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    industryType: $Enums.IndustryType | null
    dbConnectionUri: string | null
    status: $Enums.TenantStatus | null
    logoUrl: string | null
    address: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    code: number
    name: number
    industryType: number
    dbConnectionUri: number
    status: number
    modulesEnabled: number
    logoUrl: number
    address: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    industryType?: true
    dbConnectionUri?: true
    status?: true
    logoUrl?: true
    address?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    industryType?: true
    dbConnectionUri?: true
    status?: true
    logoUrl?: true
    address?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    industryType?: true
    dbConnectionUri?: true
    status?: true
    modulesEnabled?: true
    logoUrl?: true
    address?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status: $Enums.TenantStatus
    modulesEnabled: string[]
    logoUrl: string | null
    address: string | null
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    industryType?: boolean
    dbConnectionUri?: boolean
    status?: boolean
    modulesEnabled?: boolean
    logoUrl?: boolean
    address?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userAccesses?: boolean | Tenant$userAccessesArgs<ExtArgs>
    consolidatedLogs?: boolean | Tenant$consolidatedLogsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    industryType?: boolean
    dbConnectionUri?: boolean
    status?: boolean
    modulesEnabled?: boolean
    logoUrl?: boolean
    address?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    industryType?: boolean
    dbConnectionUri?: boolean
    status?: boolean
    modulesEnabled?: boolean
    logoUrl?: boolean
    address?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAccesses?: boolean | Tenant$userAccessesArgs<ExtArgs>
    consolidatedLogs?: boolean | Tenant$consolidatedLogsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      userAccesses: Prisma.$UserTenantAccessPayload<ExtArgs>[]
      consolidatedLogs: Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      industryType: $Enums.IndustryType
      dbConnectionUri: string
      status: $Enums.TenantStatus
      modulesEnabled: string[]
      logoUrl: string | null
      address: string | null
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userAccesses<T extends Tenant$userAccessesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$userAccessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findMany"> | Null>
    consolidatedLogs<T extends Tenant$consolidatedLogsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$consolidatedLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */ 
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly code: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly industryType: FieldRef<"Tenant", 'IndustryType'>
    readonly dbConnectionUri: FieldRef<"Tenant", 'String'>
    readonly status: FieldRef<"Tenant", 'TenantStatus'>
    readonly modulesEnabled: FieldRef<"Tenant", 'String[]'>
    readonly logoUrl: FieldRef<"Tenant", 'String'>
    readonly address: FieldRef<"Tenant", 'String'>
    readonly phone: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant.userAccesses
   */
  export type Tenant$userAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    where?: UserTenantAccessWhereInput
    orderBy?: UserTenantAccessOrderByWithRelationInput | UserTenantAccessOrderByWithRelationInput[]
    cursor?: UserTenantAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserTenantAccessScalarFieldEnum | UserTenantAccessScalarFieldEnum[]
  }

  /**
   * Tenant.consolidatedLogs
   */
  export type Tenant$consolidatedLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    where?: HoldingConsolidatedLedgerWhereInput
    orderBy?: HoldingConsolidatedLedgerOrderByWithRelationInput | HoldingConsolidatedLedgerOrderByWithRelationInput[]
    cursor?: HoldingConsolidatedLedgerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingConsolidatedLedgerScalarFieldEnum | HoldingConsolidatedLedgerScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model MasterUser
   */

  export type AggregateMasterUser = {
    _count: MasterUserCountAggregateOutputType | null
    _min: MasterUserMinAggregateOutputType | null
    _max: MasterUserMaxAggregateOutputType | null
  }

  export type MasterUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    phoneNumber: string | null
    systemRole: $Enums.UserSystemRole | null
    isActive: boolean | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasterUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    phoneNumber: string | null
    systemRole: $Enums.UserSystemRole | null
    isActive: boolean | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasterUserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    phoneNumber: number
    systemRole: number
    isActive: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MasterUserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    phoneNumber?: true
    systemRole?: true
    isActive?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasterUserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    phoneNumber?: true
    systemRole?: true
    isActive?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasterUserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    phoneNumber?: true
    systemRole?: true
    isActive?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MasterUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterUser to aggregate.
     */
    where?: MasterUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterUsers to fetch.
     */
    orderBy?: MasterUserOrderByWithRelationInput | MasterUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterUsers
    **/
    _count?: true | MasterUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterUserMaxAggregateInputType
  }

  export type GetMasterUserAggregateType<T extends MasterUserAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterUser[P]>
      : GetScalarType<T[P], AggregateMasterUser[P]>
  }




  export type MasterUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterUserWhereInput
    orderBy?: MasterUserOrderByWithAggregationInput | MasterUserOrderByWithAggregationInput[]
    by: MasterUserScalarFieldEnum[] | MasterUserScalarFieldEnum
    having?: MasterUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterUserCountAggregateInputType | true
    _min?: MasterUserMinAggregateInputType
    _max?: MasterUserMaxAggregateInputType
  }

  export type MasterUserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string | null
    systemRole: $Enums.UserSystemRole
    isActive: boolean
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: MasterUserCountAggregateOutputType | null
    _min: MasterUserMinAggregateOutputType | null
    _max: MasterUserMaxAggregateOutputType | null
  }

  type GetMasterUserGroupByPayload<T extends MasterUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterUserGroupByOutputType[P]>
            : GetScalarType<T[P], MasterUserGroupByOutputType[P]>
        }
      >
    >


  export type MasterUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    systemRole?: boolean
    isActive?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantAccesses?: boolean | MasterUser$tenantAccessesArgs<ExtArgs>
    auditLogs?: boolean | MasterUser$auditLogsArgs<ExtArgs>
    _count?: boolean | MasterUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["masterUser"]>

  export type MasterUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    systemRole?: boolean
    isActive?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["masterUser"]>

  export type MasterUserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    systemRole?: boolean
    isActive?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MasterUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenantAccesses?: boolean | MasterUser$tenantAccessesArgs<ExtArgs>
    auditLogs?: boolean | MasterUser$auditLogsArgs<ExtArgs>
    _count?: boolean | MasterUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MasterUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MasterUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasterUser"
    objects: {
      tenantAccesses: Prisma.$UserTenantAccessPayload<ExtArgs>[]
      auditLogs: Prisma.$GlobalAuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      phoneNumber: string | null
      systemRole: $Enums.UserSystemRole
      isActive: boolean
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["masterUser"]>
    composites: {}
  }

  type MasterUserGetPayload<S extends boolean | null | undefined | MasterUserDefaultArgs> = $Result.GetResult<Prisma.$MasterUserPayload, S>

  type MasterUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MasterUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MasterUserCountAggregateInputType | true
    }

  export interface MasterUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasterUser'], meta: { name: 'MasterUser' } }
    /**
     * Find zero or one MasterUser that matches the filter.
     * @param {MasterUserFindUniqueArgs} args - Arguments to find a MasterUser
     * @example
     * // Get one MasterUser
     * const masterUser = await prisma.masterUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterUserFindUniqueArgs>(args: SelectSubset<T, MasterUserFindUniqueArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MasterUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MasterUserFindUniqueOrThrowArgs} args - Arguments to find a MasterUser
     * @example
     * // Get one MasterUser
     * const masterUser = await prisma.masterUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterUserFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MasterUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserFindFirstArgs} args - Arguments to find a MasterUser
     * @example
     * // Get one MasterUser
     * const masterUser = await prisma.masterUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterUserFindFirstArgs>(args?: SelectSubset<T, MasterUserFindFirstArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MasterUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserFindFirstOrThrowArgs} args - Arguments to find a MasterUser
     * @example
     * // Get one MasterUser
     * const masterUser = await prisma.masterUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterUserFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MasterUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterUsers
     * const masterUsers = await prisma.masterUser.findMany()
     * 
     * // Get first 10 MasterUsers
     * const masterUsers = await prisma.masterUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterUserWithIdOnly = await prisma.masterUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterUserFindManyArgs>(args?: SelectSubset<T, MasterUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MasterUser.
     * @param {MasterUserCreateArgs} args - Arguments to create a MasterUser.
     * @example
     * // Create one MasterUser
     * const MasterUser = await prisma.masterUser.create({
     *   data: {
     *     // ... data to create a MasterUser
     *   }
     * })
     * 
     */
    create<T extends MasterUserCreateArgs>(args: SelectSubset<T, MasterUserCreateArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MasterUsers.
     * @param {MasterUserCreateManyArgs} args - Arguments to create many MasterUsers.
     * @example
     * // Create many MasterUsers
     * const masterUser = await prisma.masterUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterUserCreateManyArgs>(args?: SelectSubset<T, MasterUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasterUsers and returns the data saved in the database.
     * @param {MasterUserCreateManyAndReturnArgs} args - Arguments to create many MasterUsers.
     * @example
     * // Create many MasterUsers
     * const masterUser = await prisma.masterUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasterUsers and only return the `id`
     * const masterUserWithIdOnly = await prisma.masterUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterUserCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MasterUser.
     * @param {MasterUserDeleteArgs} args - Arguments to delete one MasterUser.
     * @example
     * // Delete one MasterUser
     * const MasterUser = await prisma.masterUser.delete({
     *   where: {
     *     // ... filter to delete one MasterUser
     *   }
     * })
     * 
     */
    delete<T extends MasterUserDeleteArgs>(args: SelectSubset<T, MasterUserDeleteArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MasterUser.
     * @param {MasterUserUpdateArgs} args - Arguments to update one MasterUser.
     * @example
     * // Update one MasterUser
     * const masterUser = await prisma.masterUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterUserUpdateArgs>(args: SelectSubset<T, MasterUserUpdateArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MasterUsers.
     * @param {MasterUserDeleteManyArgs} args - Arguments to filter MasterUsers to delete.
     * @example
     * // Delete a few MasterUsers
     * const { count } = await prisma.masterUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterUserDeleteManyArgs>(args?: SelectSubset<T, MasterUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterUsers
     * const masterUser = await prisma.masterUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterUserUpdateManyArgs>(args: SelectSubset<T, MasterUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MasterUser.
     * @param {MasterUserUpsertArgs} args - Arguments to update or create a MasterUser.
     * @example
     * // Update or create a MasterUser
     * const masterUser = await prisma.masterUser.upsert({
     *   create: {
     *     // ... data to create a MasterUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterUser we want to update
     *   }
     * })
     */
    upsert<T extends MasterUserUpsertArgs>(args: SelectSubset<T, MasterUserUpsertArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MasterUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserCountArgs} args - Arguments to filter MasterUsers to count.
     * @example
     * // Count the number of MasterUsers
     * const count = await prisma.masterUser.count({
     *   where: {
     *     // ... the filter for the MasterUsers we want to count
     *   }
     * })
    **/
    count<T extends MasterUserCountArgs>(
      args?: Subset<T, MasterUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterUserAggregateArgs>(args: Subset<T, MasterUserAggregateArgs>): Prisma.PrismaPromise<GetMasterUserAggregateType<T>>

    /**
     * Group by MasterUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MasterUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterUserGroupByArgs['orderBy'] }
        : { orderBy?: MasterUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MasterUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasterUser model
   */
  readonly fields: MasterUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenantAccesses<T extends MasterUser$tenantAccessesArgs<ExtArgs> = {}>(args?: Subset<T, MasterUser$tenantAccessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends MasterUser$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, MasterUser$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MasterUser model
   */ 
  interface MasterUserFieldRefs {
    readonly id: FieldRef<"MasterUser", 'String'>
    readonly email: FieldRef<"MasterUser", 'String'>
    readonly passwordHash: FieldRef<"MasterUser", 'String'>
    readonly fullName: FieldRef<"MasterUser", 'String'>
    readonly phoneNumber: FieldRef<"MasterUser", 'String'>
    readonly systemRole: FieldRef<"MasterUser", 'UserSystemRole'>
    readonly isActive: FieldRef<"MasterUser", 'Boolean'>
    readonly avatarUrl: FieldRef<"MasterUser", 'String'>
    readonly createdAt: FieldRef<"MasterUser", 'DateTime'>
    readonly updatedAt: FieldRef<"MasterUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MasterUser findUnique
   */
  export type MasterUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * Filter, which MasterUser to fetch.
     */
    where: MasterUserWhereUniqueInput
  }

  /**
   * MasterUser findUniqueOrThrow
   */
  export type MasterUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * Filter, which MasterUser to fetch.
     */
    where: MasterUserWhereUniqueInput
  }

  /**
   * MasterUser findFirst
   */
  export type MasterUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * Filter, which MasterUser to fetch.
     */
    where?: MasterUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterUsers to fetch.
     */
    orderBy?: MasterUserOrderByWithRelationInput | MasterUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterUsers.
     */
    cursor?: MasterUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterUsers.
     */
    distinct?: MasterUserScalarFieldEnum | MasterUserScalarFieldEnum[]
  }

  /**
   * MasterUser findFirstOrThrow
   */
  export type MasterUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * Filter, which MasterUser to fetch.
     */
    where?: MasterUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterUsers to fetch.
     */
    orderBy?: MasterUserOrderByWithRelationInput | MasterUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterUsers.
     */
    cursor?: MasterUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterUsers.
     */
    distinct?: MasterUserScalarFieldEnum | MasterUserScalarFieldEnum[]
  }

  /**
   * MasterUser findMany
   */
  export type MasterUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * Filter, which MasterUsers to fetch.
     */
    where?: MasterUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterUsers to fetch.
     */
    orderBy?: MasterUserOrderByWithRelationInput | MasterUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterUsers.
     */
    cursor?: MasterUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterUsers.
     */
    skip?: number
    distinct?: MasterUserScalarFieldEnum | MasterUserScalarFieldEnum[]
  }

  /**
   * MasterUser create
   */
  export type MasterUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * The data needed to create a MasterUser.
     */
    data: XOR<MasterUserCreateInput, MasterUserUncheckedCreateInput>
  }

  /**
   * MasterUser createMany
   */
  export type MasterUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterUsers.
     */
    data: MasterUserCreateManyInput | MasterUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterUser createManyAndReturn
   */
  export type MasterUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MasterUsers.
     */
    data: MasterUserCreateManyInput | MasterUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterUser update
   */
  export type MasterUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * The data needed to update a MasterUser.
     */
    data: XOR<MasterUserUpdateInput, MasterUserUncheckedUpdateInput>
    /**
     * Choose, which MasterUser to update.
     */
    where: MasterUserWhereUniqueInput
  }

  /**
   * MasterUser updateMany
   */
  export type MasterUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterUsers.
     */
    data: XOR<MasterUserUpdateManyMutationInput, MasterUserUncheckedUpdateManyInput>
    /**
     * Filter which MasterUsers to update
     */
    where?: MasterUserWhereInput
  }

  /**
   * MasterUser upsert
   */
  export type MasterUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * The filter to search for the MasterUser to update in case it exists.
     */
    where: MasterUserWhereUniqueInput
    /**
     * In case the MasterUser found by the `where` argument doesn't exist, create a new MasterUser with this data.
     */
    create: XOR<MasterUserCreateInput, MasterUserUncheckedCreateInput>
    /**
     * In case the MasterUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterUserUpdateInput, MasterUserUncheckedUpdateInput>
  }

  /**
   * MasterUser delete
   */
  export type MasterUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    /**
     * Filter which MasterUser to delete.
     */
    where: MasterUserWhereUniqueInput
  }

  /**
   * MasterUser deleteMany
   */
  export type MasterUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterUsers to delete
     */
    where?: MasterUserWhereInput
  }

  /**
   * MasterUser.tenantAccesses
   */
  export type MasterUser$tenantAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    where?: UserTenantAccessWhereInput
    orderBy?: UserTenantAccessOrderByWithRelationInput | UserTenantAccessOrderByWithRelationInput[]
    cursor?: UserTenantAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserTenantAccessScalarFieldEnum | UserTenantAccessScalarFieldEnum[]
  }

  /**
   * MasterUser.auditLogs
   */
  export type MasterUser$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    where?: GlobalAuditLogWhereInput
    orderBy?: GlobalAuditLogOrderByWithRelationInput | GlobalAuditLogOrderByWithRelationInput[]
    cursor?: GlobalAuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GlobalAuditLogScalarFieldEnum | GlobalAuditLogScalarFieldEnum[]
  }

  /**
   * MasterUser without action
   */
  export type MasterUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
  }


  /**
   * Model UserTenantAccess
   */

  export type AggregateUserTenantAccess = {
    _count: UserTenantAccessCountAggregateOutputType | null
    _min: UserTenantAccessMinAggregateOutputType | null
    _max: UserTenantAccessMaxAggregateOutputType | null
  }

  export type UserTenantAccessMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tenantId: string | null
    isDefault: boolean | null
    roleInTenant: string | null
    createdAt: Date | null
  }

  export type UserTenantAccessMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tenantId: string | null
    isDefault: boolean | null
    roleInTenant: string | null
    createdAt: Date | null
  }

  export type UserTenantAccessCountAggregateOutputType = {
    id: number
    userId: number
    tenantId: number
    isDefault: number
    roleInTenant: number
    createdAt: number
    _all: number
  }


  export type UserTenantAccessMinAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    isDefault?: true
    roleInTenant?: true
    createdAt?: true
  }

  export type UserTenantAccessMaxAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    isDefault?: true
    roleInTenant?: true
    createdAt?: true
  }

  export type UserTenantAccessCountAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    isDefault?: true
    roleInTenant?: true
    createdAt?: true
    _all?: true
  }

  export type UserTenantAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserTenantAccess to aggregate.
     */
    where?: UserTenantAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTenantAccesses to fetch.
     */
    orderBy?: UserTenantAccessOrderByWithRelationInput | UserTenantAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserTenantAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTenantAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTenantAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTenantAccesses
    **/
    _count?: true | UserTenantAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTenantAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTenantAccessMaxAggregateInputType
  }

  export type GetUserTenantAccessAggregateType<T extends UserTenantAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateUserTenantAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserTenantAccess[P]>
      : GetScalarType<T[P], AggregateUserTenantAccess[P]>
  }




  export type UserTenantAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTenantAccessWhereInput
    orderBy?: UserTenantAccessOrderByWithAggregationInput | UserTenantAccessOrderByWithAggregationInput[]
    by: UserTenantAccessScalarFieldEnum[] | UserTenantAccessScalarFieldEnum
    having?: UserTenantAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTenantAccessCountAggregateInputType | true
    _min?: UserTenantAccessMinAggregateInputType
    _max?: UserTenantAccessMaxAggregateInputType
  }

  export type UserTenantAccessGroupByOutputType = {
    id: string
    userId: string
    tenantId: string
    isDefault: boolean
    roleInTenant: string
    createdAt: Date
    _count: UserTenantAccessCountAggregateOutputType | null
    _min: UserTenantAccessMinAggregateOutputType | null
    _max: UserTenantAccessMaxAggregateOutputType | null
  }

  type GetUserTenantAccessGroupByPayload<T extends UserTenantAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserTenantAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTenantAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTenantAccessGroupByOutputType[P]>
            : GetScalarType<T[P], UserTenantAccessGroupByOutputType[P]>
        }
      >
    >


  export type UserTenantAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    isDefault?: boolean
    roleInTenant?: boolean
    createdAt?: boolean
    user?: boolean | MasterUserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userTenantAccess"]>

  export type UserTenantAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    isDefault?: boolean
    roleInTenant?: boolean
    createdAt?: boolean
    user?: boolean | MasterUserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userTenantAccess"]>

  export type UserTenantAccessSelectScalar = {
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    isDefault?: boolean
    roleInTenant?: boolean
    createdAt?: boolean
  }

  export type UserTenantAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MasterUserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UserTenantAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MasterUserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $UserTenantAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserTenantAccess"
    objects: {
      user: Prisma.$MasterUserPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tenantId: string
      isDefault: boolean
      roleInTenant: string
      createdAt: Date
    }, ExtArgs["result"]["userTenantAccess"]>
    composites: {}
  }

  type UserTenantAccessGetPayload<S extends boolean | null | undefined | UserTenantAccessDefaultArgs> = $Result.GetResult<Prisma.$UserTenantAccessPayload, S>

  type UserTenantAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserTenantAccessFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserTenantAccessCountAggregateInputType | true
    }

  export interface UserTenantAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserTenantAccess'], meta: { name: 'UserTenantAccess' } }
    /**
     * Find zero or one UserTenantAccess that matches the filter.
     * @param {UserTenantAccessFindUniqueArgs} args - Arguments to find a UserTenantAccess
     * @example
     * // Get one UserTenantAccess
     * const userTenantAccess = await prisma.userTenantAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserTenantAccessFindUniqueArgs>(args: SelectSubset<T, UserTenantAccessFindUniqueArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserTenantAccess that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserTenantAccessFindUniqueOrThrowArgs} args - Arguments to find a UserTenantAccess
     * @example
     * // Get one UserTenantAccess
     * const userTenantAccess = await prisma.userTenantAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserTenantAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, UserTenantAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserTenantAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessFindFirstArgs} args - Arguments to find a UserTenantAccess
     * @example
     * // Get one UserTenantAccess
     * const userTenantAccess = await prisma.userTenantAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserTenantAccessFindFirstArgs>(args?: SelectSubset<T, UserTenantAccessFindFirstArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserTenantAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessFindFirstOrThrowArgs} args - Arguments to find a UserTenantAccess
     * @example
     * // Get one UserTenantAccess
     * const userTenantAccess = await prisma.userTenantAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserTenantAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, UserTenantAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserTenantAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTenantAccesses
     * const userTenantAccesses = await prisma.userTenantAccess.findMany()
     * 
     * // Get first 10 UserTenantAccesses
     * const userTenantAccesses = await prisma.userTenantAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userTenantAccessWithIdOnly = await prisma.userTenantAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserTenantAccessFindManyArgs>(args?: SelectSubset<T, UserTenantAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserTenantAccess.
     * @param {UserTenantAccessCreateArgs} args - Arguments to create a UserTenantAccess.
     * @example
     * // Create one UserTenantAccess
     * const UserTenantAccess = await prisma.userTenantAccess.create({
     *   data: {
     *     // ... data to create a UserTenantAccess
     *   }
     * })
     * 
     */
    create<T extends UserTenantAccessCreateArgs>(args: SelectSubset<T, UserTenantAccessCreateArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserTenantAccesses.
     * @param {UserTenantAccessCreateManyArgs} args - Arguments to create many UserTenantAccesses.
     * @example
     * // Create many UserTenantAccesses
     * const userTenantAccess = await prisma.userTenantAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserTenantAccessCreateManyArgs>(args?: SelectSubset<T, UserTenantAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserTenantAccesses and returns the data saved in the database.
     * @param {UserTenantAccessCreateManyAndReturnArgs} args - Arguments to create many UserTenantAccesses.
     * @example
     * // Create many UserTenantAccesses
     * const userTenantAccess = await prisma.userTenantAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserTenantAccesses and only return the `id`
     * const userTenantAccessWithIdOnly = await prisma.userTenantAccess.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserTenantAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, UserTenantAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserTenantAccess.
     * @param {UserTenantAccessDeleteArgs} args - Arguments to delete one UserTenantAccess.
     * @example
     * // Delete one UserTenantAccess
     * const UserTenantAccess = await prisma.userTenantAccess.delete({
     *   where: {
     *     // ... filter to delete one UserTenantAccess
     *   }
     * })
     * 
     */
    delete<T extends UserTenantAccessDeleteArgs>(args: SelectSubset<T, UserTenantAccessDeleteArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserTenantAccess.
     * @param {UserTenantAccessUpdateArgs} args - Arguments to update one UserTenantAccess.
     * @example
     * // Update one UserTenantAccess
     * const userTenantAccess = await prisma.userTenantAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserTenantAccessUpdateArgs>(args: SelectSubset<T, UserTenantAccessUpdateArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserTenantAccesses.
     * @param {UserTenantAccessDeleteManyArgs} args - Arguments to filter UserTenantAccesses to delete.
     * @example
     * // Delete a few UserTenantAccesses
     * const { count } = await prisma.userTenantAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserTenantAccessDeleteManyArgs>(args?: SelectSubset<T, UserTenantAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTenantAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTenantAccesses
     * const userTenantAccess = await prisma.userTenantAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserTenantAccessUpdateManyArgs>(args: SelectSubset<T, UserTenantAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserTenantAccess.
     * @param {UserTenantAccessUpsertArgs} args - Arguments to update or create a UserTenantAccess.
     * @example
     * // Update or create a UserTenantAccess
     * const userTenantAccess = await prisma.userTenantAccess.upsert({
     *   create: {
     *     // ... data to create a UserTenantAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserTenantAccess we want to update
     *   }
     * })
     */
    upsert<T extends UserTenantAccessUpsertArgs>(args: SelectSubset<T, UserTenantAccessUpsertArgs<ExtArgs>>): Prisma__UserTenantAccessClient<$Result.GetResult<Prisma.$UserTenantAccessPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserTenantAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessCountArgs} args - Arguments to filter UserTenantAccesses to count.
     * @example
     * // Count the number of UserTenantAccesses
     * const count = await prisma.userTenantAccess.count({
     *   where: {
     *     // ... the filter for the UserTenantAccesses we want to count
     *   }
     * })
    **/
    count<T extends UserTenantAccessCountArgs>(
      args?: Subset<T, UserTenantAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTenantAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserTenantAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTenantAccessAggregateArgs>(args: Subset<T, UserTenantAccessAggregateArgs>): Prisma.PrismaPromise<GetUserTenantAccessAggregateType<T>>

    /**
     * Group by UserTenantAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTenantAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTenantAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTenantAccessGroupByArgs['orderBy'] }
        : { orderBy?: UserTenantAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTenantAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTenantAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserTenantAccess model
   */
  readonly fields: UserTenantAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserTenantAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserTenantAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends MasterUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MasterUserDefaultArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserTenantAccess model
   */ 
  interface UserTenantAccessFieldRefs {
    readonly id: FieldRef<"UserTenantAccess", 'String'>
    readonly userId: FieldRef<"UserTenantAccess", 'String'>
    readonly tenantId: FieldRef<"UserTenantAccess", 'String'>
    readonly isDefault: FieldRef<"UserTenantAccess", 'Boolean'>
    readonly roleInTenant: FieldRef<"UserTenantAccess", 'String'>
    readonly createdAt: FieldRef<"UserTenantAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserTenantAccess findUnique
   */
  export type UserTenantAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserTenantAccess to fetch.
     */
    where: UserTenantAccessWhereUniqueInput
  }

  /**
   * UserTenantAccess findUniqueOrThrow
   */
  export type UserTenantAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserTenantAccess to fetch.
     */
    where: UserTenantAccessWhereUniqueInput
  }

  /**
   * UserTenantAccess findFirst
   */
  export type UserTenantAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserTenantAccess to fetch.
     */
    where?: UserTenantAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTenantAccesses to fetch.
     */
    orderBy?: UserTenantAccessOrderByWithRelationInput | UserTenantAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTenantAccesses.
     */
    cursor?: UserTenantAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTenantAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTenantAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTenantAccesses.
     */
    distinct?: UserTenantAccessScalarFieldEnum | UserTenantAccessScalarFieldEnum[]
  }

  /**
   * UserTenantAccess findFirstOrThrow
   */
  export type UserTenantAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserTenantAccess to fetch.
     */
    where?: UserTenantAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTenantAccesses to fetch.
     */
    orderBy?: UserTenantAccessOrderByWithRelationInput | UserTenantAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTenantAccesses.
     */
    cursor?: UserTenantAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTenantAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTenantAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTenantAccesses.
     */
    distinct?: UserTenantAccessScalarFieldEnum | UserTenantAccessScalarFieldEnum[]
  }

  /**
   * UserTenantAccess findMany
   */
  export type UserTenantAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserTenantAccesses to fetch.
     */
    where?: UserTenantAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTenantAccesses to fetch.
     */
    orderBy?: UserTenantAccessOrderByWithRelationInput | UserTenantAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTenantAccesses.
     */
    cursor?: UserTenantAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTenantAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTenantAccesses.
     */
    skip?: number
    distinct?: UserTenantAccessScalarFieldEnum | UserTenantAccessScalarFieldEnum[]
  }

  /**
   * UserTenantAccess create
   */
  export type UserTenantAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a UserTenantAccess.
     */
    data: XOR<UserTenantAccessCreateInput, UserTenantAccessUncheckedCreateInput>
  }

  /**
   * UserTenantAccess createMany
   */
  export type UserTenantAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserTenantAccesses.
     */
    data: UserTenantAccessCreateManyInput | UserTenantAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserTenantAccess createManyAndReturn
   */
  export type UserTenantAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserTenantAccesses.
     */
    data: UserTenantAccessCreateManyInput | UserTenantAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserTenantAccess update
   */
  export type UserTenantAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a UserTenantAccess.
     */
    data: XOR<UserTenantAccessUpdateInput, UserTenantAccessUncheckedUpdateInput>
    /**
     * Choose, which UserTenantAccess to update.
     */
    where: UserTenantAccessWhereUniqueInput
  }

  /**
   * UserTenantAccess updateMany
   */
  export type UserTenantAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserTenantAccesses.
     */
    data: XOR<UserTenantAccessUpdateManyMutationInput, UserTenantAccessUncheckedUpdateManyInput>
    /**
     * Filter which UserTenantAccesses to update
     */
    where?: UserTenantAccessWhereInput
  }

  /**
   * UserTenantAccess upsert
   */
  export type UserTenantAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the UserTenantAccess to update in case it exists.
     */
    where: UserTenantAccessWhereUniqueInput
    /**
     * In case the UserTenantAccess found by the `where` argument doesn't exist, create a new UserTenantAccess with this data.
     */
    create: XOR<UserTenantAccessCreateInput, UserTenantAccessUncheckedCreateInput>
    /**
     * In case the UserTenantAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserTenantAccessUpdateInput, UserTenantAccessUncheckedUpdateInput>
  }

  /**
   * UserTenantAccess delete
   */
  export type UserTenantAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
    /**
     * Filter which UserTenantAccess to delete.
     */
    where: UserTenantAccessWhereUniqueInput
  }

  /**
   * UserTenantAccess deleteMany
   */
  export type UserTenantAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserTenantAccesses to delete
     */
    where?: UserTenantAccessWhereInput
  }

  /**
   * UserTenantAccess without action
   */
  export type UserTenantAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTenantAccess
     */
    select?: UserTenantAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTenantAccessInclude<ExtArgs> | null
  }


  /**
   * Model HoldingConsolidatedLedger
   */

  export type AggregateHoldingConsolidatedLedger = {
    _count: HoldingConsolidatedLedgerCountAggregateOutputType | null
    _avg: HoldingConsolidatedLedgerAvgAggregateOutputType | null
    _sum: HoldingConsolidatedLedgerSumAggregateOutputType | null
    _min: HoldingConsolidatedLedgerMinAggregateOutputType | null
    _max: HoldingConsolidatedLedgerMaxAggregateOutputType | null
  }

  export type HoldingConsolidatedLedgerAvgAggregateOutputType = {
    periodMonth: number | null
    periodYear: number | null
    totalRevenue: Decimal | null
    totalExpense: Decimal | null
    netProfitLoss: Decimal | null
    totalAssets: Decimal | null
    totalLiabilities: Decimal | null
  }

  export type HoldingConsolidatedLedgerSumAggregateOutputType = {
    periodMonth: number | null
    periodYear: number | null
    totalRevenue: Decimal | null
    totalExpense: Decimal | null
    netProfitLoss: Decimal | null
    totalAssets: Decimal | null
    totalLiabilities: Decimal | null
  }

  export type HoldingConsolidatedLedgerMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    periodMonth: number | null
    periodYear: number | null
    totalRevenue: Decimal | null
    totalExpense: Decimal | null
    netProfitLoss: Decimal | null
    totalAssets: Decimal | null
    totalLiabilities: Decimal | null
    currency: string | null
    syncedAt: Date | null
  }

  export type HoldingConsolidatedLedgerMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    periodMonth: number | null
    periodYear: number | null
    totalRevenue: Decimal | null
    totalExpense: Decimal | null
    netProfitLoss: Decimal | null
    totalAssets: Decimal | null
    totalLiabilities: Decimal | null
    currency: string | null
    syncedAt: Date | null
  }

  export type HoldingConsolidatedLedgerCountAggregateOutputType = {
    id: number
    tenantId: number
    periodMonth: number
    periodYear: number
    totalRevenue: number
    totalExpense: number
    netProfitLoss: number
    totalAssets: number
    totalLiabilities: number
    currency: number
    syncedAt: number
    _all: number
  }


  export type HoldingConsolidatedLedgerAvgAggregateInputType = {
    periodMonth?: true
    periodYear?: true
    totalRevenue?: true
    totalExpense?: true
    netProfitLoss?: true
    totalAssets?: true
    totalLiabilities?: true
  }

  export type HoldingConsolidatedLedgerSumAggregateInputType = {
    periodMonth?: true
    periodYear?: true
    totalRevenue?: true
    totalExpense?: true
    netProfitLoss?: true
    totalAssets?: true
    totalLiabilities?: true
  }

  export type HoldingConsolidatedLedgerMinAggregateInputType = {
    id?: true
    tenantId?: true
    periodMonth?: true
    periodYear?: true
    totalRevenue?: true
    totalExpense?: true
    netProfitLoss?: true
    totalAssets?: true
    totalLiabilities?: true
    currency?: true
    syncedAt?: true
  }

  export type HoldingConsolidatedLedgerMaxAggregateInputType = {
    id?: true
    tenantId?: true
    periodMonth?: true
    periodYear?: true
    totalRevenue?: true
    totalExpense?: true
    netProfitLoss?: true
    totalAssets?: true
    totalLiabilities?: true
    currency?: true
    syncedAt?: true
  }

  export type HoldingConsolidatedLedgerCountAggregateInputType = {
    id?: true
    tenantId?: true
    periodMonth?: true
    periodYear?: true
    totalRevenue?: true
    totalExpense?: true
    netProfitLoss?: true
    totalAssets?: true
    totalLiabilities?: true
    currency?: true
    syncedAt?: true
    _all?: true
  }

  export type HoldingConsolidatedLedgerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoldingConsolidatedLedger to aggregate.
     */
    where?: HoldingConsolidatedLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoldingConsolidatedLedgers to fetch.
     */
    orderBy?: HoldingConsolidatedLedgerOrderByWithRelationInput | HoldingConsolidatedLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoldingConsolidatedLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoldingConsolidatedLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoldingConsolidatedLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HoldingConsolidatedLedgers
    **/
    _count?: true | HoldingConsolidatedLedgerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoldingConsolidatedLedgerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoldingConsolidatedLedgerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoldingConsolidatedLedgerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoldingConsolidatedLedgerMaxAggregateInputType
  }

  export type GetHoldingConsolidatedLedgerAggregateType<T extends HoldingConsolidatedLedgerAggregateArgs> = {
        [P in keyof T & keyof AggregateHoldingConsolidatedLedger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHoldingConsolidatedLedger[P]>
      : GetScalarType<T[P], AggregateHoldingConsolidatedLedger[P]>
  }




  export type HoldingConsolidatedLedgerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingConsolidatedLedgerWhereInput
    orderBy?: HoldingConsolidatedLedgerOrderByWithAggregationInput | HoldingConsolidatedLedgerOrderByWithAggregationInput[]
    by: HoldingConsolidatedLedgerScalarFieldEnum[] | HoldingConsolidatedLedgerScalarFieldEnum
    having?: HoldingConsolidatedLedgerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoldingConsolidatedLedgerCountAggregateInputType | true
    _avg?: HoldingConsolidatedLedgerAvgAggregateInputType
    _sum?: HoldingConsolidatedLedgerSumAggregateInputType
    _min?: HoldingConsolidatedLedgerMinAggregateInputType
    _max?: HoldingConsolidatedLedgerMaxAggregateInputType
  }

  export type HoldingConsolidatedLedgerGroupByOutputType = {
    id: string
    tenantId: string
    periodMonth: number
    periodYear: number
    totalRevenue: Decimal
    totalExpense: Decimal
    netProfitLoss: Decimal
    totalAssets: Decimal
    totalLiabilities: Decimal
    currency: string
    syncedAt: Date
    _count: HoldingConsolidatedLedgerCountAggregateOutputType | null
    _avg: HoldingConsolidatedLedgerAvgAggregateOutputType | null
    _sum: HoldingConsolidatedLedgerSumAggregateOutputType | null
    _min: HoldingConsolidatedLedgerMinAggregateOutputType | null
    _max: HoldingConsolidatedLedgerMaxAggregateOutputType | null
  }

  type GetHoldingConsolidatedLedgerGroupByPayload<T extends HoldingConsolidatedLedgerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoldingConsolidatedLedgerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoldingConsolidatedLedgerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingConsolidatedLedgerGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingConsolidatedLedgerGroupByOutputType[P]>
        }
      >
    >


  export type HoldingConsolidatedLedgerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodMonth?: boolean
    periodYear?: boolean
    totalRevenue?: boolean
    totalExpense?: boolean
    netProfitLoss?: boolean
    totalAssets?: boolean
    totalLiabilities?: boolean
    currency?: boolean
    syncedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holdingConsolidatedLedger"]>

  export type HoldingConsolidatedLedgerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodMonth?: boolean
    periodYear?: boolean
    totalRevenue?: boolean
    totalExpense?: boolean
    netProfitLoss?: boolean
    totalAssets?: boolean
    totalLiabilities?: boolean
    currency?: boolean
    syncedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holdingConsolidatedLedger"]>

  export type HoldingConsolidatedLedgerSelectScalar = {
    id?: boolean
    tenantId?: boolean
    periodMonth?: boolean
    periodYear?: boolean
    totalRevenue?: boolean
    totalExpense?: boolean
    netProfitLoss?: boolean
    totalAssets?: boolean
    totalLiabilities?: boolean
    currency?: boolean
    syncedAt?: boolean
  }

  export type HoldingConsolidatedLedgerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type HoldingConsolidatedLedgerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $HoldingConsolidatedLedgerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HoldingConsolidatedLedger"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      periodMonth: number
      periodYear: number
      totalRevenue: Prisma.Decimal
      totalExpense: Prisma.Decimal
      netProfitLoss: Prisma.Decimal
      totalAssets: Prisma.Decimal
      totalLiabilities: Prisma.Decimal
      currency: string
      syncedAt: Date
    }, ExtArgs["result"]["holdingConsolidatedLedger"]>
    composites: {}
  }

  type HoldingConsolidatedLedgerGetPayload<S extends boolean | null | undefined | HoldingConsolidatedLedgerDefaultArgs> = $Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload, S>

  type HoldingConsolidatedLedgerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HoldingConsolidatedLedgerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HoldingConsolidatedLedgerCountAggregateInputType | true
    }

  export interface HoldingConsolidatedLedgerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HoldingConsolidatedLedger'], meta: { name: 'HoldingConsolidatedLedger' } }
    /**
     * Find zero or one HoldingConsolidatedLedger that matches the filter.
     * @param {HoldingConsolidatedLedgerFindUniqueArgs} args - Arguments to find a HoldingConsolidatedLedger
     * @example
     * // Get one HoldingConsolidatedLedger
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingConsolidatedLedgerFindUniqueArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerFindUniqueArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HoldingConsolidatedLedger that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HoldingConsolidatedLedgerFindUniqueOrThrowArgs} args - Arguments to find a HoldingConsolidatedLedger
     * @example
     * // Get one HoldingConsolidatedLedger
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingConsolidatedLedgerFindUniqueOrThrowArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HoldingConsolidatedLedger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerFindFirstArgs} args - Arguments to find a HoldingConsolidatedLedger
     * @example
     * // Get one HoldingConsolidatedLedger
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingConsolidatedLedgerFindFirstArgs>(args?: SelectSubset<T, HoldingConsolidatedLedgerFindFirstArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HoldingConsolidatedLedger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerFindFirstOrThrowArgs} args - Arguments to find a HoldingConsolidatedLedger
     * @example
     * // Get one HoldingConsolidatedLedger
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingConsolidatedLedgerFindFirstOrThrowArgs>(args?: SelectSubset<T, HoldingConsolidatedLedgerFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HoldingConsolidatedLedgers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HoldingConsolidatedLedgers
     * const holdingConsolidatedLedgers = await prisma.holdingConsolidatedLedger.findMany()
     * 
     * // Get first 10 HoldingConsolidatedLedgers
     * const holdingConsolidatedLedgers = await prisma.holdingConsolidatedLedger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const holdingConsolidatedLedgerWithIdOnly = await prisma.holdingConsolidatedLedger.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoldingConsolidatedLedgerFindManyArgs>(args?: SelectSubset<T, HoldingConsolidatedLedgerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HoldingConsolidatedLedger.
     * @param {HoldingConsolidatedLedgerCreateArgs} args - Arguments to create a HoldingConsolidatedLedger.
     * @example
     * // Create one HoldingConsolidatedLedger
     * const HoldingConsolidatedLedger = await prisma.holdingConsolidatedLedger.create({
     *   data: {
     *     // ... data to create a HoldingConsolidatedLedger
     *   }
     * })
     * 
     */
    create<T extends HoldingConsolidatedLedgerCreateArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerCreateArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HoldingConsolidatedLedgers.
     * @param {HoldingConsolidatedLedgerCreateManyArgs} args - Arguments to create many HoldingConsolidatedLedgers.
     * @example
     * // Create many HoldingConsolidatedLedgers
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoldingConsolidatedLedgerCreateManyArgs>(args?: SelectSubset<T, HoldingConsolidatedLedgerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HoldingConsolidatedLedgers and returns the data saved in the database.
     * @param {HoldingConsolidatedLedgerCreateManyAndReturnArgs} args - Arguments to create many HoldingConsolidatedLedgers.
     * @example
     * // Create many HoldingConsolidatedLedgers
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HoldingConsolidatedLedgers and only return the `id`
     * const holdingConsolidatedLedgerWithIdOnly = await prisma.holdingConsolidatedLedger.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoldingConsolidatedLedgerCreateManyAndReturnArgs>(args?: SelectSubset<T, HoldingConsolidatedLedgerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HoldingConsolidatedLedger.
     * @param {HoldingConsolidatedLedgerDeleteArgs} args - Arguments to delete one HoldingConsolidatedLedger.
     * @example
     * // Delete one HoldingConsolidatedLedger
     * const HoldingConsolidatedLedger = await prisma.holdingConsolidatedLedger.delete({
     *   where: {
     *     // ... filter to delete one HoldingConsolidatedLedger
     *   }
     * })
     * 
     */
    delete<T extends HoldingConsolidatedLedgerDeleteArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerDeleteArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HoldingConsolidatedLedger.
     * @param {HoldingConsolidatedLedgerUpdateArgs} args - Arguments to update one HoldingConsolidatedLedger.
     * @example
     * // Update one HoldingConsolidatedLedger
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoldingConsolidatedLedgerUpdateArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerUpdateArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HoldingConsolidatedLedgers.
     * @param {HoldingConsolidatedLedgerDeleteManyArgs} args - Arguments to filter HoldingConsolidatedLedgers to delete.
     * @example
     * // Delete a few HoldingConsolidatedLedgers
     * const { count } = await prisma.holdingConsolidatedLedger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoldingConsolidatedLedgerDeleteManyArgs>(args?: SelectSubset<T, HoldingConsolidatedLedgerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HoldingConsolidatedLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HoldingConsolidatedLedgers
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoldingConsolidatedLedgerUpdateManyArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HoldingConsolidatedLedger.
     * @param {HoldingConsolidatedLedgerUpsertArgs} args - Arguments to update or create a HoldingConsolidatedLedger.
     * @example
     * // Update or create a HoldingConsolidatedLedger
     * const holdingConsolidatedLedger = await prisma.holdingConsolidatedLedger.upsert({
     *   create: {
     *     // ... data to create a HoldingConsolidatedLedger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HoldingConsolidatedLedger we want to update
     *   }
     * })
     */
    upsert<T extends HoldingConsolidatedLedgerUpsertArgs>(args: SelectSubset<T, HoldingConsolidatedLedgerUpsertArgs<ExtArgs>>): Prisma__HoldingConsolidatedLedgerClient<$Result.GetResult<Prisma.$HoldingConsolidatedLedgerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HoldingConsolidatedLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerCountArgs} args - Arguments to filter HoldingConsolidatedLedgers to count.
     * @example
     * // Count the number of HoldingConsolidatedLedgers
     * const count = await prisma.holdingConsolidatedLedger.count({
     *   where: {
     *     // ... the filter for the HoldingConsolidatedLedgers we want to count
     *   }
     * })
    **/
    count<T extends HoldingConsolidatedLedgerCountArgs>(
      args?: Subset<T, HoldingConsolidatedLedgerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingConsolidatedLedgerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HoldingConsolidatedLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoldingConsolidatedLedgerAggregateArgs>(args: Subset<T, HoldingConsolidatedLedgerAggregateArgs>): Prisma.PrismaPromise<GetHoldingConsolidatedLedgerAggregateType<T>>

    /**
     * Group by HoldingConsolidatedLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingConsolidatedLedgerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoldingConsolidatedLedgerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingConsolidatedLedgerGroupByArgs['orderBy'] }
        : { orderBy?: HoldingConsolidatedLedgerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoldingConsolidatedLedgerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingConsolidatedLedgerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HoldingConsolidatedLedger model
   */
  readonly fields: HoldingConsolidatedLedgerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HoldingConsolidatedLedger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingConsolidatedLedgerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HoldingConsolidatedLedger model
   */ 
  interface HoldingConsolidatedLedgerFieldRefs {
    readonly id: FieldRef<"HoldingConsolidatedLedger", 'String'>
    readonly tenantId: FieldRef<"HoldingConsolidatedLedger", 'String'>
    readonly periodMonth: FieldRef<"HoldingConsolidatedLedger", 'Int'>
    readonly periodYear: FieldRef<"HoldingConsolidatedLedger", 'Int'>
    readonly totalRevenue: FieldRef<"HoldingConsolidatedLedger", 'Decimal'>
    readonly totalExpense: FieldRef<"HoldingConsolidatedLedger", 'Decimal'>
    readonly netProfitLoss: FieldRef<"HoldingConsolidatedLedger", 'Decimal'>
    readonly totalAssets: FieldRef<"HoldingConsolidatedLedger", 'Decimal'>
    readonly totalLiabilities: FieldRef<"HoldingConsolidatedLedger", 'Decimal'>
    readonly currency: FieldRef<"HoldingConsolidatedLedger", 'String'>
    readonly syncedAt: FieldRef<"HoldingConsolidatedLedger", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HoldingConsolidatedLedger findUnique
   */
  export type HoldingConsolidatedLedgerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * Filter, which HoldingConsolidatedLedger to fetch.
     */
    where: HoldingConsolidatedLedgerWhereUniqueInput
  }

  /**
   * HoldingConsolidatedLedger findUniqueOrThrow
   */
  export type HoldingConsolidatedLedgerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * Filter, which HoldingConsolidatedLedger to fetch.
     */
    where: HoldingConsolidatedLedgerWhereUniqueInput
  }

  /**
   * HoldingConsolidatedLedger findFirst
   */
  export type HoldingConsolidatedLedgerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * Filter, which HoldingConsolidatedLedger to fetch.
     */
    where?: HoldingConsolidatedLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoldingConsolidatedLedgers to fetch.
     */
    orderBy?: HoldingConsolidatedLedgerOrderByWithRelationInput | HoldingConsolidatedLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoldingConsolidatedLedgers.
     */
    cursor?: HoldingConsolidatedLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoldingConsolidatedLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoldingConsolidatedLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoldingConsolidatedLedgers.
     */
    distinct?: HoldingConsolidatedLedgerScalarFieldEnum | HoldingConsolidatedLedgerScalarFieldEnum[]
  }

  /**
   * HoldingConsolidatedLedger findFirstOrThrow
   */
  export type HoldingConsolidatedLedgerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * Filter, which HoldingConsolidatedLedger to fetch.
     */
    where?: HoldingConsolidatedLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoldingConsolidatedLedgers to fetch.
     */
    orderBy?: HoldingConsolidatedLedgerOrderByWithRelationInput | HoldingConsolidatedLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoldingConsolidatedLedgers.
     */
    cursor?: HoldingConsolidatedLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoldingConsolidatedLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoldingConsolidatedLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoldingConsolidatedLedgers.
     */
    distinct?: HoldingConsolidatedLedgerScalarFieldEnum | HoldingConsolidatedLedgerScalarFieldEnum[]
  }

  /**
   * HoldingConsolidatedLedger findMany
   */
  export type HoldingConsolidatedLedgerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * Filter, which HoldingConsolidatedLedgers to fetch.
     */
    where?: HoldingConsolidatedLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoldingConsolidatedLedgers to fetch.
     */
    orderBy?: HoldingConsolidatedLedgerOrderByWithRelationInput | HoldingConsolidatedLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HoldingConsolidatedLedgers.
     */
    cursor?: HoldingConsolidatedLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoldingConsolidatedLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoldingConsolidatedLedgers.
     */
    skip?: number
    distinct?: HoldingConsolidatedLedgerScalarFieldEnum | HoldingConsolidatedLedgerScalarFieldEnum[]
  }

  /**
   * HoldingConsolidatedLedger create
   */
  export type HoldingConsolidatedLedgerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * The data needed to create a HoldingConsolidatedLedger.
     */
    data: XOR<HoldingConsolidatedLedgerCreateInput, HoldingConsolidatedLedgerUncheckedCreateInput>
  }

  /**
   * HoldingConsolidatedLedger createMany
   */
  export type HoldingConsolidatedLedgerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HoldingConsolidatedLedgers.
     */
    data: HoldingConsolidatedLedgerCreateManyInput | HoldingConsolidatedLedgerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HoldingConsolidatedLedger createManyAndReturn
   */
  export type HoldingConsolidatedLedgerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HoldingConsolidatedLedgers.
     */
    data: HoldingConsolidatedLedgerCreateManyInput | HoldingConsolidatedLedgerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HoldingConsolidatedLedger update
   */
  export type HoldingConsolidatedLedgerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * The data needed to update a HoldingConsolidatedLedger.
     */
    data: XOR<HoldingConsolidatedLedgerUpdateInput, HoldingConsolidatedLedgerUncheckedUpdateInput>
    /**
     * Choose, which HoldingConsolidatedLedger to update.
     */
    where: HoldingConsolidatedLedgerWhereUniqueInput
  }

  /**
   * HoldingConsolidatedLedger updateMany
   */
  export type HoldingConsolidatedLedgerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HoldingConsolidatedLedgers.
     */
    data: XOR<HoldingConsolidatedLedgerUpdateManyMutationInput, HoldingConsolidatedLedgerUncheckedUpdateManyInput>
    /**
     * Filter which HoldingConsolidatedLedgers to update
     */
    where?: HoldingConsolidatedLedgerWhereInput
  }

  /**
   * HoldingConsolidatedLedger upsert
   */
  export type HoldingConsolidatedLedgerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * The filter to search for the HoldingConsolidatedLedger to update in case it exists.
     */
    where: HoldingConsolidatedLedgerWhereUniqueInput
    /**
     * In case the HoldingConsolidatedLedger found by the `where` argument doesn't exist, create a new HoldingConsolidatedLedger with this data.
     */
    create: XOR<HoldingConsolidatedLedgerCreateInput, HoldingConsolidatedLedgerUncheckedCreateInput>
    /**
     * In case the HoldingConsolidatedLedger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingConsolidatedLedgerUpdateInput, HoldingConsolidatedLedgerUncheckedUpdateInput>
  }

  /**
   * HoldingConsolidatedLedger delete
   */
  export type HoldingConsolidatedLedgerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
    /**
     * Filter which HoldingConsolidatedLedger to delete.
     */
    where: HoldingConsolidatedLedgerWhereUniqueInput
  }

  /**
   * HoldingConsolidatedLedger deleteMany
   */
  export type HoldingConsolidatedLedgerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoldingConsolidatedLedgers to delete
     */
    where?: HoldingConsolidatedLedgerWhereInput
  }

  /**
   * HoldingConsolidatedLedger without action
   */
  export type HoldingConsolidatedLedgerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoldingConsolidatedLedger
     */
    select?: HoldingConsolidatedLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingConsolidatedLedgerInclude<ExtArgs> | null
  }


  /**
   * Model GlobalAuditLog
   */

  export type AggregateGlobalAuditLog = {
    _count: GlobalAuditLogCountAggregateOutputType | null
    _min: GlobalAuditLogMinAggregateOutputType | null
    _max: GlobalAuditLogMaxAggregateOutputType | null
  }

  export type GlobalAuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    target: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type GlobalAuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    target: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type GlobalAuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    target: number
    details: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type GlobalAuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    target?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type GlobalAuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    target?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type GlobalAuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    target?: true
    details?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type GlobalAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalAuditLog to aggregate.
     */
    where?: GlobalAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAuditLogs to fetch.
     */
    orderBy?: GlobalAuditLogOrderByWithRelationInput | GlobalAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalAuditLogs
    **/
    _count?: true | GlobalAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalAuditLogMaxAggregateInputType
  }

  export type GetGlobalAuditLogAggregateType<T extends GlobalAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalAuditLog[P]>
      : GetScalarType<T[P], AggregateGlobalAuditLog[P]>
  }




  export type GlobalAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalAuditLogWhereInput
    orderBy?: GlobalAuditLogOrderByWithAggregationInput | GlobalAuditLogOrderByWithAggregationInput[]
    by: GlobalAuditLogScalarFieldEnum[] | GlobalAuditLogScalarFieldEnum
    having?: GlobalAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalAuditLogCountAggregateInputType | true
    _min?: GlobalAuditLogMinAggregateInputType
    _max?: GlobalAuditLogMaxAggregateInputType
  }

  export type GlobalAuditLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    target: string
    details: string | null
    ipAddress: string | null
    createdAt: Date
    _count: GlobalAuditLogCountAggregateOutputType | null
    _min: GlobalAuditLogMinAggregateOutputType | null
    _max: GlobalAuditLogMaxAggregateOutputType | null
  }

  type GetGlobalAuditLogGroupByPayload<T extends GlobalAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type GlobalAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    target?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | GlobalAuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["globalAuditLog"]>

  export type GlobalAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    target?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | GlobalAuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["globalAuditLog"]>

  export type GlobalAuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    target?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type GlobalAuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GlobalAuditLog$userArgs<ExtArgs>
  }
  export type GlobalAuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GlobalAuditLog$userArgs<ExtArgs>
  }

  export type $GlobalAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalAuditLog"
    objects: {
      user: Prisma.$MasterUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      target: string
      details: string | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["globalAuditLog"]>
    composites: {}
  }

  type GlobalAuditLogGetPayload<S extends boolean | null | undefined | GlobalAuditLogDefaultArgs> = $Result.GetResult<Prisma.$GlobalAuditLogPayload, S>

  type GlobalAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GlobalAuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GlobalAuditLogCountAggregateInputType | true
    }

  export interface GlobalAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalAuditLog'], meta: { name: 'GlobalAuditLog' } }
    /**
     * Find zero or one GlobalAuditLog that matches the filter.
     * @param {GlobalAuditLogFindUniqueArgs} args - Arguments to find a GlobalAuditLog
     * @example
     * // Get one GlobalAuditLog
     * const globalAuditLog = await prisma.globalAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalAuditLogFindUniqueArgs>(args: SelectSubset<T, GlobalAuditLogFindUniqueArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GlobalAuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GlobalAuditLogFindUniqueOrThrowArgs} args - Arguments to find a GlobalAuditLog
     * @example
     * // Get one GlobalAuditLog
     * const globalAuditLog = await prisma.globalAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GlobalAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogFindFirstArgs} args - Arguments to find a GlobalAuditLog
     * @example
     * // Get one GlobalAuditLog
     * const globalAuditLog = await prisma.globalAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalAuditLogFindFirstArgs>(args?: SelectSubset<T, GlobalAuditLogFindFirstArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GlobalAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogFindFirstOrThrowArgs} args - Arguments to find a GlobalAuditLog
     * @example
     * // Get one GlobalAuditLog
     * const globalAuditLog = await prisma.globalAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GlobalAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalAuditLogs
     * const globalAuditLogs = await prisma.globalAuditLog.findMany()
     * 
     * // Get first 10 GlobalAuditLogs
     * const globalAuditLogs = await prisma.globalAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalAuditLogWithIdOnly = await prisma.globalAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalAuditLogFindManyArgs>(args?: SelectSubset<T, GlobalAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GlobalAuditLog.
     * @param {GlobalAuditLogCreateArgs} args - Arguments to create a GlobalAuditLog.
     * @example
     * // Create one GlobalAuditLog
     * const GlobalAuditLog = await prisma.globalAuditLog.create({
     *   data: {
     *     // ... data to create a GlobalAuditLog
     *   }
     * })
     * 
     */
    create<T extends GlobalAuditLogCreateArgs>(args: SelectSubset<T, GlobalAuditLogCreateArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GlobalAuditLogs.
     * @param {GlobalAuditLogCreateManyArgs} args - Arguments to create many GlobalAuditLogs.
     * @example
     * // Create many GlobalAuditLogs
     * const globalAuditLog = await prisma.globalAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalAuditLogCreateManyArgs>(args?: SelectSubset<T, GlobalAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalAuditLogs and returns the data saved in the database.
     * @param {GlobalAuditLogCreateManyAndReturnArgs} args - Arguments to create many GlobalAuditLogs.
     * @example
     * // Create many GlobalAuditLogs
     * const globalAuditLog = await prisma.globalAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalAuditLogs and only return the `id`
     * const globalAuditLogWithIdOnly = await prisma.globalAuditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GlobalAuditLog.
     * @param {GlobalAuditLogDeleteArgs} args - Arguments to delete one GlobalAuditLog.
     * @example
     * // Delete one GlobalAuditLog
     * const GlobalAuditLog = await prisma.globalAuditLog.delete({
     *   where: {
     *     // ... filter to delete one GlobalAuditLog
     *   }
     * })
     * 
     */
    delete<T extends GlobalAuditLogDeleteArgs>(args: SelectSubset<T, GlobalAuditLogDeleteArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GlobalAuditLog.
     * @param {GlobalAuditLogUpdateArgs} args - Arguments to update one GlobalAuditLog.
     * @example
     * // Update one GlobalAuditLog
     * const globalAuditLog = await prisma.globalAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalAuditLogUpdateArgs>(args: SelectSubset<T, GlobalAuditLogUpdateArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GlobalAuditLogs.
     * @param {GlobalAuditLogDeleteManyArgs} args - Arguments to filter GlobalAuditLogs to delete.
     * @example
     * // Delete a few GlobalAuditLogs
     * const { count } = await prisma.globalAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalAuditLogDeleteManyArgs>(args?: SelectSubset<T, GlobalAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalAuditLogs
     * const globalAuditLog = await prisma.globalAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalAuditLogUpdateManyArgs>(args: SelectSubset<T, GlobalAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GlobalAuditLog.
     * @param {GlobalAuditLogUpsertArgs} args - Arguments to update or create a GlobalAuditLog.
     * @example
     * // Update or create a GlobalAuditLog
     * const globalAuditLog = await prisma.globalAuditLog.upsert({
     *   create: {
     *     // ... data to create a GlobalAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends GlobalAuditLogUpsertArgs>(args: SelectSubset<T, GlobalAuditLogUpsertArgs<ExtArgs>>): Prisma__GlobalAuditLogClient<$Result.GetResult<Prisma.$GlobalAuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GlobalAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogCountArgs} args - Arguments to filter GlobalAuditLogs to count.
     * @example
     * // Count the number of GlobalAuditLogs
     * const count = await prisma.globalAuditLog.count({
     *   where: {
     *     // ... the filter for the GlobalAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends GlobalAuditLogCountArgs>(
      args?: Subset<T, GlobalAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalAuditLogAggregateArgs>(args: Subset<T, GlobalAuditLogAggregateArgs>): Prisma.PrismaPromise<GetGlobalAuditLogAggregateType<T>>

    /**
     * Group by GlobalAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: GlobalAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalAuditLog model
   */
  readonly fields: GlobalAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends GlobalAuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, GlobalAuditLog$userArgs<ExtArgs>>): Prisma__MasterUserClient<$Result.GetResult<Prisma.$MasterUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalAuditLog model
   */ 
  interface GlobalAuditLogFieldRefs {
    readonly id: FieldRef<"GlobalAuditLog", 'String'>
    readonly userId: FieldRef<"GlobalAuditLog", 'String'>
    readonly action: FieldRef<"GlobalAuditLog", 'String'>
    readonly target: FieldRef<"GlobalAuditLog", 'String'>
    readonly details: FieldRef<"GlobalAuditLog", 'String'>
    readonly ipAddress: FieldRef<"GlobalAuditLog", 'String'>
    readonly createdAt: FieldRef<"GlobalAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalAuditLog findUnique
   */
  export type GlobalAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which GlobalAuditLog to fetch.
     */
    where: GlobalAuditLogWhereUniqueInput
  }

  /**
   * GlobalAuditLog findUniqueOrThrow
   */
  export type GlobalAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which GlobalAuditLog to fetch.
     */
    where: GlobalAuditLogWhereUniqueInput
  }

  /**
   * GlobalAuditLog findFirst
   */
  export type GlobalAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which GlobalAuditLog to fetch.
     */
    where?: GlobalAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAuditLogs to fetch.
     */
    orderBy?: GlobalAuditLogOrderByWithRelationInput | GlobalAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalAuditLogs.
     */
    cursor?: GlobalAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalAuditLogs.
     */
    distinct?: GlobalAuditLogScalarFieldEnum | GlobalAuditLogScalarFieldEnum[]
  }

  /**
   * GlobalAuditLog findFirstOrThrow
   */
  export type GlobalAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which GlobalAuditLog to fetch.
     */
    where?: GlobalAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAuditLogs to fetch.
     */
    orderBy?: GlobalAuditLogOrderByWithRelationInput | GlobalAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalAuditLogs.
     */
    cursor?: GlobalAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalAuditLogs.
     */
    distinct?: GlobalAuditLogScalarFieldEnum | GlobalAuditLogScalarFieldEnum[]
  }

  /**
   * GlobalAuditLog findMany
   */
  export type GlobalAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which GlobalAuditLogs to fetch.
     */
    where?: GlobalAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAuditLogs to fetch.
     */
    orderBy?: GlobalAuditLogOrderByWithRelationInput | GlobalAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalAuditLogs.
     */
    cursor?: GlobalAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAuditLogs.
     */
    skip?: number
    distinct?: GlobalAuditLogScalarFieldEnum | GlobalAuditLogScalarFieldEnum[]
  }

  /**
   * GlobalAuditLog create
   */
  export type GlobalAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a GlobalAuditLog.
     */
    data: XOR<GlobalAuditLogCreateInput, GlobalAuditLogUncheckedCreateInput>
  }

  /**
   * GlobalAuditLog createMany
   */
  export type GlobalAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalAuditLogs.
     */
    data: GlobalAuditLogCreateManyInput | GlobalAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalAuditLog createManyAndReturn
   */
  export type GlobalAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GlobalAuditLogs.
     */
    data: GlobalAuditLogCreateManyInput | GlobalAuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GlobalAuditLog update
   */
  export type GlobalAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a GlobalAuditLog.
     */
    data: XOR<GlobalAuditLogUpdateInput, GlobalAuditLogUncheckedUpdateInput>
    /**
     * Choose, which GlobalAuditLog to update.
     */
    where: GlobalAuditLogWhereUniqueInput
  }

  /**
   * GlobalAuditLog updateMany
   */
  export type GlobalAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalAuditLogs.
     */
    data: XOR<GlobalAuditLogUpdateManyMutationInput, GlobalAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which GlobalAuditLogs to update
     */
    where?: GlobalAuditLogWhereInput
  }

  /**
   * GlobalAuditLog upsert
   */
  export type GlobalAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the GlobalAuditLog to update in case it exists.
     */
    where: GlobalAuditLogWhereUniqueInput
    /**
     * In case the GlobalAuditLog found by the `where` argument doesn't exist, create a new GlobalAuditLog with this data.
     */
    create: XOR<GlobalAuditLogCreateInput, GlobalAuditLogUncheckedCreateInput>
    /**
     * In case the GlobalAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalAuditLogUpdateInput, GlobalAuditLogUncheckedUpdateInput>
  }

  /**
   * GlobalAuditLog delete
   */
  export type GlobalAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
    /**
     * Filter which GlobalAuditLog to delete.
     */
    where: GlobalAuditLogWhereUniqueInput
  }

  /**
   * GlobalAuditLog deleteMany
   */
  export type GlobalAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalAuditLogs to delete
     */
    where?: GlobalAuditLogWhereInput
  }

  /**
   * GlobalAuditLog.user
   */
  export type GlobalAuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterUser
     */
    select?: MasterUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterUserInclude<ExtArgs> | null
    where?: MasterUserWhereInput
  }

  /**
   * GlobalAuditLog without action
   */
  export type GlobalAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAuditLog
     */
    select?: GlobalAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalAuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    industryType: 'industryType',
    dbConnectionUri: 'dbConnectionUri',
    status: 'status',
    modulesEnabled: 'modulesEnabled',
    logoUrl: 'logoUrl',
    address: 'address',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const MasterUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
    systemRole: 'systemRole',
    isActive: 'isActive',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MasterUserScalarFieldEnum = (typeof MasterUserScalarFieldEnum)[keyof typeof MasterUserScalarFieldEnum]


  export const UserTenantAccessScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tenantId: 'tenantId',
    isDefault: 'isDefault',
    roleInTenant: 'roleInTenant',
    createdAt: 'createdAt'
  };

  export type UserTenantAccessScalarFieldEnum = (typeof UserTenantAccessScalarFieldEnum)[keyof typeof UserTenantAccessScalarFieldEnum]


  export const HoldingConsolidatedLedgerScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    periodMonth: 'periodMonth',
    periodYear: 'periodYear',
    totalRevenue: 'totalRevenue',
    totalExpense: 'totalExpense',
    netProfitLoss: 'netProfitLoss',
    totalAssets: 'totalAssets',
    totalLiabilities: 'totalLiabilities',
    currency: 'currency',
    syncedAt: 'syncedAt'
  };

  export type HoldingConsolidatedLedgerScalarFieldEnum = (typeof HoldingConsolidatedLedgerScalarFieldEnum)[keyof typeof HoldingConsolidatedLedgerScalarFieldEnum]


  export const GlobalAuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    target: 'target',
    details: 'details',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type GlobalAuditLogScalarFieldEnum = (typeof GlobalAuditLogScalarFieldEnum)[keyof typeof GlobalAuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'IndustryType'
   */
  export type EnumIndustryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IndustryType'>
    


  /**
   * Reference to a field of type 'IndustryType[]'
   */
  export type ListEnumIndustryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IndustryType[]'>
    


  /**
   * Reference to a field of type 'TenantStatus'
   */
  export type EnumTenantStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantStatus'>
    


  /**
   * Reference to a field of type 'TenantStatus[]'
   */
  export type ListEnumTenantStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserSystemRole'
   */
  export type EnumUserSystemRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserSystemRole'>
    


  /**
   * Reference to a field of type 'UserSystemRole[]'
   */
  export type ListEnumUserSystemRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserSystemRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    code?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    industryType?: EnumIndustryTypeFilter<"Tenant"> | $Enums.IndustryType
    dbConnectionUri?: StringFilter<"Tenant"> | string
    status?: EnumTenantStatusFilter<"Tenant"> | $Enums.TenantStatus
    modulesEnabled?: StringNullableListFilter<"Tenant">
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    address?: StringNullableFilter<"Tenant"> | string | null
    phone?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    userAccesses?: UserTenantAccessListRelationFilter
    consolidatedLogs?: HoldingConsolidatedLedgerListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    industryType?: SortOrder
    dbConnectionUri?: SortOrder
    status?: SortOrder
    modulesEnabled?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userAccesses?: UserTenantAccessOrderByRelationAggregateInput
    consolidatedLogs?: HoldingConsolidatedLedgerOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    industryType?: EnumIndustryTypeFilter<"Tenant"> | $Enums.IndustryType
    dbConnectionUri?: StringFilter<"Tenant"> | string
    status?: EnumTenantStatusFilter<"Tenant"> | $Enums.TenantStatus
    modulesEnabled?: StringNullableListFilter<"Tenant">
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    address?: StringNullableFilter<"Tenant"> | string | null
    phone?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    userAccesses?: UserTenantAccessListRelationFilter
    consolidatedLogs?: HoldingConsolidatedLedgerListRelationFilter
  }, "id" | "code">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    industryType?: SortOrder
    dbConnectionUri?: SortOrder
    status?: SortOrder
    modulesEnabled?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    code?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    industryType?: EnumIndustryTypeWithAggregatesFilter<"Tenant"> | $Enums.IndustryType
    dbConnectionUri?: StringWithAggregatesFilter<"Tenant"> | string
    status?: EnumTenantStatusWithAggregatesFilter<"Tenant"> | $Enums.TenantStatus
    modulesEnabled?: StringNullableListFilter<"Tenant">
    logoUrl?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    address?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type MasterUserWhereInput = {
    AND?: MasterUserWhereInput | MasterUserWhereInput[]
    OR?: MasterUserWhereInput[]
    NOT?: MasterUserWhereInput | MasterUserWhereInput[]
    id?: StringFilter<"MasterUser"> | string
    email?: StringFilter<"MasterUser"> | string
    passwordHash?: StringFilter<"MasterUser"> | string
    fullName?: StringFilter<"MasterUser"> | string
    phoneNumber?: StringNullableFilter<"MasterUser"> | string | null
    systemRole?: EnumUserSystemRoleFilter<"MasterUser"> | $Enums.UserSystemRole
    isActive?: BoolFilter<"MasterUser"> | boolean
    avatarUrl?: StringNullableFilter<"MasterUser"> | string | null
    createdAt?: DateTimeFilter<"MasterUser"> | Date | string
    updatedAt?: DateTimeFilter<"MasterUser"> | Date | string
    tenantAccesses?: UserTenantAccessListRelationFilter
    auditLogs?: GlobalAuditLogListRelationFilter
  }

  export type MasterUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantAccesses?: UserTenantAccessOrderByRelationAggregateInput
    auditLogs?: GlobalAuditLogOrderByRelationAggregateInput
  }

  export type MasterUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: MasterUserWhereInput | MasterUserWhereInput[]
    OR?: MasterUserWhereInput[]
    NOT?: MasterUserWhereInput | MasterUserWhereInput[]
    passwordHash?: StringFilter<"MasterUser"> | string
    fullName?: StringFilter<"MasterUser"> | string
    phoneNumber?: StringNullableFilter<"MasterUser"> | string | null
    systemRole?: EnumUserSystemRoleFilter<"MasterUser"> | $Enums.UserSystemRole
    isActive?: BoolFilter<"MasterUser"> | boolean
    avatarUrl?: StringNullableFilter<"MasterUser"> | string | null
    createdAt?: DateTimeFilter<"MasterUser"> | Date | string
    updatedAt?: DateTimeFilter<"MasterUser"> | Date | string
    tenantAccesses?: UserTenantAccessListRelationFilter
    auditLogs?: GlobalAuditLogListRelationFilter
  }, "id" | "email">

  export type MasterUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MasterUserCountOrderByAggregateInput
    _max?: MasterUserMaxOrderByAggregateInput
    _min?: MasterUserMinOrderByAggregateInput
  }

  export type MasterUserScalarWhereWithAggregatesInput = {
    AND?: MasterUserScalarWhereWithAggregatesInput | MasterUserScalarWhereWithAggregatesInput[]
    OR?: MasterUserScalarWhereWithAggregatesInput[]
    NOT?: MasterUserScalarWhereWithAggregatesInput | MasterUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasterUser"> | string
    email?: StringWithAggregatesFilter<"MasterUser"> | string
    passwordHash?: StringWithAggregatesFilter<"MasterUser"> | string
    fullName?: StringWithAggregatesFilter<"MasterUser"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"MasterUser"> | string | null
    systemRole?: EnumUserSystemRoleWithAggregatesFilter<"MasterUser"> | $Enums.UserSystemRole
    isActive?: BoolWithAggregatesFilter<"MasterUser"> | boolean
    avatarUrl?: StringNullableWithAggregatesFilter<"MasterUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MasterUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MasterUser"> | Date | string
  }

  export type UserTenantAccessWhereInput = {
    AND?: UserTenantAccessWhereInput | UserTenantAccessWhereInput[]
    OR?: UserTenantAccessWhereInput[]
    NOT?: UserTenantAccessWhereInput | UserTenantAccessWhereInput[]
    id?: StringFilter<"UserTenantAccess"> | string
    userId?: StringFilter<"UserTenantAccess"> | string
    tenantId?: StringFilter<"UserTenantAccess"> | string
    isDefault?: BoolFilter<"UserTenantAccess"> | boolean
    roleInTenant?: StringFilter<"UserTenantAccess"> | string
    createdAt?: DateTimeFilter<"UserTenantAccess"> | Date | string
    user?: XOR<MasterUserRelationFilter, MasterUserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type UserTenantAccessOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    isDefault?: SortOrder
    roleInTenant?: SortOrder
    createdAt?: SortOrder
    user?: MasterUserOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type UserTenantAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_tenantId?: UserTenantAccessUserIdTenantIdCompoundUniqueInput
    AND?: UserTenantAccessWhereInput | UserTenantAccessWhereInput[]
    OR?: UserTenantAccessWhereInput[]
    NOT?: UserTenantAccessWhereInput | UserTenantAccessWhereInput[]
    userId?: StringFilter<"UserTenantAccess"> | string
    tenantId?: StringFilter<"UserTenantAccess"> | string
    isDefault?: BoolFilter<"UserTenantAccess"> | boolean
    roleInTenant?: StringFilter<"UserTenantAccess"> | string
    createdAt?: DateTimeFilter<"UserTenantAccess"> | Date | string
    user?: XOR<MasterUserRelationFilter, MasterUserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "userId_tenantId">

  export type UserTenantAccessOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    isDefault?: SortOrder
    roleInTenant?: SortOrder
    createdAt?: SortOrder
    _count?: UserTenantAccessCountOrderByAggregateInput
    _max?: UserTenantAccessMaxOrderByAggregateInput
    _min?: UserTenantAccessMinOrderByAggregateInput
  }

  export type UserTenantAccessScalarWhereWithAggregatesInput = {
    AND?: UserTenantAccessScalarWhereWithAggregatesInput | UserTenantAccessScalarWhereWithAggregatesInput[]
    OR?: UserTenantAccessScalarWhereWithAggregatesInput[]
    NOT?: UserTenantAccessScalarWhereWithAggregatesInput | UserTenantAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserTenantAccess"> | string
    userId?: StringWithAggregatesFilter<"UserTenantAccess"> | string
    tenantId?: StringWithAggregatesFilter<"UserTenantAccess"> | string
    isDefault?: BoolWithAggregatesFilter<"UserTenantAccess"> | boolean
    roleInTenant?: StringWithAggregatesFilter<"UserTenantAccess"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserTenantAccess"> | Date | string
  }

  export type HoldingConsolidatedLedgerWhereInput = {
    AND?: HoldingConsolidatedLedgerWhereInput | HoldingConsolidatedLedgerWhereInput[]
    OR?: HoldingConsolidatedLedgerWhereInput[]
    NOT?: HoldingConsolidatedLedgerWhereInput | HoldingConsolidatedLedgerWhereInput[]
    id?: StringFilter<"HoldingConsolidatedLedger"> | string
    tenantId?: StringFilter<"HoldingConsolidatedLedger"> | string
    periodMonth?: IntFilter<"HoldingConsolidatedLedger"> | number
    periodYear?: IntFilter<"HoldingConsolidatedLedger"> | number
    totalRevenue?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"HoldingConsolidatedLedger"> | string
    syncedAt?: DateTimeFilter<"HoldingConsolidatedLedger"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type HoldingConsolidatedLedgerOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    currency?: SortOrder
    syncedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type HoldingConsolidatedLedgerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_periodYear_periodMonth?: HoldingConsolidatedLedgerTenantIdPeriodYearPeriodMonthCompoundUniqueInput
    AND?: HoldingConsolidatedLedgerWhereInput | HoldingConsolidatedLedgerWhereInput[]
    OR?: HoldingConsolidatedLedgerWhereInput[]
    NOT?: HoldingConsolidatedLedgerWhereInput | HoldingConsolidatedLedgerWhereInput[]
    tenantId?: StringFilter<"HoldingConsolidatedLedger"> | string
    periodMonth?: IntFilter<"HoldingConsolidatedLedger"> | number
    periodYear?: IntFilter<"HoldingConsolidatedLedger"> | number
    totalRevenue?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"HoldingConsolidatedLedger"> | string
    syncedAt?: DateTimeFilter<"HoldingConsolidatedLedger"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_periodYear_periodMonth">

  export type HoldingConsolidatedLedgerOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    currency?: SortOrder
    syncedAt?: SortOrder
    _count?: HoldingConsolidatedLedgerCountOrderByAggregateInput
    _avg?: HoldingConsolidatedLedgerAvgOrderByAggregateInput
    _max?: HoldingConsolidatedLedgerMaxOrderByAggregateInput
    _min?: HoldingConsolidatedLedgerMinOrderByAggregateInput
    _sum?: HoldingConsolidatedLedgerSumOrderByAggregateInput
  }

  export type HoldingConsolidatedLedgerScalarWhereWithAggregatesInput = {
    AND?: HoldingConsolidatedLedgerScalarWhereWithAggregatesInput | HoldingConsolidatedLedgerScalarWhereWithAggregatesInput[]
    OR?: HoldingConsolidatedLedgerScalarWhereWithAggregatesInput[]
    NOT?: HoldingConsolidatedLedgerScalarWhereWithAggregatesInput | HoldingConsolidatedLedgerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HoldingConsolidatedLedger"> | string
    tenantId?: StringWithAggregatesFilter<"HoldingConsolidatedLedger"> | string
    periodMonth?: IntWithAggregatesFilter<"HoldingConsolidatedLedger"> | number
    periodYear?: IntWithAggregatesFilter<"HoldingConsolidatedLedger"> | number
    totalRevenue?: DecimalWithAggregatesFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalWithAggregatesFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalWithAggregatesFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalWithAggregatesFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalWithAggregatesFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"HoldingConsolidatedLedger"> | string
    syncedAt?: DateTimeWithAggregatesFilter<"HoldingConsolidatedLedger"> | Date | string
  }

  export type GlobalAuditLogWhereInput = {
    AND?: GlobalAuditLogWhereInput | GlobalAuditLogWhereInput[]
    OR?: GlobalAuditLogWhereInput[]
    NOT?: GlobalAuditLogWhereInput | GlobalAuditLogWhereInput[]
    id?: StringFilter<"GlobalAuditLog"> | string
    userId?: StringNullableFilter<"GlobalAuditLog"> | string | null
    action?: StringFilter<"GlobalAuditLog"> | string
    target?: StringFilter<"GlobalAuditLog"> | string
    details?: StringNullableFilter<"GlobalAuditLog"> | string | null
    ipAddress?: StringNullableFilter<"GlobalAuditLog"> | string | null
    createdAt?: DateTimeFilter<"GlobalAuditLog"> | Date | string
    user?: XOR<MasterUserNullableRelationFilter, MasterUserWhereInput> | null
  }

  export type GlobalAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    target?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: MasterUserOrderByWithRelationInput
  }

  export type GlobalAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GlobalAuditLogWhereInput | GlobalAuditLogWhereInput[]
    OR?: GlobalAuditLogWhereInput[]
    NOT?: GlobalAuditLogWhereInput | GlobalAuditLogWhereInput[]
    userId?: StringNullableFilter<"GlobalAuditLog"> | string | null
    action?: StringFilter<"GlobalAuditLog"> | string
    target?: StringFilter<"GlobalAuditLog"> | string
    details?: StringNullableFilter<"GlobalAuditLog"> | string | null
    ipAddress?: StringNullableFilter<"GlobalAuditLog"> | string | null
    createdAt?: DateTimeFilter<"GlobalAuditLog"> | Date | string
    user?: XOR<MasterUserNullableRelationFilter, MasterUserWhereInput> | null
  }, "id">

  export type GlobalAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    target?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GlobalAuditLogCountOrderByAggregateInput
    _max?: GlobalAuditLogMaxOrderByAggregateInput
    _min?: GlobalAuditLogMinOrderByAggregateInput
  }

  export type GlobalAuditLogScalarWhereWithAggregatesInput = {
    AND?: GlobalAuditLogScalarWhereWithAggregatesInput | GlobalAuditLogScalarWhereWithAggregatesInput[]
    OR?: GlobalAuditLogScalarWhereWithAggregatesInput[]
    NOT?: GlobalAuditLogScalarWhereWithAggregatesInput | GlobalAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GlobalAuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"GlobalAuditLog"> | string | null
    action?: StringWithAggregatesFilter<"GlobalAuditLog"> | string
    target?: StringWithAggregatesFilter<"GlobalAuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"GlobalAuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"GlobalAuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GlobalAuditLog"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAccesses?: UserTenantAccessCreateNestedManyWithoutTenantInput
    consolidatedLogs?: HoldingConsolidatedLedgerCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAccesses?: UserTenantAccessUncheckedCreateNestedManyWithoutTenantInput
    consolidatedLogs?: HoldingConsolidatedLedgerUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAccesses?: UserTenantAccessUpdateManyWithoutTenantNestedInput
    consolidatedLogs?: HoldingConsolidatedLedgerUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAccesses?: UserTenantAccessUncheckedUpdateManyWithoutTenantNestedInput
    consolidatedLogs?: HoldingConsolidatedLedgerUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterUserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantAccesses?: UserTenantAccessCreateNestedManyWithoutUserInput
    auditLogs?: GlobalAuditLogCreateNestedManyWithoutUserInput
  }

  export type MasterUserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantAccesses?: UserTenantAccessUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: GlobalAuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type MasterUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantAccesses?: UserTenantAccessUpdateManyWithoutUserNestedInput
    auditLogs?: GlobalAuditLogUpdateManyWithoutUserNestedInput
  }

  export type MasterUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantAccesses?: UserTenantAccessUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: GlobalAuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MasterUserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTenantAccessCreateInput = {
    id?: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
    user: MasterUserCreateNestedOneWithoutTenantAccessesInput
    tenant: TenantCreateNestedOneWithoutUserAccessesInput
  }

  export type UserTenantAccessUncheckedCreateInput = {
    id?: string
    userId: string
    tenantId: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
  }

  export type UserTenantAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: MasterUserUpdateOneRequiredWithoutTenantAccessesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutUserAccessesNestedInput
  }

  export type UserTenantAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTenantAccessCreateManyInput = {
    id?: string
    userId: string
    tenantId: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
  }

  export type UserTenantAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTenantAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingConsolidatedLedgerCreateInput = {
    id?: string
    periodMonth: number
    periodYear: number
    totalRevenue?: Decimal | DecimalJsLike | number | string
    totalExpense?: Decimal | DecimalJsLike | number | string
    netProfitLoss?: Decimal | DecimalJsLike | number | string
    totalAssets?: Decimal | DecimalJsLike | number | string
    totalLiabilities?: Decimal | DecimalJsLike | number | string
    currency?: string
    syncedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutConsolidatedLogsInput
  }

  export type HoldingConsolidatedLedgerUncheckedCreateInput = {
    id?: string
    tenantId: string
    periodMonth: number
    periodYear: number
    totalRevenue?: Decimal | DecimalJsLike | number | string
    totalExpense?: Decimal | DecimalJsLike | number | string
    netProfitLoss?: Decimal | DecimalJsLike | number | string
    totalAssets?: Decimal | DecimalJsLike | number | string
    totalLiabilities?: Decimal | DecimalJsLike | number | string
    currency?: string
    syncedAt?: Date | string
  }

  export type HoldingConsolidatedLedgerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutConsolidatedLogsNestedInput
  }

  export type HoldingConsolidatedLedgerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingConsolidatedLedgerCreateManyInput = {
    id?: string
    tenantId: string
    periodMonth: number
    periodYear: number
    totalRevenue?: Decimal | DecimalJsLike | number | string
    totalExpense?: Decimal | DecimalJsLike | number | string
    netProfitLoss?: Decimal | DecimalJsLike | number | string
    totalAssets?: Decimal | DecimalJsLike | number | string
    totalLiabilities?: Decimal | DecimalJsLike | number | string
    currency?: string
    syncedAt?: Date | string
  }

  export type HoldingConsolidatedLedgerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingConsolidatedLedgerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAuditLogCreateInput = {
    id?: string
    action: string
    target: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    user?: MasterUserCreateNestedOneWithoutAuditLogsInput
  }

  export type GlobalAuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    target: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type GlobalAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: MasterUserUpdateOneWithoutAuditLogsNestedInput
  }

  export type GlobalAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    target: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type GlobalAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumIndustryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.IndustryType | EnumIndustryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndustryTypeFilter<$PrismaModel> | $Enums.IndustryType
  }

  export type EnumTenantStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusFilter<$PrismaModel> | $Enums.TenantStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserTenantAccessListRelationFilter = {
    every?: UserTenantAccessWhereInput
    some?: UserTenantAccessWhereInput
    none?: UserTenantAccessWhereInput
  }

  export type HoldingConsolidatedLedgerListRelationFilter = {
    every?: HoldingConsolidatedLedgerWhereInput
    some?: HoldingConsolidatedLedgerWhereInput
    none?: HoldingConsolidatedLedgerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserTenantAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HoldingConsolidatedLedgerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    industryType?: SortOrder
    dbConnectionUri?: SortOrder
    status?: SortOrder
    modulesEnabled?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    industryType?: SortOrder
    dbConnectionUri?: SortOrder
    status?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    industryType?: SortOrder
    dbConnectionUri?: SortOrder
    status?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumIndustryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IndustryType | EnumIndustryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndustryTypeWithAggregatesFilter<$PrismaModel> | $Enums.IndustryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIndustryTypeFilter<$PrismaModel>
    _max?: NestedEnumIndustryTypeFilter<$PrismaModel>
  }

  export type EnumTenantStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel> | $Enums.TenantStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantStatusFilter<$PrismaModel>
    _max?: NestedEnumTenantStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserSystemRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserSystemRole | EnumUserSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserSystemRoleFilter<$PrismaModel> | $Enums.UserSystemRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type GlobalAuditLogListRelationFilter = {
    every?: GlobalAuditLogWhereInput
    some?: GlobalAuditLogWhereInput
    none?: GlobalAuditLogWhereInput
  }

  export type GlobalAuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MasterUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserSystemRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserSystemRole | EnumUserSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserSystemRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserSystemRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserSystemRoleFilter<$PrismaModel>
    _max?: NestedEnumUserSystemRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MasterUserRelationFilter = {
    is?: MasterUserWhereInput
    isNot?: MasterUserWhereInput
  }

  export type TenantRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type UserTenantAccessUserIdTenantIdCompoundUniqueInput = {
    userId: string
    tenantId: string
  }

  export type UserTenantAccessCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    isDefault?: SortOrder
    roleInTenant?: SortOrder
    createdAt?: SortOrder
  }

  export type UserTenantAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    isDefault?: SortOrder
    roleInTenant?: SortOrder
    createdAt?: SortOrder
  }

  export type UserTenantAccessMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    isDefault?: SortOrder
    roleInTenant?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type HoldingConsolidatedLedgerTenantIdPeriodYearPeriodMonthCompoundUniqueInput = {
    tenantId: string
    periodYear: number
    periodMonth: number
  }

  export type HoldingConsolidatedLedgerCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    currency?: SortOrder
    syncedAt?: SortOrder
  }

  export type HoldingConsolidatedLedgerAvgOrderByAggregateInput = {
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
  }

  export type HoldingConsolidatedLedgerMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    currency?: SortOrder
    syncedAt?: SortOrder
  }

  export type HoldingConsolidatedLedgerMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    currency?: SortOrder
    syncedAt?: SortOrder
  }

  export type HoldingConsolidatedLedgerSumOrderByAggregateInput = {
    periodMonth?: SortOrder
    periodYear?: SortOrder
    totalRevenue?: SortOrder
    totalExpense?: SortOrder
    netProfitLoss?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type MasterUserNullableRelationFilter = {
    is?: MasterUserWhereInput | null
    isNot?: MasterUserWhereInput | null
  }

  export type GlobalAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    target?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type GlobalAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    target?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type GlobalAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    target?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantCreatemodulesEnabledInput = {
    set: string[]
  }

  export type UserTenantAccessCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserTenantAccessCreateWithoutTenantInput, UserTenantAccessUncheckedCreateWithoutTenantInput> | UserTenantAccessCreateWithoutTenantInput[] | UserTenantAccessUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutTenantInput | UserTenantAccessCreateOrConnectWithoutTenantInput[]
    createMany?: UserTenantAccessCreateManyTenantInputEnvelope
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
  }

  export type HoldingConsolidatedLedgerCreateNestedManyWithoutTenantInput = {
    create?: XOR<HoldingConsolidatedLedgerCreateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput> | HoldingConsolidatedLedgerCreateWithoutTenantInput[] | HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput | HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput[]
    createMany?: HoldingConsolidatedLedgerCreateManyTenantInputEnvelope
    connect?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
  }

  export type UserTenantAccessUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserTenantAccessCreateWithoutTenantInput, UserTenantAccessUncheckedCreateWithoutTenantInput> | UserTenantAccessCreateWithoutTenantInput[] | UserTenantAccessUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutTenantInput | UserTenantAccessCreateOrConnectWithoutTenantInput[]
    createMany?: UserTenantAccessCreateManyTenantInputEnvelope
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
  }

  export type HoldingConsolidatedLedgerUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<HoldingConsolidatedLedgerCreateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput> | HoldingConsolidatedLedgerCreateWithoutTenantInput[] | HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput | HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput[]
    createMany?: HoldingConsolidatedLedgerCreateManyTenantInputEnvelope
    connect?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumIndustryTypeFieldUpdateOperationsInput = {
    set?: $Enums.IndustryType
  }

  export type EnumTenantStatusFieldUpdateOperationsInput = {
    set?: $Enums.TenantStatus
  }

  export type TenantUpdatemodulesEnabledInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserTenantAccessUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserTenantAccessCreateWithoutTenantInput, UserTenantAccessUncheckedCreateWithoutTenantInput> | UserTenantAccessCreateWithoutTenantInput[] | UserTenantAccessUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutTenantInput | UserTenantAccessCreateOrConnectWithoutTenantInput[]
    upsert?: UserTenantAccessUpsertWithWhereUniqueWithoutTenantInput | UserTenantAccessUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserTenantAccessCreateManyTenantInputEnvelope
    set?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    disconnect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    delete?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    update?: UserTenantAccessUpdateWithWhereUniqueWithoutTenantInput | UserTenantAccessUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserTenantAccessUpdateManyWithWhereWithoutTenantInput | UserTenantAccessUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserTenantAccessScalarWhereInput | UserTenantAccessScalarWhereInput[]
  }

  export type HoldingConsolidatedLedgerUpdateManyWithoutTenantNestedInput = {
    create?: XOR<HoldingConsolidatedLedgerCreateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput> | HoldingConsolidatedLedgerCreateWithoutTenantInput[] | HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput | HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput[]
    upsert?: HoldingConsolidatedLedgerUpsertWithWhereUniqueWithoutTenantInput | HoldingConsolidatedLedgerUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: HoldingConsolidatedLedgerCreateManyTenantInputEnvelope
    set?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    disconnect?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    delete?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    connect?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    update?: HoldingConsolidatedLedgerUpdateWithWhereUniqueWithoutTenantInput | HoldingConsolidatedLedgerUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: HoldingConsolidatedLedgerUpdateManyWithWhereWithoutTenantInput | HoldingConsolidatedLedgerUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: HoldingConsolidatedLedgerScalarWhereInput | HoldingConsolidatedLedgerScalarWhereInput[]
  }

  export type UserTenantAccessUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserTenantAccessCreateWithoutTenantInput, UserTenantAccessUncheckedCreateWithoutTenantInput> | UserTenantAccessCreateWithoutTenantInput[] | UserTenantAccessUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutTenantInput | UserTenantAccessCreateOrConnectWithoutTenantInput[]
    upsert?: UserTenantAccessUpsertWithWhereUniqueWithoutTenantInput | UserTenantAccessUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserTenantAccessCreateManyTenantInputEnvelope
    set?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    disconnect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    delete?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    update?: UserTenantAccessUpdateWithWhereUniqueWithoutTenantInput | UserTenantAccessUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserTenantAccessUpdateManyWithWhereWithoutTenantInput | UserTenantAccessUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserTenantAccessScalarWhereInput | UserTenantAccessScalarWhereInput[]
  }

  export type HoldingConsolidatedLedgerUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<HoldingConsolidatedLedgerCreateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput> | HoldingConsolidatedLedgerCreateWithoutTenantInput[] | HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput | HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput[]
    upsert?: HoldingConsolidatedLedgerUpsertWithWhereUniqueWithoutTenantInput | HoldingConsolidatedLedgerUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: HoldingConsolidatedLedgerCreateManyTenantInputEnvelope
    set?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    disconnect?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    delete?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    connect?: HoldingConsolidatedLedgerWhereUniqueInput | HoldingConsolidatedLedgerWhereUniqueInput[]
    update?: HoldingConsolidatedLedgerUpdateWithWhereUniqueWithoutTenantInput | HoldingConsolidatedLedgerUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: HoldingConsolidatedLedgerUpdateManyWithWhereWithoutTenantInput | HoldingConsolidatedLedgerUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: HoldingConsolidatedLedgerScalarWhereInput | HoldingConsolidatedLedgerScalarWhereInput[]
  }

  export type UserTenantAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<UserTenantAccessCreateWithoutUserInput, UserTenantAccessUncheckedCreateWithoutUserInput> | UserTenantAccessCreateWithoutUserInput[] | UserTenantAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutUserInput | UserTenantAccessCreateOrConnectWithoutUserInput[]
    createMany?: UserTenantAccessCreateManyUserInputEnvelope
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
  }

  export type GlobalAuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<GlobalAuditLogCreateWithoutUserInput, GlobalAuditLogUncheckedCreateWithoutUserInput> | GlobalAuditLogCreateWithoutUserInput[] | GlobalAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GlobalAuditLogCreateOrConnectWithoutUserInput | GlobalAuditLogCreateOrConnectWithoutUserInput[]
    createMany?: GlobalAuditLogCreateManyUserInputEnvelope
    connect?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
  }

  export type UserTenantAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserTenantAccessCreateWithoutUserInput, UserTenantAccessUncheckedCreateWithoutUserInput> | UserTenantAccessCreateWithoutUserInput[] | UserTenantAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutUserInput | UserTenantAccessCreateOrConnectWithoutUserInput[]
    createMany?: UserTenantAccessCreateManyUserInputEnvelope
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
  }

  export type GlobalAuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GlobalAuditLogCreateWithoutUserInput, GlobalAuditLogUncheckedCreateWithoutUserInput> | GlobalAuditLogCreateWithoutUserInput[] | GlobalAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GlobalAuditLogCreateOrConnectWithoutUserInput | GlobalAuditLogCreateOrConnectWithoutUserInput[]
    createMany?: GlobalAuditLogCreateManyUserInputEnvelope
    connect?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
  }

  export type EnumUserSystemRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserSystemRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserTenantAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserTenantAccessCreateWithoutUserInput, UserTenantAccessUncheckedCreateWithoutUserInput> | UserTenantAccessCreateWithoutUserInput[] | UserTenantAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutUserInput | UserTenantAccessCreateOrConnectWithoutUserInput[]
    upsert?: UserTenantAccessUpsertWithWhereUniqueWithoutUserInput | UserTenantAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserTenantAccessCreateManyUserInputEnvelope
    set?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    disconnect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    delete?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    update?: UserTenantAccessUpdateWithWhereUniqueWithoutUserInput | UserTenantAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserTenantAccessUpdateManyWithWhereWithoutUserInput | UserTenantAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserTenantAccessScalarWhereInput | UserTenantAccessScalarWhereInput[]
  }

  export type GlobalAuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<GlobalAuditLogCreateWithoutUserInput, GlobalAuditLogUncheckedCreateWithoutUserInput> | GlobalAuditLogCreateWithoutUserInput[] | GlobalAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GlobalAuditLogCreateOrConnectWithoutUserInput | GlobalAuditLogCreateOrConnectWithoutUserInput[]
    upsert?: GlobalAuditLogUpsertWithWhereUniqueWithoutUserInput | GlobalAuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GlobalAuditLogCreateManyUserInputEnvelope
    set?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    disconnect?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    delete?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    connect?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    update?: GlobalAuditLogUpdateWithWhereUniqueWithoutUserInput | GlobalAuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GlobalAuditLogUpdateManyWithWhereWithoutUserInput | GlobalAuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GlobalAuditLogScalarWhereInput | GlobalAuditLogScalarWhereInput[]
  }

  export type UserTenantAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserTenantAccessCreateWithoutUserInput, UserTenantAccessUncheckedCreateWithoutUserInput> | UserTenantAccessCreateWithoutUserInput[] | UserTenantAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTenantAccessCreateOrConnectWithoutUserInput | UserTenantAccessCreateOrConnectWithoutUserInput[]
    upsert?: UserTenantAccessUpsertWithWhereUniqueWithoutUserInput | UserTenantAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserTenantAccessCreateManyUserInputEnvelope
    set?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    disconnect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    delete?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    connect?: UserTenantAccessWhereUniqueInput | UserTenantAccessWhereUniqueInput[]
    update?: UserTenantAccessUpdateWithWhereUniqueWithoutUserInput | UserTenantAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserTenantAccessUpdateManyWithWhereWithoutUserInput | UserTenantAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserTenantAccessScalarWhereInput | UserTenantAccessScalarWhereInput[]
  }

  export type GlobalAuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GlobalAuditLogCreateWithoutUserInput, GlobalAuditLogUncheckedCreateWithoutUserInput> | GlobalAuditLogCreateWithoutUserInput[] | GlobalAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GlobalAuditLogCreateOrConnectWithoutUserInput | GlobalAuditLogCreateOrConnectWithoutUserInput[]
    upsert?: GlobalAuditLogUpsertWithWhereUniqueWithoutUserInput | GlobalAuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GlobalAuditLogCreateManyUserInputEnvelope
    set?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    disconnect?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    delete?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    connect?: GlobalAuditLogWhereUniqueInput | GlobalAuditLogWhereUniqueInput[]
    update?: GlobalAuditLogUpdateWithWhereUniqueWithoutUserInput | GlobalAuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GlobalAuditLogUpdateManyWithWhereWithoutUserInput | GlobalAuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GlobalAuditLogScalarWhereInput | GlobalAuditLogScalarWhereInput[]
  }

  export type MasterUserCreateNestedOneWithoutTenantAccessesInput = {
    create?: XOR<MasterUserCreateWithoutTenantAccessesInput, MasterUserUncheckedCreateWithoutTenantAccessesInput>
    connectOrCreate?: MasterUserCreateOrConnectWithoutTenantAccessesInput
    connect?: MasterUserWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutUserAccessesInput = {
    create?: XOR<TenantCreateWithoutUserAccessesInput, TenantUncheckedCreateWithoutUserAccessesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUserAccessesInput
    connect?: TenantWhereUniqueInput
  }

  export type MasterUserUpdateOneRequiredWithoutTenantAccessesNestedInput = {
    create?: XOR<MasterUserCreateWithoutTenantAccessesInput, MasterUserUncheckedCreateWithoutTenantAccessesInput>
    connectOrCreate?: MasterUserCreateOrConnectWithoutTenantAccessesInput
    upsert?: MasterUserUpsertWithoutTenantAccessesInput
    connect?: MasterUserWhereUniqueInput
    update?: XOR<XOR<MasterUserUpdateToOneWithWhereWithoutTenantAccessesInput, MasterUserUpdateWithoutTenantAccessesInput>, MasterUserUncheckedUpdateWithoutTenantAccessesInput>
  }

  export type TenantUpdateOneRequiredWithoutUserAccessesNestedInput = {
    create?: XOR<TenantCreateWithoutUserAccessesInput, TenantUncheckedCreateWithoutUserAccessesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUserAccessesInput
    upsert?: TenantUpsertWithoutUserAccessesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUserAccessesInput, TenantUpdateWithoutUserAccessesInput>, TenantUncheckedUpdateWithoutUserAccessesInput>
  }

  export type TenantCreateNestedOneWithoutConsolidatedLogsInput = {
    create?: XOR<TenantCreateWithoutConsolidatedLogsInput, TenantUncheckedCreateWithoutConsolidatedLogsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutConsolidatedLogsInput
    connect?: TenantWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type TenantUpdateOneRequiredWithoutConsolidatedLogsNestedInput = {
    create?: XOR<TenantCreateWithoutConsolidatedLogsInput, TenantUncheckedCreateWithoutConsolidatedLogsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutConsolidatedLogsInput
    upsert?: TenantUpsertWithoutConsolidatedLogsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutConsolidatedLogsInput, TenantUpdateWithoutConsolidatedLogsInput>, TenantUncheckedUpdateWithoutConsolidatedLogsInput>
  }

  export type MasterUserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<MasterUserCreateWithoutAuditLogsInput, MasterUserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MasterUserCreateOrConnectWithoutAuditLogsInput
    connect?: MasterUserWhereUniqueInput
  }

  export type MasterUserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<MasterUserCreateWithoutAuditLogsInput, MasterUserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MasterUserCreateOrConnectWithoutAuditLogsInput
    upsert?: MasterUserUpsertWithoutAuditLogsInput
    disconnect?: MasterUserWhereInput | boolean
    delete?: MasterUserWhereInput | boolean
    connect?: MasterUserWhereUniqueInput
    update?: XOR<XOR<MasterUserUpdateToOneWithWhereWithoutAuditLogsInput, MasterUserUpdateWithoutAuditLogsInput>, MasterUserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumIndustryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.IndustryType | EnumIndustryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndustryTypeFilter<$PrismaModel> | $Enums.IndustryType
  }

  export type NestedEnumTenantStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusFilter<$PrismaModel> | $Enums.TenantStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumIndustryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IndustryType | EnumIndustryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndustryType[] | ListEnumIndustryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndustryTypeWithAggregatesFilter<$PrismaModel> | $Enums.IndustryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIndustryTypeFilter<$PrismaModel>
    _max?: NestedEnumIndustryTypeFilter<$PrismaModel>
  }

  export type NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel> | $Enums.TenantStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantStatusFilter<$PrismaModel>
    _max?: NestedEnumTenantStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserSystemRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserSystemRole | EnumUserSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserSystemRoleFilter<$PrismaModel> | $Enums.UserSystemRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserSystemRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserSystemRole | EnumUserSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserSystemRole[] | ListEnumUserSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserSystemRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserSystemRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserSystemRoleFilter<$PrismaModel>
    _max?: NestedEnumUserSystemRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type UserTenantAccessCreateWithoutTenantInput = {
    id?: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
    user: MasterUserCreateNestedOneWithoutTenantAccessesInput
  }

  export type UserTenantAccessUncheckedCreateWithoutTenantInput = {
    id?: string
    userId: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
  }

  export type UserTenantAccessCreateOrConnectWithoutTenantInput = {
    where: UserTenantAccessWhereUniqueInput
    create: XOR<UserTenantAccessCreateWithoutTenantInput, UserTenantAccessUncheckedCreateWithoutTenantInput>
  }

  export type UserTenantAccessCreateManyTenantInputEnvelope = {
    data: UserTenantAccessCreateManyTenantInput | UserTenantAccessCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type HoldingConsolidatedLedgerCreateWithoutTenantInput = {
    id?: string
    periodMonth: number
    periodYear: number
    totalRevenue?: Decimal | DecimalJsLike | number | string
    totalExpense?: Decimal | DecimalJsLike | number | string
    netProfitLoss?: Decimal | DecimalJsLike | number | string
    totalAssets?: Decimal | DecimalJsLike | number | string
    totalLiabilities?: Decimal | DecimalJsLike | number | string
    currency?: string
    syncedAt?: Date | string
  }

  export type HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput = {
    id?: string
    periodMonth: number
    periodYear: number
    totalRevenue?: Decimal | DecimalJsLike | number | string
    totalExpense?: Decimal | DecimalJsLike | number | string
    netProfitLoss?: Decimal | DecimalJsLike | number | string
    totalAssets?: Decimal | DecimalJsLike | number | string
    totalLiabilities?: Decimal | DecimalJsLike | number | string
    currency?: string
    syncedAt?: Date | string
  }

  export type HoldingConsolidatedLedgerCreateOrConnectWithoutTenantInput = {
    where: HoldingConsolidatedLedgerWhereUniqueInput
    create: XOR<HoldingConsolidatedLedgerCreateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput>
  }

  export type HoldingConsolidatedLedgerCreateManyTenantInputEnvelope = {
    data: HoldingConsolidatedLedgerCreateManyTenantInput | HoldingConsolidatedLedgerCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UserTenantAccessUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserTenantAccessWhereUniqueInput
    update: XOR<UserTenantAccessUpdateWithoutTenantInput, UserTenantAccessUncheckedUpdateWithoutTenantInput>
    create: XOR<UserTenantAccessCreateWithoutTenantInput, UserTenantAccessUncheckedCreateWithoutTenantInput>
  }

  export type UserTenantAccessUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserTenantAccessWhereUniqueInput
    data: XOR<UserTenantAccessUpdateWithoutTenantInput, UserTenantAccessUncheckedUpdateWithoutTenantInput>
  }

  export type UserTenantAccessUpdateManyWithWhereWithoutTenantInput = {
    where: UserTenantAccessScalarWhereInput
    data: XOR<UserTenantAccessUpdateManyMutationInput, UserTenantAccessUncheckedUpdateManyWithoutTenantInput>
  }

  export type UserTenantAccessScalarWhereInput = {
    AND?: UserTenantAccessScalarWhereInput | UserTenantAccessScalarWhereInput[]
    OR?: UserTenantAccessScalarWhereInput[]
    NOT?: UserTenantAccessScalarWhereInput | UserTenantAccessScalarWhereInput[]
    id?: StringFilter<"UserTenantAccess"> | string
    userId?: StringFilter<"UserTenantAccess"> | string
    tenantId?: StringFilter<"UserTenantAccess"> | string
    isDefault?: BoolFilter<"UserTenantAccess"> | boolean
    roleInTenant?: StringFilter<"UserTenantAccess"> | string
    createdAt?: DateTimeFilter<"UserTenantAccess"> | Date | string
  }

  export type HoldingConsolidatedLedgerUpsertWithWhereUniqueWithoutTenantInput = {
    where: HoldingConsolidatedLedgerWhereUniqueInput
    update: XOR<HoldingConsolidatedLedgerUpdateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedUpdateWithoutTenantInput>
    create: XOR<HoldingConsolidatedLedgerCreateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedCreateWithoutTenantInput>
  }

  export type HoldingConsolidatedLedgerUpdateWithWhereUniqueWithoutTenantInput = {
    where: HoldingConsolidatedLedgerWhereUniqueInput
    data: XOR<HoldingConsolidatedLedgerUpdateWithoutTenantInput, HoldingConsolidatedLedgerUncheckedUpdateWithoutTenantInput>
  }

  export type HoldingConsolidatedLedgerUpdateManyWithWhereWithoutTenantInput = {
    where: HoldingConsolidatedLedgerScalarWhereInput
    data: XOR<HoldingConsolidatedLedgerUpdateManyMutationInput, HoldingConsolidatedLedgerUncheckedUpdateManyWithoutTenantInput>
  }

  export type HoldingConsolidatedLedgerScalarWhereInput = {
    AND?: HoldingConsolidatedLedgerScalarWhereInput | HoldingConsolidatedLedgerScalarWhereInput[]
    OR?: HoldingConsolidatedLedgerScalarWhereInput[]
    NOT?: HoldingConsolidatedLedgerScalarWhereInput | HoldingConsolidatedLedgerScalarWhereInput[]
    id?: StringFilter<"HoldingConsolidatedLedger"> | string
    tenantId?: StringFilter<"HoldingConsolidatedLedger"> | string
    periodMonth?: IntFilter<"HoldingConsolidatedLedger"> | number
    periodYear?: IntFilter<"HoldingConsolidatedLedger"> | number
    totalRevenue?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFilter<"HoldingConsolidatedLedger"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"HoldingConsolidatedLedger"> | string
    syncedAt?: DateTimeFilter<"HoldingConsolidatedLedger"> | Date | string
  }

  export type UserTenantAccessCreateWithoutUserInput = {
    id?: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUserAccessesInput
  }

  export type UserTenantAccessUncheckedCreateWithoutUserInput = {
    id?: string
    tenantId: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
  }

  export type UserTenantAccessCreateOrConnectWithoutUserInput = {
    where: UserTenantAccessWhereUniqueInput
    create: XOR<UserTenantAccessCreateWithoutUserInput, UserTenantAccessUncheckedCreateWithoutUserInput>
  }

  export type UserTenantAccessCreateManyUserInputEnvelope = {
    data: UserTenantAccessCreateManyUserInput | UserTenantAccessCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GlobalAuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    target: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type GlobalAuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    target: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type GlobalAuditLogCreateOrConnectWithoutUserInput = {
    where: GlobalAuditLogWhereUniqueInput
    create: XOR<GlobalAuditLogCreateWithoutUserInput, GlobalAuditLogUncheckedCreateWithoutUserInput>
  }

  export type GlobalAuditLogCreateManyUserInputEnvelope = {
    data: GlobalAuditLogCreateManyUserInput | GlobalAuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserTenantAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: UserTenantAccessWhereUniqueInput
    update: XOR<UserTenantAccessUpdateWithoutUserInput, UserTenantAccessUncheckedUpdateWithoutUserInput>
    create: XOR<UserTenantAccessCreateWithoutUserInput, UserTenantAccessUncheckedCreateWithoutUserInput>
  }

  export type UserTenantAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: UserTenantAccessWhereUniqueInput
    data: XOR<UserTenantAccessUpdateWithoutUserInput, UserTenantAccessUncheckedUpdateWithoutUserInput>
  }

  export type UserTenantAccessUpdateManyWithWhereWithoutUserInput = {
    where: UserTenantAccessScalarWhereInput
    data: XOR<UserTenantAccessUpdateManyMutationInput, UserTenantAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type GlobalAuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: GlobalAuditLogWhereUniqueInput
    update: XOR<GlobalAuditLogUpdateWithoutUserInput, GlobalAuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<GlobalAuditLogCreateWithoutUserInput, GlobalAuditLogUncheckedCreateWithoutUserInput>
  }

  export type GlobalAuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: GlobalAuditLogWhereUniqueInput
    data: XOR<GlobalAuditLogUpdateWithoutUserInput, GlobalAuditLogUncheckedUpdateWithoutUserInput>
  }

  export type GlobalAuditLogUpdateManyWithWhereWithoutUserInput = {
    where: GlobalAuditLogScalarWhereInput
    data: XOR<GlobalAuditLogUpdateManyMutationInput, GlobalAuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type GlobalAuditLogScalarWhereInput = {
    AND?: GlobalAuditLogScalarWhereInput | GlobalAuditLogScalarWhereInput[]
    OR?: GlobalAuditLogScalarWhereInput[]
    NOT?: GlobalAuditLogScalarWhereInput | GlobalAuditLogScalarWhereInput[]
    id?: StringFilter<"GlobalAuditLog"> | string
    userId?: StringNullableFilter<"GlobalAuditLog"> | string | null
    action?: StringFilter<"GlobalAuditLog"> | string
    target?: StringFilter<"GlobalAuditLog"> | string
    details?: StringNullableFilter<"GlobalAuditLog"> | string | null
    ipAddress?: StringNullableFilter<"GlobalAuditLog"> | string | null
    createdAt?: DateTimeFilter<"GlobalAuditLog"> | Date | string
  }

  export type MasterUserCreateWithoutTenantAccessesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: GlobalAuditLogCreateNestedManyWithoutUserInput
  }

  export type MasterUserUncheckedCreateWithoutTenantAccessesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: GlobalAuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type MasterUserCreateOrConnectWithoutTenantAccessesInput = {
    where: MasterUserWhereUniqueInput
    create: XOR<MasterUserCreateWithoutTenantAccessesInput, MasterUserUncheckedCreateWithoutTenantAccessesInput>
  }

  export type TenantCreateWithoutUserAccessesInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consolidatedLogs?: HoldingConsolidatedLedgerCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUserAccessesInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consolidatedLogs?: HoldingConsolidatedLedgerUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUserAccessesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUserAccessesInput, TenantUncheckedCreateWithoutUserAccessesInput>
  }

  export type MasterUserUpsertWithoutTenantAccessesInput = {
    update: XOR<MasterUserUpdateWithoutTenantAccessesInput, MasterUserUncheckedUpdateWithoutTenantAccessesInput>
    create: XOR<MasterUserCreateWithoutTenantAccessesInput, MasterUserUncheckedCreateWithoutTenantAccessesInput>
    where?: MasterUserWhereInput
  }

  export type MasterUserUpdateToOneWithWhereWithoutTenantAccessesInput = {
    where?: MasterUserWhereInput
    data: XOR<MasterUserUpdateWithoutTenantAccessesInput, MasterUserUncheckedUpdateWithoutTenantAccessesInput>
  }

  export type MasterUserUpdateWithoutTenantAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: GlobalAuditLogUpdateManyWithoutUserNestedInput
  }

  export type MasterUserUncheckedUpdateWithoutTenantAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: GlobalAuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TenantUpsertWithoutUserAccessesInput = {
    update: XOR<TenantUpdateWithoutUserAccessesInput, TenantUncheckedUpdateWithoutUserAccessesInput>
    create: XOR<TenantCreateWithoutUserAccessesInput, TenantUncheckedCreateWithoutUserAccessesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUserAccessesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUserAccessesInput, TenantUncheckedUpdateWithoutUserAccessesInput>
  }

  export type TenantUpdateWithoutUserAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consolidatedLogs?: HoldingConsolidatedLedgerUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUserAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consolidatedLogs?: HoldingConsolidatedLedgerUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutConsolidatedLogsInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAccesses?: UserTenantAccessCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutConsolidatedLogsInput = {
    id?: string
    code: string
    name: string
    industryType: $Enums.IndustryType
    dbConnectionUri: string
    status?: $Enums.TenantStatus
    modulesEnabled?: TenantCreatemodulesEnabledInput | string[]
    logoUrl?: string | null
    address?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAccesses?: UserTenantAccessUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutConsolidatedLogsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutConsolidatedLogsInput, TenantUncheckedCreateWithoutConsolidatedLogsInput>
  }

  export type TenantUpsertWithoutConsolidatedLogsInput = {
    update: XOR<TenantUpdateWithoutConsolidatedLogsInput, TenantUncheckedUpdateWithoutConsolidatedLogsInput>
    create: XOR<TenantCreateWithoutConsolidatedLogsInput, TenantUncheckedCreateWithoutConsolidatedLogsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutConsolidatedLogsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutConsolidatedLogsInput, TenantUncheckedUpdateWithoutConsolidatedLogsInput>
  }

  export type TenantUpdateWithoutConsolidatedLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAccesses?: UserTenantAccessUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutConsolidatedLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    industryType?: EnumIndustryTypeFieldUpdateOperationsInput | $Enums.IndustryType
    dbConnectionUri?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    modulesEnabled?: TenantUpdatemodulesEnabledInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAccesses?: UserTenantAccessUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type MasterUserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantAccesses?: UserTenantAccessCreateNestedManyWithoutUserInput
  }

  export type MasterUserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber?: string | null
    systemRole?: $Enums.UserSystemRole
    isActive?: boolean
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantAccesses?: UserTenantAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type MasterUserCreateOrConnectWithoutAuditLogsInput = {
    where: MasterUserWhereUniqueInput
    create: XOR<MasterUserCreateWithoutAuditLogsInput, MasterUserUncheckedCreateWithoutAuditLogsInput>
  }

  export type MasterUserUpsertWithoutAuditLogsInput = {
    update: XOR<MasterUserUpdateWithoutAuditLogsInput, MasterUserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<MasterUserCreateWithoutAuditLogsInput, MasterUserUncheckedCreateWithoutAuditLogsInput>
    where?: MasterUserWhereInput
  }

  export type MasterUserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: MasterUserWhereInput
    data: XOR<MasterUserUpdateWithoutAuditLogsInput, MasterUserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type MasterUserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantAccesses?: UserTenantAccessUpdateManyWithoutUserNestedInput
  }

  export type MasterUserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    systemRole?: EnumUserSystemRoleFieldUpdateOperationsInput | $Enums.UserSystemRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantAccesses?: UserTenantAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserTenantAccessCreateManyTenantInput = {
    id?: string
    userId: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
  }

  export type HoldingConsolidatedLedgerCreateManyTenantInput = {
    id?: string
    periodMonth: number
    periodYear: number
    totalRevenue?: Decimal | DecimalJsLike | number | string
    totalExpense?: Decimal | DecimalJsLike | number | string
    netProfitLoss?: Decimal | DecimalJsLike | number | string
    totalAssets?: Decimal | DecimalJsLike | number | string
    totalLiabilities?: Decimal | DecimalJsLike | number | string
    currency?: string
    syncedAt?: Date | string
  }

  export type UserTenantAccessUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: MasterUserUpdateOneRequiredWithoutTenantAccessesNestedInput
  }

  export type UserTenantAccessUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTenantAccessUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingConsolidatedLedgerUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingConsolidatedLedgerUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingConsolidatedLedgerUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodMonth?: IntFieldUpdateOperationsInput | number
    periodYear?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalExpense?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netProfitLoss?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAssets?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalLiabilities?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTenantAccessCreateManyUserInput = {
    id?: string
    tenantId: string
    isDefault?: boolean
    roleInTenant: string
    createdAt?: Date | string
  }

  export type GlobalAuditLogCreateManyUserInput = {
    id?: string
    action: string
    target: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type UserTenantAccessUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUserAccessesNestedInput
  }

  export type UserTenantAccessUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTenantAccessUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    roleInTenant?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TenantCountOutputTypeDefaultArgs instead
     */
    export type TenantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MasterUserCountOutputTypeDefaultArgs instead
     */
    export type MasterUserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MasterUserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantDefaultArgs instead
     */
    export type TenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MasterUserDefaultArgs instead
     */
    export type MasterUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MasterUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserTenantAccessDefaultArgs instead
     */
    export type UserTenantAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserTenantAccessDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoldingConsolidatedLedgerDefaultArgs instead
     */
    export type HoldingConsolidatedLedgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoldingConsolidatedLedgerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GlobalAuditLogDefaultArgs instead
     */
    export type GlobalAuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GlobalAuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}