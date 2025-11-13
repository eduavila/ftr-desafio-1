ALTER TABLE "links" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "links" DROP COLUMN "created_at";