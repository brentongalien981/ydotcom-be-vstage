'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class UserRelationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRelationship.init({
    followingUserId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID4
    },
    followerUserId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'UserRelationship',
    timestamps: true
  });
  return UserRelationship;
};