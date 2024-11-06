const sessions = {};

exports.isValidSession = (sid) => sessions[sid] !== undefined;

exports.isValidUsername = (username) => /^[A-Za-z0-9_]+$/.test(username);

exports.createSession = (sid, username) => {
    sessions[sid] = { username };
};

exports.removeSession = (sid) => {
    delete sessions[sid];
};

exports.getUsernameBySid = (sid) => sessions[sid] ? sessions[sid].username : null;
