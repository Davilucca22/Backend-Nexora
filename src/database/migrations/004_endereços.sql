CREATE TABLE enderecos (
  id SERIAL PRIMARY KEY,
  id_cliente INTEGER NOT NULL,
  numero VARCHAR(5) NOT NULL,
  rua VARCHAR(50) NOT NULL,
  bairro VARCHAR(30) NOT NULL,
  cidade VARCHAR(25) NOT NULL,
  cep CHAR(8) NOT NULL,
  complemento VARCHAR(100),
  uf CHAR(2) NOT NULL

  FOREIGN KEY (id_cliente)
    REFERENCES clientes(id)
    ON DELETE CASCADE
);
