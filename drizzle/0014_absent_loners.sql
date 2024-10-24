CREATE TABLE IF NOT EXISTS "fin-manager_currency" (
	"symbol" varchar(16),
	"name" varchar(32),
	"symbol_native" varchar(8),
	"decimal_digit" integer,
	"rounding" integer,
	"code" varchar(24),
	"name_plural" varchar(36)
);
