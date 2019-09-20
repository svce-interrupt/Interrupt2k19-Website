// Packages
const db        =       require('../database/config/connection');
const Student   =       require('../database/models/Student');

const verifyData = async (req, res, next) => {
 
    const {name, email, number, password, confirmPassword, college, year} = req.body.student;
    let errors = [];

    let studentemail = await Student.findOne({
        where : {email : email},
        attributes : ['email']
    });

    if(!name || !email || !number || !password || !college ||!year) errors.push({message : "Please fill all the blanks"});
    if(studentemail) errors.push({message : "Email already exists"})
    if(password.length < 6) errors.push({message : "Password should be atleast 6 characters"});
    if(password !== confirmPassword) errors.push({message : "Passwords don't match"});


    if(errors.length>0){
        
        req.flash('error', errors[0].message);
        
        return res.render('register', {
            name,
            email,
            number,
            password,
            college,
            year,
            message : req.flash('error')

        }); 
    }
    
    next();
};

const checkEmptyData = (req, res, next) => {

    if(Object.entries(req.query).length == 0)
	return res.redirect('back');
    next();

}

const notLoggedIn = (req, res, next) => {

    if(req.isAuthenticated())
        return res.redirect('back');
    
    return next();

}

const isAuthenticated = (req, res, next) => {
    
    if(req.isAuthenticated())         
        return next();
    res.redirect('/login');
    
}

const hasNotVoted = (req, res, next) => {

    Student.findOne({where : {id : req.user.id} })
      .then((student) => {
          if(!student.hasVoted)
            next();
          else
            res.status(406).send({
                "status" : 0 ,
                "message" : "You have already voted" 
            });
      })

}

const hasAdminAccess = (req, res, next) => {
    
    if(req.isAuthenticated() && req.user.isAdmin)
        next();
    else
        res.status(401).send('Unauthorized');
}

module.exports = {
    verifyData,
    isAuthenticated,
    notLoggedIn,
    hasAdminAccess,
    hasNotVoted,
    checkEmptyData
};
