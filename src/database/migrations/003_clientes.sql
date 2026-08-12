CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  id_empresa INTEGER NOT NULL,
  nome VARCHAR(100) NOT NULL,
  tipo tipopessoa NOT NULL,
  cpf VARCHAR(11),
  cnpj VARCHAR(14),
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  ie VARCHAR(13),
  l_cred DECIMAL(12,2) NOT NULL DEFAULT 0,
  status BOOLEAN NOT NULL DEFAULT TRUE,

  FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
    ON DELETE CASCADE,

  UNIQUE (id_empresa, id),
  UNIQUE (id_empresa, cpf),
  UNIQUE (id_empresa, cnpj)
);