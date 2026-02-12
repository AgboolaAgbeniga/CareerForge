const dotenv = require('dotenv');
dotenv.config();
const postgres = require('postgres');

(async () => {
  try {
    const sql = postgres(process.env.DATABASE_URL);
    const rows = await sql`select schema_name from information_schema.schemata order by schema_name;`;
    console.log('Schemas:');
    for (const r of rows) console.log('- ', r.schema_name);
    await sql.end();
  } catch (e) {
    console.error('Error:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
