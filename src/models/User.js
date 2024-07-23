'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.hasMany(models.Notification, { foreignKey: "userId" });

      User.hasOne(models.Profile, { foreignKey: "userId" });

      User.belongsToMany(models.User, {
        through: models.UserRelationship,
        as: "Followers",
        foreignKey: "followingUserId",
        otherKey: "followerUserId"
      });

      User.belongsToMany(models.User, {
        through: models.UserRelationship,
        as: "Followings",
        foreignKey: "followerUserId",
        otherKey: "followingUserId"
      });

    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};