import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    publication_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    publication_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    }, {
    tableName: "posts",
    timestamps: false,
    });

module.exports = Post;