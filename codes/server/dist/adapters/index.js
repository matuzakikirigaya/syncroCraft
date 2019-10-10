"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Catalog_1 = require("./entity/Catalog");
const User_1 = require("./entity/User");
function typeormTest() {
    typeorm_1.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "nodeuser",
        password: "nodeuser",
        database: "testdb",
        entities: [User_1.User, Catalog_1.Catalog],
        synchronize: true,
        logging: false
    })
        .then(async (connection) => {
        let savedCatalogs = await connection.manager.find(Catalog_1.Catalog);
        console.log("All catalogs from the db: ", savedCatalogs);
    }).catch(error => console.log(error));
}
exports.typeormTest = typeormTest;
//# sourceMappingURL=index.js.map