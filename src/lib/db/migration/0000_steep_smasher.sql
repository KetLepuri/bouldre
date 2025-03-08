CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"password" text NOT NULL,
	"gender" text,
	"apeIndex" real,
	"height" real,
	"legRatio" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "boulder_wall" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"width" real,
	"height" real,
	"holdHandNumber" integer,
	"holdFootNumber" integer,
	"holdType" text,
	"wallInclination" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "boulder_wall" ADD CONSTRAINT "boulder_wall_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;