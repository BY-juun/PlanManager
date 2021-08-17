module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define('Plan',{
        title: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        category: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        hashTag: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
    },{
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',//한글 + 이모티콘
    });

    Plan.associate = (db) => {
        db.Plan.belongsTo(db.User);
    };
    return Plan;
}
