import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { boulderWall } from "./boulder_wall";

export const optimalRoutes = pgTable("optimal_routes", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  wall_id: text("wall_id").references(() => boulderWall.id).notNull(),
  user_id: text("user_id").references(() => users.id).notNull(),
  holds: jsonb("holds").notNull(),
  instructions: text("instructions").notNull(), 
  created_at: timestamp("created_at").defaultNow(),
});
