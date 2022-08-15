import { Sequelize } from "sequelize/types";
import { DataTypes } from 'sequelize';

const Role = (sequelize: Sequelize) => {
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

export default Role;