create database bd_projetoIndividual;

use bd_projetoIndividual;

CREATE TABLE cadastro_usuarios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) unique NOT NULL,
  senha VARCHAR(20) NOT NULL
  );


SELECT * from cadastro_usuarios;

CREATE TABLE PerfilUsuario(
	idPerfilUsuario int unique auto_increment,
    fkUsuario int unique not null, constraint fkUsuario_PerfilUsuario foreign key (fkUsuario) references cadastro_usuarios(id),
    primary key(idPerfilUsuario, fkUsuario),
	genero CHAR(3) NOT NULL, constraint chkgenero check (genero in ('mas', 'fem'))
);


SELECT * FROM PerfilUsuario;

CREATE TABLE musicas (
idMusica int primary key auto_increment, 
fkPerfilUsuario int, constraint fkPerfilUsuario_musicas foreign key (fkPerfilUsuario) references PerfilUsuario(idPerfilUsuario),
fkUsuario int, constraint fkUsuario_musicas foreign key (fkUsuario) references cadastro_usuarios(id),
nome varchar(60),
artista varchar(45),
Dtacesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from musicas;


SELECT idMusica, COUNT(idMusica) AS quantidade
	FROM musicas
		GROUP BY idMusica
			ORDER BY quantidade DESC
				LIMIT 5;
