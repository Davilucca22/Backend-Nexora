CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  id_empresa INTEGER NOT NULL,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(100) NOT NULL,
  valor DECIMAL(12,2) NOT NULL DEFAULT 0
    CHECK (valor >= 0),
  estoque INTEGER NOT NULL DEFAULT 0
    CHECK (estoque >= 0),
  status BOOLEAN NOT NULL DEFAULT TRUE,

  FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
    ON DELETE CASCADE
);