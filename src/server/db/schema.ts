// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
  boolean,
  pgEnum,
  numeric,
  integer
} from "drizzle-orm/pg-core";
import { accountColors } from "~/models/AccountColor";
import { transactionCategories } from "~/models/TransactionCategory";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fin-manager_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const statusEnum = pgEnum('status', ['active', 'inactive', 'canceled']);
export const roleEnum = pgEnum('role', ['user', 'admin']);
export const transactionTypeEnum = pgEnum('type', ['income', 'expense']);
export const accountColorEnum = pgEnum('color', accountColors);
export const transactionCategoryEnum = pgEnum('category', transactionCategories);

export const users = createTable(
  "users",
  {
    id: text("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    status: statusEnum("status").default("inactive").notNull(),
    active_until: timestamp("active_until", { withTimezone: true }),   // date 0 (in 1970) is used as invalid
    is_trial: boolean("is_trial").default(false),
    username: text("username"),
    profile_img: text("profile_img"),
    role: roleEnum("role").default("user").notNull(),
    lemonSqueezyCustomerId: integer("lemonSqueezyCustomerId"),
    variantId: integer('variantId').references(() => plans.variantId),
    subscriptionId: text('subscriptionId'),
  }
);

export const currency = createTable(
  "currency",
  {
    key: varchar("key", { length: 16 }),
    symbol: varchar("symbol", { length: 16 }),
    name: varchar("name", { length: 60 }),
    symbol_native: varchar("symbol_native", { length: 8 }),
    rounding: integer("rounding"),
    name_plural: varchar("name_plural", { length: 64 })
  }
);

export const moneyAccounts = createTable(
  "money_accounts",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    amount: numeric("amount", { scale: 2, precision: 15 }).notNull(),
    user_id: text("user_id").references(() => users.id).notNull(),
    color: accountColorEnum("color").default('blue').notNull(),
    currency_code: varchar("currency_code", { length: 16 }).default("USD").references(() => currency.key)
  }
);
export const transactions = createTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    user_id: text("user_id").references(() => users.id).notNull(),
    account_id: integer("account_id").references(() => moneyAccounts.id).notNull(),
    name: varchar("name", { length: 64 }).notNull(),
    amount: numeric("amount", { scale: 2, precision: 12 }).notNull(),
    category: transactionCategoryEnum("category").default("Other"),
    type: transactionTypeEnum("type").notNull()
  }
);

export const plans = createTable('plan', {
  id: serial('id').primaryKey(),
  productId: integer('productId').notNull(),
  productName: text('productName'),
  variantId: integer('variantId').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
  isUsageBased: boolean('isUsageBased').default(false),
  interval: text('interval'),
  intervalCount: integer('intervalCount'),
  trialInterval: text('trialInterval'),
  trialIntervalCount: integer('trialIntervalCount'),
  sort: integer('sort'),
})
export type NewPlan = typeof plans.$inferInsert;