// Web framework
const express          =    require('express');
const app              =    express();
const methodOverride   =    require('method-override');
const expressSanitizer =    require('express-sanitizer');
const cookieParser     =    require('cookie-parser');
const session          =    require('express-session');
const cors             =    require('cors');

// Environment settings
const env              =    require('dotenv').config();

// Other required packages
const path             =    require('path');
const hbs              =    require('hbs');

const passport         =    require('passport');

// Database connection
const db               =    require(__dirname + '/src/database/config/connection');
db.authenticate()
  .then(() => console.log("Server is connected to database"))
  .catch(err => console.log(err));

// Create tables and sync 
const bootstrap        =    require('./src/database/bootstrap');
bootstrap();

// Session management
const SequelizeStore   =    require('connect-session-sequelize')(session.Store);
const sessionStore     =    new SequelizeStore({
    db : db,
    checkExpirationInterval : 15 * 60 * 1000,
    expiration : 24 * 60 * 60 * 1000
});

// express settings
app.set('trust proxy', 1);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'views/templates'));

// express middlewares
app.use(express.static(path.join(__dirname ,'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use(session({
    name : "Interrupt_session",
    secret : process.env.SESSION_SECRET,
    store : sessionStore,
    resave : false,
    proxy : true,
    saveUninitialized : true,

    cookie : {secure : true, domain : '.interrupt2k19.in'},

    rolling : true,
    unset : 'destroy',
    
}));
sessionStore.sync();

// Passport
require('./src/auth/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use((req, res, next) => {
    res.locals.isAuthenticated  =   req.isAuthenticated();
    res.locals.studentName      =   req.user ? req.user.student_name : undefined;
    next();
});

// Routes
app.use("/", require('./src/route/home'));
app.use("/admin", require('./src/route/admin'));    
app.use("/about", require('./src/route/about'));
app.use("/login", require('./src/route/login'));
app.use("/polling", require('./src/route/polling'));
app.use("/events", require('./src/route/events'));
app.use('/challenge', require('./src/route/challenge'));
app.use("/register", require('./src/route/registration'));

// Server
app.listen(process.env.PORT, process.env.IP, (err) => {
    console.log("Server is running on port",process.env.PORT);
});

