CREATE TABLE historico_pedidos (
  id SERIAL PRIMARY KEY,
  id_pedido INTEGER NOT NULL,
  id_usuario INTEGER NOT NULL,
  data_alteracao TIMESTAMP NOT NULL DEFAULT NOW(),
  status_anterior statusped,
  novo_status statusped NOT NULL,

  FOREIGN KEY (id_pedido)
    REFERENCES pedidos(id)
    ON DELETE CASCADE,

  FOREIGN KEY (id_usuario)
    REFERENCES vendedores(id)
);