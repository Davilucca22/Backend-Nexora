import pkg from 'pg';
import { configDotenv } from 'dotenv';

configDotenv();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.STRING_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

//testa conexao com o banco
export async function testConnection(){
  try{
    const client = await pool.connect()

    console.log("PostgreSQL conectado!")

    client.release()

  }catch(e){
    console.log("ERRO NO BANCO DE DADOS ", e)
  }
}

export default pool;