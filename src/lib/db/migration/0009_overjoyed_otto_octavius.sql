DROP TABLE "optimal_routes" CASCADE;--> statement-breakpoint
ALTER TABLE "boulder_wall" ADD COLUMN "layout_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "imageWidth";--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "imageHeight";--> statement-breakpoint
ALTER TABLE "boulder_wall" DROP COLUMN "holdType";