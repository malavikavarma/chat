// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        description: ''
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        description: ''
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        description: ''
      },
      picurl: {
        type: DataTypes.TEXT,
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
  users.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
