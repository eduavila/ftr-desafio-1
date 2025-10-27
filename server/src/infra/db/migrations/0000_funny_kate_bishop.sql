CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"originalUrl" text NOT NULL,
	"shortCode" text NOT NULL,
	"visitCount" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
