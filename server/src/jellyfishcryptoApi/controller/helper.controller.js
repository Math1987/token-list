import { ObjectId } from "mongodb";
export var gotBody = function (object) {
    return (typeof object === "object" && object.body) ? true : false;
};
//WAIT UPDATE FOR MORE PRECISIONS
export var isSolanaAddress = function (value) {
    return (typeof value === "string" && value.length >= 32 && value.length <= 44) ? true : false;
};
//WAIT UPDATE FOR MORE PRECISIONS
export var isSolanaTransactionSignature = function (value) {
    return (typeof value === "string" && value.length >= 64 && value.length <= 512) ? true : false;
};
export var isPseudo = function (value) {
    return (typeof value === "string" && value.length <= 56) ? true : false;
};
export var isMongoId = function (value) {
    return ObjectId.isValid(value);
};
export var preparBodyForSend = function (object) {
    if (object['_id'] && object['_id'] instanceof ObjectId) {
        object['_id'] = object['_id'].toString();
    }
    return object;
};
