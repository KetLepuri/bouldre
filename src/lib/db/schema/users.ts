import {
	timestamp,
	pgTable,
	text,
	real,
} from "drizzle-orm/pg-core";


export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	email: text("email").unique(),
	password: text("password").notNull(),
	sex: text("sex"), //change to sex
	apeIndex: real("apeIndex"),
	height: real("height"),
	legRatio: real("legRatio"),
	created_at: timestamp("created_at").defaultNow(),
  	updated_at: timestamp("updated_at").defaultNow(),
});
