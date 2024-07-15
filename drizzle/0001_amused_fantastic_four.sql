DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fin-manager_users" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"status" "status" NOT NULL,
	"active_until" timestamp with time zone,
	"is_trial" boolean DEFAULT false
);
