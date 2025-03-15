import { defineConfig } from "drizzle-kit";


export default defineConfig({
	out: "./src/lib/db/migration",
	schema: "./src/lib/db/schema/index.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || 'postgresql://bouldre-db_owner:npg_8rzESY9pTyHF@ep-late-cell-a98ejmu8-pooler.gwc.azure.neon.tech/bouldre-db?sslmode=require',
	},
});