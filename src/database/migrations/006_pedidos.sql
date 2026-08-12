CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  id_empresa INTEGER NOT NULL,
  id_cliente INTEGER NOT NULL,
  id_vendedor INTEGER NOT NULL,
  data_emissao TIMESTAMP NOT NULL DEFAULT NOW(),
  valor_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  status statusped NOT NULL DEFAULT 'Rascunho',

  FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
    ON DELETE CASCADE,

  FOREIGN KEY (id_empresa, id_cliente)
    REFERENCES clientes(id_empresa, id),

  FOREIGN KEY (id_empresa, id_vendedor)
    REFERENCES vendedores(id_empresa, id)
);
