ALTER TABLE "fin-manager_money_accounts" ADD COLUMN "currency_code" varchar(16) DEFAULT 'USD';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fin-manager_money_accounts" ADD CONSTRAINT "fin-manager_money_accounts_currency_code_fin-manager_currency_key_fk" FOREIGN KEY ("currency_code") REFERENCES "public"."fin-manager_currency"("key") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
