ALTER TABLE "fin-manager_users" ADD COLUMN "currency_code" varchar(16) DEFAULT 'USD';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fin-manager_users" ADD CONSTRAINT "fin-manager_users_currency_code_fin-manager_currency_key_fk" FOREIGN KEY ("currency_code") REFERENCES "public"."fin-manager_currency"("key") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
