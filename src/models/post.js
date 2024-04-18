'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
        Post.hasOne(models.Video, {
          foreignKey: "postId",
          onDelete: "CASCADE",
          as: "video" // Alias for the relationship
        });

        Post.belongsTo(models.User, {
          foreignKey: "userId",
          onDelete: "CASCADE",
          as: "user"
        });

    }
  }
  Post.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    message: DataTypes.STRING(512)
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};