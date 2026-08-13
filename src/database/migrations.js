import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import pool from '../../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.join(__dirname, 'migrations');

async function runMigrations() {
  const client = await pool.connect();

  try {
    // Cria a tabela de controle das migrations
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Lê os arquivos da pasta migrations
    const files = await fs.readdir(migrationsPath);

    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Busca as migrations que já foram executadas
    const result = await client.query(`
      SELECT filename
      FROM migrations
      ORDER BY filename;
    `);

    const executedMigrations = new Set(
      result.rows.map(row => row.filename)
    );

    for (const file of sqlFiles) {
      // Ignora migrations já executadas
      if (executedMigrations.has(file)) {
        console.log(`⏭️  ${file} já executada`);
        continue;
      }

      console.log(`\n▶ Executando migration: ${file}`);

      const filePath = path.join(migrationsPath, file);
      const sql = await fs.readFile(filePath, 'utf-8');

      try {
        await client.query('BEGIN');

        // Executa o SQL da migration
        await client.query(sql);

        // Registra a migration
        await client.query(
          `
            INSERT INTO migrations (filename)
            VALUES ($1);
          `,
          [file]
        );

        await client.query('COMMIT');

        console.log(`✓ ${file} executada com sucesso`);
      } catch (error) {
        await client.query('ROLLBACK');

        console.error(`❌ Erro na migration: ${file}`);

        throw error;
      }
    }

    console.log('\n🚀 Migrations concluídas!');
  } catch (error) {
    console.error('\n❌ Erro nas migrations.');
    console.error(error);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();