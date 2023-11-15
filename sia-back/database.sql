CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- FUNÇÕES
CREATE OR REPLACE FUNCTION retornarTodasCulturasUsuarioDashboard(emailUsuario text) RETURNS TABLE (nomeCultura text, dataCriacao timestamp) 
AS $$
BEGIN
	RETURN QUERY
	SELECT Culturas.nomePersonalizado, Culturas.dataCriacao FROM Usuarios
	INNER JOIN ListaCulturas ON Usuarios.id = ListaCulturas.usuario_id
	INNER JOIN Culturas ON ListaCulturas.cultura_id = Culturas.id
	WHERE Usuarios.email = emailUsuario;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION retornarListaCulturasDetalhes(emailUsuario text) RETURNS TABLE (nomeCultura text, produtoCultura text, dataCriacao timestamp, existeAnalise boolean, estagio integer) 
AS $$
BEGIN
    RETURN QUERY
    SELECT Culturas.nomePersonalizado, Lavouras.produto, Culturas.dataCriacao,
           CASE WHEN ListaAnalisesCulturas.cultura_id IS NOT NULL THEN true ELSE false END AS existeAnalise,
           Analises.estagio
    FROM Usuarios
    INNER JOIN ListaCulturas ON Usuarios.id = ListaCulturas.usuario_id
    INNER JOIN Culturas ON ListaCulturas.cultura_id = Culturas.id
    INNER JOIN Lavouras ON Lavouras.id = Culturas.produto
    LEFT JOIN ListaAnalisesCulturas ON ListaAnalisesCulturas.cultura_id = Culturas.id
    LEFT JOIN Analises ON Analises.id = ListaAnalisesCulturas.analise_id
    WHERE Usuarios.email = emailUsuario;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION gerarChaveAleatoria(length integer) RETURNS varchar AS $$
