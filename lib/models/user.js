var Sequelize = require('sequelize');
var db = require('../conn/db.js');

let User = db.db_inst.define('user', {
  id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
  },
  fbUserID: {
        type: Sequelize.BIGINT,
        allowNull: true,
        unique: true
  },
  first_name: {
        type: Sequelize.STRING,
        allowNull: true
  },
  last_name: {
        type: Sequelize.STRING,
        allowNull: true
  },
  email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
  },
  pic_url: {
        type: Sequelize.STRING,
        isUrl: true,
        allowNull: true
  },
  device_token: {
        type: Sequelize.BIGINT,
        allowNull: true
  },
  associated_id: {
        type: Sequelize.BIGINT,
        allowNull: false
  }
})

exports.model = User;
