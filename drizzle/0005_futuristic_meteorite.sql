ALTER TABLE "fin-manager_transactions" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fin-manager_money_accounts" ADD COLUMN "color" varchar(7) DEFAULT '#0000ff' NOT NULL;