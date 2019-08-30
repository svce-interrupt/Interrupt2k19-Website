// Packages


const verifyData = (req, res, next) => {

    next();
};

const isLoggedin = (req, res, next) => {
    
    next();
}

module.exports = {
    verifyData,
    isLoggedin
};