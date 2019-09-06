module.exports = async () => {

    console.log("Creating tables");

    const Student   =   require('./models/Student');
    const EventList =   require('./models/EventList');

    await EventList.belongsTo(Student, {
        as : "Student",
        foreignKey : 'studentId'
    });

    await Student.hasOne(EventList, {
        as : "EventList",
        foreignKey : "studentId"
    });


    EventList.sync();
    Student.sync();


}