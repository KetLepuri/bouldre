ALTER TABLE "boulder_wall" RENAME COLUMN "width" TO "imageHeight";--> statement-breakpoint
ALTER TABLE "boulder_wall" ADD COLUMN "imageWidth" integer;--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "height";--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "holdHandNumber";--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "holdFootNumber";--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "wallInclination";