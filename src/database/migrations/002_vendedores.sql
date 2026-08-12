CREATE TABLE vendedores (
  id SERIAL PRIMARY KEY,
  id_empresa INTEGER NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  data_nasc DATE NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE,

  FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
    ON DELETE CASCADE,

  UNIQUE (id_empresa, id)
);