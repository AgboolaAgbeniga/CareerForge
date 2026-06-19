import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const run = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "ai_chat_messages" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
        "role" varchar(20) NOT NULL,
        "content" text NOT NULL,
        "created_at" timestamp DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS "ai_chat_messages_user_idx" ON "ai_chat_messages" ("user_id");
      CREATE INDEX IF NOT EXISTS "ai_chat_messages_created_at_idx" ON "ai_chat_messages" ("created_at");
    `);
    console.log("Table created successfully");
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
};
run();
