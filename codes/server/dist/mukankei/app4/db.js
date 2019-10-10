"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const host = "127.0.0.1:27017";
const db = "testdb";
mongoose.connect(`mongodb://${host}/${db}`, { useNewUrlParser: true });
const schema = new mongoose.Schema({
    field_a: String
});
"mongooseは3つ目の引数名のコレクションを処理対象として認識します";
"（デフォルトは一つ目の引数の頭小文字＋複数形）";
exports.hoge = mongoose.model("sample", schema, "sample");
//# sourceMappingURL=db.js.map