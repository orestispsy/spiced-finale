const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/1000mods-gig-guide"
);

module.exports.addRegistration = (nickname, password_hash) => {
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
        ORDER BY gigs.created_at DESC
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

module.exports.updateGig = (date, venue, lat, lng, tour_name, city, poster) => {
    const q = `
        UPDATE gigs
        SET date = $1, venue = $2, lat = $3, lng = $4, tour_name = $5, city = $6, poster = $7
        WHERE gigs.date = $1
        RETURNING *
    `;
    const params = [date, venue, lat, lng, tour_name, city, poster];
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
    const q = "SELECT * FROM community WHERE id = ANY($1)";
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
        LIMIT 250
        ;
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
        AND chatroom.chat_msg NOT LIKE '%--##--entered--##--%'
        AND chatroom.chat_msg NOT LIKE '%--##--left--##--%'
        ORDER BY id DESC
        LIMIT 20;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getImages = () => {
    const q = `
    SELECT DISTINCT ON (poster) id, poster FROM gigs WHERE NOT (poster IS null)
    `;
    const params = [];
    return db.query(q, params);
};

module.exports.deleteChatPost = (id) => {
    const q = `
        DELETE FROM chatroom
        WHERE chatroom.id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.deleteUser = (id) => {
    const q = `
        DELETE FROM community
        WHERE community.id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.deleteAllUserPosts = (id) => {
    const q = `
        DELETE FROM chatroom
        WHERE chatroom.msg_sender_id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getAllUsers = () => {
    const q = `
        SELECT DISTINCT ON (msg_sender_id) community.id, community.nickname, chat_msg, chat_img, admin, super_admin, chatroom.created_at
        FROM chatroom
        JOIN community
        ON (community.id = msg_sender_id)
        WHERE community.id != '1'
        ORDER BY msg_sender_id, chatroom.created_at DESC;
     `;
    return db.query(q);
};

module.exports.setUserAdmin = (id, boolean) => {
    const q = `
        UPDATE community SET admin = $2
        WHERE community.id = $1
     `;
    const params = [id, boolean];
    return db.query(q, params);
};

module.exports.setUserSuperAdmin = (id, boolean) => {
    const q = `
        UPDATE community SET super_admin = $2
        WHERE community.id = $1
     `;
    const params = [id, boolean];
    return db.query(q, params);
};

module.exports.addCommunityImage = (
    gig_id,
    img_sender_id,
    nickname,
    img_url
) => {
    const q = `
        INSERT INTO images (gig_id, img_sender_id,nickname, img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const params = [gig_id, img_sender_id, nickname, img_url];
    return db.query(q, params);
};

module.exports.getCommunityImages = (id) => {
    const q = `
        SELECT *
        FROM images
        WHERE images.gig_id = $1;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.deleteCommunityImage = (id) => {
    const q = `
        DELETE FROM images
        WHERE images.id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getComments = (id) => {
    const q = `
        SELECT  comments.id, gig_id, msg_sender_id, comment, community.nickname
        FROM comments
        JOIN community
        ON (community.id = comments.msg_sender_id) WHERE comments.gig_id = $1;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.addComment = (gig_id, msg_sender_id, comment) => {
    const q = `
        INSERT INTO comments (gig_id, msg_sender_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const params = [gig_id, msg_sender_id, comment];
    return db.query(q, params);
};

module.exports.deleteComments = (id) => {
    const q = `
        DELETE FROM comments
        WHERE  comments.msg_sender_id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.deleteCommentsEditor = (id) => {
    const q = `
        DELETE FROM comments
        WHERE  comments.gig_id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getPrivateMsgs = (sender_id, receiver_id) => {
    const q = `
        SELECT * FROM private_messages
        WHERE msg_sender_id = $1
        AND msg_receiver_id = $2
        OR msg_sender_id = $2 AND
        msg_receiver_id = $1
        ORDER BY created_at DESC
        LIMIT 10;
    `;
    const params = [sender_id, receiver_id];
    return db.query(q, params);
};

module.exports.getFilteredPrivate = (receiver_id) => {
    const q = `
         SELECT * FROM (SELECT DISTINCT ON (msg_sender_id) id, msg_sender_id, msg_receiver_id, private_msg, receiver_seen, created_at    
        FROM private_messages
        WHERE msg_receiver_id = $1
        ORDER BY msg_sender_id, created_at DESC)
        private_messages
        ORDER BY created_at;
    `;
    const params = [receiver_id];
    return db.query(q, params);
};

module.exports.seenPrivateMsgs = (id) => {
    const q = `
           UPDATE private_messages SET receiver_seen = 'true'
        WHERE private_messages.id = $1
                RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.addPrivateMsg = (msg_sender_id, msg_receiver_id, message) => {
    const q = `
        INSERT INTO private_messages (msg_sender_id, msg_receiver_id, private_msg)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const params = [msg_sender_id, msg_receiver_id, message];
    return db.query(q, params);
};

module.exports.getPrivateMsgs = (sender_id, receiver_id) => {
    const q = `
        SELECT * FROM private_messages
        WHERE msg_sender_id = $1
        AND msg_receiver_id = $2
        OR msg_sender_id = $2 AND
        msg_receiver_id = $1
        ORDER BY created_at DESC
        LIMIT 10;
    `;
    const params = [sender_id, receiver_id];
    return db.query(q, params);
};

module.exports.deletePrivateMessages = (id) => {
    const q = `
          DELETE FROM private_messages
        WHERE private_messages.msg_sender_id  = $1
        OR  private_messages.msg_receiver_id  = $1
        RETURNING *
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getNetworkUsers = () => {
    const q = `
        SELECT * FROM community
        ORDER BY created_at;
    `;

    return db.query(q);
};
