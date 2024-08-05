const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
 
const app = express();

const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/taskrabbit',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (() => console.log("mongo databse is connected"))
    .catch(error => console.error(error));



// Routes
const authRoutes = require('./server/routes/auth');
const profileRoutes = require('./server/routes/profile');
const uploadRoutes = require('server/routes/upload');


app.use('api/auth',authRoutes);
app.use('api/profile',profileRoutes);
app.use('api/upload',uploadRoutes);

app.listen(PORT,() => {
    console.log('server is running');
});
