module.exports = async () => {

    console.log("Creating tables");

    const Student       =   require('./models/Student');
    const EventList     =   require('./models/EventList');
    const Challenge     =   require('./models/Challenge');
    const LeaderBoard   =   require('./models/LeaderBoard');

    await EventList.belongsTo(Student, {
        as : "Student",
        foreignKey : 'studentId'
    });

    await Student.hasOne(EventList, {
        as : "EventList",
        foreignKey : "studentId"
    });

    await Student.hasOne(Challenge, {
        as : "Game",
        foreignKey : "studentId"
    });

    await Challenge.belongsTo(Student, {
        as : "Student",
        foreignKey : "studentId"
    });

    await LeaderBoard.hasMany(Student, {
        as : "Student",
        foreignKey : "id"
    });


    Challenge.sync();
    EventList.sync();
    LeaderBoard.sync();
    Student.sync();


}