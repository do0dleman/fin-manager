ALTER TABLE "fin-manager_money_accounts" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fin-manager_money_accounts" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fin-manager_transactions" ALTER COLUMN "account_id" SET NOT NULL;