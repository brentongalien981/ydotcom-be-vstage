'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Video.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "CASCADE",
        as: "post"
      });
    }
  }
  Video.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    postId: DataTypes.UUID,
    bbdevcomVideoAssetId: DataTypes.STRING,
    bbdevcomVideoPassthrough: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};