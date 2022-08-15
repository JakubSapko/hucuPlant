import {Sequelize} from 'sequelize/types';
import {DataTypes} from 'sequelize';


const User = (sequelize: Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });
    return User;
}

export default User;