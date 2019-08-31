// Packages
const db        =       require('../database/config/connection');
const Student   =       require('../database/models/Student');

const verifyData = async (req, res, next) => {
 
    const {name, email, number, password, college, year} = req.body;
    let errors = [];

    let studentemail = await Student.findOne({
        where : {email : email},
        attributes : ['email']
    });

    if(!name || !email || !number || !password || !college || !year) errors.push({message : "Please fill all the blanks"});
    if(password.length < 6) errors.push({message : "Password should be atleast 6 characters"});
    if(studentemail) errors.push({message : "Email already exists"})
    
    if(errors.length>0) return res.status(400).send(errors);
    next();
};

const isLoggedin = (req, res, next) => {
    
    next();
}

module.exports = {
    verifyData,
    isLoggedin
};