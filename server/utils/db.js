const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/thousand-gigs-guide"
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