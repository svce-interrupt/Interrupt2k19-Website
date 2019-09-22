// Packages
const db        =       require('../database/config/connection');
const Student   =       require('../database/models/Student');
const Challenge =       require('../database/models/Challenge');

const mapping = {
    1 : '/challenge/hang_thug',
    2 : '/challenge/connect_4',
    3 : '/challenge/ror',
    4 : '/challenge/dark_house',
    5 : '/challenge/ctp', 
    6 : '/challenge/tetris',
    7 : '/challenge/caesar',
    8 : '/challenge/maze',
    9 : '/challenge/mtb',
    10: '/challenge/coderoll'


};

const verifyData = async (req, res, next) => {
 
    const {name, email, number, password, confirmPassword, college, year, dept} = req.body.student;
    let errors = [];

    let studentemail = await Student.findOne({
        where : {email : email},
        attributes : ['email']
    });


    let studentnumber = await Student.findOne({
        where : {ph_number : number},
        attributes : ['ph_number']
    });

    if(!name || !email || !number || !password || !college ||!year) errors.push({message : "Please fill all the blanks"});
    if(studentnumber) errors.push({message : "An account is registered using this number"});
    if(studentemail) errors.push({message : "Email already exists"})
    if(password.length < 6) errors.push({message : "Password should be atleast 6 characters"});
    if(password !== confirmPassword) errors.push({message : "Passwords don't match"});
    if(year>5 || year<1) errors.push({message : `${year} ... for real?`});
    if(number.length != 10) errors.push({message : 'Make sure it is a 10 digit mobile number'});


    if(errors.length>0){
        
        req.flash('error', errors[0].message);

        return res.render('register', {
            name : name,
            email : email,
            number : number,
            password : password,
            college : college,
            year : year,
            dept : dept,
            confirmPassword : confirmPassword,
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

const checkLevel = (req, res , next) => {

    Challenge.findOne({
        attributes : ['level', 'score']
    }).then((user) => {
        if(user){
            const {level, score} = user.dataValues;
            req.session.level = level;
            req.session.score = score;
            next();
        }
        else{
            user.createChallenge({level : 1, score : 0})
                .then(user => {
                    const {level, score} = user.dataValues;
                    req.session.level = level;
                    req.session.score = score;        
                    next();
                });
        }

    })

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
