import * as mongoose from "mongoose";

const host = "127.0.0.1:27017";
const db = "testdb";



mongoose.connect(`mongodb://${host}/${db}`, { useNewUrlParser: true });

const schema = new mongoose.Schema({
  field_a: String
});

"mongooseは3つ目の引数名のコレクションを処理対象として認識します";
"（デフォルトは一つ目の引数の頭小文字＋複数形）";
export const hoge = mongoose.model("sample", schema, "sample");
