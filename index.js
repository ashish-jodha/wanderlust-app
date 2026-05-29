const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();

const listingsRouter = require('./routes/listings');
const reviewsRouter = require('./routes/reviews');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB Connection Error:", err));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser('your-secret-cookie-key'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'wanderlust-secret-code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server serving on port ${PORT}`);
});