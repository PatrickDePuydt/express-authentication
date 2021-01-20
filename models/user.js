'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 99],
          msg: 'Password must be at least 6 characters'
        },
        notContains: {
          args: this.name,
          msg: 'Password cannot contain your name'
        }
      }
    }
  }, {
    hooks: {
      // Instance Options
      beforeCreate: (pendingUser, options) => {
        // Check if there is a user being passed AND that user has a password

        // Hash the password

        // Store the hash as the user's password
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};