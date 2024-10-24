ALTER TABLE "fin-manager_currency" ADD PRIMARY KEY ("code");--> statement-breakpoint
ALTER TABLE "fin-manager_currency" ALTER COLUMN "code" SET NOT NULL;