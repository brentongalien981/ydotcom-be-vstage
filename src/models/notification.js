'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Notification.belongsTo(models.User, { foreignKey: "userId" });

    }
  }
  Notification.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    message: DataTypes.STRING,
    notificationTypeId: DataTypes.SMALLINT,
    isRead: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};