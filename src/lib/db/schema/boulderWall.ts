import { pgTable, text, real, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const boulderWall = pgTable("boulder_wall", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	width: real("width"),
	height: real("height"),
	holdHandNumber: integer("holdHandNumber"),
	holdFootNumber: integer("holdFootNumber"),
	holdType: text("holdType"),
	wallInclination: text("wallInclination"),
	description: text("description"),
	created_at: timestamp("created_at").defaultNow(),
	user_id: text("user_id").references(() => users.id),
}); 