import {DataTypes} from 'sequelize';
import sequelize from '../config/db.config.js';


const WeeklyEvent = sequelize.define('WeeklyEvent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'weekly_events',
    timestamps: false
});

module.exports = WeeklyEvent;