DROP TABLE usuario IF EXISTS;
CREATE TABLE usuario(ID bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, USERNAME VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255) NOT NULL, ADMINKEY bigint);


INSERT INTO usuario(username,password,adminkey) VALUES('admin', '4dm1n', 1);
INSERT INTO usuario(username,password,adminkey) VALUES('Gustavo', '12345', 0);
INSERT INTO usuario(username,password,adminkey) VALUES('Madetr', '67890', 0);
INSERT INTO usuario(username,password,adminkey) VALUES('Fulano', 'ciclano', 0);