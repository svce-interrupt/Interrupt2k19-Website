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

    await Challenge.belongsTo(Student, {
        as : "Student",
        foreignKey : "studentId"
    });

    await LeaderBoard.belongsTo(Student, {
        as : "Student",
        foreignKey : "studentId"
    });

    Challenge.sync();
    EventList.sync();
    LeaderBoard.sync();
    Student.sync();


}