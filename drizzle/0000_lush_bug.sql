CREATE TABLE IF NOT EXISTS "testTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"qty1" integer,
	"qry2" smallint,
	"qry3" bigint,
	"price1" numeric(7, 2),
	"price2" numeric(7, 2),
	"score1" real,
	"score2" double precision,
	"delivered" boolean,
	"description1" text,
	"description2" varchar(256),
	"name" char(10),
	"data" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(256),
	"address" varchar(256),
	"country" text
);
