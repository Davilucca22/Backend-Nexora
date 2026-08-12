CREATE TYPE tipopessoa AS ENUM ('PF', 'PJ');

CREATE TYPE statusped AS ENUM (
  'Rascunho',
  'Aguardando Aprovação',
  'Aguardando Estoque',
  'Aguardando Separação',
  'Em Separação',
  'Em Conferência',
  'Apto para Faturamento',
  'Faturado',
  'Aguardando Expedição',
  'Em Rota de Entrega',
  'Entregue',
  'Finalizado'
);

CREATE TABLE empresas (
  id SERIAL PRIMARY KEY,
  nome_empresa VARCHAR(100) NOT NULL,
  cnpj VARCHAR(14) NOT NULL UNIQUE,
  nome_fantasia VARCHAR(100),
  email_empresa VARCHAR(100) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  nome_gestor VARCHAR(100) NOT NULL,
  email_gestor VARCHAR(100) NOT NULL,
  senha_hash TEXT NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE
);