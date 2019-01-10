// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const messages = sequelizeClient.define(
    'messages',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        description: ''
      },
      to: {
        type: DataTypes.BIGINT,
        allowNull: false,
        description: ''
      },
      from: {
        type: DataTypes.BIGINT,
        allowNull: false,
        description: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'createdat'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updatedat'
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  messages.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return messages;
};
