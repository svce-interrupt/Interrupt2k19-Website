// Web framework
const express          =    require('express');
const app              =    express();
const methodOverride   =    require('method-override');
const expressSanitizer =    require('express-sanitizer');
const cookieParser     =    require('cookie-parser');
const session          =    require('express-session');

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

// Session management
const SequelizeStore   =    require('connect-session-sequelize')(session.Store);
const sessionStore     =    new SequelizeStore({
    db : db,
    checkExpirationInterval : 15 * 60 * 1000,
    expiration : 24 * 60 * 60 * 1000
});

app.use(session({
    name : "Interrupt_session",
    secret : process.env.SESSION_SECRET,
    store : sessionStore,
    resave : false,
    saveUninitialized : true,
    cookie : {
        path : '/',
        secure : true,
        sameSite : false
    }
}));
sessionStore.sync();

// Passport
app.use(passport.initialize());
app.use(passport.session());


// express settings
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'views/templates'));

// express middlewares
app.use(express.static(path.join(__dirname ,'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Routes
app.use("/", require('./src/route/home'));
app.use("/about", require('./src/route/about'));
app.use("/login", require('./src/route/login'));
app.use("/events", require('./src/route/events'));
app.use("/register", require('./src/route/registration'));

// Server
app.listen(process.env.PORT, process.env.IP, (err) => {
    console.log("Server is running on port",process.env.PORT);
});

