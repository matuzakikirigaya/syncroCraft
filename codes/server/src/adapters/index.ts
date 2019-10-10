import "reflect-metadata";
import { createConnection } from "typeorm";
import { Catalog } from "./entity/Catalog";
import { User } from "./entity/User"

export function typeormTest() {
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "nodeuser",
  password: "nodeuser",
  database: "testdb",
  entities: [__dirname + "/entity/*.ts"], //多分ここで*.tsを指定する都合上、ts-nodeだと動くけどwebpackで動かない。tscでやると動くはず
  synchronize: true,
  logging: false
})
  .then(async connection => {
    let savedCatalogs = await connection.manager.find(User);
   console.log("All catalogs from the db: ", savedCatalogs);
 }).catch(error => console.log(error));
}