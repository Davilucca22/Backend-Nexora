INSERT INTO historico_pedidos(id,id_pedido,id_usuario,data_alteracao,status_anterior,novo_status)
VALUES 
(1,1,1,now(),'Rascunho','Aguardando Aprovação'),
(2,2,2,now(),'Aguardando Estoque','Aguardando Separação'),
(3,3,3,now(),'Apto para Faturamento','Faturado'),
(4,4,4,now(),'Em Rota de Entrega','Entregue');