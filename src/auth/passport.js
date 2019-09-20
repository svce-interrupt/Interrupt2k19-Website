const LocalStrategy     =    require('passport-local').Strategy;
const Student           =    require('../database/models/Student');
const EventList         =    require('../database/models/EventList');

module.exports = (passport) => {
    
    console.log("Passport is connected");

    passport.serializeUser((student, done)=>{
        return done(null, student.id);
    });

    passport.deserializeUser((id, done) => {
        Student.findOne({where : {id}})
          .then((student) => {
            return done(null, student);
          })
    })

    passport.use('local', new LocalStrategy({
      usernameField : "student[email]",
      passwordField : "student[password]",
      passReqToCallback : true
    },
      (req, email, password, done) => {
      Student.findOne({
        where : {email : email}
      })
        .then((student) => {
          if(!student){
            console.log("Email has not been registered");
            return done(null, false, {message : 'Email has not been registered'});
          }
          else if(student){
            if(!student.validatePassword(password, student.password)){
              console.log("Password is incorrect");
              return done(null, false, {message : 'Password is incorrect'});
            }
          }
          return done(null, student, {message : `Hey ${student.dataValues.student_name}!`});
        })
        .catch(err => done(err))
    }));

    passport.use('admin-local', new LocalStrategy({
      usernameField : "student[email]",
      passwordField : "student[password]",
      passReqToCallback : true
    },
      (req, email, password, done) => {
      Student.findOne({
        where : {email : email}
      })
        .then((student) => {
          if(!student){
            console.log("Email has not been registered");
            return done(null, false, {message : 'Email has not been registered'});
          }
          else if(student){
            if(!student.validatePassword(password, student.password)){
              console.log("Password is incorrect");
              return done(null, false, {message : 'Password is incorrect'});
            }

            if(!student.hasAdminAccess(student.isAdmin)){
              console.log("User has no admin access");
              return done(null, false, {message : 'No Admin Access'});
            }

          }
          return done(null, student, {message : `Hey ${student.dataValues.student_name}!`});
        })
        .catch(err => done(err))
    }));

}