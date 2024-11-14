CREATE TABLE Usuario (
    user_id INT NOT NULL PRIMARY KEY,
    user_nome CHAR(50) NOT NULL,
    user_email CHAR(50) NOT NULL,
    user_senha TEXT NOT NULL,
    user_age INT,
    user_fav_sport TEXT,
    user_bio char(100)
);


CREATE TABLE quadra (
    quadra_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
	quadra_nome char(50),
    calendario DATE NOT NULL,
    valor CHAR(50),
    publico boolean,
    FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
);


CREATE TABLE Partida (
    match_id SERIAL PRIMARY KEY,
    host_id INT REFERENCES Usuario(user_id), -- Assumindo que há uma tabela Usuario com user_id como chave primária
    match_local VARCHAR(255) NOT NULL,
    match_data TIMESTAMP NOT NULL,
    match_valor DECIMAL(10, 2) NOT NULL,
    match_publico BOOLEAN NOT NULL,
    esporte VARCHAR(50) NOT NULL,
    tipo_competicao VARCHAR(50) NOT NULL,
    genero VARCHAR(10) NOT NULL,
    faixa_idade_min INT NOT NULL,
    faixa_idade_max INT NOT NULL,
    nivel_expertise VARCHAR(50) NOT NULL,
    numero_total_pessoas INT NOT NULL,
    partida_gratuita BOOLEAN NOT NULL,
    acessivel BOOLEAN NOT NULL,
    participantes TEXT[] NOT NULL
);

CREATE TABLE Grupo (
    shipment_id INT NOT NULL PRIMARY KEY,
    match_id INT NOT NULL,
    user_id INT NOT NULL,
    horario DATE NOT NULL,
    FOREIGN KEY (match_id) REFERENCES Partida(match_id),
    FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
);

