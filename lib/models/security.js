var Sequelize = require('sequelize');
var db = require('../conn/db.js');
var User = require('./user.js');

var Security = db.db_inst.define('security', {
  user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: User.model,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
  },
},
{
  freezeTableName: true,
})

exports.model = Security;
