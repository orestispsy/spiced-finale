DROP TABLE IF EXISTS community;

CREATE TABLE community (
    id            SERIAL PRIMARY KEY,
    nickname    VARCHAR NOT NULL UNIQUE CHECK (nickname <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    chat_img VARCHAR,
    chat_color VARCHAR;
    admin BOOLEAN DEFAULT false,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gigs (
    id            SERIAL PRIMARY KEY,
    date    VARCHAR NOT NULL UNIQUE CHECK (date <> ''),
    venue VARCHAR DEFAULT false,
    lat    VARCHAR NOT NULL CHECK (lat <> ''),
    lng VARCHAR NOT NULL CHECK (lng <> '') ,
    tour_name VARCHAR DEFAULT false,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR DEFAULT false,
    poster VARCHAR
);

CREATE TABLE chatroom(
    id SERIAL PRIMARY KEY,
    msg_sender_id INT REFERENCES community(id) NOT NULL,
    chat_msg TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visitors(
    id SERIAL PRIMARY KEY,
    ip TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);