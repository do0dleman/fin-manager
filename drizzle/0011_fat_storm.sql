ALTER TABLE "fin-manager_users" ADD COLUMN "variantId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fin-manager_users" ADD CONSTRAINT "fin-manager_users_variantId_fin-manager_plan_variantId_fk" FOREIGN KEY ("variantId") REFERENCES "public"."fin-manager_plan"("variantId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
