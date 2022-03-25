const mongoosekey = require('./mongoosekey')
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


// connect to mongoose
mongoose.connect(mongoosekey.password, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
})

// require routers
const showRouter = require('./routes/shows');


// parse request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// route handlers

// get all show data
// router also handles our post and delete requests to add and remove shows
app.use('/showdata', showRouter)


// route handler for main app
app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname,"../client/index.js"));
})



// unknown routes
app.use('/', function (req,res) {
    res.sendStatus(404)
});

// GLOBAL ERROR HANDLER
app.use(function (err, req, res, next) {
    // console.error(err.stack)
    // res.status(500).send('Something broke!')
    const defaultErr =     {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    const errorObj = Object.assign(defaultErr, err)
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message)
  })
  /**
   * start server
   */
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;