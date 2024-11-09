CREATE TABLE Usuario (
    user_id INT NOT NULL PRIMARY KEY,
    user_nome CHAR(50) NOT NULL,
    user_email CHAR(50) NOT NULL,
    user_senha TEXT NOT NULL
);


CREATE TABLE Quadras (
    quadra_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    calendario DATE NOT NULL,
    valor CHAR(50),
    publico CHAR(50),
    FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
);


CREATE TABLE Partida (
    match_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    match_data DATE NOT NULL,
    match_local CHAR(100) NOT NULL,
    match_valor CHAR(50),
    match_publico CHAR(100),
    FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
);

CREATE TABLE Grupo (
    shipment_id INT NOT NULL PRIMARY KEY,
    match_id INT NOT NULL,
    user_id INT NOT NULL,
    horario DATE NOT NULL,
    FOREIGN KEY (match_id) REFERENCES Partida(match_id),
    FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
);

