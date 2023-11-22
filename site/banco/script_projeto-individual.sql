-- create SCHEMA `bd_projeto-individual` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root0411';

create database bd_projetoIndividual;

use bd_projetoIndividual;

CREATE TABLE cadastro_usuarios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(20) NOT NULL,
  genero CHAR(3) NOT NULL, constraint chkgenero check (genero in ('mas', 'fem'))
  );


SELECT * from cadastro_usuarios;

CREATE TABLE PerfilUsuario(
	idPerfilUsuario int unique auto_increment,
    fkUsuario int unique not null, constraint fkUsuario_PerfilUsuario foreign key (fkUsuario) references cadastro_usuarios(id),
    primary key(idPerfilUsuario, fkUsuario)
);


SELECT * FROM PerfilUsuario;

CREATE TABLE musicas (
idMusica int primary key auto_increment, 
fkPerfilUsuario int, constraint fkPerfilUsuario_musicas foreign key (fkPerfilUsuario) references PerfilUsuario(idPerfilUsuario),
fkUsuario int, constraint fkUsuario_musicas foreign key (fkUsuario) references cadastro_usuarios(id),
nome varchar(60)
);

CREATE TABLE acesso_às_musicas (
idAcesso int unique auto_increment,
fkUsuario int, constraint fkUsuario_acesso foreign key (fkUsuario) references cadastro_usuarios(id),
fkMusica int, constraint fkMusica_acesso foreign key (fkMusica) references musicas(idMusica),
primary key(idAcesso, fkUsuario, fkMusica),
data_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT fkMusica, COUNT(fkMusica) AS quantidade
	FROM acesso_às_musicas
		GROUP BY fkMusica
			ORDER BY quantidade DESC
				LIMIT 5;

select 
	nome as NomeMúsica, count(nome) as Repetições
		from musicas
			where fkUsuario = ${idUsuario}
				group by nome
					order by Repetições desc limit ${cincoEscutadas};
