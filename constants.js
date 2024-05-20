const DB_URL = 'mongodb://localhost:27017/mydb';
const PORT = 3000;

const status_codes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
};


module.exports = {
    DB_URL,
    PORT,
    status: status_codes
};