const config = require("../config/db.config.ts");
const SQLize = require("sequelize");
import { Sequelize, Model, ModelStatic } from "sequelize/types";
import User from "../models/user.model";
import Role from "../models/role.model";

const sequelize = new SQLize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

interface dbInterface {
  Sequelize: Sequelize;
  sequelize: Sequelize;
  user: ModelStatic<Model>;
  role: ModelStatic<Model>;
  ROLES: string[];
}

const db: dbInterface = {
  Sequelize: SQLize,
  sequelize: sequelize,
  user: User(sequelize),
  role: Role(sequelize),
  ROLES: [],
};

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
