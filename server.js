const express = require('express');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./backend/src/config/db');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

// session setup
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    store: new SequelizeStore({ db: sequelize }), 
    cookie: { maxAge: 1000 * 60 * 60 * 24 }  
}));

// init the database using sequelize
sequelize.authenticate().then(() => { 
    console.log('Connection has been established successfully.'); 
    return sequelize.sync({ force: true });
    }).then(() => { console.log('Database synced'); 

    }).catch(err => { console.error('Error syncing database:', err); });

// Configuring Routes
const authRoute = require('./backend/src/routes/authRoute');
const resourceRoute = require('./backend/src/routes/resourceRoute');

// using the routes
app.use('/api/auth', authRoute);
app.use('/api/resource', resourceRoute);

// route for testing
app.get('/', (req, res) => { 
    res.send('Welcome to the API'); 
});


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server Running on port ${PORT}`);
});





