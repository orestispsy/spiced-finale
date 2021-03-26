DROP TABLE IF EXISTS community;

CREATE TABLE community (
    id            SERIAL PRIMARY KEY,
    nickname    VARCHAR NOT NULL CHECK (nickname <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);