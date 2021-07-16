const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/1000mods-gig-guide"
);

module.exports.addRegistration = (
    nickname,
    password_hash
) => {
    const q = `
        INSERT INTO community (nickname,
    password_hash)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [nickname, password_hash];
    return db.query(q, params);
};

module.exports.loginCheck = (nickname) => {
    const q = `
        SELECT *
        FROM community WHERE nickname = $1
    `;
    const params = [nickname];
    return db.query(q, params);
};

module.exports.getUser = (id) => {
    const q = `
        SELECT *
        FROM community WHERE id = $1
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.addGig = (date, venue, lat, lng, tour_name, city) => {
    const q = `
        INSERT INTO gigs (date, venue, lat, lng, tour_name, city)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const params = [date, venue, lat, lng, tour_name, city];
    return db.query(q, params);
};

module.exports.getGigs = () => {
    const q = `
        SELECT *
        FROM gigs
    `;

    return db.query(q);
};

module.exports.getGigToEdit = (date) => {
    const q = `
        SELECT *
        FROM gigs WHERE gigs.date = $1

        `;
    const params = [date];
    return db.query(q, params);
};

module.exports.getGig = (id) => {
    const q = `
        SELECT *
        FROM gigs WHERE gigs.id = $1
        `;
    const params = [id];
    return db.query(q, params);
};



module.exports.updateGig = (date, venue, lat, lng, tour_name, city) => {
    const q = `
        UPDATE gigs
        SET date = $1, venue = $2, lat = $3, lng = $4, tour_name = $5, city = $6
        WHERE gigs.date = $1
        RETURNING *
    `;
    const params = [date, venue, lat, lng, tour_name, city];
    return db.query(q, params);
};

module.exports.deleteGig = (date) => {
    const q = `
        DELETE FROM gigs
        WHERE date = $1
        RETURNING *
    `;
    const params = [date];
    return db.query(q, params);
};

module.exports.addImage = (id, url) => {
    const q = `
        UPDATE gigs
        SET poster = $2
        WHERE gigs.id = $1
        RETURNING *
    `;
    const params = [id, url];
    return db.query(q, params);
};


module.exports.check = () => {
    const q = `
        SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND 
        schemaname != 'information_schema';
    `;

    return db.query(q);
};

module.exports.getOnlineUsers = (Ids) => {
    const q =
        "SELECT * FROM community WHERE id = ANY($1)";
    const params = [Ids];
    return db.query(q, params);
};

module.exports.addChatMsg = (msg_sender_id, chat_msg) => {
    const q = `
        INSERT INTO chatroom (msg_sender_id, chat_msg)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [msg_sender_id, chat_msg];
    return db.query(q, params);
};

module.exports.getChatMsgs = () => {
    const q = `
        SELECT chatroom.id, chatroom.created_at, nickname, chat_img, chat_color, msg_sender_id, chat_msg
        FROM chatroom
        JOIN community
        ON (community.id = msg_sender_id)
        ORDER BY chatroom.created_at DESC
        LIMIT 10;
    `;
    return db.query(q);
};

module.exports.addVisitorIp = (ip) => {
    const q = `
        INSERT INTO visitors (ip)
        VALUES ($1)
        RETURNING *
    `;
    const params = [ip];
    return db.query(q, params);
};

module.exports.checkVisitorIps = (ip) => {
    const q = `
        SELECT FROM visitors
        WHERE ip = $1
    `;
    const params = [ip];
    return db.query(q, params);
};

module.exports.checkAllVisitorIps = () => {
    const q = `
        SELECT * FROM visitors
    `;
    return db.query(q);
};

module.exports.addChatPic = (pic, id) => {
    const q = `
        UPDATE community
        SET chat_img = $1
        WHERE id = $2
        RETURNING *
         `;
    const params = [pic, id];
    return db.query(q, params);
};

module.exports.addChatColor = (id, color) => {
    const q = `
        UPDATE community
        SET chat_color = $2
        WHERE id = $1
        RETURNING *
         `;
    const params = [id, color];
    return db.query(q, params);
};

module.exports.getNextMsgs = (id) => {
    const q = `
        SELECT chatroom.id, chatroom.created_at, nickname, chat_img, chat_color, msg_sender_id, chat_msg 
        FROM chatroom
         JOIN community
        ON (community.id = msg_sender_id)
        WHERE chatroom.id < $1
        ORDER BY id DESC
        LIMIT 20;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getPrivateMsgs = () => {
    const q = `
        SELECT chatroom.id, chatroom.created_at, nickname, chat_img, chat_color, msg_sender_id, chat_msg
        FROM chatroom
        JOIN community
        ON (community.id = msg_sender_id)
        ORDER BY chatroom.created_at DESC
        LIMIT 10;
    `;
    return db.query(q);
};

