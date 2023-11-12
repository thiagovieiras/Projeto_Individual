-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE 'bd_projeto-individual';

use `bd_projeto-individual`;

CREATE TABLE `cadastro_usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `genero` CHAR(3) NOT NULL,
  PRIMARY KEY (`id`));

alter table cadastro_usuarios add constraint chkgenero check (genero in ('mas', 'fem'));

SELECT * from cadastro_usuarios;

CREATE TABLE musicas (
idMusica int primary key auto_increment, 
nome varchar(45),
artista varchar(45)
);

CREATE TABLE playlists (
idPlaylists int,
fkUsuario int, constraint fkUsuario_playlist foreign key (fkUsuario) references cadastro_usuarios(id),
fkMusica int, constraint fkMusica_playlist foreign key (fkMusica) references musicas(idMusica),
primary key(idPlaylists, fkUsuario, fkMusica),
nome varchar(45)
);

CREATE TABLE acesso_às_musicas (
idAcesso int unique auto_increment,
fkUsuario int, constraint fkUsuario_acesso foreign key (fkUsuario) references cadastro_usuarios(id),
fkMusica int, constraint fkMusica_acesso foreign key (fkMusica) references musicas(idMusica),
primary key(idAcesso, fkUsuario, fkMusica),
data_acesso date
);


-- /*
-- comando para sql server - banco remoto - ambiente de produção
-- */

-- CREATE TABLE empresa (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	razao_social VARCHAR(50),
-- 	cnpj CHAR(14)
-- );

-- CREATE TABLE usuario (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	nome VARCHAR(50),
-- 	email VARCHAR(50),
-- 	senha VARCHAR(50),
-- 	fk_empresa INT FOREIGN KEY REFERENCES empresa(id)
-- );

-- CREATE TABLE aviso (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	titulo VARCHAR(100),
-- 	descricao VARCHAR(150),
-- 	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
-- );

-- create table aquario (
-- /* em nossa regra de negócio, um aquario tem apenas um sensor */
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	descricao VARCHAR(300),
-- 	fk_empresa INT FOREIGN KEY REFERENCES empresa(id)
-- );

-- /* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

-- CREATE TABLE medida (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	dht11_umidade DECIMAL,
-- 	dht11_temperatura DECIMAL,
-- 	luminosidade DECIMAL,
-- 	lm35_temperatura DECIMAL,
-- 	chave TINYINT,
-- 	momento DATETIME,
-- 	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
-- );

-- insert into empresa (razao_social, cnpj) values ('Empresa 1', '00000000000000');

-- /*
-- comandos para criar usuário em banco de dados azure, sqlserver,
-- com permissão de insert + update + delete + select
-- */

-- CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
-- WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
-- DEFAULT_SCHEMA = dbo;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
