const fs = require('fs');
const path = require('path');

const showController = {};

// MIDDLEWARE: get our shows from the json file
showController.getShows = (req, res, next) => {
    fs.readFile(path.resolve(__dirname, '../data/shows.json'), 'UTF-8',
    (err, data) => {
        if (err) {
            return next ({
                log: `showController.getShows: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
                message: { err: 'Error occurred in showController.getShows. Check server logs for more details.'}
            });
        }
        const parsedData = JSON.parse(data);
        res.locals.shows = parsedData.allShows;
        return next()
    });
};

// MIDDLEWARE: Add a show
showController.addShow = (req, res, next) => {

}




// MIDDLEWARE: Remove a show
showController.removeShow = (req, res, next) => {

}

module.exports = showController;