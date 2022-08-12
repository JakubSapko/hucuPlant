import { Sequelize } from "sequelize/types";
import { DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    });
    return Role;
}