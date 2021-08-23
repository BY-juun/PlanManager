module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define('Plan',{
        content: {
            type: DataTypes.STRING(50),
            allowNull: false, //필수
        },
        starttime: {
            type: DataTypes.INTEGER,
            allowNull: true, //필수
        },
        endtime: {
            type: DataTypes.INTEGER,
            allowNull: true, //필수
        },
        totaltime : {
            type: DataTypes.INTEGER,
            allowNull: true, //필수
        }
    },{
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',//한글 + 이모티콘
    });

    Plan.associate = (db) => {
        db.Plan.belongsTo(db.Day);
    };
    return Plan;
}
