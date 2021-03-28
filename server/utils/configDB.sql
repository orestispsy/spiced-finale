DROP TABLE IF EXISTS community;

CREATE TABLE community (
    id            SERIAL PRIMARY KEY,
    nickname    VARCHAR NOT NULL UNIQUE CHECK (nickname <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    admin BOOLEAN DEFAULT false,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gigs (
    id            SERIAL PRIMARY KEY,
    date    VARCHAR NOT NULL CHECK (date <> ''),
    venue VARCHAR DEFAULT '',
    lat    VARCHAR NOT NULL CHECK (lat <> ''),
    lng VARCHAR NOT NULL CHECK (lng <> '') ,
    tour_name VARCHAR DEFAULT '',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);