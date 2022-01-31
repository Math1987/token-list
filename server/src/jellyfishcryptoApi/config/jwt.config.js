import jwt from "jsonwebtoken";
var secret = "74c1ce27-c663-4e6e-b9a9-aa726652dcd2";
export var createToken = function (datas) {
    return jwt.sign(datas, secret);
};
export var readToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret, function (err, decoded) {
            if (decoded) {
                resolve(decoded);
            }
            else {
                reject(err);
            }
        });
    });
};
