const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;


// require routers
const showRouter = require('./routes/shows.js');


// parse request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// route handlers

// get all show data
// router also handles our post and delete requests to add and remove shows
app.use('/showData', showRouter)


// route handler for main app
app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname,"./index.html"));
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