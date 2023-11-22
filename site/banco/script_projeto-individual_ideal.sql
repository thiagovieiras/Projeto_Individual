-- create SCHEMA `bd_projeto-individual` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root0411';

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
artista varchar(45),
letra varchar(45),
lancamento date,
album varchar(45),
gravadora varchar(45)
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



