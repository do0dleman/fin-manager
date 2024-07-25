DO $$ BEGIN
 CREATE TYPE "public"."color" AS ENUM('red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('income', 'expense');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fin-manager_money_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"user_id" text NOT NULL,
	"color" "color" DEFAULT 'blue' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fin-manager_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fin-manager_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" integer NOT NULL,
	"name" varchar(64) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"category" varchar(32),
	"type" "type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fin-manager_users" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"status" "status" DEFAULT 'inactive' NOT NULL,
	"active_until" timestamp with time zone,
	"is_trial" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fin-manager_money_accounts" ADD CONSTRAINT "fin-manager_money_accounts_user_id_fin-manager_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fin-manager_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fin-manager_transactions" ADD CONSTRAINT "fin-manager_transactions_user_id_fin-manager_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fin-manager_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fin-manager_transactions" ADD CONSTRAINT "fin-manager_transactions_account_id_fin-manager_money_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."fin-manager_money_accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "fin-manager_post" ("name");