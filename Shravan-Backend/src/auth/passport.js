const LocalStrategy     =    require('passport-local').Strategy;
const Student           =    require('../database/models/Student');

module.exports = (passport) => {
    
    console.log("Passport is connected");

    passport.serializeUser((student, done)=>{
        console.log("Serialized");
        return done(null, student.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("Deserialized");
        
        Student.findById(id)
          .then((student) => {
            console.log(student);
            return done(null, student);
          })
    })

    passport.use(new LocalStrategy({
      usernameField : "student[email]",
      passwordField : "student[password]",
    },
      (email, password, done) => {
      Student.findOne({
        where : {email : email}
      })
        .then((student) => {
          if(!student)
            return done(null, false, {message : 'Email has not been registered'});
          else if(student){
            console.log(student.validatePassword(password, student.password));
            console.log(password, student.password);
            return done(null, false, {message : 'Password is incorrect'});
          }
            return done(null, student)
        })
        .catch(err => done(err))
    }));

}