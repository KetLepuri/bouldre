CREATE TABLE "optimal_routes" (
	"id" text PRIMARY KEY NOT NULL,
	"wall_id" text NOT NULL,
	"user_id" text NOT NULL,
	"holds" jsonb NOT NULL,
	"instructions" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "optimal_routes" ADD CONSTRAINT "optimal_routes_wall_id_boulder_wall_id_fk" FOREIGN KEY ("wall_id") REFERENCES "public"."boulder_wall"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "optimal_routes" ADD CONSTRAINT "optimal_routes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;