DECLARE
    chars varchar[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,!,@,#,$,%,&}';
    result varchar := '';
    i integer;
BEGIN
    FOR i IN 1..length LOOP
        result := result || chars[1 + random() * array_length(chars, 1)];
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION obterIdCultura(nomeCultura text)
RETURNS integer AS $$
DECLARE
    id_cultura integer;
BEGIN
    SELECT id INTO id_cultura FROM Culturas WHERE nomePersonalizado = nomeCultura;

    RETURN id_cultura;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION obterDetalhesCultura (id_cultura integer) RETURNS TABLE (
	produto text, dataCriacao timestamp, dataInicio timestamp,
	existeAnalise boolean, existeEstacao boolean, ativo boolean, tipoEstacao text
) AS $$
BEGIN
	RETURN QUERY
	SELECT Lavouras.produto, Culturas.dataCriacao, Culturas.dataInicio,
		CASE WHEN ListaAnalisesCulturas.analise_id IS NOT NULL THEN true ELSE false END AS existeAnalise,
		CASE WHEN Estacoes.cultura_id IS NOT NULL THEN true ELSE false END AS existeEstacao,
		Estacoes.ativo, TiposEstacao.tipo as tipoEstacao
	FROM Culturas
	FULL JOIN Lavouras on Culturas.produto = Lavouras.id
	FULL JOIN ListaAnalisesCulturas on Culturas.id = ListaAnalisesCulturas.analise_id
	FULL JOIN Estacoes on Culturas.id = Estacoes.cultura_id
	FULL JOIN TiposEstacao on TiposEstacao.id = Estacoes.tipo_id
	WHERE Culturas.id = id_cultura;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION retornarTodasAsEstacoes() RETURNS TABLE(nomePersonalizado text, ativo boolean, cultura text)
AS $$
BEGIN
	RETURN QUERY
	SELECT Estacoes.nomePersonalizado, Estacoes.ativo, Culturas.nomePersonalizado AS Cultura FROM Estacoes
	LEFT JOIN Culturas on Estacoes.cultura_id = Culturas.id;
END;
$$ LANGUAGE plpgsql;





-- TABELAS
CREATE TABLE Usuarios(
	id serial PRIMARY KEY,
	nomeUsuario text NOT NULL,
	email text UNIQUE NOT NULL,
	senha text NOT NULL,
	
	 -- Restrição de tamanho da senha
	CONSTRAINT ck_tamanho_senha CHECK (char_length(senha) >= 8),
	 -- Verificação de formato de email
    	CONSTRAINT ck_formato_email CHECK (email ~ '^[\w\.-]+@[\w\.-]+\.\w+$')
);

CREATE TABLE Lavouras(
	id serial PRIMARY KEY,
	produto text UNIQUE NOT NULL
);

CREATE TABLE Culturas(
	id serial PRIMARY KEY,
	nomePersonalizado text NOT NULL,
	dataInicio timestamp,
	produto integer NOT NULL,
	
	FOREIGN KEY (produto) REFERENCES Lavouras(id)
);

CREATE TABLE ListaCulturas(
	cultura_id integer,
	usuario_id integer,
	
	FOREIGN KEY (cultura_id) REFERENCES Culturas(id),
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
	
	PRIMARY KEY(cultura_id, usuario_id)
);

CREATE TABLE TiposEstacao(
	id serial PRIMARY KEY,
	tipo text NOT NULL UNIQUE
);

CREATE TABLE Estacoes(
	id serial PRIMARY KEY,
	nomePersonalizado text NOT NULL,
	tipo_id integer,
	cultura_id integer,
	chave varchar(11) UNIQUE NOT NULL DEFAULT gerarChaveAleatoria(11),
	ativo BOOLEAN DEFAULT false, 
	
	FOREIGN KEY(tipo_id) REFERENCES TiposEstacao(id),
	FOREIGN KEY(cultura_id) REFERENCES Culturas(id)
);

CREATE TABLE ListaEstacoes(
	estacao_id integer,
	usuario_id integer,
	
	FOREIGN KEY (estacao_id) REFERENCES Estacoes(id),
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
	
	PRIMARY KEY(estacao_id, usuario_id)
);

CREATE TABLE Drones(
	id serial PRIMARY KEY,
	nomePersonalizado text,
	cultura_id integer,
	chave varchar(11) UNIQUE NOT NULL DEFAULT gerarChaveAleatoria(11),
	
	FOREIGN KEY (cultura_id) REFERENCES Culturas(id)
);

CREATE TABLE ListaDrones(
	drone_id integer,
	usuario_id integer,
	
	FOREIGN KEY (drone_id) REFERENCES Drones(id),
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
	
	PRIMARY KEY(drone_id, usuario_id)
);

CREATE TABLE EstagiosProcesso(
	id serial PRIMARY KEY,
	estagio text UNIQUE NOT NULL
);

CREATE TABLE TiposAnalise(
	id serial PRIMARY KEY,
	tipo text NOT NULL UNIQUE
);

CREATE TABLE Analises(
	id serial PRIMARY KEY,
	nomePersonalizado text NOT NULL,
	dataVisita timestamp NOT NULL DEFAULT NOW() + INTERVAL '7 days',
	dataEncomenda timestamp NOT NULL DEFAULT NOW(),
	estagio integer DEFAULT 1,
	tipo integer,
	
	FOREIGN KEY (estagio) REFERENCES EstagiosProcesso(id),
	FOREIGN KEY (tipo) REFERENCES TiposAnalise(id)
);

CREATE TABLE ParametrosAgua(
	analise_id integer,
	aluminio numeric(7, 2) DEFAULT 0,
	arsenio numeric(7, 2) DEFAULT 0,
	bario numeric(7, 2) DEFAULT 0,
	cadmio numeric(7, 2) DEFAULT 0,
	cloro numeric(7, 2) DEFAULT 0,
	cromo numeric(7, 2) DEFAULT 0,
	fluor numeric(7, 2) DEFAULT 0,
	virus numeric(7, 2) DEFAULT 0,
	bacteria numeric(7, 2) DEFAULT 0,
	chumbo numeric(7, 2) DEFAULT 0,
	nitrato numeric(7, 2) DEFAULT 0,
	nitrito numeric(7, 2) DEFAULT 0,
	mercurio numeric(7, 2) DEFAULT 0,
	perclorato numeric(7, 2) DEFAULT 0,
	radio numeric(7, 2) DEFAULT 0,
	prata numeric(7, 2) DEFAULT 0,
	uranio numeric(7, 2) DEFAULT 0,

	FOREIGN KEY (analise_id) REFERENCES Analises(id)
);

CREATE TABLE ParametrosSolo(
	analise_id integer,
	potassio numeric(7, 2),
	nitrogenio numeric(7, 2),
	fosforo numeric(7, 2),
	
	FOREIGN KEY (analise_id) REFERENCES Analises(id)
);

CREATE TABLE ListaAnalises(
	analise_id integer,
	usuario_id integer,
	
	FOREIGN KEY (analise_id) REFERENCES Analises(id),
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
	
	PRIMARY KEY(analise_id, usuario_id)
);

CREATE TABLE ListaAnalisesCulturas(
	analise_id integer,
	cultura_id integer,
	
	FOREIGN KEY (analise_id) REFERENCES Analises(id),
	FOREIGN KEY (cultura_id) REFERENCES Culturas(id),
	
	PRIMARY KEY(analise_id, cultura_id)
);



-- PROCEDURES
CREATE OR REPLACE PROCEDURE novoUsuario(nome text, email text, senha text) AS $$
BEGIN
	INSERT INTO Usuarios (nomeUsuario, email, senha)
	VALUES(nome, email, crypt(senha, gen_salt('bf')));
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novaLavoura(produto text) AS $$
BEGIN
	INSERT INTO Lavouras (produto)
	VALUES(produto);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novaCultura(nome text, produto integer) AS $$
BEGIN
	INSERT INTO Culturas (nomePersonalizado, produto)
	VALUES(nome, produto);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE ativarCultura(identificador integer) AS $$
BEGIN
	UPDATE Culturas
		SET dataInicio = NOW()
	WHERE id = identificador;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE adicionarCulturaAoUsuario(cultura integer, usuario integer) AS $$
BEGIN
	INSERT INTO ListaCulturas(cultura_id, usuario_id)
	VALUES(cultura, usuario);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novoTipoEstacao(tipo text) AS $$
BEGIN
	INSERT INTO TiposEstacao (tipo)
	VALUES(tipo);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novaEstacao(nome text, tipo integer, cultura integer) AS $$
BEGIN
	INSERT INTO Estacoes (nomePersonalizado, tipo_id, cultura_id)
	VALUES(nome, tipo, cultura);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE adicionarEstacaoAoUsuario(estacao integer, usuario integer) AS $$
BEGIN
	INSERT INTO ListaEstacoes(estacao_id, usuario_id)
	VALUES(estacao, usuario);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novoDrone(nome text, cultura integer) AS $$
BEGIN
	INSERT INTO Drones (nomePersonalizado, cultura_id)
	VALUES(nome, cultura);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE adicionarDroneAoUsuario(drone integer, usuario integer) AS $$
BEGIN
	INSERT INTO ListaDrones(drone_id, usuario_id)
	VALUES(drone, usuario);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novoEstagio(estagio text) AS $$
BEGIN
	INSERT INTO EstagiosProcesso (estagio)
	VALUES(estagio);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novoTipoAnalise(tipo text) AS $$
BEGIN
	INSERT INTO TiposAnalise (tipo)
	VALUES(tipo);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE novaAnalise(nome text, tipo integer) AS $$
BEGIN
	INSERT INTO Analises (nomePersonalizado, tipo)
	VALUES(nome, tipo);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE adicionarAnaliseAoUsuario(analise integer, usuario integer) AS $$
BEGIN
	INSERT INTO ListaAnalises(analise_id, usuario_id)
	VALUES(analise, usuario);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE finalizarAnaliseAgua(
    analise_id integer, p_aluminio numeric = 0, p_arsenio numeric = 0,
    p_bario numeric = 0, p_cadmio numeric = 0, p_cloro numeric = 0,
    p_cromo numeric = 0, p_fluor numeric = 0, p_virus numeric = 0,
    p_bacteria numeric = 0, p_chumbo numeric = 0, p_nitrato numeric = 0,
    p_nitrito numeric = 0, p_mercurio numeric = 0, p_perclorato numeric = 0,
    p_radio numeric = 0, p_prata numeric = 0, p_uranio numeric = 0
) AS $$
BEGIN
    INSERT INTO ParametrosAgua (
        analise_id, aluminio, arsenio, bario, cadmio, cloro, cromo, fluor, virus, bacteria,
        chumbo, nitrato, nitrito, mercurio, perclorato, radio, prata, uranio
    ) VALUES (
        analise_id, p_aluminio, p_arsenio, p_bario, p_cadmio, p_cloro, p_cromo, p_fluor, p_virus, p_bacteria,
        p_chumbo, p_nitrato, p_nitrito, p_mercurio, p_perclorato, p_radio, p_prata, p_uranio
    );
	
	UPDATE Analises
		SET Estagio = 4
	WHERE id = analise_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE finalizarAnaliseSolo(
    analise_id integer, potassio numeric = 0, nitrogenio numeric = 0, fosforo numeric = 0
) AS $$
BEGIN
    INSERT INTO ParametrosSolo (analise_id, potassio, nitrogenio, fosforo) 
	VALUES (analise_id, potassio, nitrogenio, fosforo);
	
	UPDATE Analises
		SET Estagio = 4
	WHERE id = analise_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE mudarEstagioAnalise(analise_id integer, novoEstagio integer) AS $$
BEGIN
    UPDATE Analises
		SET Estagio = novoEstagio
	WHERE id = analise_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE ligarAnaliseACultura(analise integer, cultura integer) AS $$
DECLARE
	analise_tipo integer;
BEGIN
	SELECT Analises.tipo INTO analise_tipo FROM Analises WHERE id = analise;
	
	IF analise_tipo = 2 THEN
		INSERT INTO ListaAnalisesCulturas(analise_id, cultura_id) VALUES(analise, cultura);
	END IF;
END;
$$ LANGUAGE plpgsql;





-- ENTIDADES
CALL novoUsuario('O Rei do Gado', 'reidogado@agro.com.br', 'GadoRei@1234');
CALL novoUsuario('O Barão do Café', 'baraomaua@agro.com', 'OPoderosoMaua');

CALL novaLavoura('Maçã');
CALL novaLavoura('Milho');
CALL novaLavoura('Batata');
CALL novaLavoura('Trigo');

CALL novaCultura('Cultivo de Trigo do Rei', 4);

CALL ativarCultura(1);

CALL adicionarCulturaAoUsuario(1, 1);

CALL novoTipoEstacao('Sense');
CALL novoTipoEstacao('Duo');
CALL novoTipoEstacao('Aqua');
CALL novoTipoEstacao('Pro');

CALL novaEstacao('Estação do Rei', 3, 1);

CALL adicionarEstacaoAoUsuario(1, 1)

CALL novoDrone('Drone do Rei', 1);

CALL adicionarDroneAoUsuario(1, 1);

CALL novoEstagio('Coleta');
CALL novoEstagio('Transporte');
CALL novoEstagio('Análise');
CALL novoEstagio('Resultado');

CALL novoTipoAnalise('Água');
CALL novoTipoAnalise('Solo');

CALL novaAnalise('Análise do Rei', 2);

CALL novaCultura('Cultura Teste', 2);
CALL ativarCultura(2);
CALL adicionarCulturaAoUsuario(2, 1);

CALL ligarAnaliseACultura(1, 1);

-- Culturas Criadas em Produção, para Teste
CALL novaCultura('Cultura Postman', 3);
CALL adicionarCulturaAoUsuario(3, 1);

CALL novaCultura('Cultura do Site', 1);
CALL adicionarCulturaAoUsuario(4, 1);

CALL mudarEstagioAnalise(1, 3);