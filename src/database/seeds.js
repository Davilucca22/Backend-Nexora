import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import pool from '../../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedsPath = path.join(__dirname, 'seeds');

async function runSeeds() {
  const client = await pool.connect();

  try {
    const files = await fs.readdir(seedsPath);

    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort();

    await client.query('BEGIN');

    for (const file of sqlFiles) {
      console.log(`Executando seed: ${file}`);

      const filePath = path.join(seedsPath, file);
      const sql = await fs.readFile(filePath, 'utf-8');

      await client.query(sql);

      console.log(`✓ ${file} executado`);
    }

    await client.query('COMMIT');

    console.log('\n🌱 Seeds executados com sucesso!');
  } catch (error) {
    await client.query('ROLLBACK');

    console.error('\n❌ Erro nos seeds. Alterações revertidas.');
    console.error(error);
  } finally {
    client.release();
    await pool.end();
  }
}

runSeeds();