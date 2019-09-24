module.exports = async () => {

    console.log("Creating tables");

    const Student       =   require('./models/Student');
    const EventList     =   require('./models/EventList');
    const Challenge     =   require('./models/Challenge');
    const LeaderBoard   =   require('./models/LeaderBoard');
    const Mail          =   require('./models/Mail');
    const Poll          =   require('./models/Poll');
    const Workshop      =   require('./models/Workshop');

    await Student.hasOne(EventList,{
        as : "EventList",
        foreignKey : "studentId"
    });

    await Student.hasOne(Challenge, {
        as : "Challenge",
        foreignKey : "studentId"
    });

    await LeaderBoard.belongsTo(Student, {
        as : "Student",
        foreignKey : "studentId"
    });

    await Mail.belongsTo(Student, {
        as : "Student",
        foreignKey : "studentId"
    });

    await Workshop.belongsTo(Student, {
        as : "Student",
        foreignKey : "studentId"
    });


    Challenge.sync();
    EventList.sync();
    LeaderBoard.sync();
    Student.sync();
    Mail.sync();
    Poll.sync();
    Workshop.sync();

}