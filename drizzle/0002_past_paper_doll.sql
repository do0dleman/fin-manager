DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('Clothing', 'Education', 'Entertainment', 'Food', 'Gifts', 'Groceries', 'Healthcare', 'Household Items', 'Housing', 'Insurance', 'Personal', 'Retirement', 'Savings', 'Transportation', 'Utilities', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "fin-manager_transactions" ALTER COLUMN "category" SET DATA TYPE category USING category::category;--> statement-breakpoint
ALTER TABLE "fin-manager_transactions" ALTER COLUMN "category" SET DEFAULT 'Other';--> statement-breakpoint
