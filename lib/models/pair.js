var Sequelize = require('sequelize');
var db = require('../conn/db.js');
var User = require('./user.js');

var Pair = db.db_inst.define('pair', {
  user_id1: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: User.model,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
  },
  user_id2: {
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

exports.model = Pair;
