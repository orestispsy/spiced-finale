DROP TABLE IF EXISTS community;

CREATE TABLE community (
    id            SERIAL PRIMARY KEY,
    nickname    VARCHAR NOT NULL UNIQUE CHECK (nickname <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    chat_img VARCHAR,
    chat_color VARCHAR,
    admin BOOLEAN DEFAULT false,
    super_admin BOOLEAN DEFAULT false,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    online BOOLEAN DEFAULT false
    last_online  TIMESTAMP DEFAULT null,
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

CREATE TABLE chatroom (
    id SERIAL PRIMARY KEY,
    msg_sender_id INT REFERENCES community(id) NOT NULL,
    chat_msg TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE private_messages (
    id SERIAL PRIMARY KEY,
    msg_sender_id INT REFERENCES community(id) NOT NULL,
    msg_receiver_id INT REFERENCES community(id) NOT NULL,
    private_msg TEXT,
    receiver_seen BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visitors(
    id SERIAL PRIMARY KEY,
    ip TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
    id            SERIAL PRIMARY KEY,
    gig_id  VARCHAR,   
    img_sender_id  VARCHAR,
    nickname VARCHAR,   
    img_url VARCHAR,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    gig_id INT REFERENCES gigs(id) NOT NULL,
    msg_sender_id INT REFERENCES community(id) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE about_comments (
    id SERIAL PRIMARY KEY,
    name VARCHAR,  
    email VARCHAR,
    website VARCHAR,
    comment TEXT,
    reply integer,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
