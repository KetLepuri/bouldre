import { pgTable, text, real, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./user";

export const boulderWall = pgTable("boulder_wall", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	layout_id: text("layout_id").notNull(),
	image_url: text("image_url").notNull(),
	user_id: text("user_id").references(() => users.id),
	created_at: timestamp("created_at").defaultNow(),
});