CREATE TABLE itens_pedido (
  id SERIAL PRIMARY KEY,
  id_pedido INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  preco_unit DECIMAL(12,2) NOT NULL
    CHECK (preco_unit >= 0),
  quantidade INTEGER NOT NULL
    CHECK (quantidade > 0),

  FOREIGN KEY (id_pedido)
    REFERENCES pedidos(id)
    ON DELETE CASCADE,

  FOREIGN KEY (id_produto)
    REFERENCES produtos(id)
    ON DELETE RESTRICT,

  UNIQUE (id_pedido, id_produto)
);